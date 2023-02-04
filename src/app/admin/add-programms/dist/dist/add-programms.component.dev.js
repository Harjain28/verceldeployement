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
exports.AddProgrammsComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var mat_select_autocomplete_1 = require("mat-select-autocomplete");

var http_1 = require("@angular/common/http");

var environment_1 = require("src/environments/environment");

var AddProgrammsComponent =
/** @class */
function () {
  function AddProgrammsComponent(storage, event, api, http, router, fb, route) {
    var _this = this;

    this.storage = storage;
    this.event = event;
    this.api = api;
    this.http = http;
    this.router = router;
    this.fb = fb;
    this.route = route;
    this.tags = [];
    this.options = [];
    this.selectedOptions = [];
    this.selected = this.selectedOptions;
    this.showError = false;
    this.errorMessage = "";
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [{
        "class": 'arial',
        name: 'Arial'
      }, {
        "class": 'times-new-roman',
        name: 'Times New Roman'
      }, {
        "class": 'calibri',
        name: 'Calibri'
      }, {
        "class": 'comic-sans-ms',
        name: 'Comic Sans MS'
      }],
      customClasses: [{
        name: 'quote',
        "class": 'quote'
      }, {
        name: 'redText',
        "class": 'redText'
      }, {
        name: 'titleText',
        "class": 'titleText',
        tag: 'h1'
      }],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']]
    };
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.route.params.subscribe(function (params) {
      _this.id = params["id"];
      _this.userId = params === null || params === void 0 ? void 0 : params.userId;
      _this.token = params === null || params === void 0 ? void 0 : params.token;
      localStorage.setItem("admintoken", _this.token);
      localStorage.setItem("businessadminid", _this.userId);

      if (_this.id) {
        var requestData = {};
        requestData["type"] = "program";
        requestData["id"] = _this.id;
        var headers = new http_1.HttpHeaders({
          Authorization: localStorage.getItem("admintoken")
        });

        _this.http.post(_this.API_URL + "admingetdatabyid", requestData, {
          headers: headers
        }).subscribe(function (res) {
          var _a, _b, _c, _d;

          _this.editProgramData = res.data;
          _this.programmName = (_a = _this.editProgramData) === null || _a === void 0 ? void 0 : _a.programsName;
          _this.editorData = ((_b = _this.editProgramData) === null || _b === void 0 ? void 0 : _b.description) == "undefined" ? '' : (_c = _this.editProgramData) === null || _c === void 0 ? void 0 : _c.description;
          _this.selectedOptions = (_d = _this.editProgramData) === null || _d === void 0 ? void 0 : _d.userId.map(function (item) {
            return item;
          }).slice(1);
        });
      }
    });
  }

  AddProgrammsComponent.prototype.openToggle = function () {
    this.newteacher = !this.newteacher;
  };

  AddProgrammsComponent.prototype.onToggleDropdown = function () {
    this.multiSelect.toggleDropdown();
  };

  AddProgrammsComponent.prototype.getSelectedOptions = function (selected) {
    this.selected = selected;
  };

  AddProgrammsComponent.prototype.onResetSelection = function () {
    this.selectedOptions = [];
  };

  AddProgrammsComponent.prototype.ngOnInit = function () {
    var _a;

    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a._id;
    this.formInit();
    this.getBranchdetails();
    this.getbusinessDetails();
  };

  AddProgrammsComponent.prototype.formInit = function () {
    this.addProgram = new forms_1.FormGroup({
      name: new forms_1.FormControl("", forms_1.Validators.required),
      htmlContent: new forms_1.FormControl(this.editorData),
      Selected: new forms_1.FormControl([], forms_1.Validators.required)
    });
  };

  AddProgrammsComponent.prototype.getBranchdetails = function () {
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

  AddProgrammsComponent.prototype.getbusinessDetails = function () {
    var _this = this;

    this.api.getAdminBusinessDetails().subscribe(function (res) {
      _this.classdetails = res.results[1].classDetails;

      _this.classdetails.forEach(function (element) {
        _this["class"] = element.businessName;
        _this.classId = element._id;
      });
    });
  };

  AddProgrammsComponent.prototype.submitaddProgramData = function () {
    var _this = this;

    var formValue = this.addProgram.value;
    var requestData = {};
    requestData["classId"] = this.classId;
    requestData["adminId"] = this.selected ? __spreadArrays([this.adminId], formValue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(",");
    requestData["description"] = formValue.htmlContent;
    requestData["programsName"] = formValue.name;

    if (this.id) {
      requestData["programId"] = this.id;

      if (this.addProgram.valid) {
        var headers = new http_1.HttpHeaders({
          Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admineditProgram", requestData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["admin/programms/" + _this.userId + "/" + _this.token]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.addProgram.markAllAsTouched();
      }
    } else {
      if (this.addProgram.valid) {
        var headers = new http_1.HttpHeaders({
          Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "adminaddprograms", requestData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["admin/programms/" + _this.userId + "/" + _this.token]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.addProgram.markAllAsTouched();
      }
    }
  };

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], AddProgrammsComponent.prototype, "multiSelect");

  AddProgrammsComponent = __decorate([core_1.Component({
    selector: "app-add-programms",
    templateUrl: "./add-programms.component.html",
    styleUrls: ["./add-programms.component.scss"]
  })], AddProgrammsComponent);
  return AddProgrammsComponent;
}();

exports.AddProgrammsComponent = AddProgrammsComponent;