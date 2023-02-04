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
exports.ClassDetailsComponent = void 0;

var core_1 = require("@angular/core");

var ClassDetailsComponent =
/** @class */
function () {
  function ClassDetailsComponent(api, router, route, storage) {
    var _this = this;

    this.api = api;
    this.router = router;
    this.route = route;
    this.storage = storage;
    this.panelOpenState = false;
    this.branchName = [];
    this.branchDetails = [];
    this.sectionData = [];
    this.sections = [];
    this.hideclass = true;
    this.allreviews = [];
    this.stars = [1, 2, 3, 4, 5];
    this.showAddreview = true;
    this.replyBox = false;
    this.showreplyReview = false;
    this.favItem = false;
    this.ischatButton = true;
    this.isHidden = true;
    this.customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: true,
      navSpeed: 700,
      //autoplayTimeout:2000,
      //autoplaySpeed: 1500,
      navText: ["", ""],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: false
    };
    this.customOptions2 = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: true,
      navSpeed: 700,
      //autoplayTimeout:2000,
      //autoplaySpeed: 1500,
      navText: ["", ""],
      responsive: {
        0: {
          items: 2
        },
        400: {
          items: 3
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: false
    };
    this.route.params.subscribe(function (params) {
      _this.id = params["id"];

      _this.getbranchListing();
    });
  }

  ClassDetailsComponent.prototype.ngOnInit = function () {
    var userData = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userData === null || userData === void 0 ? void 0 : userData._id;

    if ((userData === null || userData === void 0 ? void 0 : userData.type) !== "student") {
      var classData = JSON.parse(localStorage.getItem('classData'));

      if ((classData === null || classData === void 0 ? void 0 : classData._id) === this.id) {
        this.showAddreview = false;
      }
    }

    this.getSection();
    this.getallClassDetails();
    this.getAllreview();
  };

  ClassDetailsComponent.prototype.getSection = function () {
    var _this = this;

    this.api.get("classdetailsection?classId=" + this.id).subscribe(function (res) {
      _this.sectionData = res.description;
      //console.log("sectiondata", _this.sectionData);

      _this.sectionData.forEach(function (item) {
        _this.sections.push({
          sectionname: item.sectionname,
          title: item.title,
          sectionValue: item.section
        });
      });

      //console.log("section", _this.sections);
    });
  };

  ClassDetailsComponent.prototype.getWishlist = function () {
    var _this = this;

    var userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=classes').subscribe(function (res) {
      var _a, _b, _c;

      //console.log(res.wishlistedData);
      _this.wishlisteddata = res.wishlistedData;

      for (var i = 0; i < _this.wishlisteddata.length; i++) {
        if (((_a = _this.wishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
          if (((_b = _this.allClassDetails) === null || _b === void 0 ? void 0 : _b._id) === ((_c = _this.wishlisteddata[i]) === null || _c === void 0 ? void 0 : _c.wishlistedId)) {
            _this.favItem = true;
          }
        } else {
          _this.favItem = false;
        }
      }
    });
  };

  ClassDetailsComponent.prototype.addtoClassWishList = function (classId) {
    var _this = this;

    var requestData = {};
    requestData["type"] = 'classes';
    requestData["wishlistedId"] = classId;

    if (this.storage.isLoggednIn()) {
      this.api.post('addwishlist', requestData).subscribe(function (res) {
        var favAdded = res.message;

        if (favAdded === "Added to your wishlist successfully") {
          _this.favItem = true;

          _this.api.alert('Added to your Shortlist', 'success');
        } else {
          _this.favItem = false; // this.api.alert('Remove to wishlist', 'error');
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ClassDetailsComponent.prototype.deleteClassWishlist = function (classId) {
    var _this = this;

    var requestData = {};
    requestData["wishlistedId"] = classId;

    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
        var favAdded = res.message;

        if (favAdded === "Your wishlisted Item removed successfully") {
          _this.favItem = false;

          _this.api.alert('Removed to wishlist', 'success');
        } else {
          _this.favItem = true; // this.api.alert('Remove to wishlist', 'error');
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ClassDetailsComponent.prototype.searchData = function (value) {
    this.router.navigate(['view/class-list/' + this.id + '/' + value]);
    //console.log('tags', value);
  };

  ClassDetailsComponent.prototype.countStar = function (star) {
    this.selectedValue = star;
  };

  ClassDetailsComponent.prototype.reviewReply = function (id) {
    this.replyBox = !this.replyBox;
    this.reveiewId = id;
    this.showreplyReview = !this.showreplyReview;
  };

  ClassDetailsComponent.prototype.getallClassDetails = function () {
    var _this = this;

    this.isHidden = false;
    this.api.get("classDetails?classId=" + this.id + '&branchId=' + this.branchID).subscribe(function (res) {
      var _a;

      _this.allData = res;
      _this.allClassDetails = res.classData;
      _this.classuserId = (_a = _this.allClassDetails) === null || _a === void 0 ? void 0 : _a.admin_id;
      _this.classdataSize = Object.keys(_this.allClassDetails).length;

      if (_this.userId === _this.classuserId) {
        _this.ischatButton = true;
      } else {
        _this.ischatButton = false;
      }

      if (_this.storage.isLoggednIn()) {
        _this.getWishlist();
      }
    });
  };

  ClassDetailsComponent.prototype.chatToBusiness = function () {
    var classId = 'classId';

    if (this.branchAdminEmail && this.classdataSize > 0) {
      this.router.navigate(["/pages/chat/" + this.branchID]);
    } else if (this.classdataSize > 0) {
      this.router.navigate(["/pages/chat/" + this.classuserId]);
    } else {
      this.router.navigate(["/pages/chat/" + this.userId]);
    }
  };

  ClassDetailsComponent.prototype.getbranchListing = function () {
    var _this = this;

    this.api.get('branchlist?classId=' + this.id).subscribe(function (res) {
      _this.branchDetails = res.branchData;
      //console.log(_this.branchDetails);
      _this.branchID = _this.branchDetails[0]._id;
      _this.branchname = _this.branchDetails[0].branchName;
      _this.address = _this.branchDetails[0].address1;
      _this.mobileNo = _this.branchDetails[0].businessmobileNo;
      _this.email = _this.branchDetails[0].businessemail;
      _this.branchAdminEmail = _this.branchDetails[0].email;
      _this.webAddress = _this.branchDetails[0].webAddress;
      _this.branchName = _this.branchDetails.map(function (item) {
        return {
          value: item.branchName,
          branchId: item._id
        };
      });

      _this.getallClassDetails();
    });
  };

  ClassDetailsComponent.prototype.selectBranch = function (event) {
    var _this = this;

    this.branchID = event;
    this.branchDetails.forEach(function (branch) {
      if (branch._id === event) {
        _this.branchname = branch === null || branch === void 0 ? void 0 : branch.name;
        _this.address = branch === null || branch === void 0 ? void 0 : branch.address1;
        _this.branchAdminEmail = branch === null || branch === void 0 ? void 0 : branch.email;
        _this.mobileNo = branch === null || branch === void 0 ? void 0 : branch.businessmobileNo;
        _this.email = branch === null || branch === void 0 ? void 0 : branch.businessemail;
        _this.webAddress = branch === null || branch === void 0 ? void 0 : branch.webAddress;
      }
    });
    //console.log(this.branchname);
    this.getallClassDetails();
  };

  ClassDetailsComponent.prototype.getAllreview = function () {
    var _this = this;

    this.api.get('getreview?classId=' + this.id).subscribe(function (res) {
      _this.allreviews = res.data;
    });
  };

  ClassDetailsComponent.prototype.showAboutClass = function () {
    this.hideclass = !this.hideclass;
  };

  ClassDetailsComponent.prototype.checkLoginorNot = function () {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  };

  ClassDetailsComponent.prototype.SendReply = function (id) {
    var _this = this;

    this.ReviewId = id;
    var requestdata = {};
    requestdata['reviewId'] = this.ReviewId;
    requestdata['replyreview'] = {
      review: this.replyvalue
    };
    this.api.post('replyreview', requestdata).subscribe(function (res) {
      if (res && res.status == true) {
        _this.replyvalue = '';

        _this.getAllreview();
      }

      _this.showreplyReview = true;
      _this.replyBox = false;
    });
  };

  ClassDetailsComponent.prototype.getArticeDetails = function (id) {
    this.router.navigate(["/group/articles-details/" + id]);
  };

  ClassDetailsComponent.prototype.getGroupDetails = function (id) {
    this.router.navigate(["/group/group-details/" + id]);
  };

  ClassDetailsComponent.prototype.getEventsDetails = function (id) {
    this.router.navigate(["/group/event-details/" + id]);
  };

  ClassDetailsComponent.prototype.getClassDetails = function (id) {
    this.router.navigate(["/group/class-details/" + id]);
  };

  ClassDetailsComponent.prototype.redirectToMarketplaceDetails = function (id) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  };

  ClassDetailsComponent.prototype.redirectToaddreview = function () {
    this.router.navigate(["/pages/add-review/" + this.id + '/' + this.branchname]);
  };

  __decorate([core_1.ViewChild('tabs', {
    "static": false
  })], ClassDetailsComponent.prototype, "tabs");

  ClassDetailsComponent = __decorate([core_1.Component({
    selector: "app-class-details",
    templateUrl: "./class-details.component.html",
    styleUrls: ["./class-details.component.scss"]
  })], ClassDetailsComponent);
  return ClassDetailsComponent;
}();

exports.ClassDetailsComponent = ClassDetailsComponent;