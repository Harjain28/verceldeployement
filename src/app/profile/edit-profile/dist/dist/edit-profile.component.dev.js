"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.EditProfileComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var environment_1 = require("src/environments/environment");

var EditProfileComponent =
/** @class */
function () {
  function EditProfileComponent(api, storage, router, http, event) {
    this.api = api;
    this.storage = storage;
    this.router = router;
    this.http = http;
    this.event = event;
    this.showEdit = true;
    this.showEditPhone = true;
    this.showEmailOTPforVarification = false;
    this.showMobileOTPforVarification = false;
    this.showEmailfield = true;
    this.showMobilefield = true;
    this.isupdate = true;
    this.errorPhone = true;
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
  } // openToggle() {
  //   this.addchild = !this.addchild;
  // }


  EditProfileComponent.prototype.ngOnInit = function () {
    var _a;

    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data); //console.log(this.fulldata);

    this.email = this.fulldata.email;

    if ((_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.image) {
      this.images = this.fulldata.image;
    }

    this.gender = this.fulldata.gender;
    this.DOB = this.fulldata.DOB;
    this.name = this.fulldata.name;
    this.userName = this.fulldata.userName;
    this.countryCode = this.fulldata.countryCode;

    if (this.fulldata.mobileNo) {
      this.mobileNo = this.fulldata.mobileNo.toString().slice(2);
    }

    this.type = this.fulldata.type;
    this.formInit();
  };

  EditProfileComponent.prototype.onFileChange = function (event) {
    var _this = this;

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        _this.images = event.target.result; //console.log(_this.images);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  EditProfileComponent.prototype.formInit = function () {
    this.editProfileForm = new forms_1.FormGroup({
      email: new forms_1.FormControl(this.email, {
        validators: [forms_1.Validators.required, forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")],
        updateOn: "blur"
      }),
      name: new forms_1.FormControl(this.name, [forms_1.Validators.required]),
      userName: new forms_1.FormControl(this.userName, [forms_1.Validators.required]),
      phone: new forms_1.FormControl(this.mobileNo, [forms_1.Validators.required]),
      emailOTP: new forms_1.FormControl({
        validators: [, forms_1.Validators.pattern("^([0-9]{4})$")]
      }),
      mobileOTP: new forms_1.FormControl('', {
        validators: [, forms_1.Validators.pattern("^([0-9]{4})$")]
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

  EditProfileComponent.prototype.editPhoneNumber = function () {
    this.showMobilefield = false;
    this.showEditPhone = false;
    this.showMobileOTPforVarification = false; // this.showEdit = false;
    // this.showEmailfield = false;
  };

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
      } else {
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
        _this.showEmailOTPforVarification = false;

        _this.api.alert(res.message, 'success');
      } else {
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
          _this.showEditPhone = true;
          _this.showMobileOTPforVarification = true;
        } else {
          _this.api.alert(res.message, 'error');

          _this.showMobileOTPforVarification = false;
        }
      });
    } else {// this.api.alert('Please enter valid number', 'error');
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
      } else {
        _this.api.alert(res.message, 'error');

        _this.showMobileOTPforVarification = false;
      }
    });
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
    } else {
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
    this.today = yyyy + '-' + mm + '-' + dd; //console.log(this.today, "currentDate");

    return this.today;
  };

  EditProfileComponent.prototype.onCountryChange = function (event) {
    this.phoneDetail = event === null || event === void 0 ? void 0 : event.dialCode;
    this.iso2 = event === null || event === void 0 ? void 0 : event.iso2; //console.log(event);
  };

  EditProfileComponent.prototype.phoneDetails = function (phoneDetails) {
    throw new Error("Method not implemented.");
  };

  EditProfileComponent.prototype.telInputObject = function (obj) {
    obj.setCountry(this.countryCode);
  };

  EditProfileComponent.prototype.hasError = function (event) {
    this.errorPhone = event; //console.log(this.errorPhone);
  };

  EditProfileComponent.prototype.getNumber = function (event) {// //console.log(event);
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
    formData.append("image", this.myFiles ? this.myFiles : this.images);
    formData.append("userName", formValue.userName);
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);

    if (this.iso2) {
      formData.append('countryCode', this.iso2);
    } else {
      formData.append('countryCode', this.countryCode);
    }

    if (this.phoneDetail) {
      this.mobile = parseInt(formValue.phone);
      formData.append("mobileNo", this.phoneDetail + this.mobile.toString());
    } else {
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
        this.http.post(this.API_URL + "editprofile", formData, {
          headers: headers
        }).subscribe(function (res) {
          //console.log(res, "editProfileForm");
          if (res.status == true) {
            _this.api.alert("Klassbook Profile Updated Sucessfully", "success");

            localStorage.setItem("userdata", JSON.stringify(res.data)); // window.location.reload();

            _this.router.navigate(["/profile/profile"]);

            setTimeout(function () {
              _this.event.sendEditEvent();
            }, 100); // setTimeout(()=>{
            //   location.reload();
            // },1000);
          } else {
            _this.api.alert(res.message, "error");

            _this.isupdate = true;
          }
        });
      } else {// this.api.alert('Please enter valid number', 'error');
      }
    } else {
      this.editProfileForm.markAllAsTouched();
    } // location.reload();

  };

  EditProfileComponent = __decorate([core_1.Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"]
  })], EditProfileComponent);
  return EditProfileComponent;
}();

exports.EditProfileComponent = EditProfileComponent;