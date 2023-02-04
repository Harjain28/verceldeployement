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
exports.SeparateDiscussionsComponent = void 0;

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var environment_1 = require("src/environments/environment");

var SeparateDiscussionsComponent =
/** @class */
function () {
  function SeparateDiscussionsComponent(api, http, router, route, storage) {
    var _this = this;

    this.api = api;
    this.http = http;
    this.router = router;
    this.route = route;
    this.storage = storage;
    this.myFiles = [];
    this.myFiles1 = [];
    this.images1 = [];
    this.images = [];
    this.sectionData = [];
    this.selected = false;
    this.select = false;
    this.issubmitBool = false;
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.route.params.subscribe(function (params) {
      _this.groupId = params["groupId"];
      _this.discussionId = params["discussionId"];
      _this.groupsName = params['groupName'];

      _this.getReplyData();

      _this.getSectionofGroup();
    });
  }

  SeparateDiscussionsComponent.prototype.ngOnInit = function () {
    this.formInitMainDiscussionForm();
    var userdata = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userdata === null || userdata === void 0 ? void 0 : userdata._id;
  };

  SeparateDiscussionsComponent.prototype.getReplyData = function () {
    var _this = this;

    var requestData = {};
    requestData["discussionId"] = this.discussionId;
    this.api.get("getdicussionreply?discussionId=" + this.discussionId).subscribe(function (res) {
      var _a, _b; //console.log(res, "groupDetailsbyId");


      _this.discussionData = res.data;

      _this.discussionData.likedId.forEach(function (id) {
        if (id === _this.userId) {
          _this.select = true;
        } else {
          _this.select = false;
        }
      });

      (_a = _this.discussionData) === null || _a === void 0 ? void 0 : _a.discussionreply.forEach(function (element) {
        element.likedId.forEach(function (id) {
          if (id === _this.userId) {
            element.selected = true;
          } else {
            element.selected = false;
          }
        });
      });
      (_b = _this.discussionData) === null || _b === void 0 ? void 0 : _b.discussionreply.forEach(function (element) {
        //console.log(element, 'testing1');
        if (element.userId !== null) {
          if (element.userId._id === _this.userId) {
            element.deleted = true;
          } else {
            element.deleted = false;
          }
        }
      });
      return _this.discussionData.discussionreply.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    });
  }; // get sortByLastModifiedDesc() {
  //   return this.discussionData.discussionreply.sort((a: any, b: any) => {
  //     return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
  //   });
  // }


  SeparateDiscussionsComponent.prototype.formInitMainDiscussionForm = function () {
    this.submitMainDiscussionForm = new forms_1.FormGroup({
      file: new forms_1.FormControl(''),
      description: new forms_1.FormControl('')
    });
  }; // formInitReplyDiscussionForm() {
  //   this.submitMainDiscussionForm = new FormGroup({
  //     file: new FormControl(''),
  //     selectedlevel: new FormControl([], Validators.required),
  //   });
  // }


  SeparateDiscussionsComponent.prototype.addtolikedReply = function (discussionId, type) {
    var _this = this;

    var _a, _b, _c;

    this.likeAdded = true;

    if (type === 'likedMain' || type === 'unlikedMain') {
      if (((_a = this.discussionData) === null || _a === void 0 ? void 0 : _a._id) === discussionId) {
        if (type === 'likedMain') {
          this.select = true;
        } else {
          this.select = false;
        }
      }
    } else {
      (_b = this.discussionData) === null || _b === void 0 ? void 0 : _b.discussionreply.forEach(function (element) {
        if (discussionId === (element === null || element === void 0 ? void 0 : element._id)) {
          if (type === 'likedreply') {
            element.selected = true;
          } else {
            element.selected = false;
          }
        }
      });
    }

    var requestData = {};

    if (type === 'likedMain' || type === 'unlikedMain') {
      requestData["type"] = type;
      requestData["discussionId"] = discussionId;
    } else {
      requestData["innerObjId"] = discussionId;
      requestData["type"] = type;
      requestData["discussionId"] = (_c = this.discussionData) === null || _c === void 0 ? void 0 : _c._id;
    }

    if (this.storage.isLoggednIn()) {
      this.api.post('likedicussion', requestData).subscribe(function (res) {
        //console.log(res, 'api response');
        if (res.status) {} else {
          _this.api.alert('Api Error', 'error');
        }
      });
    } else {
      this.router.navigate(['/login/student']);
    }
  };

  SeparateDiscussionsComponent.prototype.deleteItem = function (id) {
    this.__Id = id;
    this.showDeleteModal = true;
  };

  SeparateDiscussionsComponent.prototype.hideDeleteModal = function () {
    this.showDeleteModal = false;
  };

  SeparateDiscussionsComponent.prototype.deleteProgrammsDetails = function () {
    var _this = this;

    var _a;

    var requestData = {};
    requestData["discussionId"] = (_a = this.discussionData) === null || _a === void 0 ? void 0 : _a._id;
    requestData["dicussionReplyId"] = this.__Id;
    this.showDeleteModal = false;
    this.api.post("deletedicussion", requestData).subscribe(function (res) {
      if (res.status == true) {
        _this.getReplyData(); // this.programData = this.programData.filter((item: any) => {
        //   return item.id !== this.__Id;
        // })

      } //console.log(res, 'delete reply response');

    }); // this.showDeleteModal = false;
  };

  SeparateDiscussionsComponent.prototype.onFileChange1 = function (event, id) {
    var _this = this;

    this.myFiles1 = [];
    this.images1 = []; //console.log('this.images selected', id);

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles1.push(event.target.files[i]);
      var reader = new FileReader();

      reader.onload = function (event) {
        _this.images1.push(event.target.result);

        for (var i_1 = 0; i_1 < _this.discussionData.discussionreply.length; i_1++) {
          if (_this.discussionData.discussionreply[i_1]._id === id) {
            _this.discussionData.discussionreply[i_1].selected = true; // this.favadded = false;
          }
        }
      }; //console.log('this images selected.........', this.images1);


      reader.readAsDataURL(event.target.files[i]);
    }
  };

  SeparateDiscussionsComponent.prototype.deleteImage1 = function (i) {
    //console.log(i);
    this.index = i;
    this.images1.splice(i, 1);
    this.myFiles1.splice(i, 1);
    document.getElementById("upLoader" + i).value = '';
  };

  SeparateDiscussionsComponent.prototype.onFileChange = function (event) {
    var _this = this;

    this.images = [];

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader(); //console.log(this.images);

      reader.onload = function (event) {
        _this.images.push(event.target.result);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  SeparateDiscussionsComponent.prototype.openModal = function (image) {
    this.pipupImage = image;
    document.getElementById('imgModal').style.display = "block";
  };

  SeparateDiscussionsComponent.prototype.closeModal = function () {
    document.getElementById('imgModal').style.display = "none";
  };

  SeparateDiscussionsComponent.prototype.deleteImage = function (i) {
    //console.log(i);
    this.index = i;
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
    document.getElementById("upLoader" + i).value = '';
  };

  SeparateDiscussionsComponent.prototype.checkLoginorNot = function () {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  };

  SeparateDiscussionsComponent.prototype.getSectionofGroup = function () {
    var _this = this;

    this.api.get("groupdetailssection?groupsId=" + this.groupId).subscribe(function (res) {
      _this.sectionData = res.description; //console.log(_this.sectionData, "sectionData");
    });
  };

  SeparateDiscussionsComponent.prototype.getArticeDetails = function (id) {
    this.router.navigate(["/group/articles-details/" + id]);
  };

  SeparateDiscussionsComponent.prototype.getGroupDetails = function (id) {
    this.router.navigate(["/group/group-details/" + id]);
  };

  SeparateDiscussionsComponent.prototype.getEventsDetails = function (id) {
    this.router.navigate(["/group/event-details/" + id]);
  };

  SeparateDiscussionsComponent.prototype.getClassDetails = function (id) {
    var newId = atob(id);
    this.router.navigate(["/view/class-details/" + newId]);
  };

  SeparateDiscussionsComponent.prototype.getMarketPlaceDetails = function (id) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  };

  SeparateDiscussionsComponent.prototype.submitMainDiscussion = function (replieduserId) {
    var _this = this;

    if (this.submitMainDiscussionForm.value.description.length > 0) {
      this.issubmitBool = true; //console.log(this.submitMainDiscussionForm.value, 'form values');

      var formValue = this.submitMainDiscussionForm.value;
      var formData = new FormData();
      formData.append("description", formValue.description);
      formData.append("discussionId", this.discussionId);

      if (this.myFiles.length > 0) {
        for (var i = 0; i < this.myFiles.length; i++) {
          formData.append("image", this.myFiles[i]);
        }
      }

      if (this.myFiles1.length > 0) {
        for (var i = 0; i < this.myFiles1.length; i++) {
          formData.append("image", this.myFiles1[i]);
        }
      }

      if (formValue.description && formValue.description.trim() !== '' || this.myFiles.length > 0 || this.myFiles1.length > 0) {
        if (replieduserId) {
          formData.append("replieduserId", replieduserId);
          var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
          });
          this.http.post(this.API_URL + "replydiscussion", formData, {
            headers: headers
          }).subscribe(function (res) {
            //console.log(res);
            _this.discussionData = res.data;
            _this.issubmitBool = false;

            if (res.status == true) {
              _this.images1 = [];
              _this.images = [];
              _this.myFiles = [];
              _this.myFiles1 = [];

              _this.submitMainDiscussionForm.reset();

              _this.getReplyData(); // this.router.navigate(["pages/business-profile"]);

            } else {
              _this.api.alert(res.message, "error");

              _this.issubmitBool = false;
            }
          });
        } else {
          var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
          });
          this.http.post(this.API_URL + "replydiscussion", formData, {
            headers: headers
          }).subscribe(function (res) {
            //console.log(res);
            _this.discussionData = res.data;
            _this.issubmitBool = false;

            if (res.status == true) {
              _this.images = [];
              _this.myFiles = [];

              _this.submitMainDiscussionForm.reset();

              _this.getReplyData(); // this.router.navigate(["pages/business-profile"]);

            } else {
              _this.api.alert(res.message, "error");

              _this.issubmitBool = false;
            }
          });
        }
      } else {
        this.submitMainDiscussionForm.markAllAsTouched();
        this.issubmitBool = false;
      }
    } else {}
  };

  SeparateDiscussionsComponent = __decorate([core_1.Component({
    selector: 'app-separate-discussions',
    templateUrl: './separate-discussions.component.html',
    styleUrls: ['./separate-discussions.component.scss']
  })], SeparateDiscussionsComponent);
  return SeparateDiscussionsComponent;
}();

exports.SeparateDiscussionsComponent = SeparateDiscussionsComponent;