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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
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
exports.BusinessDetailsComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var http_1 = require("@angular/common/http");

var environment_1 = require("src/environments/environment");

var mat_select_autocomplete_1 = require("mat-select-autocomplete");

var BusinessDetailsComponent =
/** @class */
function () {
  function BusinessDetailsComponent(router, storage, event, api, http, fb) {
    var _this = this;

    var _a, _b;

    this.router = router;
    this.storage = storage;
    this.event = event;
    this.api = api;
    this.http = http;
    this.fb = fb;
    this.myFiles = [];
    this.images = [];
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
    this.optionsLevels = [];
    this.showErrorLevels = false;
    this.errorMessageLevels = "";
    this.selectedOptionsLevels = [];
    this.selectedLevel = this.selectedOptionsLevels;
    this.optionsGroups = [];
    this.showErrorGroups = false;
    this.errorMessageGroups = "";
    this.selectedOptionsGroups = [];
    this.selectedGroups = this.selectedOptionsGroups;
    this.alltags = [];
    this.data = [];
    this.classImages = [];
    this.SubcategoryData = [];
    this.imagesDefault = [];
    this.imagesMutating = [];
    this.displayCategories = [];
    this.subadminPermission = true;
    this.newTagsArray = [];
    this.Data = [{
      name: 'On-Line',
      value: 'Online',
      checkedSiteType: false
    }, {
      name: 'In-Person',
      value: 'Face to Face',
      checkedSiteType: false
    }];
    this.allGroups = [];
    this.selectsFrom = [{
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
    }];
    this.selectsTo = [{
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
    }];
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
    this.allLevels = [];
    this.selectnotApplicable = true;
    this.selectedList = [];
    this.selectnew = true;
    this.alllevelId = [];
    this.searchTerm = '';
    this.filterdOptions = [];
    this.allSelected = true;
    this.allselectedArray = [];
    this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype');
    this.levelId = localStorage.getItem('level'); // this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    //console.log(this.diabledFeilds)

    if (this.adminType == "admin") {
      this.diabledFeilds = false;
      this.editorConfig.editable = true;
      this.api.getBusineesdetails().subscribe(function (res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;

        _this.classdetails = res.results[1].classDetails[0]; // this.allselectedArray = this.classdetails?.level;

        _this.email = (_a = _this.classdetails) === null || _a === void 0 ? void 0 : _a.email;
        _this.classId = (_b = _this.classdetails) === null || _b === void 0 ? void 0 : _b._id;
        _this.headerClass = (_c = _this.classdetails) === null || _c === void 0 ? void 0 : _c.businessName;
        _this["class"] = (_d = _this.classdetails) === null || _d === void 0 ? void 0 : _d.businessName;
        _this.mobileNo = (_e = _this.classdetails) === null || _e === void 0 ? void 0 : _e.mobileNo;
        _this.webaddress = (_f = _this.classdetails) === null || _f === void 0 ? void 0 : _f.webAddress;
        _this.imagesDefault = (_g = _this.classdetails) === null || _g === void 0 ? void 0 : _g.image.slice();
        _this.selectedOptions = (_h = _this.classdetails) === null || _h === void 0 ? void 0 : _h.tags;

        _this.Data.map(function (item, index) {
          _this.classdetails.sitetype.forEach(function (element) {
            if (item.value == element) {
              _this.Data[index].checkedSiteType = true; // this.myForm.controls.checkArray.setValue(item.value);

              var checkArray = _this.myForm.get('checkArray');

              checkArray.push(new forms_1.FormControl(item.value));
            }
          });
        });

        _this.selectedOptionsCategories = (_j = _this.classdetails) === null || _j === void 0 ? void 0 : _j.businesssubCategory;
        _this.selectedOptionsGroups = (_k = _this.classdetails) === null || _k === void 0 ? void 0 : _k.groupId;

        if (((_l = _this.classdetails) === null || _l === void 0 ? void 0 : _l.level.toString()) === '63242085ed6ecd6708d14352' || _this.levelId === '63242085ed6ecd6708d14352') {
          _this.selectedOptionsLevels = [];
          _this.selectedOptionsLevels = ['63242085ed6ecd6708d14352'];
          _this.selectnew = true;
          _this.selectnotApplicable = false;
          _this.allSelected = false;
        } else if (((_m = _this.classdetails) === null || _m === void 0 ? void 0 : _m.level.toString()) === '') {
          _this.selectnew = true;
          _this.selectnotApplicable = true;
          _this.allSelected = true;
          _this.selectedOptionsLevels = [];
        } else {
          _this.selectedOptionsLevels = (_o = _this.classdetails) === null || _o === void 0 ? void 0 : _o.level;
          _this.selectnew = false;
          _this.selectnotApplicable = true;

          if (_this.allLevels.length - 1 === _this.selectedOptionsLevels.length) {
            _this.allSelected = false;
          }
        } // //console.log(this.classdetails?.level.toString(), 'this.classdetails?.level1');


        _this.specificFromAge = (_p = _this.classdetails) === null || _p === void 0 ? void 0 : _p.agefrom;
        _this.specificToAge = (_q = _this.classdetails) === null || _q === void 0 ? void 0 : _q.ageto;
        _this.editorData = (_r = _this.classdetails) === null || _r === void 0 ? void 0 : _r.aboutBusiness;
      });
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
      this.editorConfig.editable = false;
      this.api.getBusinessBranchDetails().subscribe(function (res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r; //console.log(res, "getBusinessBranchDetails");


        _this.classdetails = res.results[1].classDetails[0]; // this.allselectedArray = this.classdetails?.level;

        _this.email = (_a = _this.classdetails) === null || _a === void 0 ? void 0 : _a.email;
        _this.classId = (_b = _this.classdetails) === null || _b === void 0 ? void 0 : _b._id;
        _this.headerClass = (_c = _this.classdetails) === null || _c === void 0 ? void 0 : _c.businessName;
        _this["class"] = (_d = _this.classdetails) === null || _d === void 0 ? void 0 : _d.businessName;
        _this.mobileNo = (_e = _this.classdetails) === null || _e === void 0 ? void 0 : _e.mobileNo;
        _this.webaddress = (_f = _this.classdetails) === null || _f === void 0 ? void 0 : _f.webAddress;
        _this.imagesDefault = (_g = _this.classdetails) === null || _g === void 0 ? void 0 : _g.image.slice();
        _this.selectedOptions = (_h = _this.classdetails) === null || _h === void 0 ? void 0 : _h.tags;

        _this.Data.map(function (item, index) {
          _this.classdetails.sitetype.forEach(function (element) {
            if (item.value == element) {
              _this.Data[index].checkedSiteType = true; // this.myForm.controls.checkArray.setValue(item.value);

              var checkArray = _this.myForm.get('checkArray');

              checkArray.push(new forms_1.FormControl(item.value));
            }
          });
        });

        _this.selectedOptionsCategories = (_j = _this.classdetails) === null || _j === void 0 ? void 0 : _j.businesssubCategory;
        _this.selectedOptionsGroups = (_k = _this.classdetails) === null || _k === void 0 ? void 0 : _k.groupId;

        if (((_l = _this.classdetails) === null || _l === void 0 ? void 0 : _l.level.toString()) === '63242085ed6ecd6708d14352' || _this.levelId === '63242085ed6ecd6708d14352') {
          _this.selectedOptionsLevels = [];
          _this.selectedOptionsLevels = ['63242085ed6ecd6708d14352'];
          _this.selectnew = true;
          _this.selectnotApplicable = false;
          _this.allSelected = false;
        } else if (((_m = _this.classdetails) === null || _m === void 0 ? void 0 : _m.level.toString()) === '') {
          _this.selectnew = true;
          _this.selectnotApplicable = true;
          _this.allSelected = true;
          _this.selectedOptionsLevels = [];
        } else {
          _this.selectedOptionsLevels = (_o = _this.classdetails) === null || _o === void 0 ? void 0 : _o.level;
          _this.selectnew = false;
          _this.selectnotApplicable = true;

          if (_this.allLevels.length - 1 === _this.selectedOptionsLevels.length) {
            _this.allSelected = false;
          }
        }

        _this.specificFromAge = (_p = _this.classdetails) === null || _p === void 0 ? void 0 : _p.agefrom;
        _this.specificToAge = (_q = _this.classdetails) === null || _q === void 0 ? void 0 : _q.ageto;
        _this.editorData = (_r = _this.classdetails) === null || _r === void 0 ? void 0 : _r.aboutBusiness;
      });
    } else {
      this.api.getBusineesdetails().subscribe(function (res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;

        _this.classdetails = res.results[1].classDetails[0]; // this.allselectedArray = this.classdetails?.level;

        _this.email = (_a = _this.classdetails) === null || _a === void 0 ? void 0 : _a.email;
        _this.classId = (_b = _this.classdetails) === null || _b === void 0 ? void 0 : _b._id;
        _this.headerClass = (_c = _this.classdetails) === null || _c === void 0 ? void 0 : _c.businessName;
        _this["class"] = (_d = _this.classdetails) === null || _d === void 0 ? void 0 : _d.businessName;
        _this.mobileNo = (_e = _this.classdetails) === null || _e === void 0 ? void 0 : _e.mobileNo;
        _this.webaddress = (_f = _this.classdetails) === null || _f === void 0 ? void 0 : _f.webAddress;
        _this.imagesDefault = (_g = _this.classdetails) === null || _g === void 0 ? void 0 : _g.image.slice();
        _this.selectedOptions = (_h = _this.classdetails) === null || _h === void 0 ? void 0 : _h.tags;

        _this.Data.map(function (item, index) {
          _this.classdetails.sitetype.forEach(function (element) {
            if (item.value == element) {
              _this.Data[index].checkedSiteType = true; // this.myForm.controls.checkArray.setValue(item.value);

              var checkArray = _this.myForm.get('checkArray');

              checkArray.push(new forms_1.FormControl(item.value));
            }
          });
        });

        _this.selectedOptionsCategories = (_j = _this.classdetails) === null || _j === void 0 ? void 0 : _j.businesssubCategory;
        _this.selectedOptionsGroups = (_k = _this.classdetails) === null || _k === void 0 ? void 0 : _k.groupId;

        if (((_l = _this.classdetails) === null || _l === void 0 ? void 0 : _l.level.toString()) === '63242085ed6ecd6708d14352' || _this.levelId === '63242085ed6ecd6708d14352') {
          _this.selectedOptionsLevels = [];
          _this.selectedOptionsLevels = ['63242085ed6ecd6708d14352'];
          _this.selectnew = true;
          _this.selectnotApplicable = false;
          _this.allSelected = false;
        } else if (((_m = _this.classdetails) === null || _m === void 0 ? void 0 : _m.level.toString()) === '') {
          _this.selectnew = true;
          _this.selectnotApplicable = true;
          _this.allSelected = true;
          _this.selectedOptionsLevels = [];
        } else {
          _this.selectedOptionsLevels = (_o = _this.classdetails) === null || _o === void 0 ? void 0 : _o.level;
          _this.selectnew = false;
          _this.selectnotApplicable = true;

          if (_this.allLevels.length - 1 === _this.selectedOptionsLevels.length) {
            _this.allSelected = false;
          }
        }

        _this.specificFromAge = (_p = _this.classdetails) === null || _p === void 0 ? void 0 : _p.agefrom;
        _this.specificToAge = (_q = _this.classdetails) === null || _q === void 0 ? void 0 : _q.ageto;
        _this.editorData = (_r = _this.classdetails) === null || _r === void 0 ? void 0 : _r.aboutBusiness;
      });
    }

    this.agefromselect = this.selectsFrom;
    this.agetoselect = this.selectsTo;

    if (((_a = this.classdetails) === null || _a === void 0 ? void 0 : _a.level.toString()) === '63242085ed6ecd6708d14352' || this.levelId === '63242085ed6ecd6708d14352') {
      this.selectnew = true;
      this.selectnotApplicable = false;
      this.allSelected = false;
    } else if (((_b = this.classdetails) === null || _b === void 0 ? void 0 : _b.level.toString()) === '') {
      this.selectnew = true;
      this.selectnotApplicable = true;
      this.allSelected = true;
      this.selectedOptionsLevels = [];
    } else {
      this.selectnew = false;
      this.selectnotApplicable = true;
    }
  }

  BusinessDetailsComponent.prototype.ngOnInit = function () {
    var _a;

    return __awaiter(this, void 0, Promise, function () {
      var _this = this;

      return __generator(this, function (_b) {
        this.api.getInfoSection().subscribe(function (res) {
          _this.allinfodata = res.sectionData;
        });
        this.getlevelgroup();
        this.getTags();
        this.getsubcategory(); // this.getGroups();

        this.formInit();
        this.getInfoText();

        if (((_a = this.classdetails) === null || _a === void 0 ? void 0 : _a.level.length) <= 0) {
          this.selectnew = true;
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  BusinessDetailsComponent.prototype.getInfoText = function () {
    var _this = this;

    this.api.getInfoSection().subscribe(function (res) {
      var _a;

      _this.infoTextData = (_a = res === null || res === void 0 ? void 0 : res.sectionData[3]) === null || _a === void 0 ? void 0 : _a.description;
    });
  };

  BusinessDetailsComponent.prototype.selectFromAge = function (event) {
    //console.log(event)
    this.agetoselect = this.selectsTo.filter(function (item) {
      return item.value >= event;
    });
    this.agefrom = event;
  };

  BusinessDetailsComponent.prototype.selectToAge = function (event) {
    this.ageto = event;
  };

  BusinessDetailsComponent.prototype.formInit = function () {
    this.myForm = new forms_1.FormGroup({
      file: new forms_1.FormControl(''),
      "class": new forms_1.FormControl(this["class"], forms_1.Validators.required),
      Selected: new forms_1.FormControl([], forms_1.Validators.required),
      SelectedCategories: new forms_1.FormControl([], forms_1.Validators.required),
      // selectedgroup: new FormControl([], Validators.required),
      selectedlevel: new forms_1.FormControl([], forms_1.Validators.required),
      checkArray: this.fb.array([], [forms_1.Validators.required]),
      aboutclass: new forms_1.FormControl(this.editorData, {
        validators: [forms_1.Validators.required]
      }),
      Website: new forms_1.FormControl(this.webaddress)
    });
  };

  BusinessDetailsComponent.prototype.onCheckboxChange = function (e) {
    var checkArray = this.myForm.get('checkArray');

    if (e.target.checked) {
      checkArray.push(new forms_1.FormControl(e.target.value));
    } else {
      var i_1 = 0;
      checkArray.controls.forEach(function (item) {
        if (item.value == e.target.value) {
          checkArray.removeAt(i_1);
          return;
        }

        i_1++;
      });
    }
  }; // getLocation = async () =>
  // new Promise<void>((resolve, reject) => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: any) => {
  //       this.lat2 = position.coords.latitude;
  //       this.lng2 = position.coords.longitude;
  //       //console.log(this.lat2 , this.lng2);
  //       resolve();
  //     });
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //     reject();
  //   }
  // });


  BusinessDetailsComponent.prototype.onToggleDropdown = function () {
    this.multiSelect.toggleDropdown();
  };

  BusinessDetailsComponent.prototype.getSelectedOptions = function (selected) {
    this.selected = selected;
  };

  BusinessDetailsComponent.prototype.getSelectedOptionsCategories = function (selectedCategories) {
    this.selectedCategories = selectedCategories;
  };

  BusinessDetailsComponent.prototype.onResetSelection = function () {
    this.selectedOptions = [];
  };

  BusinessDetailsComponent.prototype.onResetSelectionCategories = function () {
    this.selectedOptionsCategories = [];
  }; // getSelectedgroupOptions(selected) {
  //   this.selectedgroup = selected;
  // }


  BusinessDetailsComponent.prototype.getSelectedlevelOptions = function (selected) {
    var _this = this; //console.log(selected, 'selected');


    this.selectedlevel = selected; //console.log(this.selectedlevel, 'level');

    this.allSelected = true;

    if (this.selectedlevel.toString() === '63242085ed6ecd6708d14352') {
      this.allSelected = false;
      localStorage.setItem("level", '63242085ed6ecd6708d14352');
      this.selectnotApplicable = false;
      this.selectnew = true;
      this.optionsLevels.forEach(function (element) {
        _this.alllevelId.push(element._id);
      });
    } else {
      this.selectnotApplicable = true; // this.allSelected = true;

      this.selectnew = false;
      localStorage.removeItem("level");
    }

    if (this.selectedlevel.length == 0) {
      this.selectnotApplicable = true;
      this.selectnew = true;
    }
  };

  BusinessDetailsComponent.prototype.onKeySearchLevel = function (value) {
    this.optionsLevels = this.searchbylevel(value);
  };

  BusinessDetailsComponent.prototype.searchbylevel = function (value) {
    if (value && value.trim() !== '' && value.length > 0) {
      return this.allLevels.filter(function (level) {
        return level.level.toLowerCase().startsWith(value.toLowerCase());
      });
    } else {
      return this.allLevels;
    }
  }; //   searchByTags(): void {
  //     let term = this.searchArticles;
  //     this.filterdOptions = this.optionsLevels.filter(item => item.value.toLowerCase().includes(term.toLowerCase())
  //     );
  //   //  this.optionsLevels = this.filterdOptions ;
  // console.log(this.filterdOptions);
  //   }
  // getGroups() {
  //   this.api.get('getgroups').subscribe((res: any) => {
  //     console.log(res, "res")
  //     this.allGroups = res.data;
  //     this.allGroups.forEach((element) => {
  //       this.optionsGroups.push({
  //         value: element._id,
  //         display: element.groups,
  //       });
  //     });
  //   });
  // }


  BusinessDetailsComponent.prototype.getlevelgroup = function () {
    var _this = this;

    this.api.get('getlevelgroup').subscribe(function (res) {
      _this.allLevels = res.levelData; //console.log(this.allLevels, 'allLevels');
      // for (let i = 0; i < this.allLevels.length; i++) {
      //  if(this.allLevels[i].level.toString() === 'Not applicable'){
      //     this.optionsLevels.push({
      //       value: this.allLevels[i]._id,
      //       display: this.allLevels[i].level.toString(),
      //     }); 
      //   }
      // }

      _this.allLevels = res.levelData.sort(function (a, b) {
        return a.level.toLowerCase().localeCompare(b.level.toLowerCase());
      });

      _this.allLevels.forEach(function (element) {
        if (element.level !== 'Not Applicable') {
          _this.optionsLevels.push(element);

          _this.allselectedArray.push(element._id); // this.optionsLevels.push({
          //   value: element._id,
          //   display: element.level.toString(),
          // });

        }
      });
    });
  };

  BusinessDetailsComponent.prototype.getsubcategory = function () {
    var _this = this;

    this.api.get("getsubcategory?type=homepage").subscribe(function (res) {
      _this.SubcategoryData = res.SubcategoryData;

      _this.SubcategoryData.forEach(function (element) {
        _this.optionsCategories.push({
          value: element._id,
          display: element.subCategory
        });
      });
    });
  };

  BusinessDetailsComponent.prototype.getTags = function () {
    var _this = this;

    this.api.get('gettag').subscribe(function (res) {
      _this.alltags = res.tagData;

      _this.alltags.forEach(function (element) {
        _this.options.push({
          value: element.tags,
          display: element.tags
        });
      });
    });
  };

  BusinessDetailsComponent.prototype.selectAll = function () {
    this.selectedOptionsLevels = [];
    this.selectnew = false;
    this.selectedOptionsLevels = this.allselectedArray;
    this.allSelected = false;
    localStorage.removeItem("level"); //console.log(this.selectedOptionsLevels, 'this.selectedOptionsLevels');
  };

  BusinessDetailsComponent.prototype.unselectAll = function () {
    this.selectnew = true;
    this.allSelected = true;
    this.selectnew = true;
    this.selectnotApplicable = true;
    this.selectedOptionsLevels = [];
  };

  BusinessDetailsComponent.prototype.clearSearch = function () {
    //console.log('clicked')
    this.searchKey = '';
    this.onKeySearchLevel('');
    this.searchbylevel('');
  };

  BusinessDetailsComponent.prototype.onFileChange = function (event) {
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

  BusinessDetailsComponent.prototype.deleteImage = function (i) {
    //console.log(i);
    this.index = i;
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
    document.getElementById("upLoader" + i).value = '';
  };

  BusinessDetailsComponent.prototype.deleteEditImage = function (i) {
    //console.log(i);
    this.index = i; //console.log(this.imagesDefault.splice(i, 1));

    document.getElementById("upLoader" + i).value = '';
  };

  BusinessDetailsComponent.prototype.editbusinessInformation = function () {
    var _this = this;

    var formValue = this.myForm.value;
    var formData = new FormData(); // const data = [];

    this.displayCategories = formValue.SelectedCategories.forEach(function (item) {
      _this.optionsCategories.forEach(function (element) {
        if (element.value == item) {
          _this.data.push(element.display);
        }
      });
    }); // console.log(this.data, "::::::")
    // console.log(this.displayCategories,"this.displayCategories");
    // console.log(this.myForm.valid);

    if (this.imagesDefault.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else {
      this.myForm.get('file').setValidators([forms_1.Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    }

    formData.append("tags", this.selected ? __spreadArrays(formValue.Selected).join(",") : __spreadArrays(this.selected).join(","));
    formData.append("businesssubCategory", this.selectedCategories ? __spreadArrays(formValue.SelectedCategories).join(",") : __spreadArrays(this.selectedCategories).join(","));

    if (this.selectedLevel.toString() === '63242085ed6ecd6708d14352' || this.selectedOptionsLevels.toString() === '63242085ed6ecd6708d14352') {
      formData.append("level", this.selectedlevel ? __spreadArrays(this.alllevelId).join(",") : __spreadArrays(this.selectedOptionsLevels).join(","));
    } else {
      formData.append("level", this.selectedlevel ? __spreadArrays(formValue.selectedlevel).join(",") : __spreadArrays(this.selectedOptionsLevels).join(","));
    } // formData.append("groupsId", this.selectedgroup ? [...formValue.selectedgroup].join(",") : [...this.selectedgroup].join(","));


    formData.append("groupsId", '6322d831c34c98a9bb49dff8');
    formData.append("classId", this.classId);
    formData.append("sitetype", formValue.checkArray.join(','));
    formData.append("businessName", formValue["class"]);
    formData.append("aboutBusiness", formValue.aboutclass);

    if (this.agefrom) {
      formData.append("agefrom", this.agefrom);
    } else if (this.specificFromAge) {
      formData.append("agefrom", this.specificFromAge);
    } else {
      formData.append("agefrom", '1');
    }

    if (this.ageto) {
      formData.append("ageto", this.ageto);
    } else if (this.specificToAge) {
      formData.append("ageto", this.specificToAge);
    } else {
      formData.append("ageto", '18');
    }

    formData.append("webAddress", formValue.Website); // formData.append("email", formValue?.email);

    formData.append("groupsName", [this.selected ? __spreadArrays(formValue.Selected) : __spreadArrays(this.selected), this.selectedCategories ? __spreadArrays(this.data) : __spreadArrays(this.selectedCategories), formValue["class"]].join(","));

    if (this.myForm.valid) {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("images", this.myFiles[i]);
      }

      for (var i = 0; i < this.imagesDefault.length; i++) {
        formData.append("image", this.imagesDefault[i]);
      } // console.log(this.imagesDefault, this.myFiles)


      var headers = new http_1.HttpHeaders({
        Authorization: localStorage.getItem("LoggedIn")
      });
      this.http.post(this.API_URL + "editclass", formData, {
        headers: headers
      }).subscribe(function (res) {
        //console.log(res)
        if (res.status == true) {
          _this.router.navigate(["pages/business-profile"]);
        } else {
          _this.api.alert(res.message, "error");
        }
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  };

  __decorate([core_1.ViewChild("fruitInput")], BusinessDetailsComponent.prototype, "fruitInput");

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], BusinessDetailsComponent.prototype, "multiSelect");

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], BusinessDetailsComponent.prototype, "multiSelectCategories");

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], BusinessDetailsComponent.prototype, "multiSelectLevels");

  __decorate([core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)], BusinessDetailsComponent.prototype, "multiSelectGroup");

  BusinessDetailsComponent = __decorate([core_1.Component({
    selector: "app-business-details",
    templateUrl: "./business-details.component.html",
    styleUrls: ["./business-details.component.scss"]
  })], BusinessDetailsComponent);
  return BusinessDetailsComponent;
}();

exports.BusinessDetailsComponent = BusinessDetailsComponent;