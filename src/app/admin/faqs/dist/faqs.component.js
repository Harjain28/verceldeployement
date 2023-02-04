"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FaqsComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var FaqsComponent = /** @class */ (function () {
    function FaqsComponent(api, http, storage, router, route) {
        var _this = this;
        this.api = api;
        this.http = http;
        this.storage = storage;
        this.router = router;
        this.route = route;
        this.panelOpenState = false;
        this.faqs = [];
        this.showDeleteModal = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    FaqsComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.userName = this.fulldata.name;
        this.getFaqs();
    };
    FaqsComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    FaqsComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    FaqsComponent.prototype.deleteFaqsDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["FAQId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admindeletefaq", requestData, { headers: headers }).subscribe(function (res) {
            if (res.status == true) {
                _this.showDeleteModal = false;
                _this.faqs = _this.faqs.filter(function (item) {
                    return item.id !== _this.__Id;
                });
            }
            //console.log(res);
        });
        // this.showDeleteModal = false;
    };
    FaqsComponent.prototype.getFaqs = function () {
        var _this = this;
        var faqdata = [];
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            //console.log(res, 'getFaqs');
            res.results[7].faqData.forEach(function (faq) {
                _this.faqs.push({
                    id: faq._id, question: faq.question, answers: faq.answer, classId: faq.classId,
                    status: faq.status,
                    faqbybranchName: faq === null || faq === void 0 ? void 0 : faq.createdBy,
                    isDisabled: _this.typeDisabled
                });
            });
        });
        //console.log(faqdata, "faqs");
    };
    FaqsComponent.prototype.editFAQDetails = function (id) {
        this.router.navigate(["/admin/add-faqs/" + id + "/" + this.userId + "/" + this.token]);
    };
    FaqsComponent.prototype.handleadminroute = function (name) {
        this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
    };
    FaqsComponent = __decorate([
        core_1.Component({
            selector: 'app-faqs',
            templateUrl: './faqs.component.html',
            styleUrls: ['./faqs.component.scss']
        })
    ], FaqsComponent);
    return FaqsComponent;
}());
exports.FaqsComponent = FaqsComponent;
