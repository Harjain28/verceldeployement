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
exports.AddGalleryComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var mat_select_autocomplete_1 = require("mat-select-autocomplete");

var environment_1 = require("src/environments/environment");

var AddGalleryComponent =
/** @class */
function () {
  function AddGalleryComponent(http, api, event, router, route) {
    var _this = this;

    this.http = http;
    this.api = api;
    this.event = event;
    this.router = router;
    this.route = route;
    this.myFiles = [];
    this.images = [];
    this.options = [];
    this.selectedOptions = [];
    this.selected = this.selectedOptions;
    this.showError = false;
    this.errorMessage = "";
    this.allbranchData = [];
    this.imagesDefault = [];
    this.imagesMutating = [];
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype');
    this.diabledFeilds = this.adminType == "subadmin" ? true : false;

    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }

    this.route.params.subscribe(function (params) {
      _this.id = params["id"];

      if (_this.id) {
        var requestData = {};
        requestData["type"] = "";
        requestData["id"] = _this.id;

        _this.api.post("getdatabyid", requestData).subscribe(function (res) {
          var _a, _b, _c, _d; //console.log(res)


          _this.albumData = res === null || res === void 0 ? void 0 : res.data;
          _this.albumName = ((_a = _this.albumData) === null || _a === void 0 ? void 0 : _a.albumName) == 'undefined' ? "" : (_b = _this.albumData) === null || _b === void 0 ? void 0 : _b.albumName;
          _this.imagesDefault = (_c = _this.albumData) === null || _c === void 0 ? void 0 : _c.image;
          _this.selectedOptions = (_d = _this.albumData) === null || _d === void 0 ? void 0 : _d.userId.map(function (item) {
            return item;
          }).slice(1);
        });
      }
    });
  }

  AddGalleryComponent.prototype.ngOnInit = function () {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.userName = this.fulldata.name;
    this.branchName = this.fulldata.branchName;
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    this.getBranchdetails();
    this.getbusinessDetails();
    this.formInit();
  };

  AddGalleryComponent.prototype.formInit = function () {
    this.myForm = new forms_1.FormGroup({
      albumname: new forms_1.FormControl(this.albumName),
      file: new forms_1.FormControl(''),
      Selected: new forms_1.FormControl([])
    });
  };

  AddGalleryComponent.prototype.onToggleDropdown = function () {
    this.multiSelect.toggleDropdown();
  };

  AddGalleryComponent.prototype.getSelectedOptions = function (selected) {
    this.selected = selected;
  };

  AddGalleryComponent.prototype.onResetSelection = function () {
    this.selectedOptions = [];
  };

  AddGalleryComponent.prototype.getBranchdetails = function () {
    var _this = this;

    this.api.get("getBranchlisting").subscribe(function (res) {
      _this.allbranchData = res.branchDetails;

      _this.allbranchData.forEach(function (element) {
        _this.options.push({
          value: element._id,
          display: element.branchName
        });
      });
    });
  };

  AddGalleryComponent.prototype.deleteImage = function (i) {
    this.index = i;
    document.getElementById("upLoader" + i).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  };

  AddGalleryComponent.prototype.deleteEditImage = function (i) {
    this.imagesDefault.splice(i, 1);
  };

  AddGalleryComponent.prototype.onFileChange = function (event) {
    var _this = this;

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();

      reader.onload = function (event) {
        _this.images.push(event.target.result);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  AddGalleryComponent.prototype.getbusinessDetails = function () {
    var _this = this;

    this.api.getBusineesdetails().subscribe(function (res) {
      _this.classdetails = res.results[1].classDetails;

      _this.classdetails.forEach(function (element) {
        _this["class"] = element.businessName;
        _this.classId = element._id;
      });
    });
  };

  AddGalleryComponent.prototype.submit = function () {
    var _this = this;

    if (this.adminType == "subadmin") {
      this.myForm.get('Selected').clearValidators();
      this.myForm.get('Selected').updateValueAndValidity();
    } else {
      this.myForm.get('Selected').setValidators([forms_1.Validators.required]);
      this.myForm.get('Selected').updateValueAndValidity();
    }

    var formvalue = this.myForm.value;
    var formData = new FormData();

    if (this.imagesDefault.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else if (this.myFiles.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else if (this.myFiles.length == 0 && this.imagesDefault.length == 0) {
      this.myForm.get('file').setValidators([forms_1.Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    } else {
      this.myForm.get('file').setValidators([forms_1.Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    }

    if (this.adminType == "admin") {
      formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
      formData.append("usertype", '');
      formData.append("classId", this.classId);
      formData.append("type", 'admin');
    } else if (this.adminType == 'subadmin') {
      formData.append("adminId", [this.adminId, this.BranchadminId].join(","));
      formData.append("usertype", 'subadmin');
      formData.append("createdby", this.branchName);
      formData.append("classId", this.adminId);
      formData.append("type", 'subadmin');
    } else {
      formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
      formData.append("usertype", '');
      formData.append("type", 'admin');
      formData.append("classId", this.classId);
    }

    formData.append("albumName", formvalue.albumname);
    var headers = new http_1.HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn")
    });

    if (this.id) {
      for (var i = 0; i < this.imagesDefault.length; i++) {
        formData.append("image", this.imagesDefault[i]);
      }

      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("images", this.myFiles[i]);
      }

      formData.append("albumId", this.id);

      if (this.myForm.valid) {
        this.http.post(this.API_URL + "editgallery", formData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["/pages/gallery"]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    } else {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("image", this.myFiles[i]);
      }

      if (this.myForm.valid) {
        this.http.post(this.API_URL + "addgallery", formData, {
          headers: headers
        }).subscribe(function (res) {
          if (res.status == true) {
            _this.router.navigate(["/pages/gallery"]);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    }
  };

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], AddGalleryComponent.prototype, "multiSelect");

  AddGalleryComponent = __decorate([core_1.Component({
    selector: "app-add-gallery",
    templateUrl: "./add-gallery.component.html",
    styleUrls: ["./add-gallery.component.scss"]
  })], AddGalleryComponent);
  return AddGalleryComponent;
}();

exports.AddGalleryComponent = AddGalleryComponent;