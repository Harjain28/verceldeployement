"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupDetailsComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var GroupDetailsComponent = /** @class */ (function () {
    // isHidden: boolean = true;
    function GroupDetailsComponent(api, http, router, route, storage, event) {
        var _this = this;
        this.api = api;
        this.http = http;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.event = event;
        this.panelOpenState = false;
        this.leaveGroup = false;
        this.groupData = [];
        this.sectionData = [];
        this.sections = [];
        this.faqData = [];
        this.groupEventsData = [];
        this.eventData = [];
        this.groupproductData = [];
        this.productData = [];
        this.myFiles = [];
        this.images = [];
        this.groupDiscussionData = [];
        this.discussionData = [];
        this.isSeprateDiscussion = true;
        this.selected = false;
        this.isJoinGroup = true;
        this.isLeaveGroup = true;
        this.isJoinornot = false;
        this.select = false;
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            autoWidth: true,
            items: 4,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 4
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.customOptions3 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.customOptions4 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 3
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            // console.log(this.id,'idddddddddddd');
            _this.getGroups();
            _this.getAllgroupsData();
        });
    }
    GroupDetailsComponent.prototype.ngOnInit = function () {
        this.selectedIndex = this.event.groupTag;
        this.formInit();
        this.loginOrNot = localStorage.getItem("LoggedIn");
        this.getGroups();
        // this.getAllgroupsData();
        // this.getdiscussionData();
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.userId = userData === null || userData === void 0 ? void 0 : userData._id;
    };
    GroupDetailsComponent.prototype.selectedTabChange = function (event) {
        this.event.groupTag = event.index;
        // console.log('tab changrd', tabVal.index);
    };
    GroupDetailsComponent.prototype.formInit = function () {
        this.groupDiscussionForm = new forms_1.FormGroup({
            title: new forms_1.FormControl("", {
                validators: [forms_1.Validators.required]
            }),
            description: new forms_1.FormControl("", [
                forms_1.Validators.required,
            ]),
            image: new forms_1.FormControl('')
        });
    };
    GroupDetailsComponent.prototype.onTabClick = function (event) {
        this.filterValue = event.tab.textLabel;
        // console.log(this.filterValue);
    };
    // getdiscussionData() {
    //   this.api.get("getreply").subscribe((res: any) => {
    //     console.log(res, "getdiscussionData")
    //   });
    // }
    GroupDetailsComponent.prototype.getAllgroupsData = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.http.get(this.API_URL + "groupDetailsbyId?groupsId=" + this.id)
            .subscribe(function (res) {
            var _a, _b;
            // console.log(res, "groupDetailsbyId");
            _this.groupData = res.searchData[1].faqData;
            _this.groupEventsData = res.searchData[0].eventData;
            _this.groupDiscussionData = res.searchData[2].discussionData;
            _this.groupDiscussionData.forEach(function (element) {
                element.likedId.forEach(function (id) {
                    if (id === _this.userId) {
                        element.selected = true;
                    }
                    else {
                        element.selected = false;
                    }
                });
            });
            _this.groupgroupsData = res.searchData[0].groupsData;
            for (var i = 0; i <= ((_a = _this.groupgroupsData) === null || _a === void 0 ? void 0 : _a.userId.length); i++) {
                if (((_b = _this.groupgroupsData) === null || _b === void 0 ? void 0 : _b.userId[i]) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    _this.selected = true;
                    _this.isJoinornot = true;
                }
            }
            _this.groupproductData = res.searchData[0].productData;
            // Faqs Data 
            _this.groupData.forEach(function (element) {
                var _a;
                (_a = _this.faqData).push.apply(_a, element.faqData);
            });
            // Event Data 
            _this.groupEventsData.forEach(function (element) {
                _this.eventData.push((element));
            });
            // Market Place Data
            _this.groupproductData.forEach(function (element) {
                _this.productData.push((element));
            });
            // this.description = this.groupData.groupDescription;
        });
    };
    GroupDetailsComponent.prototype.getGroups = function () {
        var _this = this;
        this.api.get("groupdetailssection?groupsId=" + this.id).subscribe(function (res) {
            _this.sectionData = res.description;
            // console.log(this.sectionData, "sectionData");
            // this.sectionData.forEach((item: any) => {
            //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
            // })
        });
    };
    GroupDetailsComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    GroupDetailsComponent.prototype.copyToClipboard = function () {
        if (this.storage.isLoggednIn()) {
            this.event.copyClipboard();
            this.api.alert('Link Copied', 'success');
        }
    };
    GroupDetailsComponent.prototype.showMoreData = function (sectiontitle) {
        var DetailType = 'forgroups';
        this.router.navigate(["/group/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
    };
    GroupDetailsComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    GroupDetailsComponent.prototype.getSeparateDiscussionDetails = function (id) {
        var _a;
        this.router.navigate(["/group/separate-discussions/" + id + '/' + ((_a = this.groupgroupsData) === null || _a === void 0 ? void 0 : _a.groups) + '/' + this.id]);
    };
    GroupDetailsComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    GroupDetailsComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    GroupDetailsComponent.prototype.getClassDetails = function (id) {
        var newId = atob(id);
        this.router.navigate(["/view/class-details/" + newId]);
    };
    GroupDetailsComponent.prototype.getMarketPlaceDetails = function (id) {
        this.router.navigate(["/view/marketplace-details/" + id]);
    };
    GroupDetailsComponent.prototype.openToggle = function () {
        this.leaveGroup = !this.leaveGroup;
    };
    GroupDetailsComponent.prototype.openToggle2 = function () {
        if (this.isJoinornot) {
            this.discussationBox = !this.discussationBox;
        }
        else {
            this.api.alert('Please join the Group', "error");
        }
    };
    GroupDetailsComponent.prototype.onFileChange = function (event) {
        var _this = this;
        // console.log(event);
        for (var i = 0; i < event.target.files.length; i++) {
            this.myFiles.push(event.target.files[i]);
            var reader = new FileReader();
            reader.onload = function (event) {
                // console.log(event);
                _this.images.push(event.target.result);
                // console.log(this.images);
            };
            reader.readAsDataURL(event.target.files[i]);
        }
    };
    GroupDetailsComponent.prototype.deleteImage = function (i) {
        // console.log(i);
        this.index = i;
        document.getElementById("upLoader" + i).value = '';
        this.images.splice(i, 1);
        this.myFiles.splice(i, 1);
    };
    GroupDetailsComponent.prototype.groupDiscussionPostForm = function () {
        var _this = this;
        var formValue = this.groupDiscussionForm.value;
        var formData = new FormData();
        if (formValue.title && formValue.title.trim() !== '') {
            formData.append("groupId", this.groupgroupsData._id);
            formData.append("title", formValue.title);
            formData.append("description", formValue.description);
            // console.log(this.groupDiscussionForm);
            if (this.groupDiscussionForm.valid) {
                this.isSeprateDiscussion = false;
                for (var i = 0; i < this.myFiles.length; i++) {
                    formData.append("image", this.myFiles[i]);
                }
                var headers = new http_1.HttpHeaders({
                    Authorization: localStorage.getItem("LoggedIn")
                });
                this.http.post(this.API_URL + "creatediscussion", formData, { headers: headers }).subscribe(function (res) {
                    // console.log(res); 
                    if (res.status == true) {
                        _this.discussationBox = false;
                        _this.groupDiscussionForm.reset();
                        _this.images = [];
                        _this.myFiles = [];
                        _this.isSeprateDiscussion = true;
                        _this.getAllgroupsData();
                    }
                    else {
                        _this.api.alert(res.message, "error");
                        _this.isSeprateDiscussion = true;
                    }
                });
            }
            else {
                this.groupDiscussionForm.markAllAsTouched();
                this.isSeprateDiscussion = false;
            }
        }
    };
    GroupDetailsComponent.prototype.joinGroup = function (groupId) {
        var _this = this;
        this.checkLoginorNot();
        var requestData = {};
        this.joingroupId = groupId;
        this.type = 'join';
        requestData['groupId'] = groupId;
        requestData['type'] = 'join';
        this.isJoinGroup = false;
        this.api.post('joingroups', requestData).subscribe(function (res) {
            var _a;
            // console.log(res);
            if (res.status == true) {
                _this.getAllgroupsData();
                _this.isJoinGroup = true;
                _this.isJoinornot = true;
                if (((_a = _this.groupgroupsData) === null || _a === void 0 ? void 0 : _a._id) === groupId) {
                    _this.selected = true;
                }
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.isJoinGroup = false;
            }
        });
    };
    GroupDetailsComponent.prototype.LeaveGroup = function (groupId) {
        var _this = this;
        this.checkLoginorNot();
        var requestData = {};
        this.leftgroupId = groupId;
        this.type = 'left';
        requestData['groupId'] = groupId;
        requestData['type'] = 'left';
        this.isLeaveGroup = false;
        this.api.post('joingroups', requestData).subscribe(function (res) {
            var _a;
            // console.log(res);
            if (res.status == true) {
                _this.getAllgroupsData();
                _this.isLeaveGroup = true;
                _this.isJoinornot = false;
                if (((_a = _this.groupgroupsData) === null || _a === void 0 ? void 0 : _a._id) === groupId) {
                    _this.leaveGroup = !_this.leaveGroup;
                    _this.selected = false;
                }
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.isLeaveGroup = false;
            }
        });
    };
    __decorate([
        core_1.ViewChild('tabs', { static: false })
    ], GroupDetailsComponent.prototype, "tabs");
    GroupDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-group-details',
            templateUrl: './group-details.component.html',
            styleUrls: ['./group-details.component.scss']
        })
    ], GroupDetailsComponent);
    return GroupDetailsComponent;
}());
exports.GroupDetailsComponent = GroupDetailsComponent;
