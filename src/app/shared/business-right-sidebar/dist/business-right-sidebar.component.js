"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessRightSidebarComponent = void 0;
var core_1 = require("@angular/core");
var BusinessRightSidebarComponent = /** @class */ (function () {
    function BusinessRightSidebarComponent(router, storage, event, api, route) {
        this.router = router;
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.route = route;
        this.showDeleteModal = false;
        this.verifyprogrammeDetails = [];
        this.disbalepreview = false;
        this.urlData = this.route.routeConfig.path;
        this.showSidebar = this.urlData == "business-details" ? true : false;
    }
    BusinessRightSidebarComponent.prototype.ngOnInit = function () {
        this.getbusinessDetails();
        this.getInfoText();
        this.lat = 1.3521;
        this.lng = 103.8198;
    };
    BusinessRightSidebarComponent.prototype.mapClicked = function (event) {
        //console.log(event);
        // this.lat = event.coords.latitude;
        // this.lng = event.coords.longitude;
        this.locationchoosen = true;
    };
    BusinessRightSidebarComponent.prototype.getInfoText = function () {
        var _this = this;
        this.api.getInfoSection().subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var path = _this.route.routeConfig.path;
            if (path.includes('business-profile')) {
                _this.infoTextData = (_a = res === null || res === void 0 ? void 0 : res.sectionData[1]) === null || _a === void 0 ? void 0 : _a.description;
            }
            else if (path.includes('business-details')) {
                _this.infoTextData = (_b = res === null || res === void 0 ? void 0 : res.sectionData[4]) === null || _b === void 0 ? void 0 : _b.description;
            }
            else if (path.includes('add-new-branch') || path.includes('branches')) {
                _this.infoTextData = (_c = res === null || res === void 0 ? void 0 : res.sectionData[8]) === null || _c === void 0 ? void 0 : _c.description;
            }
            else if (path.includes('programms')) {
                _this.infoTextData = (_d = res === null || res === void 0 ? void 0 : res.sectionData[9]) === null || _d === void 0 ? void 0 : _d.description;
            }
            else if (path.includes('teachers')) {
                _this.infoTextData = (_e = res === null || res === void 0 ? void 0 : res.sectionData[10]) === null || _e === void 0 ? void 0 : _e.description;
            }
            else if (path.includes('gallery')) {
                _this.infoTextData = (_f = res === null || res === void 0 ? void 0 : res.sectionData[11]) === null || _f === void 0 ? void 0 : _f.description;
            }
            else if (path.includes('my-listing')) {
                _this.infoTextData = (_g = res === null || res === void 0 ? void 0 : res.sectionData[12]) === null || _g === void 0 ? void 0 : _g.description;
            }
            else if (path.includes('business-reviews')) {
                _this.infoTextData = (_h = res === null || res === void 0 ? void 0 : res.sectionData[13]) === null || _h === void 0 ? void 0 : _h.description;
            }
            else if (path.includes('business-inbox')) {
                _this.infoTextData = (_j = res === null || res === void 0 ? void 0 : res.sectionData[14]) === null || _j === void 0 ? void 0 : _j.description;
            }
            else if (path.includes('faqs')) {
                //console.log("faqs");
                _this.infoTextData = (_k = res === null || res === void 0 ? void 0 : res.sectionData[15]) === null || _k === void 0 ? void 0 : _k.description;
            }
            else {
                _this.infoTextData = 'Information Text Not Found';
            }
        });
    };
    BusinessRightSidebarComponent.prototype.getbusinessDetails = function () {
        var _this = this;
        this.api.getBusineesdetails().subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            //console.log(res);
            _this.status = res.status;
            _this.businessDetails = (_b = (_a = res === null || res === void 0 ? void 0 : res.results) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.businessDetails;
            if ((_d = (_c = _this.businessDetails) === null || _c === void 0 ? void 0 : _c.loc) === null || _d === void 0 ? void 0 : _d.coordinates[1]) {
                _this.lat = (_f = (_e = _this.businessDetails) === null || _e === void 0 ? void 0 : _e.loc) === null || _f === void 0 ? void 0 : _f.coordinates[1];
                _this.lng = (_h = (_g = _this.businessDetails) === null || _g === void 0 ? void 0 : _g.loc) === null || _h === void 0 ? void 0 : _h.coordinates[0];
                _this.ZoomValue = 18;
            }
            else {
                _this.lat = 1.3521;
                _this.lng = 103.8198;
                _this.ZoomValue = 9;
            }
            _this.verifybusinessDetails = ((_k = (_j = res === null || res === void 0 ? void 0 : res.results) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.businessDetails.postalCode) ? true : false;
            _this.classDetails = (_m = (_l = res === null || res === void 0 ? void 0 : res.results) === null || _l === void 0 ? void 0 : _l[1]) === null || _m === void 0 ? void 0 : _m.classDetails[0];
            if (_this.classDetails) {
                _this.disbalepreview = true;
            }
            _this.verifiedbuttonName = ((_p = (_o = res === null || res === void 0 ? void 0 : res.results) === null || _o === void 0 ? void 0 : _o[1]) === null || _p === void 0 ? void 0 : _p.classDetails[0].profilestatus) ? (_r = (_q = res === null || res === void 0 ? void 0 : res.results) === null || _q === void 0 ? void 0 : _q[1]) === null || _r === void 0 ? void 0 : _r.classDetails[0].profilestatus : 'Submit Verify Requests';
            _this.verifyclassDetails = ((_t = (_s = res === null || res === void 0 ? void 0 : res.results) === null || _s === void 0 ? void 0 : _s[1]) === null || _t === void 0 ? void 0 : _t.classDetails[0].aboutBusiness) ? true : false;
            _this.verifyprogrammeDetails = ((_v = (_u = res === null || res === void 0 ? void 0 : res.results) === null || _u === void 0 ? void 0 : _u[3]) === null || _v === void 0 ? void 0 : _v.programData.length) === 0 ? false : true;
            _this.verifybranchDetails = ((_x = (_w = res === null || res === void 0 ? void 0 : res.results) === null || _w === void 0 ? void 0 : _w[5]) === null || _x === void 0 ? void 0 : _x.branchDetails.length) === 0 ? false : true;
        });
    };
    BusinessRightSidebarComponent.prototype.showPopup = function () {
        var _this = this;
        if (this.status) {
            if (this.verifyclassDetails) {
                if (this.verifybranchDetails) {
                    if (this.verifyprogrammeDetails) {
                        this.showDeleteModal = false;
                        this.api.post("profileStatus", { classId: this.classDetails._id }).subscribe(function (res) {
                            //console.log(res);
                            if (res.status == true) {
                                _this.verifiedbuttonName = res.message;
                                _this.api.alert(res.message, 'success');
                            }
                            else {
                                _this.api.alert(res.message, 'error');
                            }
                        });
                    }
                    else {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Programmes are not maintained';
                    }
                }
                else {
                    if (this.verifyprogrammeDetails) {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Branches are not maintained';
                    }
                    else {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Programmes and Branches are not maintained';
                    }
                }
            }
            else {
                if (this.verifybranchDetails) {
                    if (this.verifyprogrammeDetails) {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Business information are not maintained';
                    }
                    else {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Business information and Programmes are not maintained';
                    }
                }
                else {
                    if (this.verifyprogrammeDetails) {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Business information and Branches are not maintained';
                    }
                    else {
                        this.showDeleteModal = true;
                        this.showMessageDynamically = 'Business information , Branches and Programmes are not maintained';
                    }
                }
            }
        }
        else {
            this.showDeleteModal = false;
        }
    };
    BusinessRightSidebarComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    BusinessRightSidebarComponent.prototype.getClassDetails = function () {
        var _a, _b;
        if ((_a = this.classDetails) === null || _a === void 0 ? void 0 : _a._id) {
            var newid = atob((_b = this.classDetails) === null || _b === void 0 ? void 0 : _b._id);
            this.router.navigate(["/view/class-details/" + newid]);
        }
    };
    BusinessRightSidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-business-right-sidebar',
            templateUrl: './business-right-sidebar.component.html',
            styleUrls: ['./business-right-sidebar.component.scss']
        })
    ], BusinessRightSidebarComponent);
    return BusinessRightSidebarComponent;
}());
exports.BusinessRightSidebarComponent = BusinessRightSidebarComponent;
