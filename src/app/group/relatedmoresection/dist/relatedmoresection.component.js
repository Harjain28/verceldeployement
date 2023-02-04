"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelatedmoresectionComponent = void 0;
var core_1 = require("@angular/core");
var RelatedmoresectionComponent = /** @class */ (function () {
    function RelatedmoresectionComponent(api, router, storage, route) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.sectionData = [];
        this.sections = [];
        this.route.params.subscribe(function (params) {
            _this.sectionTitle = params["sectionName"];
            _this.DetailType = params['DetailType'];
            _this.id = params['id'];
            //console.log(_this.DetailType, "detailstype");
            //console.log(_this.sectionTitle, "sectiontitle");
            _this.getAllrelatedSectionData();
        });
    }
    RelatedmoresectionComponent.prototype.ngOnInit = function () {
    };
    RelatedmoresectionComponent.prototype.getAllrelatedSectionData = function () {
        var _this = this;
        if (this.DetailType === 'forarticles') {
            this.api.get("articledetailsection?articleId=" + this.id).subscribe(function (res) {
                var _a;
                for (var i = 0; i <= res.description.length; i++) {
                    if (((_a = res.description[i]) === null || _a === void 0 ? void 0 : _a.title) === _this.sectionTitle) {
                        _this.sectionData.push(res.description[i]);
                        _this.sectionData.forEach(function (item) {
                            _this.sections.push({ sectionname: item === null || item === void 0 ? void 0 : item.sectionname, title: item === null || item === void 0 ? void 0 : item.title, sectionValue: item === null || item === void 0 ? void 0 : item.section });
                        });
                    }
                }
            });
        }
        else if (this.DetailType === 'forevents') {
            this.api.get("eventdetailssection?eventId=" + this.id).subscribe(function (res) {
                var _a;
                for (var i = 0; i <= res.description.length; i++) {
                    if (((_a = res.description[i]) === null || _a === void 0 ? void 0 : _a.title) === _this.sectionTitle) {
                        _this.sectionData.push(res.description[i]);
                        _this.sectionData.forEach(function (item) {
                            _this.sections.push({ sectionname: item === null || item === void 0 ? void 0 : item.sectionname, title: item === null || item === void 0 ? void 0 : item.title, sectionValue: item === null || item === void 0 ? void 0 : item.section });
                        });
                    }
                }
            });
        }
        else if (this.DetailType === 'forclassess') {
            this.api.get("classdetailsection?classId=" + this.id).subscribe(function (res) {
                var _a;
                for (var i = 0; i <= res.description.length; i++) {
                    if (((_a = res.description[i]) === null || _a === void 0 ? void 0 : _a.title) === _this.sectionTitle) {
                        _this.sectionData.push(res.description[i]);
                        _this.sectionData.forEach(function (item) {
                            _this.sections.push({ sectionname: item === null || item === void 0 ? void 0 : item.sectionname, title: item === null || item === void 0 ? void 0 : item.title, sectionValue: item === null || item === void 0 ? void 0 : item.section });
                        });
                    }
                }
            });
        }
        else if (this.DetailType === 'forgroups') {
            this.api.get("groupdetailssection?groupsId=" + this.id).subscribe(function (res) {
                var _a;
                for (var i = 0; i <= res.description.length; i++) {
                    if (((_a = res.description[i]) === null || _a === void 0 ? void 0 : _a.title) === _this.sectionTitle) {
                        _this.sectionData.push(res.description[i]);
                        _this.sectionData.forEach(function (item) {
                            _this.sections.push({ sectionname: item === null || item === void 0 ? void 0 : item.sectionname, title: item === null || item === void 0 ? void 0 : item.title, sectionValue: item === null || item === void 0 ? void 0 : item.section });
                        });
                    }
                }
            });
        }
    };
    RelatedmoresectionComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    RelatedmoresectionComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    RelatedmoresectionComponent.prototype.getClassDetails = function (id) {
        this.router.navigate(["/view/class-details/" + id]);
    };
    RelatedmoresectionComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    RelatedmoresectionComponent = __decorate([
        core_1.Component({
            selector: 'app-relatedmoresection',
            templateUrl: './relatedmoresection.component.html',
            styleUrls: ['./relatedmoresection.component.scss']
        })
    ], RelatedmoresectionComponent);
    return RelatedmoresectionComponent;
}());
exports.RelatedmoresectionComponent = RelatedmoresectionComponent;
