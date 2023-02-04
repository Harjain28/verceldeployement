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
exports.AddReviewComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var environment_1 = require("src/environments/environment");

var AddReviewComponent =
/** @class */
function () {
  function AddReviewComponent(http, api, event, router, route) {
    var _this = this;

    this.http = http;
    this.api = api;
    this.event = event;
    this.router = router;
    this.route = route;
    this.stars = [1, 2, 3, 4, 5];
    this.allClassDetails = [];
    this.myFiles = [];
    this.images = [];
    this.isReviewSubmit = true;
    this.israting = false;
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.route.params.subscribe(function (params) {
      _this.id = params["id"];
      _this.branchName = params["branchName"]; //console.log(_this.id);

      _this.api.get("classDetails?classId=" + _this.id).subscribe(function (res) {
        var _a, _b; //console.log(res, "classDetails");


        _this.allClassDetails = res.classData;
        _this.className = (_a = _this.allClassDetails) === null || _a === void 0 ? void 0 : _a.businessName;
        _this.classSubcategory = (_b = _this.allClassDetails) === null || _b === void 0 ? void 0 : _b.businesssubCategory.map(function (item) {
          return item.subCategory;
        }).join(", ");
      });
    });
  }

  AddReviewComponent.prototype.ngOnInit = function () {
    this.formInit();
  };

  AddReviewComponent.prototype.formInit = function () {
    this.myForm = new forms_1.FormGroup({
      title: new forms_1.FormControl('', [forms_1.Validators.required]),
      reviewDescription: new forms_1.FormControl(''),
      image: new forms_1.FormControl('')
    });
  };

  AddReviewComponent.prototype.countStar = function (star) {
    this.selectedValue = star;
  };

  AddReviewComponent.prototype.deleteImage = function (i) {
    this.index = i;
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
    document.getElementById("upLoader" + i).value = '';
  }; // deleteEditImage(i: any): void {
  //   this.imagesDefault.splice(i, 1);
  // }


  AddReviewComponent.prototype.onFileChange = function (event) {
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

  AddReviewComponent.prototype.submitReview = function () {
    var _this = this;

    this.israting = true; // if (!this.selectedValue) {
    //   this.errormessage = 'star rating is required';
    // }

    var formvalue = this.myForm.value;
    var formData = new FormData();
    formData.append("classId", this.id);
    formData.append("branchName", this.branchName);
    formData.append("title", formvalue.title);

    if (this.selectedValue) {
      formData.append("rating", this.selectedValue.toString());
    }

    formData.append("review", formvalue.reviewDescription);

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("image", this.myFiles[i]);
    }

    var headers = new http_1.HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn")
    });
    this.isReviewSubmit = false;

    if (this.myForm.valid && this.selectedValue) {
      this.http.post(this.API_URL + "createreview", formData, {
        headers: headers
      }).subscribe(function (res) {
        //console.log(res);
        if (res.status == true) {
          _this.isReviewSubmit = true;
          var newid = atob(_this.id);

          _this.router.navigate(["view/class-details/" + newid]);
        } else {
          _this.api.alert(res.message, "error");

          _this.isReviewSubmit = true;
        }
      });
    } else {
      this.myForm.markAllAsTouched();
      this.isReviewSubmit = true;
    }
  };

  AddReviewComponent = __decorate([core_1.Component({
    selector: 'app-add-review',
    templateUrl: './add-review.component.html',
    styleUrls: ['./add-review.component.scss']
  })], AddReviewComponent);
  return AddReviewComponent;
}();

exports.AddReviewComponent = AddReviewComponent;