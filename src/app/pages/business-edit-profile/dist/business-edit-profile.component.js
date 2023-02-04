"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessEditProfileComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var BusinessEditProfileComponent = /** @class */ (function () {
    function BusinessEditProfileComponent(api, http, storage, router, event, compressImage) {
        this.api = api;
        this.http = http;
        this.storage = storage;
        this.router = router;
        this.event = event;
        this.compressImage = compressImage;
        this.showEdit = true;
        this.showEditPhone = true;
        this.showEmailOTPforVarification = false;
        this.showMobileOTPforVarification = false;
        this.showEmailfield = true;
        this.showMobilefield = true;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.adminType = localStorage.getItem('__admintype');
        if (this.adminType == "admin") {
            this.diabledFeilds = false;
        }
        else if (this.adminType == "subadmin") {
            this.diabledFeilds = true;
        }
        else {
            this.diabledFeilds = false;
        }
    }
    BusinessEditProfileComponent.prototype.openToggle = function () {
        this.addchild = !this.addchild;
    };
    BusinessEditProfileComponent.prototype.ngOnInit = function () {
        var _a;
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.email = this.fulldata.email;
        this.images = this.fulldata.image;
        // this.userName = this.fulldata.userName;
        this.uniqueId = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.uniqueId;
        this.gender = this.fulldata.gender;
        this.DOB = this.fulldata.DOB;
        this.name = this.fulldata.name;
        if (this.fulldata.mobileNo.toString().length > 8) {
            this.mobileNo = this.fulldata.mobileNo.toString().slice(2);
        }
        else {
            this.mobileNo = this.fulldata.mobileNo.toString();
        }
        // this.mobileNo = this.fulldata.mobileNo.toString().slice(2);
        //console.log(this.fulldata.mobileNo.length);
        this.type = this.fulldata.type;
        this.formInit();
    };
    BusinessEditProfileComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var image = event.target.files[0];
        console.log("Image size before compressed: " + image.size + " bytes.");
        this.compressImage.compress(image)
            .pipe(operators_1.take(1))
            .subscribe(function (compressedImage) {
            console.log("Image size after compressed: " + compressedImage.size + " bytes.");
            for (var i = 0; i < event.target.files.length; i++) {
                _this.myFiles = compressedImage;
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.images = event.target.result;
                };
                reader.readAsDataURL(compressedImage);
            }
        });
    };
    BusinessEditProfileComponent.prototype.formInit = function () {
        this.editProfileForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(this.email, {
                validators: [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"),
                ],
                updateOn: "blur"
            }),
            emailOTP: new forms_1.FormControl(this.email, {
                validators: [
                    forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{4})$")
                ]
            }),
            mobileOTP: new forms_1.FormControl('', {
                validators: [
                    forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{4})$"),
                ]
            }),
            name: new forms_1.FormControl(this.name, [forms_1.Validators.required]),
            // userName: new FormControl(this.userName, [Validators.required]),
            phone: new forms_1.FormControl(this.mobileNo, [
                forms_1.Validators.required,
            ]),
            gender: new forms_1.FormControl(this.gender ? this.gender : ""),
            date: new forms_1.FormControl(this.DOB ? this.DOB : ""),
            image: new forms_1.FormControl("")
        });
    };
    BusinessEditProfileComponent.prototype.editEmail = function () {
        this.showEdit = false;
        this.showEmailfield = false;
        this.showEmailOTPforVarification = false;
    };
    BusinessEditProfileComponent.prototype.editPhoneNumber = function () {
        this.showMobilefield = false;
        this.showEditPhone = false;
        this.showMobileOTPforVarification = false;
        // this.showEdit = false;
        // this.showEmailfield = false;
    };
    BusinessEditProfileComponent.prototype.submitEmail = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["email"] = formValue.email;
        this.api.post("emailOtpeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.api.alert(res.message, 'success');
                _this.showEmailfield = true;
                _this.showEdit = true;
                _this.showEmailOTPforVarification = true;
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.showEmailOTPforVarification = false;
            }
        });
    };
    BusinessEditProfileComponent.prototype.verifyEditEmailOtp = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["emailOTP"] = formValue.emailOTP;
        requestData["email"] = formValue.email;
        this.api.post("verifyOTPeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.showEmailOTPforVarification = false;
                _this.api.alert(res.message, 'success');
            }
            else {
                _this.api.alert(res.message, 'error');
            }
        });
    };
    BusinessEditProfileComponent.prototype.submitPhoneNumber = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["mobileNo"] = parseInt("+91" + formValue.phone);
        this.api.post("mobileNoOtpeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.api.alert(res.message, 'success');
                _this.showMobilefield = true;
                _this.showEditPhone = true;
                _this.showMobileOTPforVarification = true;
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.showMobileOTPforVarification = false;
            }
        });
    };
    BusinessEditProfileComponent.prototype.verifyEditPhoneOtp = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["mobileOTP"] = formValue.mobileOTP;
        requestData["mobileNo"] = parseInt("+91" + formValue.phone);
        this.api.post("verifyOTPeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.showMobileOTPforVarification = false;
                _this.api.alert(res.message, 'success');
            }
            else {
                _this.api.alert(res.message, 'error');
                _this.showMobileOTPforVarification = false;
            }
        });
    };
    BusinessEditProfileComponent.prototype.numberOnly = function (event, type) {
        var charCode = event.which ? event.which : event.keyCode;
        var isOnlyNumber = charCode > 31 && (charCode < 48 || charCode > 57);
        var isFlotedNumber = charCode > 31 && (charCode < 46 || charCode > 57 || charCode === 47);
        if (type !== "price") {
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
    BusinessEditProfileComponent.prototype.currentDate = function () {
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();
        this.today = yyyy + '-' + mm + '-' + dd;
        //console.log(this.today, "currentDate")
        return this.today;
    };
    BusinessEditProfileComponent.prototype.submitEditProfileForm = function () {
        var _this = this;
        if (this.showEmailOTPforVarification || this.showMobileOTPforVarification) {
            this.editProfileForm.get('mobileOTP').setValidators([forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{4})$"),]);
            this.editProfileForm.get('mobileOTP').updateValueAndValidity();
            this.editProfileForm.get('emailOTP').setValidators([forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{4})$"),]);
            this.editProfileForm.get('emailOTP').updateValueAndValidity();
        }
        else {
            this.editProfileForm.get('emailOTP').clearValidators();
            this.editProfileForm.get('emailOTP').updateValueAndValidity();
            this.editProfileForm.get('mobileOTP').clearValidators();
            this.editProfileForm.get('mobileOTP').updateValueAndValidity();
        }
        var formValue = this.editProfileForm.value;
        this.mobile = parseInt("+65" + formValue.phone);
        var formData = new FormData();
        formData.append("image", this.myFiles ? this.myFiles : this.images);
        // formData.append("userName", formValue.userName);
        formData.append("name", formValue.name);
        formData.append("email", formValue.email);
        formData.append("mobileNo", this.mobile.toString());
        formData.append("gender", formValue.gender);
        formData.append("DOB", formValue.date);
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
        });
        //console.log(this.editProfileForm, "requestData");
        if (this.editProfileForm.valid) {
            this.http.post(this.API_URL + "editprofile", formData, { headers: headers }).subscribe(function (res) {
                //console.log(res, "editProfileForm");
                if (res.status == true) {
                    _this.api.alert(res.message, "success");
                    localStorage.setItem("userdata", JSON.stringify(res.data));
                    _this.router.navigate(["/pages/business-profile"]);
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
            this.editProfileForm.markAllAsTouched();
        }
    };
    BusinessEditProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-business-edit-profile',
            templateUrl: './business-edit-profile.component.html',
            styleUrls: ['./business-edit-profile.component.scss']
        })
    ], BusinessEditProfileComponent);
    return BusinessEditProfileComponent;
}());
exports.BusinessEditProfileComponent = BusinessEditProfileComponent;
