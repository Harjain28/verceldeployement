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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;
exports.AddTeachersComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var mat_select_autocomplete_1 = require("mat-select-autocomplete");

var environment_1 = require("src/environments/environment");

var AddTeachersComponent =
/** @class */
function () {
  function AddTeachersComponent(http, api, event, router, route) {
    var _this = this;

    this.http = http;
    this.api = api;
    this.event = event;
    this.router = router;
    this.route = route;
    this.localValue = localStorage.getItem("businessId");
    this.images = '';
    this.myForm = new forms_1.FormGroup({
      teachername: new forms_1.FormControl("", [forms_1.Validators.required]),
      description: new forms_1.FormControl(""),
      image: new forms_1.FormControl(""),
      Selected: new forms_1.FormControl([], forms_1.Validators.required) // fileSource: new FormControl("", [Validators.required]),

    });
    this.options = [];
    this.selectedOptions = [];
    this.selected = this.selectedOptions;
    this.showError = false;
    this.errorMessage = "";
    this.allbranchData = [];
    this.image = '';
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.route.params.subscribe(function (params) {
      _this.id = params["id"];
      _this.userId = params === null || params === void 0 ? void 0 : params.userId;
      _this.token = params === null || params === void 0 ? void 0 : params.token;
      localStorage.setItem("admintoken", _this.token);
      localStorage.setItem("businessadminid", _this.userId);
      var requestData = {};
      requestData["type"] = "teacher";
      requestData["id"] = _this.id;
      var headers = new http_1.HttpHeaders({
        Authorization: localStorage.getItem("admintoken")
      });

      _this.http.post(_this.API_URL + "admingetdatabyid", requestData, {
        headers: headers
      }).subscribe(function (res) {
        var _a, _b, _c, _d, _e, _f;

        _this.teacherData = res === null || res === void 0 ? void 0 : res.data;
        _this.images = (_a = _this.teacherData) === null || _a === void 0 ? void 0 : _a.image;
        _this.description = ((_b = _this.teacherData) === null || _b === void 0 ? void 0 : _b.description) == "undefined" ? '' : (_c = _this.teacherData) === null || _c === void 0 ? void 0 : _c.description;
        _this.teacherName = (_d = _this.teacherData) === null || _d === void 0 ? void 0 : _d.teacherName;
        _this.selectedOptions = (_f = (_e = _this.teacherData) === null || _e === void 0 ? void 0 : _e.userId) === null || _f === void 0 ? void 0 : _f.map(function (item) {
          return item;
        }).slice(1);
      });
    });
  }

  AddTeachersComponent.prototype.openToggle = function () {
    this.newteacher = !this.newteacher;
  };

  AddTeachersComponent.prototype.ngOnInit = function () {
    var _a;

    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a._id;
    this.getBranchdetails();
    this.getbusinessDetails();
  };

  AddTeachersComponent.prototype.onToggleDropdown = function () {
    this.multiSelect.toggleDropdown();
  };

  AddTeachersComponent.prototype.getSelectedOptions = function (selected) {
    this.selected = selected;
  };

  AddTeachersComponent.prototype.onResetSelection = function () {
    this.selectedOptions = [];
  };

  AddTeachersComponent.prototype.onFileChange = function (event) {
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

  AddTeachersComponent.prototype.deleteImage = function () {
    this.images = '';
    this.myFiles = this.images;
    document.getElementById('deleteimg').value = '';
  };

  AddTeachersComponent.prototype.getBranchdetails = function () {
    var _this = this;

    var headers = new http_1.HttpHeaders({
      Authorization: localStorage.getItem("admintoken")
    });
    this.http.get(this.API_URL + "admingetBranchlisting?userId=" + this.userId, {
      headers: headers
    }).subscribe(function (res) {
      _this.allbranchData = res === null || res === void 0 ? void 0 : res.branchDetails;

      _this.allbranchData.forEach(function (element) {
        _this.options.push({
          value: element === null || element === void 0 ? void 0 : element._id,
          display: element === null || element === void 0 ? void 0 : element.branchName
        });
      });
    });
  };

  AddTeachersComponent.prototype.getbusinessDetails = function () {
    var _this = this;

    this.api.getAdminBusinessDetails().subscribe(function (res) {
      _this.classdetails = res.results[1].classDetails;

      _this.classdetails.forEach(function (element) {
        _this["class"] = element === null || element === void 0 ? void 0 : element.businessName;
        _this.classId = element === null || element === void 0 ? void 0 : element._id;
      });
    });
  };

  AddTeachersComponent.prototype.submit = function () {
    var _this = this;

    var formvalue = this.myForm.value;
    var formData = new FormData();
    formData.append("classId", this.classId);
    formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue === null || formvalue === void 0 ? void 0 : formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
    formData.append("description", formvalue === null || formvalue === void 0 ? void 0 : formvalue.description);
    formData.append("teacherName", formvalue === null || formvalue === void 0 ? void 0 : formvalue.teachername);
    formData.append("image", this.myFiles ? this.myFiles : this.images);
    var headers = new http_1.HttpHeaders({
      Authorization: localStorage.getItem("admintoken")
    });

    if (this.id) {
      formData.append("teacherId", this.id);

      if (this.myForm.valid) {
        this.http.post(this.API_URL + "admineditTeacher", formData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["admin/teachers/" + _this.userId + "/" + _this.token]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    } else {
      if (this.myForm.valid) {
        this.http.post(this.API_URL + "adminaddTeacher", formData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["admin/teachers/" + _this.userId + "/" + _this.token]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    }
  };

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], AddTeachersComponent.prototype, "multiSelect");

  AddTeachersComponent = __decorate([core_1.Component({
    selector: "app-add-teachers",
    templateUrl: "./add-teachers.component.html",
    styleUrls: ["./add-teachers.component.scss"]
  })], AddTeachersComponent);
  return AddTeachersComponent;
}();

exports.AddTeachersComponent = AddTeachersComponent;