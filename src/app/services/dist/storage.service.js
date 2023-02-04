"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StorageService = void 0;
var core_1 = require("@angular/core");
var StorageService = /** @class */ (function () {
    function StorageService(route) {
    }
    StorageService.prototype.setData = function (data, classData) {
        localStorage.setItem("userdata", JSON.stringify(data));
        localStorage.setItem("classData", JSON.stringify(classData));
    };
    StorageService.prototype.getData = function () {
        localStorage.getItem("phone");
        localStorage.getItem("email");
        //  localStorage.getItem('data');
    };
    StorageService.prototype.setToken = function (data) {
        this.token = data;
        localStorage.setItem("LoggedIn", this.token);
    };
    StorageService.prototype.setbranchStatus = function (data) {
        this.branchStatus = data;
        localStorage.setItem("branchStatus", this.branchStatus);
    };
    StorageService.prototype.getbranchStatus = function (data) {
        this.branchStatus = data;
        localStorage.getItem("branchStatus");
    };
    // setBusinessId(data: any) {
    //   this.businessId = data;
    //   localStorage.setItem("businessId", this.businessId);
    // }
    StorageService.prototype.getToken = function () {
        return localStorage.getItem("LoggedIn");
    };
    // login hain ya nahi h
    StorageService.prototype.isLoggednIn = function () {
        return this.getToken() !== null;
    };
    // getAdminToken() {
    //   return localStorage.getItem("admintoken");
    // }
    // isAdminLoggednIn() {
    //   return this.getAdminToken() !== null;
    // }
    // isAuthenticate() {
    //   if (this.token) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    // clearUser(key:string) {
    //   return localStorage.removeItem(key);
    // }
    StorageService.prototype.logout = function () {
        localStorage.removeItem("LoggedIn");
        localStorage.removeItem("userdata");
        localStorage.removeItem("classData");
        localStorage.removeItem("businessId");
        localStorage.removeItem("__admintype");
        localStorage.removeItem("branchStatus");
        localStorage.removeItem("load");
    };
    StorageService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
