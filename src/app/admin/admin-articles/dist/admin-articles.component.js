"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminArticlesComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var AdminArticlesComponent = /** @class */ (function () {
    function AdminArticlesComponent(api, router, route, http) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.http = http;
        this.ArticleList = [];
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            _this.newtoken = localStorage.getItem("admintoken");
            _this.httpOptions = {
                headers: new http_1.HttpHeaders({
                    Authorization: _this.newtoken
                })
            };
            _this.http
                .get(_this.API_URL + "getarticlesbyidAdmin?articleId=" +
                _this.id, { headers: _this.httpOptions.headers, params: params })
                .subscribe(function (res) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                _this.ArticleList = res.articleData;
                // console.log(res, "getarticlesbyid");
                _this.title = (_a = _this.ArticleList) === null || _a === void 0 ? void 0 : _a.title;
                _this.subject = (_b = _this.ArticleList) === null || _b === void 0 ? void 0 : _b.subject;
                _this.bannerImage = (_c = _this.ArticleList) === null || _c === void 0 ? void 0 : _c.banner;
                _this.authorName = (_d = _this.ArticleList) === null || _d === void 0 ? void 0 : _d.authorName;
                _this.image = (_e = _this.ArticleList) === null || _e === void 0 ? void 0 : _e.image;
                _this.description = (_f = _this.ArticleList) === null || _f === void 0 ? void 0 : _f.description[0];
                _this.authorimage = (_g = _this.ArticleList) === null || _g === void 0 ? void 0 : _g.authorimage;
                _this.authordescription = (_h = _this.ArticleList) === null || _h === void 0 ? void 0 : _h.authordescription;
                _this.createdDate = (_j = _this.ArticleList) === null || _j === void 0 ? void 0 : _j.createdDate;
            });
        });
    }
    AdminArticlesComponent.prototype.ngOnInit = function () { };
    // redirectAdmin() {
    //   this.router.navigate(["/admin/admin-articles/:id/:token"]);
    // }
    AdminArticlesComponent.prototype.ngOnDestroy = function () {
        this.router.navigate(["/admin/admin-articles/" + this.id + "/" + this.userId + "/" + this.token]);
    };
    AdminArticlesComponent = __decorate([
        core_1.Component({
            selector: "app-admin-articles",
            templateUrl: "./admin-articles.component.html",
            styleUrls: ["./admin-articles.component.scss"]
        })
    ], AdminArticlesComponent);
    return AdminArticlesComponent;
}());
exports.AdminArticlesComponent = AdminArticlesComponent;
