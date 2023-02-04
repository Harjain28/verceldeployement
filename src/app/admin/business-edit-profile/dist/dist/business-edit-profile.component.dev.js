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
exports.BusinessEditProfileComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var environment_1 = require("src/environments/environment");

var BusinessEditProfileComponent =
/** @class */
function () {
  function BusinessEditProfileComponent(api, http, route, storage, router) {
    this.api = api;
    this.http = http;
    this.route = route;
    this.storage = storage;
    this.router = router;
    this.showEdit = true;
    this.showEditPhone = true;
    this.showEmailOTPforVarification = false;
    this.showMobileOTPforVarification = false;
    this.showEmailfield = true;
    this.showMobilefield = true;
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype');

    if (this.adminType == "superAdmin") {
      this.diabledFeilds = false;
    } else {
      this.diabledFeilds = true;
    }
  }

  BusinessEditProfileComponent.prototype.openToggle = function () {
    this.addchild = !this.addchild;
  };

  BusinessEditProfileComponent.prototype.ngOnInit = function () {
    var _this = this;

    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;

    this.route.params.subscribe(function (params) {
      _this.userId = params === null || params === void 0 ? void 0 : params.userId;
      _this.token = params === null || params === void 0 ? void 0 : params.token;
      localStorage.setItem("admintoken", _this.token);
      localStorage.setItem("businessadminid", _this.userId);
      _this.newtoken = localStorage.getItem("admintoken");
    });
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.email = ((_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.email) === 'null' ? '' : (_b = this.fulldata) === null || _b === void 0 ? void 0 : _b.email;
    this.images = (_c = this.fulldata) === null || _c === void 0 ? void 0 : _c.image;
    this.userName = (_d = this.fulldata) === null || _d === void 0 ? void 0 : _d.userName;
    this.uniqueId = (_e = this.fulldata) === null || _e === void 0 ? void 0 : _e.uniqueId;
    this.gender = (_f = this.fulldata) === null || _f === void 0 ? void 0 : _f.gender;
    this.DOB = (_g = this.fulldata) === null || _g === void 0 ? void 0 : _g.DOB;
    this.name = (_h = this.fulldata) === null || _h === void 0 ? void 0 : _h.name;

    if (((_j = this.fulldata) === null || _j === void 0 ? void 0 : _j.mobileNo.toString().length) > 8) {
      this.mobileNo = (_k = this.fulldata) === null || _k === void 0 ? void 0 : _k.mobileNo.toString().slice(2);
    } else {
      this.mobileNo = ((_l = this.fulldata) === null || _l === void 0 ? void 0 : _l.mobileNo.toString()) === '65' ? '' : (_m = this.fulldata) === null || _m === void 0 ? void 0 : _m.mobileNo.toString();
    }

    this.type = (_o = this.fulldata) === null || _o === void 0 ? void 0 : _o.type;
    this.formInit();
  };

  BusinessEditProfileComponent.prototype.onFileChange = function (event) {
    var _this = this;

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        _this.images = event.target.result;
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  BusinessEditProfileComponent.prototype.formInit = function () {
    this.editProfileForm = new forms_1.FormGroup({
      email: new forms_1.FormControl(this.email, {
        validators: [forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")],
        updateOn: "blur"
      }),
      name: new forms_1.FormControl(this.name, [forms_1.Validators.required]),
      userName: new forms_1.FormControl(this.userName),
      phone: new forms_1.FormControl(this.mobileNo, [forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
      gender: new forms_1.FormControl(this.gender ? this.gender : ""),
      date: new forms_1.FormControl(this.DOB ? this.DOB : ""),
      image: new forms_1.FormControl("")
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
    } else {
      if (isFlotedNumber) {
        return false;
      }

      return true;
    }
  };

  BusinessEditProfileComponent.prototype.handleresetpasswordRoute = function (name) {
    this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
  };

  BusinessEditProfileComponent.prototype.submitEditProfileForm = function () {
    var _this = this;

    var formValue = this.editProfileForm.value;
    this.mobile = parseInt("+65" + (formValue === null || formValue === void 0 ? void 0 : formValue.phone));
    var formData = new FormData();
    formData.append("image", this.myFiles ? this.myFiles : this.images); // formData.append("userName", formValue.userName);

    formData.append("name", formValue.name);
    formData.append("email", formValue.email === "" ? null : formValue.email);
    formData.append("mobileNo", this.mobile.toString() === "" ? null : this.mobile.toString());
    formData.append("gender", formValue.gender);
    formData.append("DOB", formValue.date);
    formData.append("userId", this.userId);
    var headers = new http_1.HttpHeaders({
      Authorization: localStorage.getItem("admintoken")
    });

    if (this.editProfileForm.valid) {
      this.http.post(this.API_URL + "admineditprofile", formData, {
        headers: headers
      }).subscribe(function (res) {
        if (res.status == true) {
          _this.api.alert(res === null || res === void 0 ? void 0 : res.message, "success");

          localStorage.setItem("userData", JSON.stringify(res === null || res === void 0 ? void 0 : res.data));

          _this.router.navigate(["admin/business-profile/" + _this.userId + "/" + _this.token]);
        } else {
          _this.api.alert(res.message, "error");
        }
      });
    } else {
      this.editProfileForm.markAllAsTouched();
    }
  };

  BusinessEditProfileComponent = __decorate([core_1.Component({
    selector: 'app-business-edit-profile',
    templateUrl: './business-edit-profile.component.html',
    styleUrls: ['./business-edit-profile.component.scss']
  })], BusinessEditProfileComponent);
  return BusinessEditProfileComponent;
}();

exports.BusinessEditProfileComponent = BusinessEditProfileComponent;