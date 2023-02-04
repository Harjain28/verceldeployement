"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminClassesComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var AdminClassesComponent = /** @class */ (function () {
    function AdminClassesComponent(api, router, route) {
        var _this = this;
        var _a, _b;
        this.api = api;
        this.router = router;
        this.route = route;
        this.panelOpenState = false;
        this.allClassDetails = {};
        this.images = [];
        this.branchName = [];
        this.branchDetails = [];
        this.articles = [];
        this.events = [];
        this.sectionData = [];
        this.sections = [];
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
                },
                740: {
                    items: 1
                },
                940: {
                    items: 1
                }
            },
            nav: false
        };
        this.customOptions2 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 2
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
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            _this.api.get("classDetails?classId=" + _this.id).subscribe(function (res) {
                var _a, _b, _c, _d;
                // console.log(res, "classDetails");
                _this.branchName = res.branchData.map(function (item) {
                    return { value: item.branchName, branchId: item._id };
                });
                _this.programData = res.programData;
                _this.teacherData = res.teacherData;
                _this.albumData = res.albumData;
                _this.branchDetails = res.branchData;
                _this.address = (_a = res.branchData[0]) === null || _a === void 0 ? void 0 : _a.address1;
                _this.mobileNo = (_b = res.branchData[0]) === null || _b === void 0 ? void 0 : _b.mobileNo;
                _this.email = (_c = res.branchData[0]) === null || _c === void 0 ? void 0 : _c.email;
                _this.webAddress = (_d = res.branchData[0]) === null || _d === void 0 ? void 0 : _d.webAddress;
                _this.allClassDetails = res.classData;
                _this.className = _this.allClassDetails.businessName;
                _this.aboutClass = _this.allClassDetails.aboutBusiness;
                _this.classEmail = _this.allClassDetails.email;
                _this.classSubcategory = _this.allClassDetails.businesssubCategory
                    .map(function (item) {
                    return item.subCategory;
                })
                    .join(", ");
                _this.website = _this.allClassDetails.webAddress;
                _this.images = _this.allClassDetails.image;
            });
        });
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.businessemail = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.email;
        this.businessmobileNo = (_b = this.fulldata) === null || _b === void 0 ? void 0 : _b.mobileNo;
    }
    AdminClassesComponent.prototype.ngOnInit = function () {
        this.getClasses();
    };
    AdminClassesComponent.prototype.selectBranch = function (event) {
        var _this = this;
        this.branchDetails.forEach(function (branch) {
            if (branch._id === event) {
                _this.address = branch.addbranchs1;
                _this.mobileNo = branch.mobileNo;
                _this.email = branch.email;
                _this.webAddress = branch.webAddress;
            }
        });
        // console.log(event, "selectBranch");
    };
    AdminClassesComponent.prototype.getClasses = function () {
        var _this = this;
        this.api.get("classdetailsection").subscribe(function (res) {
            _this.sectionData = res.description;
            // console.log(_this.sectionData, res, "sectionData");
            _this.sectionData.forEach(function (item) {
                _this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section });
            });
        });
    };
    AdminClassesComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    AdminClassesComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    AdminClassesComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    AdminClassesComponent.prototype.getClassDetails = function (id) {
        this.router.navigate(["/group/class-details/" + id]);
    };
    AdminClassesComponent.prototype.ngOnDestroy = function () {
        this.router.navigate(["/admin/admin-articles/" + this.id + "/" + this.userId + "/" + this.token]);
    };
    AdminClassesComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-classes',
            templateUrl: './admin-classes.component.html',
            styleUrls: ['./admin-classes.component.scss']
        })
    ], AdminClassesComponent);
    return AdminClassesComponent;
}());
exports.AdminClassesComponent = AdminClassesComponent;
