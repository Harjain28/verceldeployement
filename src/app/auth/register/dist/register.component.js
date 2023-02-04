"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, storage, router, route, event, api) {
        var _this = this;
        this.auth = auth;
        this.storage = storage;
        this.router = router;
        this.route = route;
        this.event = event;
        this.api = api;
        this.form = new forms_1.FormGroup({});
        this.bform = new forms_1.FormGroup({});
        this.errorPhone = true;
        this.registerbool = false;
        this.pvisibility = false;
        this.pcvisibility = false;
        this.bpvisibility = false;
        this.bpcvisibility = false;
        this.route.params.subscribe(function (params) {
            _this.types = params['type'];
        });
    }
    // isHidden: boolean = true;
    RegisterComponent.prototype.ngOnInit = function () {
        this.formInit();
    };
    RegisterComponent.prototype.googleSignIn = function () {
        this.registerbool = true;
        this.auth.googleSignin();
    };
    RegisterComponent.prototype.appleSignin = function () {
        this.auth.appleSignin();
    };
    RegisterComponent.prototype.facebookSignin = function () {
        this.auth.facebookSignin();
    };
    RegisterComponent.prototype.onCountryChange = function (event) {
        this.phoneDetails = event === null || event === void 0 ? void 0 : event.dialCode;
        this.iso2 = event === null || event === void 0 ? void 0 : event.iso2;
        //console.log(this.phoneDetails);
    };
    RegisterComponent.prototype.telInputObject = function (obj) {
        //console.log(obj);
        obj.setCountry('sg');
    };
    RegisterComponent.prototype.hasError = function (event) {
        this.errorPhone = event;
        //console.log(this.errorPhone);
    };
    RegisterComponent.prototype.getNumber = function (event) {
        // //console.log(event);
    };
    RegisterComponent.prototype.formInit = function () {
        this.form = new forms_1.FormGroup({
            name: new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
            email: new forms_1.FormControl("", {
                validators: [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"),
                ],
                updateOn: "blur"
            }),
            phone: new forms_1.FormControl("", [
                forms_1.Validators.required,
            ]),
            password: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
            ]),
            confirm_password: new forms_1.FormControl("", [forms_1.Validators.required])
        });
        this.bform = new forms_1.FormGroup({
            businessName: new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
            privacy: new forms_1.FormControl("", [forms_1.Validators.required]),
            name: new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
            email: new forms_1.FormControl("", {
                validators: [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"),
                ],
                updateOn: "blur"
            }),
            phone: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.pattern("[8-9]\\d{7}"),
            ]),
            password: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
            ]),
            confirm_password: new forms_1.FormControl("", forms_1.Validators.required)
        });
    };
    RegisterComponent.prototype.matchinputValue = function (parentControl, childControl) {
        if (parentControl.value !== childControl.value) {
            childControl.setErrors({ noMatch: true });
        }
        else {
            childControl.clearValidators();
            childControl.updateValueAndValidity();
        }
    };
    RegisterComponent.prototype.numberOnly = function (event, type) {
        var charCode = event.which ? event.which : event.keyCode;
        var isOnlyNumber = charCode > 31 && (charCode < 48 || charCode > 57);
        var isFlotedNumber = charCode > 31 && (charCode < 46 || charCode > 57 || charCode === 47);
        if (type !== "mobile") {
            if (isOnlyNumber) {
                return false;
            }
            return true;
        }
        else {
            if (isFlotedNumber) {
                return false;
            }
            return true;
        }
    };
    RegisterComponent.prototype.submitStudentForm = function () {
        var _this = this;
        var formValue = this.form.value;
        var requestData = {};
        var lat = 0.00;
        var long = 0.00;
        requestData["name"] = formValue.name.trim();
        requestData["email"] = formValue.email.trim();
        requestData["password"] = formValue.password;
        requestData["lat"] = lat;
        requestData["long"] = long;
        if (this.iso2) {
            requestData["countryCode"] = this.iso2;
        }
        else {
            requestData["countryCode"] = 'sg';
        }
        if (this.phoneDetails) {
            requestData["mobileNo"] = this.phoneDetails + formValue.phone;
        }
        else {
            requestData["mobileNo"] = parseInt("+65" + formValue.phone);
        }
        requestData["type"] = "student";
        if (this.form.valid) {
            if (this.errorPhone) {
                this.api.post("userregister", requestData).subscribe(function (res) {
                    if (res.status) {
                        _this.api.alert("you have sucessfully signed up in Klassbook", "success");
                        localStorage.clear();
                        _this.storage.setToken(res.token);
                        _this.storage.setData(res.data, res.classData);
                        _this.router.navigate([""]);
                        setTimeout(function () {
                            _this.event.sendEditEvent;
                        }, 100);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                // this.api.alert('Please fill correct mobile number' , 'error')
            }
        }
        else {
            this.form.markAllAsTouched();
        }
    };
    // siteType offsite and onsite values in userRegister api 
    // Have to add this functionality ;
    RegisterComponent.prototype.submitBusinessForm = function () {
        var _this = this;
        var formValue = this.bform.value;
        var lat = 0.00;
        var long = 0.00;
        var requestData = {};
        requestData["name"] = formValue.name.trim();
        requestData["businessName"] = formValue.businessName.trim();
        requestData["email"] = formValue.email.trim();
        requestData["password"] = formValue.password;
        requestData["lat"] = lat;
        requestData["long"] = long;
        requestData["mobileNo"] = parseInt("+65" + formValue.phone);
        requestData["type"] = "business";
        //console.log(this.bform)
        if (this.bform.valid) {
            this.api.post("userregister", requestData).subscribe(function (res) {
                //console.log(res, "usserregister");
                if (res.status) {
                    _this.api.alert("you have successfuly signed up as a BUSINESS", "success");
                    localStorage.clear();
                    _this.storage.setToken(res.token);
                    _this.storage.setData(res.data, res.newClass);
                    _this.storage.setbranchStatus('editbranch');
                    _this.router.navigate(["/email-verify"]);
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            this.bform.markAllAsTouched();
        }
    };
    __decorate([
        core_1.ViewChild('tabs', { static: false })
    ], RegisterComponent.prototype, "tabs");
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "app-register",
            templateUrl: "./register.component.html",
            styleUrls: ["./register.component.scss"]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
