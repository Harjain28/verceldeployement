"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var chat_1 = require("src/app/models/chat");
var operators_1 = require("rxjs/operators");
var chat_head_1 = require("src/app/models/chat-head");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(firestore, storage, db, router, api, http, route) {
        var _this = this;
        this.firestore = firestore;
        this.storage = storage;
        this.db = db;
        this.router = router;
        this.api = api;
        this.http = http;
        this.route = route;
        this.chatList = this.firestore.collection('chat_master').doc('message_list');
        this.userList = this.firestore.collection('chat_master').doc('isOnline');
        this.chatHead = this.firestore.collection('chat_master').doc('chat_head');
        this.firstTimeChat = false;
        this.collectionId = '';
        this.loading = false;
        this.imageBox = false;
        this.myFiles = [];
        this.image = [];
        this.route.params.subscribe(function (params) {
            _this.branchuserId = params["adminid"];
            _this.api.get('getuserbyId?userId=' + _this.branchuserId).subscribe(function (res) {
                _this.classData = res.classData;
                _this.Data = res.userData;
                //console.log(_this.Data);
            });
        });
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allchatData = [];
        var userData = JSON.parse(localStorage.getItem('userdata'));
        var classData = JSON.parse(localStorage.getItem('classData'));
        this.senderBusiness = classData === null || classData === void 0 ? void 0 : classData.businessName;
        this.userId = userData === null || userData === void 0 ? void 0 : userData._id;
        this.userName = userData === null || userData === void 0 ? void 0 : userData.name;
        this.userimage = userData === null || userData === void 0 ? void 0 : userData.image;
        this.chatList.collection(this.userId + '-' + this.branchuserId).get().subscribe(function (snapshot) {
            if (snapshot.size === 0) {
                _this.chatList.collection(_this.branchuserId + '-' + _this.userId).get().subscribe(function (snapshot2) {
                    if (snapshot2.size === 0) {
                        _this.collectionId = _this.userId + '-' + _this.branchuserId;
                        _this.firstTimeChat = true;
                        _this.submitchat = '';
                    }
                    else {
                        _this.collectionId = _this.branchuserId + '-' + _this.userId;
                        snapshot2.forEach(function (data) {
                            _this.allchatData.push(data.data());
                            _this.submitchat = '';
                        });
                    }
                });
            }
            else {
                _this.collectionId = _this.userId + '-' + _this.branchuserId;
                snapshot.forEach(function (data) {
                    _this.allchatData.push(data.data());
                    _this.submitchat = '';
                    _this.myFiles = [];
                    _this.image = [];
                });
            }
        });
    };
    ChatComponent.prototype.getBranchdetails = function () {
        var _this = this;
        this.api.get('branchlist?classId=' + this.classId).subscribe(function (res) {
            //console.log('branch', res);
            var branchData = res.branchData;
            branchData.forEach(function (element) {
                if (_this.branchuserId === element._id) {
                    _this.branchName = element.branchName;
                }
            });
            //console.log(branchData);
        });
    };
    ChatComponent.prototype.onFileChange = function (event) {
        var _this = this;
        if (event.target.files && event.target.files.length > 0) {
            var file = event.target.files[0];
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            if (('|jpg|png|jpeg|gif|').indexOf(type) !== -1 && file.size <= 5e+6) {
                for (var i = 0; i < event.target.files.length; i++) {
                    this.myFiles.push(event.target.files[i]);
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.image.push(event.target.result);
                        if (_this.image.length > 0) {
                            _this.imageBox = true;
                        }
                    };
                    reader.readAsDataURL(event.target.files[i]);
                }
            }
            else if (file.size > 2e+6) {
                this.api.alert('File is larger than 5 MB', 'error');
            }
        }
        else {
            this.api.alert('File is Not Supported', 'error');
        }
    };
    ChatComponent.prototype.deleteImage = function (i) {
        this.index = i;
        document.getElementById("upLoader" + i).value = '';
        this.image.splice(i, 1);
        this.myFiles.splice(i, 1);
        this.imageBox = false;
    };
    ChatComponent.prototype.submitChat = function (message) {
        var _this = this;
        var chat = new chat_1.Chat();
        chat.message = message;
        chat.isClicked = false;
        chat.message_type = 0;
        chat.time = Date.now();
        chat.user_id = this.userId;
        chat.receiver_id = this.branchuserId;
        if (this.myFiles && this.myFiles.length > 0 && this.myFiles[0].name) {
            this.uploadAttachmenttoFirbase(chat).subscribe(function (percentage) {
                //console.log(percentage);
                _this.loading = true;
                if (percentage === 100) {
                    _this.loading = false;
                }
            }, function (error) {
                console.error('Error in uploading attachment...!');
            });
        }
        else {
            chat.image = '';
            if (message && message.trim() !== '') {
                this.sendMessageToFirebase(chat);
            }
        }
    };
    ChatComponent.prototype.sendMessageToFirebase = function (chat) {
        var _this = this;
        this.chatList.collection(this.collectionId).doc(Date.now().toString())
            .set(Object.assign({}, chat)).then(function (res) {
            _this.chatList.collection(_this.collectionId).valueChanges().subscribe(function (snapshot) {
                _this.allchatData = [];
                snapshot.forEach(function (data) {
                    _this.allchatData.push(data);
                    _this.submitchat = '';
                    _this.myFiles = [];
                    _this.image = [];
                    document.getElementById("upLoader" + _this.index).value = '';
                    _this.imageBox = false;
                });
                //console.log(_this.allchatData, "allchatData");
            });
            _this.updateChatHead(chat);
        });
    };
    ChatComponent.prototype.uploadAttachmenttoFirbase = function (chat) {
        var _this = this;
        var basePath = '/uploads';
        var filePath = basePath + "/" + this.myFiles[0].name;
        var storageRef = this.storage.ref(filePath);
        var uploadTask = this.storage.upload(filePath, this.myFiles[0]);
        uploadTask.snapshotChanges().pipe(operators_1.finalize(function () {
            storageRef.getDownloadURL().subscribe(function (downloadUrl) {
                chat.image = downloadUrl;
                _this.sendMessageToFirebase(chat);
            });
        })).subscribe();
        return uploadTask.percentageChanges();
    };
    ChatComponent.prototype.updateChatHead = function (chat) {
        var _a, _b, _c;
        var chatHead = new chat_head_1.ChatHead(chat);
        chatHead.receiver_id = this.branchuserId;
        if (((_a = this.Data) === null || _a === void 0 ? void 0 : _a.type) === 'subbusiness') {
            chatHead.userName = (_b = this.Data) === null || _b === void 0 ? void 0 : _b.branchName;
        }
        else {
            chatHead.userName = (_c = this.Data) === null || _c === void 0 ? void 0 : _c.name;
        }
        // chatHead.userImage = this.Data?.image;
        this.chatHead.collection(this.userId).doc(this.branchuserId)
            .set(Object.assign({}, chatHead)).then(function (res) {
        }, function (error) {
            console.error('Error while updating chat of user - ' + error);
        });
        chatHead.receiver_id = this.userId;
        chatHead.user_id = this.branchuserId;
        chatHead.userName = this.userName;
        if (this.userimage) {
            // chatHead.userImage = this.userimage;
        }
        this.chatHead.collection(this.branchuserId).doc(this.userId)
            .set(Object.assign({}, chatHead)).then(function (res) {
        }, function (error) {
            console.error('Error while updating chat of branch - ' + error);
        });
    };
    ChatComponent.prototype.isDifferentDay = function (messageIndex) {
        if (messageIndex === 0)
            return true;
        var d1 = new Date(this.allchatData[messageIndex - 1].time);
        var d2 = new Date(this.allchatData[messageIndex].time);
        return (d1.getFullYear() !== d2.getFullYear() ||
            d1.getMonth() !== d2.getMonth() ||
            d1.getDate() !== d2.getDate());
    };
    ChatComponent.prototype.getMessageDate = function (messageIndex) {
        var dateToday = new Date().toDateString();
        var longDateYesterday = new Date();
        longDateYesterday.setDate(new Date().getDate() - 1);
        var dateYesterday = longDateYesterday.toDateString();
        var today = dateToday.slice(0, dateToday.length - 5);
        var yesterday = dateYesterday.slice(0, dateToday.length - 5);
        var wholeDate = new Date(this.allchatData[messageIndex].time).toDateString();
        this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);
        if (new Date(this.allchatData[messageIndex].time).getFullYear() ===
            new Date().getFullYear()) {
            if (this.messageDateString === today) {
                return "Today";
            }
            else if (this.messageDateString === yesterday) {
                return "Yesterday";
            }
            else {
                return this.messageDateString;
            }
        }
        else {
            return wholeDate;
        }
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss']
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
