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
exports.SellComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var mat_select_autocomplete_1 = require("mat-select-autocomplete");

var http_1 = require("@angular/common/http");

var environment_1 = require("src/environments/environment");

var SellComponent =
/** @class */
function () {
  function SellComponent(fb, router, api, http) {
    this.fb = fb;
    this.router = router;
    this.api = api;
    this.http = http;
    this.dropdownList = [];
    this.selectedItems = [];
    this.dropdownSettings = {};
    this.options = [];
    this.showError = false;
    this.errorMessage = "";
    this.selectedOptions = [];
    this.selected = this.selectedOptions;
    this.optionsCategories = [];
    this.showErrorCategories = false;
    this.errorMessageCategories = "";
    this.selectedOptionsCategories = [];
    this.selectedCategories = this.selectedOptionsCategories;
    this.images = [];
    this.myFiles = [];
    this.displayCategories = [];
    this.displayGroups = [];
    this.data = [];
    this.newdata = [];
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
  }

  SellComponent.prototype.ngOnInit = function () {
    var userData = JSON.parse(localStorage.getItem('userdata'));
    this.userType = userData === null || userData === void 0 ? void 0 : userData.type;
    this.address1 = '';
    this.dropdownList = [{
      item_id: 1,
      item_text: 'Item1'
    }, {
      item_id: 2,
      item_text: 'Item2'
    }, {
      item_id: 3,
      item_text: 'Item3'
    }, {
      item_id: 4,
      item_text: 'Item4'
    }, {
      item_id: 5,
      item_text: 'Item5'
    }];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };
    this.selectedItems = [{
      item_id: 3,
      item_text: 'Item3'
    }, {
      item_id: 4,
      item_text: 'Item4'
    }];
    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
    });
    this.getGroups();
    this.getsubcategory();
    this.formInit();
  };

  SellComponent.prototype.formInit = function () {
    this.myForm = new forms_1.FormGroup({
      file: new forms_1.FormControl('', forms_1.Validators.required),
      Selected: new forms_1.FormControl([], forms_1.Validators.required),
      SelectedCategories: new forms_1.FormControl([], forms_1.Validators.required),
      postalcode: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address2: new forms_1.FormControl(this.address2),
      price: new forms_1.FormControl(''),
      pricebox: new forms_1.FormControl(''),
      condition: new forms_1.FormControl('', forms_1.Validators.required),
      description: new forms_1.FormControl('', forms_1.Validators.required),
      title: new forms_1.FormControl('', forms_1.Validators.required)
    });
  };

  SellComponent.prototype.getSelectedOptions = function (selected) {
    this.selected = selected;
  };

  SellComponent.prototype.getSelectedOptionsCategories = function (selectedCategories) {
    this.selectedCategories = selectedCategories;
  };

  SellComponent.prototype.onResetSelection = function () {
    this.selectedOptions = [];
  };

  SellComponent.prototype.onResetSelectionCategories = function () {
    this.selectedOptionsCategories = [];
  };

  SellComponent.prototype.getsubcategory = function () {
    var _this = this;

    this.api.get("getproductCategory").subscribe(function (res) {
      //console.log(res);
      _this.ProductCategoryData = res.CategoryData;

      _this.ProductCategoryData.forEach(function (element) {
        _this.optionsCategories.push({
          value: element._id,
          display: element.categoryName
        });
      });
    });
  };

  SellComponent.prototype.getGroups = function () {
    var _this = this;

    this.api.get('getgroups').subscribe(function (res) {
      _this.allGroups = res.data;

      _this.allGroups.forEach(function (element) {
        _this.options.push({
          value: element._id,
          display: element.groups
        });
      });
    });
  };

  SellComponent.prototype.onFileChange = function (event) {
    var _this = this;

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader(); //console.log(this.images);

      reader.onload = function (event) {
        _this.images.push(event.target.result);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  SellComponent.prototype.deleteImage = function (i) {
    //console.log(i);
    this.index = i;
    document.getElementById("upLoader" + i).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  };

  SellComponent.prototype.getAddressByPostalcode = function () {
    var _this = this;

    var formValue = this.myForm.value;
    var timer;
    clearTimeout(timer);
    timer = setTimeout(function () {
      var _a;

      if (((_a = formValue.postalcode) === null || _a === void 0 ? void 0 : _a.toString().length) == 6) {
        if (!formValue.postalcode) {
          _this.address1 = '';
        }

        var requestData = {};
        requestData["postalCode"] = formValue.postalcode;

        _this.api.post("getAddressPostcode", requestData).subscribe(function (res) {
          var _a, _b;

          _this.fulladdress = (_a = res.addressfrompostcode) === null || _a === void 0 ? void 0 : _a.address;
          (_b = _this.fulladdress) === null || _b === void 0 ? void 0 : _b.forEach(function (element) {
            _this.address1 = element.ADDRESS;
          });

          if (!_this.address1) {
            _this.postalcode = '';
          }
        });
      }
    }, 300);
  };

  SellComponent.prototype.SubmitMarketPlaceProducListing = function () {
    var _this = this;

    var formValue = this.myForm.value;
    var formData = new FormData();
    formData.append("groupsId", __spreadArrays(formValue.Selected).join(","));
    formData.append("subcategory", __spreadArrays(formValue.SelectedCategories).join(","));
    formData.append("condition", formValue.condition);
    formData.append("title", formValue.title);

    if (this.myForm.value.price === 'forsale') {
      formData.append("price", formValue.pricebox);
    } else {
      formData.append("price", formValue.price);
    }

    formData.append("description", formValue.description);
    formData.append("country", 'singapore');

    if (this.address1 !== '') {
      formData.append("address1", this.address1);
    }

    formData.append("address2", formValue.address2);
    formData.append("postalCode", formValue.postalcode);
    this.displayCategories = formValue.SelectedCategories.forEach(function (item) {
      _this.optionsCategories.forEach(function (element) {
        if (element.value == item) {
          _this.data.push(element.display);
        }
      });
    });
    this.displayGroups = formValue.Selected.forEach(function (item) {
      _this.options.forEach(function (element) {
        if (element.value == item) {
          _this.newdata.push(element.display);
        }
      });
    });
    formData.append("groupsName", [this.selected ? __spreadArrays(this.newdata) : __spreadArrays(this.selected), this.selectedCategories ? __spreadArrays(this.data) : __spreadArrays(this.selectedCategories), formValue["class"]].join(","));

    if (this.myForm.valid) {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("image", this.myFiles[i]);
      }

      var headers = new http_1.HttpHeaders({
        Authorization: localStorage.getItem("LoggedIn")
      });
      this.http.post(this.API_URL + "createproduct", formData, {
        headers: headers
      }).subscribe(function (res) {
        //console.log(res);
        if (res.status == true) {
          _this.router.navigate(["pages/my-listing"]);
        } else {
          _this.api.alert(res.message, "error");
        }
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  };

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], SellComponent.prototype, "multiSelect");

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], SellComponent.prototype, "multiSelectCategories");

  SellComponent = __decorate([core_1.Component({
    selector: 'app-sell',
    templateUrl: './sell.component.html',
    styleUrls: ['./sell.component.scss']
  })], SellComponent);
  return SellComponent;
}();

exports.SellComponent = SellComponent;