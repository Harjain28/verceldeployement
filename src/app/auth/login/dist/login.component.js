"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, storage, event, api, router) {
        this.auth = auth;
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
        this.destroyer = new rxjs_1.Subject();
        this.pvisibility = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.formInit();
    };
    LoginComponent.prototype.formInit = function () {
        this.loginform = new forms_1.FormGroup({
            email: new forms_1.FormControl("", {
                validators: [
                    forms_1.Validators.required,
                    // Validators.pattern(
                    //   "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
                    // ),
                    forms_1.Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
                ],
                updateOn: "blur"
            }),
            password: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
            ])
        });
    };
    LoginComponent.prototype.submitForm = function () {
        var _this = this;
        var formValue = this.loginform.value;
        var requestData = {};
        if (formValue.email.includes('@')) {
            requestData["email"] = formValue.email.trim();
        }
        else {
            requestData["uniqueId"] = formValue.email.trim();
        }
        requestData["password"] = formValue.password;
        if (this.loginform.valid) {
            this.api.post("login", requestData).subscribe(function (res) {
                //console.log(res, "loginData");
                if (res.status) {
                    if (res.data.admintype == "admin") {
                        _this.api.alert("You have successfully logged in", "success");
                        // localStorage.clear();
                        localStorage.setItem('__admintype', "admin");
                        _this.storage.setToken(res.token);
                        _this.storage.setData(res.data, res.classData);
                        _this.storage.setbranchStatus('editbranch');
                        var userData = JSON.parse(localStorage.getItem("userdata"));
                        var type = userData.type;
                        if (type == "business") {
                            _this.router.navigate(["/pages/business-details"]);
                        }
                        else {
                            _this.router.navigate([""]);
                        }
                    }
                    else if (res.data.admintype == "subadmin") {
                        _this.api.alert("You have successfully logged in", "success");
                        // localStorage.clear();
                        _this.storage.setToken(res.token);
                        localStorage.setItem('__userId', res.data._id);
                        localStorage.setItem('__admintype', "subadmin");
                        localStorage.setItem('__adminId', res.data.admin_id);
                        _this.storage.setData(res.data, res.classData);
                        _this.storage.setbranchStatus('editbranch');
                        var userData = JSON.parse(localStorage.getItem("userdata"));
                        var type = userData.type;
                        if (type == "business") {
                            _this.router.navigate(["/pages/business-details"]);
                        }
                        else {
                            _this.router.navigate([""]);
                        }
                    }
                    else if (res.data.type === 'student') {
                        _this.storage.setToken(res.token);
                        _this.storage.setData(res.data, res.classData);
                        _this.router.navigate([""]);
                    }
                    setTimeout(function () {
                        _this.event.sendEditEvent();
                    }, 100);
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            this.loginform.markAllAsTouched();
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.scss"]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
