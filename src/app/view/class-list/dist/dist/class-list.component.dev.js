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
exports.ClassListComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var ClassListComponent =
/** @class */
function () {
  function ClassListComponent(api, router, route, storage) {
    var _this = this;

    this.api = api;
    this.router = router;
    this.route = route;
    this.storage = storage;
    this.classList = [];
    this.Classes = [];
    this.showtags = false;
    this.newclassList = [];
    this.wishlisteddata = [];
    this.selectsFrom = [{
      value: 2,
      name: 2
    }, {
      value: 3,
      name: 3
    }, {
      value: 4,
      name: 4
    }, {
      value: 5,
      name: 5
    }, {
      value: 6,
      name: 6
    }, {
      value: 7,
      name: 7
    }, {
      value: 8,
      name: 8
    }, {
      value: 9,
      name: 9
    }, {
      value: 10,
      name: 10
    }, {
      value: 11,
      name: 11
    }, {
      value: 12,
      name: 12
    }, {
      value: 13,
      name: 13
    }, {
      value: 14,
      name: 14
    }, {
      value: 15,
      name: 15
    }, {
      value: 16,
      name: 16
    }, {
      value: 17,
      name: 17
    }, {
      value: 18,
      name: 18
    }, {
      value: 19,
      name: 19
    }, {
      value: 20,
      name: 20
    }, {
      value: 21,
      name: 21
    }, {
      value: 22,
      name: 22
    }, {
      value: 23,
      name: 23
    }, {
      value: 24,
      name: 24
    }, {
      value: 25,
      name: 25
    }];
    this.selectsTo = [{
      value: 0,
      name: 0
    }, {
      value: 1,
      name: 1
    }, {
      value: 2,
      name: 2
    }, {
      value: 3,
      name: 3
    }, {
      value: 4,
      name: 4
    }, {
      value: 5,
      name: 5
    }, {
      value: 6,
      name: 6
    }, {
      value: 7,
      name: 7
    }, {
      value: 8,
      name: 8
    }, {
      value: 9,
      name: 9
    }, {
      value: 10,
      name: 10
    }, {
      value: 11,
      name: 11
    }, {
      value: 12,
      name: 12
    }, {
      value: 13,
      name: 13
    }, {
      value: 14,
      name: 14
    }, {
      value: 15,
      name: 15
    }, {
      value: 16,
      name: 16
    }, {
      value: 17,
      name: 17
    }, {
      value: 18,
      name: 18
    }, {
      value: 19,
      name: 19
    }, {
      value: 20,
      name: 20
    }, {
      value: 21,
      name: 21
    }, {
      value: 22,
      name: 22
    }, {
      value: 23,
      name: 23
    }, {
      value: 24,
      name: 24
    }, {
      value: 25,
      name: 25
    }, {
      value: 26,
      name: 26
    }];
    this.optionsLevels = [];
    this.selectedOptionsLevels = [];
    this.agefrom = 2;
    this.ageto = 26;
    this.levelId = [];
    this.types = 'all';
    this.allLevels = [];
    this.classSortingData = [];
    this.getClassesbytags();
    this.route.params.subscribe(function (params) {
      _this.id = params["id"];
      _this.tagvalue = params['value'];

      if (_this.tagvalue && _this.tagvalue.trim() !== '') {
        _this.showtags = true;

        _this.api.get("searchontype?type=classes&selectedName=" + _this.tagvalue).subscribe(function (res) {
          _this.classList = res.data;
          _this.newclassList = _this.classList;
        });
      } else {
        _this.showtags = false;

        _this.api.get("getclassonsubcategory?subcategoryId=" + _this.id).subscribe(function (res) {
          _this.classList = res.classData;
          _this.newclassList = _this.classList;
          //console.log(_this.classList, "getclassonsubcategory");

          _this.classList.forEach(function (element) {
            element.subcategory.forEach(function (data) {
              if (data._id === _this.id) {
                _this.subCategoryName = data.subCategory;
                _this.subCategoryId = data === null || data === void 0 ? void 0 : data._id;
                //console.log(element.subcategory);
              }
            });
          });

          _this.classSorting();
        });
      }
    });
  }

  ClassListComponent.prototype.ngOnInit = function () {
    if (this.storage.isLoggednIn()) {
      this.getWishlist();
    }

    this.formInit();
    this.getlevelgroup();
  };

  ClassListComponent.prototype.formInit = function () {
    this.myForm = new forms_1.FormGroup({
      selectedlevel: new forms_1.FormControl([])
    });
  };

  ClassListComponent.prototype.changesiteType = function () {
    this.classSorting();
  };

  ClassListComponent.prototype.getSelectedlevelOptions = function (selected) {
    this.selectedlevel = selected;
    this.levelId = this.selectedlevel;

    if (this.levelId.length > 0) {
      this.classSorting();
    }
  };

  ClassListComponent.prototype.getlevelgroup = function () {
    var _this = this;

    this.api.get('getlevelgroup').subscribe(function (res) {
      _this.allLevels = res.levelData;
      //console.log(res);

      _this.allLevels.forEach(function (element) {
        _this.optionsLevels.push({
          value: element._id,
          display: element.levelName.toString()
        });
      });
    });
  };

  ClassListComponent.prototype.selectFromAge = function (event) {
    //console.log(event);
    this.datefrom = event;
    this.selectsTo = this.selectsTo.filter(function (item) {
      return item.value > event;
    });
    this.agefrom = event;
    this.classSorting();
  };

  ClassListComponent.prototype.selectToAge = function (event) {
    //console.log(event);
    this.ageto = event;
    this.dateto = this.ageto;
    this.classSorting();
  };

  ClassListComponent.prototype.resetFilter = function () {
    this.types = 'all';
    this.agefrom = 2;
    this.ageto = 26;
  };

  ClassListComponent.prototype.classSorting = function () {
    var _this = this;

    var requestData = {};

    if (this.levelId.length > 0) {
      requestData['level'] = this.levelId.join(',');
    }

    if (this.agefrom && this.agefrom != null) {
      requestData['agefrom'] = this.agefrom;
    }

    if (this.ageto && this.ageto != null) {
      requestData['ageto'] = this.ageto;
    }

    if (this.types && this.types !== '') {
      requestData['type'] = this.types;
    }

    requestData['subcatId'] = this.subCategoryId;
    this.api.post('sortclasses', requestData).subscribe(function (res) {
      //console.log(res);
      _this.classSortingData = res.data;
      _this.newclassList = _this.classSortingData;
    });
  };

  ClassListComponent.prototype.getWishlist = function () {
    var _this = this;

    var userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=classes').subscribe(function (res) {
      var _a, _b;

      //console.log(res.wishlistedData);
      _this.wishlisteddata = res.wishlistedData;

      for (var i = 0; i < _this.wishlisteddata.length; i++) {
        if (((_a = _this.wishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
          for (var j = 0; j < _this.newclassList.length; j++) {
            if (((_b = _this.newclassList[j]) === null || _b === void 0 ? void 0 : _b._id) === _this.wishlisteddata[i].wishlistedId) {
              _this.newclassList[j].selected = true;
            }
          }
        }
      }
    });
  };

  ClassListComponent.prototype.addtoClassWishList = function (classId) {
    var _this = this;

    var requestData = {};
    requestData["type"] = 'classes';
    requestData["wishlistedId"] = classId;

    if (this.storage.isLoggednIn()) {
      this.api.post('addwishlist', requestData).subscribe(function (res) {
        var favAdded = res.message;

        for (var i = 0; i < _this.newclassList.length; i++) {
          if (favAdded === "Added to your wishlist successfully") {
            if (_this.newclassList[i]._id === classId) {
              _this.newclassList[i].selected = true;

              _this.api.alert('Added to your Shortlist', 'success');
            }
          } else {// this.newclassList[i].selected = false;
            // this.api.alert('Remove to wishlist', 'error');
          }
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ClassListComponent.prototype.deleteClassWishlist = function (classId) {
    var _this = this;

    var requestData = {};
    requestData["wishlistedId"] = classId;

    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
        var favAdded = res.message;

        for (var i = 0; i < _this.newclassList.length; i++) {
          if (favAdded === "Your wishlisted Item removed successfully") {
            if (_this.newclassList[i]._id === classId) {
              _this.newclassList[i].selected = false;

              _this.api.alert('Removed to wishlist', 'success');
            }
          } else {
            _this.newclassList[i].selected = true; // this.api.alert('Add to wishlist', 'error');
          }
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ClassListComponent.prototype.getClassesbytags = function () {
    var _this = this;

    if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=classes&selectedName=" + this.tagvalue + '&text=' + this.searchvalue).subscribe(function (res) {
        _this.newclassList = res.data;
        //console.log(_this.classList);
      });
    } else if (this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=classes&selectedName=" + this.subCategoryName + '&text=' + this.searchvalue).subscribe(function (res) {
        _this.newclassList = res.data;
        //console.log(_this.classList);
      });
    } else if (this.searchvalue === '') {
      this.newclassList = this.classList;
    }
  };

  ClassListComponent.prototype.getClassCategory = function (id) {
    this.router.navigate(["/view/class-details/" + id]);
  };

  ClassListComponent = __decorate([core_1.Component({
    selector: "app-class-list",
    templateUrl: "./class-list.component.html",
    styleUrls: ["./class-list.component.scss"]
  })], ClassListComponent);
  return ClassListComponent;
}();

exports.ClassListComponent = ClassListComponent;