"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditProfileComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(api, storage, router, http, event, compressImage) {
        this.api = api;
        this.storage = storage;
        this.router = router;
        this.http = http;
        this.event = event;
        this.compressImage = compressImage;
        this.showEdit = true;
        this.showEditPhone = true;
        this.showEmailOTPforVarification = false;
        this.showMobileOTPforVarification = false;
        this.showEmailfield = true;
        this.showMobilefield = true;
        this.isupdate = true;
        this.errorPhone = true;
        this.DisableSubmitbutton = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.getUserData();
    }
    // openToggle() {
    //   this.addchild = !this.addchild;
    // }
    EditProfileComponent.prototype.ngOnInit = function () {
        this.formInit();
    };
    EditProfileComponent.prototype.getUserData = function () {
        var _this = this;
        var _a, _b;
        this.data = JSON.parse(localStorage.getItem("userdata"));
        this.countryCode = (_a = this.data) === null || _a === void 0 ? void 0 : _a.countryCode;
        var UserId = (_b = this.data) === null || _b === void 0 ? void 0 : _b._id;
        this.api.get('getuserbyId?userId=' + UserId).subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            _this.fulldata = res.userData;
            _this.email = (_a = _this.fulldata) === null || _a === void 0 ? void 0 : _a.email;
            if (((_b = _this.fulldata) === null || _b === void 0 ? void 0 : _b.image) !== 'blankimage' || ((_c = _this.fulldata) === null || _c === void 0 ? void 0 : _c.image)) {
                _this.images = (_d = _this.fulldata) === null || _d === void 0 ? void 0 : _d.image;
            }
            else {
                _this.images = 'blankimage';
            }
            _this.gender = (_e = _this.fulldata) === null || _e === void 0 ? void 0 : _e.gender;
            _this.DOB = (_f = _this.fulldata) === null || _f === void 0 ? void 0 : _f.DOB;
            _this.name = (_g = _this.fulldata) === null || _g === void 0 ? void 0 : _g.name;
            _this.userName = (_h = _this.fulldata) === null || _h === void 0 ? void 0 : _h.userName;
            if ((_j = _this.fulldata) === null || _j === void 0 ? void 0 : _j.mobileNo) {
                _this.mobileNo = (_k = _this.fulldata) === null || _k === void 0 ? void 0 : _k.mobileNo.toString().slice(2);
            }
            _this.type = (_l = _this.fulldata) === null || _l === void 0 ? void 0 : _l.type;
            _this.formInit();
        });
    };
    EditProfileComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var image = event.target.files[0];
        this.compressImage.compress(image)
            .pipe(operators_1.take(1))
            .subscribe(function (compressedImage) {
            for (var i = 0; i < event.target.files.length; i++) {
                _this.myFiles = compressedImage;
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.images = event.target.result;
                    _this.firstNameRef.nativeElement.focus();
                };
                reader.readAsDataURL(compressedImage);
            }
        });
    };
    EditProfileComponent.prototype.deleteProfile = function () {
        this.images = 'blankimage';
        this.myFiles = '';
        document.getElementById("upLoader").value = '';
    };
    EditProfileComponent.prototype.formInit = function () {
        this.editProfileForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(this.email, {
                validators: [forms_1.Validators.required,
                    forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"),
                ],
                updateOn: "blur"
            }),
            name: new forms_1.FormControl(this.name, [forms_1.Validators.required]),
            userName: new forms_1.FormControl(this.userName, [forms_1.Validators.required]),
            phone: new forms_1.FormControl(this.mobileNo, [forms_1.Validators.required]),
            emailOTP: new forms_1.FormControl({
                validators: [
                    ,
                    forms_1.Validators.pattern("^([0-9]{4})$")
                ]
            }),
            mobileOTP: new forms_1.FormControl('', {
                validators: [
                    ,
                    forms_1.Validators.pattern("^([0-9]{4})$"),
                ]
            }),
            gender: new forms_1.FormControl(this.gender ? this.gender : ""),
            date: new forms_1.FormControl(this.DOB ? this.DOB : ""),
            image: new forms_1.FormControl("")
        });
    };
    EditProfileComponent.prototype.editEmail = function () {
        this.showEdit = false;
        this.showEmailfield = false;
        this.showEmailOTPforVarification = false;
    };
    // editPhoneNumber() {
    //   this.showMobilefield = false;
    //   this.showEditPhone = false;
    //   this.showMobileOTPforVarification = false;
    //   // this.showEdit = false;
    //   // this.showEmailfield = false;
    // }
    EditProfileComponent.prototype.submitEmail = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["email"] = formValue.email;
        this.api.post("emailOtpeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.api.alert('OTP sucessfully send to your registered email', 'success');
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
    EditProfileComponent.prototype.verifyEditEmailOtp = function () {
        var _this = this;
        var formValue = this.editProfileForm.value;
        var requestData = {};
        requestData["emailOTP"] = formValue.emailOTP;
        requestData["email"] = formValue.email;
        this.api.post("verifyOTPeditprofile", requestData).subscribe(function (res) {
            if (res.status == true) {
                _this.DisableSubmitbutton = false;
                _this.showEmailOTPforVarification = false;
                _this.api.alert(res.message, 'success');
            }
            else {
                _this.api.alert(res.message, 'error');
            }
        });
    };
    EditProfileComponent.prototype.submitPhoneNumber = function () {
        var _this = this;
        if (this.errorPhone) {
            var formValue = this.editProfileForm.value;
            var requestData = {};
            requestData["mobileNo"] = parseInt("+91" + formValue.phone);
            this.api.post("mobileNoOtpeditprofile", requestData).subscribe(function (res) {
                if (res.status == true) {
                    _this.api.alert('OTP sucessfully send to your registered mobile number', 'success');
                    _this.showMobilefield = true;
                    // this.showEditPhone = true;
                    _this.showMobileOTPforVarification = true;
                }
                else {
                    _this.api.alert(res.message, 'error');
                    _this.showMobileOTPforVarification = false;
                }
            });
        }
        else {
            // this.api.alert('Please enter valid number', 'error');
        }
    };
    EditProfileComponent.prototype.verifyEditPhoneOtp = function () {
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
    EditProfileComponent.prototype.onEmailChange = function (email) {
        var _a;
        if (email === ((_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.email)) {
            this.DisableSubmitbutton = false;
            this.isupdate = true;
        }
        else {
            this.isupdate = false;
            this.DisableSubmitbutton = true;
        }
    };
    EditProfileComponent.prototype.numberOnly = function (event, type) {
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
    EditProfileComponent.prototype.currentDate = function () {
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();
        this.today = yyyy + '-' + mm + '-' + dd;
        return this.today;
    };
    EditProfileComponent.prototype.onCountryChange = function (event) {
        this.phoneDetail = event === null || event === void 0 ? void 0 : event.dialCode;
        this.iso2 = event === null || event === void 0 ? void 0 : event.iso2;
    };
    EditProfileComponent.prototype.phoneDetails = function (phoneDetails) {
        throw new Error("Method not implemented.");
    };
    EditProfileComponent.prototype.telInputObject = function (obj) {
        if (this.countryCode) {
            obj.setCountry(this.countryCode);
        }
    };
    EditProfileComponent.prototype.hasError = function (event) {
        this.errorPhone = event;
    };
    EditProfileComponent.prototype.getNumber = function (event) {
    };
    EditProfileComponent.prototype.submitEditProfileForm = function () {
        // if (this.showEmailOTPforVarification || this.showMobileOTPforVarification) {
        //   this.editProfileForm.get('mobileOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
        //   this.editProfileForm.get('mobileOTP').updateValueAndValidity();
        //   this.editProfileForm.get('emailOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
        //   this.editProfileForm.get('emailOTP').updateValueAndValidity();
        // } else {
        //   this.editProfileForm.get('emailOTP').clearValidators();
        //   this.editProfileForm.get('emailOTP').updateValueAndValidity();
        //   this.editProfileForm.get('mobileOTP').clearValidators();
        //   this.editProfileForm.get('mobileOTP').updateValueAndValidity();
        // }
        var _this = this;
        var formValue = this.editProfileForm.value;
        var formData = new FormData();
        if (this.images === '' || this.images === 'blankimage') {
            formData.append("image", 'blankimage');
        }
        else {
            formData.append("image", this.myFiles ? this.myFiles : this.images);
        }
        formData.append("userName", formValue.userName);
        formData.append("name", formValue.name);
        formData.append("email", formValue.email);
        if (this.iso2) {
            formData.append('countryCode', this.iso2);
        }
        else {
            formData.append('countryCode', this.countryCode);
        }
        if (this.phoneDetail) {
            this.mobile = parseInt(formValue.phone);
            formData.append("mobileNo", this.phoneDetail + this.mobile.toString());
        }
        else {
            this.mobile = parseInt(formValue.phone);
            formData.append("mobileNo", '+65' + this.mobile.toString());
        }
        formData.append("gender", formValue.gender);
        formData.append("DOB", formValue.date);
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
        });
        if (this.editProfileForm.valid) {
            if (this.errorPhone) {
                this.isupdate = false;
                this.http.post(this.API_URL + "editprofile", formData, { headers: headers }).subscribe(function (res) {
                    if (res.status == true) {
                        _this.api.alert("Klassbook Profile Updated Sucessfully", "success");
                        localStorage.setItem("userdata", JSON.stringify(res.data));
                        // window.location.reload();
                        _this.router.navigate(["/profile/profile"]);
                        setTimeout(function () {
                            _this.event.sendEditEvent();
                        }, 200);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                        _this.isupdate = true;
                    }
                });
            }
            else {
                // this.api.alert('Please enter valid number', 'error');
            }
        }
        else {
            this.editProfileForm.markAllAsTouched();
        }
        // location.reload();
    };
    EditProfileComponent.prototype.back = function () {
        this.event.back();
    };
    __decorate([
        core_1.ViewChild('firstName')
    ], EditProfileComponent.prototype, "firstNameRef");
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: "app-edit-profile",
            templateUrl: "./edit-profile.component.html",
            styleUrls: ["./edit-profile.component.scss"]
        })
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
