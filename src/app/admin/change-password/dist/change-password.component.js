"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(storage, router, route, event, http, api) {
        this.storage = storage;
        this.router = router;
        this.route = route;
        this.event = event;
        this.http = http;
        this.api = api;
        this.ResetPasswordForm = new forms_1.FormGroup({});
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.pvisibility = false;
        this.pcvisibility = false;
        this.cpvisibility = false;
        this.formInit();
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = params === null || params === void 0 ? void 0 : params.userId;
            _this.token = params === null || params === void 0 ? void 0 : params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            _this.newtoken = localStorage.getItem("admintoken");
        });
        this.userData = JSON.parse(localStorage.getItem("userData"));
        this.type = this.userData.type;
        this.formInit();
    };
    ChangePasswordComponent.prototype.formInit = function () {
        this.ResetPasswordForm = new forms_1.FormGroup({
            password: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
            ]),
            confirm_password: new forms_1.FormControl("", [forms_1.Validators.required])
        });
    };
    ChangePasswordComponent.prototype.matchinputValue = function (parentControl, childControl) {
        if (parentControl.value !== childControl.value) {
            childControl.setErrors({ noMatch: true });
        }
        else {
            childControl.clearValidators();
            childControl.updateValueAndValidity();
        }
    };
    ChangePasswordComponent.prototype.submitResetPasswordForm = function () {
        var _this = this;
        var formValue = this.ResetPasswordForm.value;
        var requestData = {};
        requestData["new_password"] = formValue.password;
        if (this.ResetPasswordForm.valid) {
            var headers = new http_1.HttpHeaders({
                Authorization: localStorage.getItem("admintoken")
            });
            this.http.post(this.API_URL + "resetpassword/" + this.userId, requestData).subscribe(function (res) {
                //console.log(res, "changepassword");
                if (res.message === "Password Reset Successfully") {
                    if (_this.type == "business") {
                        _this.api.alert(res.message, "success");
                        _this.router.navigate(["admin/business-profile/" + _this.userId + "/" + _this.token]);
                    }
                    else {
                        _this.api.alert(res.message, "success");
                        _this.router.navigate([""]);
                    }
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            this.ResetPasswordForm.markAllAsTouched();
        }
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.scss']
        })
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
