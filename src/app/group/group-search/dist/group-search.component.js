"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupSearchComponent = void 0;
var core_1 = require("@angular/core");
var GroupSearchComponent = /** @class */ (function () {
    function GroupSearchComponent(api, router, storage) {
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.sectionData = [];
        this.sections = [];
        this.joingroup = true;
        this.groupData = [];
        this.isJoingroup = true;
        this.clearIcon = false;
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
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
    }
    GroupSearchComponent.prototype.ngOnInit = function () {
        this.loginOrNot = localStorage.getItem("LoggedIn");
        this.getGroupsection();
    };
    GroupSearchComponent.prototype.onSearchGrouopsbyName = function () {
        var _this = this;
        this.clearIcon = true;
        if (this.searchvalue.length === 0) {
            this.clearIcon = false;
        }
        var userData = JSON.parse(localStorage.getItem('userdata'));
        if (this.searchvalue && this.searchvalue.trim() !== '') {
            this.api.get("searchontype?type=groups&text=" + this.searchvalue).subscribe(function (res) {
                _this.groupsearchData = res.data;
                _this.groupsearchData = _this.groupsearchData.filter(function (othergroup) { return othergroup._id != '6322d831c34c98a9bb49dff8'; });
                // this.isJoingroup = false;
                _this.groupsearchData.forEach(function (element) {
                    if ((element === null || element === void 0 ? void 0 : element._id) === _this.joingroupId) {
                        element.selected = true;
                        _this.isJoingroup = true;
                    }
                    element.userId.forEach(function (userid) {
                        if (userid === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                            element.selected = true;
                            _this.isJoingroup = true;
                        }
                    });
                });
                //console.log('this is groip serach data', _this.groupsearchData);
            });
        }
    };
    GroupSearchComponent.prototype.getGroupsection = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get("groupsection").subscribe(function (res) {
            var _a, _b, _c;
            _this.sectionData = res.description;
            _this.sectionData.forEach(function (groups) {
                groups.section = groups.section.filter(function (othergroup) { return othergroup._id != '6322d831c34c98a9bb49dff8'; });
            });
            //console.log(_this.sectionData, "sectionData");
            for (var i = 0; i <= _this.sectionData.length; i++) {
                for (var j = 0; j < ((_a = _this.sectionData[i]) === null || _a === void 0 ? void 0 : _a.section.length); j++) {
                    if (((_b = _this.sectionData[i].section[j]) === null || _b === void 0 ? void 0 : _b._id) === _this.joingroupId && _this.type === 'join') {
                        _this.sectionData[i].section[j].selected = true;
                    }
                    else if (((_c = _this.sectionData[i].section[j]) === null || _c === void 0 ? void 0 : _c._id) === _this.leftgroupId && _this.type === 'left') {
                        _this.sectionData[i].section[j].selected = false;
                    }
                    for (var k = 0; k <= _this.sectionData[i].section[j].userId.length; k++) {
                        if (_this.sectionData[i].section[j].userId[k] === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                            _this.sectionData[i].section[j].selected = true;
                        }
                    }
                }
            }
        });
    };
    GroupSearchComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    GroupSearchComponent.prototype.clearData = function () {
        this.searchvalue = '';
        this.clearIcon = false;
    };
    GroupSearchComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    GroupSearchComponent.prototype.joinGroup = function (groupData) {
        var _this = this;
        this.checkLoginorNot();
        var requestData = {};
        this.joingroupId = groupData._id;
        this.type = 'join';
        requestData['groupId'] = groupData._id;
        requestData['type'] = 'join';
        this.isJoingroup = false;
        this.api.post('joingroups', requestData).subscribe(function (res) {
            var _a;
            //console.log(res);
            if (res.status == true) {
                _this.isJoingroup = true;
                if (!_this.searchvalue) {
                    for (var i = 0; i <= _this.sectionData.length; i++) {
                        for (var j = 0; j < _this.sectionData[i].section.length; j++) {
                            if (((_a = _this.sectionData[i].section[j]) === null || _a === void 0 ? void 0 : _a._id) === groupData._id) {
                                _this.sectionData[i].section[j].selected = true;
                                _this.getGroupsection();
                                _this.api.alert(res.message, 'success');
                            }
                        }
                    }
                }
                else {
                    _this.groupsearchData.forEach(function (element) {
                        if ((element === null || element === void 0 ? void 0 : element._id) === groupData._id) {
                            element.selected = true;
                            _this.isJoingroup = true;
                            _this.getGroupsection();
                            _this.api.alert(res.message, 'success');
                        }
                        else {
                            element.selected = false;
                        }
                    });
                }
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.isJoingroup = false;
            }
        });
    };
    GroupSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-group-search',
            templateUrl: './group-search.component.html',
            styleUrls: ['./group-search.component.scss']
        })
    ], GroupSearchComponent);
    return GroupSearchComponent;
}());
exports.GroupSearchComponent = GroupSearchComponent;
