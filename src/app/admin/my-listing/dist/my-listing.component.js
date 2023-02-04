"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyListingComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var MyListingComponent = /** @class */ (function () {
    function MyListingComponent(router, api, http, route) {
        var _this = this;
        this.router = router;
        this.api = api;
        this.http = http;
        this.route = route;
        this.allProducts = [];
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    MyListingComponent.prototype.ngOnInit = function () {
        this.getAllListing();
    };
    MyListingComponent.prototype.getAllListing = function () {
        var _this = this;
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.get(this.API_URL + "admingetproductbyuser?userId=" + this.fulldata._id, { headers: headers }).subscribe(function (res) {
            _this.allProducts = res.productsData;
            //console.log(_this.allProducts);
        });
    };
    MyListingComponent = __decorate([
        core_1.Component({
            selector: "app-my-listing",
            templateUrl: "./my-listing.component.html",
            styleUrls: ["./my-listing.component.scss"]
        })
    ], MyListingComponent);
    return MyListingComponent;
}());
exports.MyListingComponent = MyListingComponent;
