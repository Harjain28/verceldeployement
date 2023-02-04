"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HomeSearchComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var HomeSearchComponent = /** @class */ (function () {
    function HomeSearchComponent(api, router, storage, event) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.event = event;
        this.allsearchdata = [];
        this.classData = [];
        this.groupsearchData = [];
        this.articlesData = [];
        this.eventsData = [];
        this.allLevels = [];
        this.showclassfilter = true;
        this.showeventfilter = true;
        this.showgroupfilter = true;
        this.showarticlefilter = true;
        this.optionsLevels = [];
        this.article = true;
        this.locations = true;
        this.selectedOptionsLevels = [];
        this.levelId = [];
        this.userAddress = '';
        this.userLatitude = '';
        this.userLongitude = '';
        this.filterTypefilter = false;
        this.isfunctionstart = false;
        this.startsearchfunction = true;
        this.newbool = false;
        this.selectnotApplicable = true;
        this.selectnew = true;
        this.allselectedArray = [];
        this.allSelected = true;
        this.options = {
            componentRestrictions: {
                country: ["SG"]
            }
        };
        this.selectsFrom = [
            { value: 1, name: 1 },
            { value: 2, name: 2 },
            { value: 3, name: 3 },
            { value: 4, name: 4 },
            { value: 5, name: 5 },
            { value: 6, name: 6 },
            { value: 7, name: 7 },
            { value: 8, name: 8 },
            { value: 9, name: 9 },
            { value: 10, name: 10 },
            { value: 11, name: 11 },
            { value: 12, name: 12 },
            { value: 13, name: 13 },
            { value: 14, name: 14 },
            { value: 15, name: 15 },
            { value: 16, name: 16 },
            { value: 17, name: 17 },
            { value: 18, name: 18 },
        ];
        this.selectsTo = [
            // { value: 0, name: 0 },
            { value: 1, name: 1 },
            { value: 2, name: 2 },
            { value: 3, name: 3 },
            { value: 4, name: 4 },
            { value: 5, name: 5 },
            { value: 6, name: 6 },
            { value: 7, name: 7 },
            { value: 8, name: 8 },
            { value: 9, name: 9 },
            { value: 10, name: 10 },
            { value: 11, name: 11 },
            { value: 12, name: 12 },
            { value: 13, name: 13 },
            { value: 14, name: 14 },
            { value: 15, name: 15 },
            { value: 16, name: 16 },
            { value: 17, name: 17 },
            { value: 18, name: 18 },
        ];
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            autoWidth: true,
            items: 6,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                740: {
                    items: 5
                },
                940: {
                    items: 6
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
            items: 4,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
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
        this.customOptions4 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
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
        this.customOptions5 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            items: 3,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ['', ''],
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
                },
                740: {
                    items: 2
                },
                940: {
                    items: 3
                }
            },
            nav: false
        };
        this.getLocation = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                _this.lat2 = position.coords.latitude;
                                _this.lng2 = position.coords.longitude;
                                //console.log(_this.lat2, _this.lng2);
                                resolve();
                            });
                        }
                        else {
                            alert('Geolocation is not supported by this browser.');
                            reject();
                        }
                    })];
            });
        }); };
        this.restEventSubscription = this.event.getResetEvent().subscribe(function () {
            _this.resetFilter();
        });
        this.formInit();
        this.agefromselect = this.selectsFrom;
        this.agetoselect = this.selectsTo;
        // this.types = this.event.searchType;
        setTimeout(function () {
            _this.event.getSearchdata().subscribe(function (data) {
                _this.searchKey = Object.values(data)[0];
                if (_this.event.checkVal) {
                    _this.classfilter = true;
                    // this.types = this.event.searchType;
                    _this.SearchALl();
                }
                else {
                    _this.SearchALl();
                    _this.filterTypefilter = false;
                    _this.isfunctionstart = true;
                    _this.classfilter = false;
                    _this.eventfilter = false;
                    _this.articlefilter = false;
                    _this.groupfilter = false;
                    _this.filterloc = true;
                    _this.locations = true;
                    _this.filternear = false;
                    _this.filterloc = false;
                    _this.groupfilter = false;
                    _this.articlefilter = false;
                    _this.article = true;
                    _this.showclassfilter = true;
                    _this.showeventfilter = true;
                    _this.showarticlefilter = true;
                    _this.filterTypefilter = false;
                    _this.showgroupfilter = true;
                    _this.datefrom = 1;
                    _this.dateto = 18;
                    _this.agefrom = '0';
                    _this.ageto = '0';
                    _this.types = 'all';
                    _this.levelId = [];
                    //  this.optionsLevels = [];
                    _this.selectedlevel = [];
                }
            });
        }, 10);
        if (this.event.checkVal) {
            this.checkSearchValue('class');
        }
        if (this.event.selectedLevelName.length > 0) {
            if (this.event.selectedLevelName.toString() === '63242085ed6ecd6708d14352') {
                this.selectnotApplicable = false;
                this.selectnew = true;
                this.allSelected = false;
                this.selectedOptionsLevels = this.event.selectedLevelName;
                this.levelId = this.event.NotApplicableArray;
                this.SearchALl();
            }
            else {
                this.selectnotApplicable = true;
                this.selectnew = false;
                this.allSelected = false;
                this.selectedOptionsLevels = this.event.selectedLevelName;
                this.levelId = this.event.selectedLevelName;
                this.SearchALl();
            }
        }
        else {
            this.allSelected = true;
            this.SearchALl();
        }
    }
    // @ViewChild('owlElement1', { static: true }) owlElement1: CarouselComponent;
    HomeSearchComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loginOrNot = localStorage.getItem("LoggedIn");
                        this.getlevelgroup();
                        return [4 /*yield*/, this.getLocation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //   setTimeout(() => {
    //     const anyService = this.owlElement1 as any;
    //     const carouselService = anyService.carouselService as CarouselService;
    //       carouselService.refresh();
    //       carouselService.update();
    //   }, 500);
    // }
    HomeSearchComponent.prototype.formInit = function () {
        this.myForm = new forms_1.FormGroup({
            selectedlevel: new forms_1.FormControl([])
        });
    };
    HomeSearchComponent.prototype.handleAddressChange = function (address, options) {
        var _this = this;
        this.userAddress = address.formatted_address;
        this.userLatitude = address.geometry.location.lat();
        this.userLongitude = address.geometry.location.lng();
        this.api.get('search?text=' + this.searchKey + '&type=location&lat=' + this.userLatitude + '&long=' + this.userLongitude).subscribe(function (res) {
            //console.log(res);
            if (res) {
                _this.classData = res.searchData[0].nearbyClass;
                _this.eventsData = res.searchData[0].nearbyevent;
                _this.articlesData = [];
                _this.groupsearchData = [];
            }
            else {
                _this.SearchALl();
            }
        });
    };
    HomeSearchComponent.prototype.getSelectedlevelOptions = function (selected) {
        this.selectedlevel = selected;
        this.event.selectedLevelSearch = [];
        if (selected.length !== 0) {
            if (this.selectedlevel.toString() === '63242085ed6ecd6708d14352') {
                this.selectnotApplicable = false;
                this.selectnew = true;
                this.allSelected = false;
                this.event.NotApplicableArray = this.allselectedArray;
                this.event.selectedLevelName = ['63242085ed6ecd6708d14352'];
                this.levelId = this.allselectedArray;
                this.SearchALl();
            }
            else {
                this.selectnotApplicable = true;
                this.selectnew = false;
                this.allSelected = true;
                this.event.selectedLevelName = this.selectedlevel;
                this.levelId = this.selectedlevel;
                this.SearchALl();
            }
        }
        else {
            this.selectnotApplicable = true;
            this.selectnew = true;
            this.allSelected = true;
            this.levelId = this.allselectedArray;
            this.SearchALl();
        }
        this.filterType = 'filter';
        this.filterTypefilter = true;
    };
    HomeSearchComponent.prototype.getlevelgroup = function () {
        var _this = this;
        this.api.get('getlevelgroup').subscribe(function (res) {
            _this.allLevels = res.levelData;
            _this.allLevels = res.levelData.sort(function (a, b) { return a.level.toLowerCase().localeCompare(b.level.toLowerCase()); });
            _this.allLevels.forEach(function (element) {
                if (element.level !== 'Not Applicable') {
                    _this.optionsLevels.push(element);
                    _this.allselectedArray.push(element._id);
                }
                // if (element.levelName.toString() !== 'Not applicable') {
                //   this.optionsLevels.push({
                //     value: element._id,
                //     display: element.levelName.toString(),
                //   });
                // }
            });
        });
    };
    // SearchALldata(value: any) {
    //   this.searchKey = value;
    //   this.event.searchKey = value;
    //   this.SearchALl();
    // }
    HomeSearchComponent.prototype.redirecttoMorepage = function (itemName) {
        this.router.navigate(['/view/searchmoredataof/' + itemName + '/' + this.searchKey]);
    };
    HomeSearchComponent.prototype.SearchALl = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        if (this.searchKey && this.searchKey.trim() !== '') {
            if (this.levelId.length > 0 || this.filterTypefilter) {
                this.api.get("search?text=" + this.searchKey + '&type=' + this.filterType + '&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&levelId=' + this.levelId + '&sitetype=' + this.types + '&limit=10' + '&page=1').subscribe(function (res) {
                    _this.allsearchdata = res.searchData;
                    _this.isfunctionstart = false;
                    _this.classData = res.searchData[1].classData;
                    //console.log("class", _this.classData);
                });
            }
            else {
                this.levelId = '';
                this.api.get("search?text=" + this.searchKey + '&type=agefilter&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&levelId=' + this.levelId + '&sitetype=' + this.types + '&limit=10' + '&page=1').subscribe(function (res) {
                    var _a, _b;
                    _this.allsearchdata = res.searchData;
                    _this.isfunctionstart = false;
                    //console.log(_this.allsearchdata);
                    _this.classData = res.searchData[1].classData;
                    _this.eventsData = res.searchData[2].eventsData;
                    _this.articlesData = res.searchData[3].articlesData;
                    _this.groupsearchData = res.searchData[0].groupsearchData;
                    if (_this.groupsearchData) {
                        for (var i = 0; i <= _this.groupsearchData.length; i++) {
                            if (_this.joingroupId) {
                                if (((_a = _this.groupsearchData[i]) === null || _a === void 0 ? void 0 : _a._id) === _this.joingroupId) {
                                    _this.groupsearchData[i].select = true;
                                }
                                else {
                                    _this.groupsearchData[i].select = false;
                                }
                            }
                            for (var j = 0; j <= ((_b = _this.groupsearchData[i]) === null || _b === void 0 ? void 0 : _b.userId.length); j++) {
                                if (_this.groupsearchData[i].userId[j] === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                                    _this.groupsearchData[i].select = true;
                                }
                                else {
                                    // this.groupsearchData[i].select = false;
                                }
                            }
                        }
                    }
                    //console.log("group", _this.groupsearchData);
                });
            }
        }
        else {
            this.allsearchdata = [];
            this.classData = [];
            this.eventsData = [];
            this.articlesData = [];
            this.groupsearchData = [];
        }
    };
    HomeSearchComponent.prototype.changesiteType = function () {
        this.event.searchType = this.types;
        this.SearchALl();
        this.filterType = 'filter';
        this.filterTypefilter = true;
    };
    HomeSearchComponent.prototype.selectFromAge = function (event) {
        this.filterTypefilter = true;
        //console.log(event);
        this.event.AgeFromSearch = '';
        this.datefrom = event;
        this.event.AgeFromSearch = event;
        this.event.dateFromSearch = event;
        this.agetoselect = this.selectsTo.filter(function (item) {
            return item.value >= event;
        });
        this.agefrom = event;
        this.filterType = 'filter';
        this.SearchALl();
    };
    HomeSearchComponent.prototype.selectToAge = function (event) {
        //console.log(event);
        this.event.AgetoSearch = '';
        this.filterTypefilter = true;
        this.ageto = event;
        this.event.AgetoSearch = event;
        this.event.dateToSearch = event;
        this.dateto = this.ageto;
        this.filterType = 'filter';
        this.SearchALl();
    };
    HomeSearchComponent.prototype.checkValue = function (value) {
        var _this = this;
        //console.log(value, 'valuenear');
        this.startsearchfunction = false;
        if (value === 'nearme') {
            //console.log(value, 'value');
            this.filternear = this.filternear ? false : true;
            this.filterloc = false;
            this.articlesData = [];
            this.groupsearchData = [];
        }
        else if (value === 'location') {
            this.classData = [];
            this.eventsData = [];
            this.articlesData = [];
            this.groupsearchData = [];
            // this.filterTypefilter = true;
            this.filterloc = this.filterloc ? false : true;
            this.filternear = false;
        }
        if (this.filternear || this.filterloc) {
            this.article = false;
            if (value === 'nearme') {
                this.api.get('search?text=' + this.searchKey + '&type=nearme&lat=' + 1.312372 + '&long=' + 103.93872).subscribe(function (res) {
                    if (res) {
                        _this.classData = res.searchData[0].nearbyClass;
                        _this.eventsData = res.searchData[0].nearbyevent;
                        _this.articlesData = [];
                        _this.groupsearchData = [];
                    }
                });
            }
        }
        else {
            this.article = true;
            this.classData = [];
            this.eventsData = [];
            this.SearchALl();
        }
    };
    HomeSearchComponent.prototype.checkSearchValue = function (value) {
        this.startsearchfunction = false;
        //console.log(value, 'valueclas');
        if (value === 'class') {
            if (this.event.checkVal.length > 0) {
                this.datefrom = this.event.dateFromSearch;
                this.dateto = this.event.dateToSearch;
                this.selectedOptionsLevels = this.event.selectedLevelSearch;
                this.levelId = this.selectedOptionsLevels;
                this.agefrom = this.event.AgeFromSearch;
                this.ageto = this.event.AgetoSearch;
                // this.datefrom = this.event.AgeFromSearch;
                // this.dateto = this.event.AgetoSearch
                this.types = this.event.searchType;
                this.filterType = 'filter';
                this.filterTypefilter = true;
            }
            else {
                this.selectedOptionsLevels = [];
                this.event.selectedLevelSearch = [];
                this.event.checkVal = "class";
                this.types = 'all';
                this.datefrom = 1;
                this.dateto = 18;
                this.levelId = this.selectedlevel;
            }
            if (!this.nearme || !this.locations) {
                // this.classData = [];
                // this.levelId = [];
            }
            this.classfilter = this.classfilter ? false : true;
            this.eventfilter = false;
            this.groupfilter = false;
            this.articlefilter = false;
            if (this.classfilter || this.eventfilter) {
                this.locations = true;
            }
            if (this.classfilter == true) {
                this.showclassfilter = true;
                this.showarticlefilter = false;
                this.showgroupfilter = false;
                this.showeventfilter = false;
            }
            else {
                this.showclassfilter = true;
                this.showarticlefilter = true;
                this.showgroupfilter = true;
                this.showeventfilter = true;
            }
            this.SearchALl();
        }
        else if (value === 'events') {
            this.eventfilter = this.eventfilter ? false : true;
            this.groupfilter = false;
            this.articlefilter = false;
            this.classfilter = false;
            this.levelId = [];
            this.selectedlevel = [];
            this.datefrom = 1;
            this.dateto = 18;
            this.types = 'all';
            if (this.eventfilter || this.classfilter) {
                this.locations = true;
            }
            if (this.eventfilter == true) {
                this.showclassfilter = false;
                this.showarticlefilter = false;
                this.showgroupfilter = false;
                this.showeventfilter = true;
            }
            else {
                this.showclassfilter = true;
                this.showarticlefilter = true;
                this.showgroupfilter = true;
                this.showeventfilter = true;
            }
        }
        else if (value === 'groups') {
            this.groupfilter = this.groupfilter ? false : true;
            this.classfilter = false;
            this.articlefilter = false;
            this.eventfilter = false;
            this.levelId = [];
            this.selectedlevel = [];
            this.datefrom = 1;
            this.dateto = 18;
            this.types = 'all';
            if (this.articlefilter || this.groupfilter) {
                this.locations = false;
            }
            else {
                this.locations = true;
            }
            if (this.groupfilter == true) {
                this.showclassfilter = false;
                this.showarticlefilter = false;
                this.showgroupfilter = true;
                this.showeventfilter = false;
            }
            else {
                this.showclassfilter = true;
                this.showarticlefilter = true;
                this.showgroupfilter = true;
                this.showeventfilter = true;
            }
        }
        else if (value === 'articles') {
            // if (this.searchKey == undefined) {
            //   this.searchKey = '';
            //   this.SearchALl();
            // }
            this.levelId = [];
            this.datefrom = 1;
            this.dateto = 18;
            this.types = 'all';
            this.selectedlevel = [];
            this.articlefilter = this.articlefilter ? false : true;
            this.groupfilter = false;
            this.eventfilter = false;
            this.classfilter = false;
            if (this.articlefilter || this.groupfilter) {
                this.locations = false;
            }
            else {
                this.locations = true;
            }
            if (this.articlefilter == true) {
                this.showclassfilter = false;
                this.showarticlefilter = true;
                this.showgroupfilter = false;
                this.showeventfilter = false;
            }
            else {
                this.showclassfilter = true;
                this.showarticlefilter = true;
                this.showgroupfilter = true;
                this.showeventfilter = true;
            }
        }
        else {
            // this.SearchALl();
        }
    };
    HomeSearchComponent.prototype.onKeySearchLevel = function (value) {
        this.optionsLevels = this.searchbyLevelName(value);
    };
    HomeSearchComponent.prototype.searchbyLevelName = function (value) {
        if (value && value.trim() !== '' && value.length > 0) {
            return this.allLevels.filter(function (level) {
                return level.level.toLowerCase().startsWith(value.toLowerCase());
            });
        }
        else {
            return this.allLevels;
        }
    };
    HomeSearchComponent.prototype.selectAll = function () {
        this.selectedOptionsLevels = [];
        this.selectnew = false;
        this.selectedOptionsLevels = this.allselectedArray;
        this.levelId = this.selectedOptionsLevels;
        this.allSelected = false;
        this.event.selectedLevelName = this.allselectedArray;
        this.SearchALl();
        //console.log(this.selectedOptionsLevels, 'this.selectedOptionsLevels');
    };
    HomeSearchComponent.prototype.unselectAll = function () {
        this.selectnew = true;
        this.allSelected = true;
        this.selectnew = true;
        this.selectnotApplicable = true;
        this.selectedOptionsLevels = [];
        this.event.NotApplicableArray = [];
        this.levelId = this.allselectedArray;
        this.SearchALl();
    };
    HomeSearchComponent.prototype.clearSearch = function () {
        //console.log('clicked');
        // this.selectnew = true;
        this.searchKey2 = '';
        this.onKeySearchLevel('');
    };
    HomeSearchComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    HomeSearchComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    HomeSearchComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    HomeSearchComponent.prototype.getClassDetails = function (id) {
        var newID = atob(id);
        this.router.navigate(["/view/class-details/" + newID]);
    };
    HomeSearchComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    HomeSearchComponent.prototype.resetFilter = function () {
        this.isfunctionstart = true;
        this.classfilter = false;
        this.eventfilter = false;
        this.articlefilter = false;
        this.groupfilter = false;
        this.filterloc = true;
        this.locations = true;
        this.filternear = false;
        this.filterloc = false;
        this.groupfilter = false;
        this.articlefilter = false;
        this.article = true;
        this.showclassfilter = true;
        this.showeventfilter = true;
        this.showarticlefilter = true;
        this.filterTypefilter = false;
        this.showgroupfilter = true;
        this.datefrom = 1;
        this.dateto = 18;
        this.agefrom = '0';
        this.ageto = '0';
        this.types = 'all';
        this.selectedOptionsLevels = [];
        this.event.selectedLevelSearch = [];
        this.event.NotApplicableArray = [];
        this.event.AgeFromSearch = '0';
        this.event.AgetoSearch = '0';
        this.event.searchType = 'all';
        this.event.checkVal = '';
        this.levelId = [];
        this.selectnew = true;
        this.allSelected = true;
        this.selectnew = true;
        this.selectnotApplicable = true;
        this.event.selectedLevelName = [];
        // this.optionsLevels = [];
        this.selectedlevel = [];
        this.SearchALl();
    };
    HomeSearchComponent.prototype.joinGroup = function (groupData) {
        var _this = this;
        this.checkLoginorNot();
        var requestData = {};
        this.joingroupId = groupData === null || groupData === void 0 ? void 0 : groupData._id;
        this.type = 'join';
        requestData['groupId'] = groupData === null || groupData === void 0 ? void 0 : groupData._id;
        requestData['type'] = 'join';
        this.api.post('joingroups', requestData).subscribe(function (res) {
            var _a;
            //console.log(res);
            if (res.status == true) {
                _this.api.alert(res.message, 'success');
                _this.SearchALl();
                for (var i = 0; i <= _this.groupsearchData.length; i++) {
                    if (((_a = _this.groupsearchData[i]) === null || _a === void 0 ? void 0 : _a._id) === (groupData === null || groupData === void 0 ? void 0 : groupData._id)) {
                        _this.groupsearchData[i].select = true;
                    }
                    else {
                        _this.groupsearchData[i].select = false;
                    }
                }
            }
            else {
                _this.api.alert(res.message, 'error');
            }
        });
    };
    __decorate([
        core_1.ViewChild('myHeader')
    ], HomeSearchComponent.prototype, "myHeader");
    HomeSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-home-search',
            templateUrl: './home-search.component.html',
            styleUrls: ['./home-search.component.scss']
        })
    ], HomeSearchComponent);
    return HomeSearchComponent;
}());
exports.HomeSearchComponent = HomeSearchComponent;
