"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerifyEmailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var VerifyEmailComponent = /** @class */ (function () {
    function VerifyEmailComponent(storage, event, api, router) {
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
        this.verifyform = new forms_1.FormGroup({});
        this.rightmobileOTP = false;
        this.wrongmobileOTP = false;
        this.rightemailOTP = false;
        this.wrongemaileOTP = false;
        this.config = {
            allowNumbersOnly: false,
            length: 4,
            isPasswordInput: false,
            disableAutoFocus: false,
            placeholder: "",
            inputStyles: {
                width: "45px",
                height: "45px",
                "font-size": "20px"
            }
        };
    }
    VerifyEmailComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.email = this.fulldata.email;
        this.phone = this.fulldata.mobileNo;
        this.eOTP = this.fulldata.emailOTP;
        this.mOTP = this.fulldata.mobileOTP;
    };
    VerifyEmailComponent.prototype.onemailOtpChange = function (otp) {
        this.emailOtp = otp;
        if (this.emailOtp == this.eOTP) {
            this.rightemailOTP = true;
            this.wrongemaileOTP = false;
        }
        else {
            this.rightemailOTP = false;
            this.wrongemaileOTP = true;
        }
    };
    VerifyEmailComponent.prototype.onOtpChange = function (otp) {
        this.phoneOtp = otp;
        if (this.phoneOtp == this.mOTP) {
            this.rightmobileOTP = true;
            this.wrongmobileOTP = false;
        }
        else {
            this.rightmobileOTP = false;
            this.wrongmobileOTP = true;
        }
    };
    VerifyEmailComponent.prototype.formInit = function () {
        this.verifyform = new forms_1.FormGroup({
            mobileotp: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(1),
            ]),
            emailotp: new forms_1.FormControl("", [
                forms_1.Validators.required,
                forms_1.Validators.minLength(1),
            ])
        });
    };
    VerifyEmailComponent.prototype.verifyOtpmobile = function () {
        var _this = this;
        var formValue = this.verifyform.value;
        var requestData = {};
        requestData["mobileOTP"] = this.phoneOtp;
        requestData["emailOTP"] = this.emailOtp;
        if (this.verifyform.valid) {
            this.api.post("verifyOTP", requestData).subscribe(function (res) {
                //console.log(res);
                if (res.status == true) {
                    _this.api.alert("You are successfully verified", "success");
                    _this.router.navigate(["/pages/business-profle-mobile"]);
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            this.verifyform.markAllAsTouched();
        }
    };
    VerifyEmailComponent.prototype.verifyOtp = function () {
        var _this = this;
        var formValue = this.verifyform.value;
        var requestData = {};
        requestData["mobileOTP"] = this.phoneOtp;
        requestData["emailOTP"] = this.emailOtp;
        if (this.verifyform.valid) {
            this.api.post("verifyOTP", requestData).subscribe(function (res) {
                //console.log(res);
                if (res.status == true) {
                    _this.api.alert("You are successfully verified", "success");
                    _this.router.navigate(["/pages/business-profile"]);
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            this.verifyform.markAllAsTouched();
        }
    };
    VerifyEmailComponent.prototype.resendEmailOTP = function () {
        var _this = this;
        var requestData = {};
        requestData["email"] = this.email;
        this.api.post("resendOTP", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.api.alert("OTP successfully send to you registered Email", "success");
            }
            else {
                _this.api.alert(res.message, "error");
            }
        });
    };
    VerifyEmailComponent.prototype.resendMobileOTP = function () {
        var _this = this;
        var requestData = {};
        requestData["mobileNo"] = this.phone;
        this.api.post("resendOTP", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.api.alert("OTP successfully send to you registered mobile number", "success");
            }
            else {
                _this.api.alert(res.message, "error");
            }
        });
    };
    __decorate([
        core_1.ViewChild("ngmobileOtpInput", { static: false })
    ], VerifyEmailComponent.prototype, "ngmobileOtpInput");
    __decorate([
        core_1.ViewChild("ngemailOtpInput", { static: false })
    ], VerifyEmailComponent.prototype, "ngemailOtpInput");
    VerifyEmailComponent = __decorate([
        core_1.Component({
            selector: "app-verify-email",
            templateUrl: "./verify-email.component.html",
            styleUrls: ["./verify-email.component.scss"]
        })
    ], VerifyEmailComponent);
    return VerifyEmailComponent;
}());
exports.VerifyEmailComponent = VerifyEmailComponent;
