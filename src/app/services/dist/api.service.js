"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var ApiService = /** @class */ (function () {
    function ApiService(http, event, storage) {
        this.http = http;
        this.event = event;
        this.storage = storage;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.TOKEN = localStorage.getItem('LoggedIn');
        if (this.storage.isLoggednIn()) {
            this.TOKEN = localStorage.getItem('LoggedIn');
            this.setHeader();
        }
        // this.ADMINTOKEN = localStorage.getItem('admintoken')
        // if (this.storage.isAdminLoggednIn()) {
        //   this.TOKEN = localStorage.getItem('admintoken')
        //   this.adminSetHeader();
        // }
    }
    // adminSetHeader() {
    //   if (this.ADMINTOKEN !== undefined) {
    //     this.httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         Authorization: this.ADMINTOKEN
    //       })
    //     };
    //   } else {
    //     this.httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //       })
    //     };
    //   }
    // }
    ApiService.prototype.setHeader = function () {
        if (this.TOKEN !== undefined) {
            this.httpOptions = {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: this.TOKEN
                })
            };
        }
        else {
            this.httpOptions = {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
        }
    };
    ApiService.prototype.getInfoSection = function () {
        return this.http.get(this.API_URL + "getinfosection").pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype.getBusineesdetails = function () {
        return this.http.get(this.API_URL + "businessDetails").pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype.getAdminBusinessDetails = function () {
        this.USERID = localStorage.getItem('businessadminid');
        // console.log(this.USERID,"getadminuserid ")
        this.ADMINTOKEN = localStorage.getItem("admintoken");
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        return this.http.get(this.API_URL + "adminbusinessDetails?userId=" + this.USERID, { headers: headers }).pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype.getBusinessBranchDetails = function () {
        this.__userId = localStorage.getItem('__userId');
        this.__adminId = localStorage.getItem('__adminId');
        this.ADMINTOKEN = localStorage.getItem("LoggedIn");
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
        });
        return this.http.get(this.API_URL + "branchbusinessDetails?userId=" + this.__userId + "&admin_id=" + this.__adminId, { headers: headers }).pipe(operators_1.catchError(this.formatErrors));
    };
    // public publicTagg() {
    //   return this.http.get(`${this.API_URL}gettag`).pipe(catchError(this.formatErrors));
    // }
    ApiService.prototype.get = function (path, params) {
        if (params === void 0) { params = new http_1.HttpParams(); }
        return this.http.get("" + this.API_URL + path)
            .pipe(operators_1.catchError(this.formatErrors));
    };
    // get(path: string, params: HttpParams = new HttpParams()) {
    //   return this.http.get(`${this.API_URL}${path}`, { headers: this.httpOptions, params })
    //     .pipe(catchError(this.formatErrors));
    // }
    ApiService.prototype.post = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.post("" + this.API_URL + path, body, this.httpOptions).pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype["delete"] = function (path, params) {
        var _this = this;
        if (params === void 0) { params = new http_1.HttpParams(); }
        return this.http["delete"]("" + this.API_URL + path, { headers: this.httpOptions.headers, params: params }).pipe(operators_1.map(function (r) {
            if (alert) {
                _this.alert(r.message ? r.message : 'Success', 'success');
            }
        })).pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype.upload = function (path, body) {
        var _this = this;
        return this.http.put("" + this.API_URL + path, body, this.httpOptions).pipe(operators_1.map(function (r) {
            if (alert) {
                _this.alert(r.message ? r.message : 'Success', 'success');
            }
        })).pipe(operators_1.catchError(this.formatErrors));
    };
    ApiService.prototype.alert = function (message, type) {
        return sweetalert2_1["default"].fire({
            title: message,
            icon: type,
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            width: '500px'
        });
    };
    ApiService.prototype.formatErrors = function (error) {
        return rxjs_1.throwError(error.error);
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
