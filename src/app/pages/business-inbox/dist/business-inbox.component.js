"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessInboxComponent = void 0;
var core_1 = require("@angular/core");
var BusinessInboxComponent = /** @class */ (function () {
    function BusinessInboxComponent(firestore, router, api, http, route) {
        this.firestore = firestore;
        this.router = router;
        this.api = api;
        this.http = http;
        this.route = route;
        this.chatHead = this.firestore.collection('chat_master').doc('chat_head');
    }
    BusinessInboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allchatData = [];
        var userData = JSON.parse(localStorage.getItem('userdata'));
        var classData = JSON.parse(localStorage.getItem('classData'));
        this.id = userData === null || userData === void 0 ? void 0 : userData._id;
        this.classId = classData === null || classData === void 0 ? void 0 : classData._id;
        this.image = classData === null || classData === void 0 ? void 0 : classData.image;
        this.chatHead.collection(this.id).get().subscribe(function (snapshot) {
            snapshot.forEach(function (data) {
                _this.allchatData.push(data.data());
            });
            //console.log(_this.allchatData);
        });
    };
    BusinessInboxComponent.prototype.DeleteInbox = function () {
        // this.chatHead.collection(this.id).doc(this.id).delete();
    };
    // receiverData() {
    //   this.allchatData.forEach(element => {
    //   this.api.get('getuserbyId?userId=' + element.receiver_id).subscribe((res: any) => {
    //     this.Data = res.userData;
    //     console.log(this.Data);
    //   });
    // });
    // }
    BusinessInboxComponent.prototype.redirectTochat = function (chatData) {
        var classId = 'classId';
        if (this.id === chatData.user_id) {
            this.router.navigate(["/pages/chat/" + chatData.receiver_id]);
        }
        else {
            this.router.navigate(["/pages/chat/" + +chatData.user_id]);
        }
    };
    BusinessInboxComponent = __decorate([
        core_1.Component({
            selector: 'app-business-inbox',
            templateUrl: './business-inbox.component.html',
            styleUrls: ['./business-inbox.component.scss']
        })
    ], BusinessInboxComponent);
    return BusinessInboxComponent;
}());
exports.BusinessInboxComponent = BusinessInboxComponent;
