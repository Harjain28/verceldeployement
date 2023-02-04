"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ClassListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ClassListComponent = /** @class */ (function () {
    function ClassListComponent(api, router, route, storage, event) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.event = event;
        this.classList = [];
        this.Classes = [];
        this.showtags = false;
        this.newclassList = [];
        this.wishlisteddata = [];
        this.sortingbool = false;
        this.clearIcon = false;
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
        this.optionsLevels = [];
        this.selectedOptionsLevels = [];
        this.levelId = [];
        this.types = 'all';
        this.allLevels = [];
        this.classSortingData = [];
        this.classsortingPageNumber = 1;
        this.itemperpage = 10;
        this.isshowClass = false;
        this.searchpagenumber = 1;
        this.classPageNumber = 1;
        this.isselectlevel = false;
        this.isfunctionstart = false;
        this.selectnotApplicable = true;
        this.selectnew = true;
        this.allselectedArray = [];
        this.allSelected = true;
        // this.getClassesbytags();
        this.route.params.subscribe(function (params) {
            var encodedId = params["id"];
            _this.id = btoa(encodedId);
            _this.tagvalue = params['value'];
        });
        this.agefromselect = this.selectsFrom;
        this.agetoselect = this.selectsTo;
    }
    ClassListComponent.prototype.ngOnInit = function () {
        if (this.storage.isLoggednIn()) {
            this.getWishlist();
        }
        // this.getAllclasses();
        this.formInit();
        this.getlevelgroup();
        this.event.selectedBranch = '';
        // this.getAgeLocal();
        this.selectedOptionsLevels = this.event.selectedLevelName;
        this.levelId = this.selectedOptionsLevels;
        this.types = this.event.type;
        this.ageto = this.event.Ageto;
        this.agefrom = this.event.AgeFrom;
        if (this.event.selectedLevelName.length > 0) {
            if (this.event.selectedLevelName.toString() === '63242085ed6ecd6708d14352') {
                this.selectnotApplicable = false;
                this.selectnew = true;
                this.allSelected = false;
                this.searchvalue = '';
                this.levelId = this.event.NotApplicableArray;
                this.classSorting();
            }
            else {
                this.selectnotApplicable = true;
                this.selectnew = false;
                this.allSelected = false;
                this.searchvalue = '';
                this.levelId = this.event.selectedLevelName;
                this.classSorting();
            }
        }
        else {
            this.getAllclasses();
        }
    };
    ClassListComponent.prototype.getAllclasses = function () {
        var _this = this;
        this.isshowClass = true;
        if (this.tagvalue && this.tagvalue.trim() !== '') {
            this.showtags = true;
            this.api.get("searchontype?type=classes&selectedName=" + this.tagvalue).subscribe(function (res) {
                _this.classList = res.data;
                _this.newclassList = _this.classList;
            });
        }
        else {
            this.showtags = false;
            this.api
                .get("getclassonsubcategory?subcategoryId=" + this.id + '&limit=' + this.itemperpage + '&page=' + this.classPageNumber)
                .subscribe(function (res) {
                var _a;
                _this.classList = res.classData;
                (_a = _this.newclassList).push.apply(_a, _this.classList);
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
            });
        }
    };
    ClassListComponent.prototype.formInit = function () {
        this.myForm = new forms_1.FormGroup({
            selectedlevel: new forms_1.FormControl([])
        });
    };
    ClassListComponent.prototype.changesiteType = function () {
        this.event.type = this.types;
        this.classsortingPageNumber = 1;
        this.newclassList = [];
        this.searchvalue = '';
        this.classSorting();
    };
    ClassListComponent.prototype.getSelectedlevelOptions = function (selected) {
        //console.log(selected, 'this console is inside');
        if (selected.length !== 0) {
            this.selectedlevel = selected;
            this.levelId = this.selectedlevel;
            if (this.selectedlevel.toString() === '63242085ed6ecd6708d14352') {
                this.selectnotApplicable = false;
                this.selectnew = true;
                this.allSelected = false;
                this.event.NotApplicableArray.push(this.allselectedArray);
                this.event.selectedLevelName = ['63242085ed6ecd6708d14352'];
                this.levelId = this.allselectedArray;
                this.classSorting();
            }
            else {
                this.selectnotApplicable = true;
                this.selectnew = false;
                this.allSelected = true;
                this.event.selectedLevelName = this.levelId;
            }
            if (this.selectedlevel.length == 0) {
                this.selectnotApplicable = true;
                this.selectnew = true;
            }
            this.searchvalue = '';
            this.classsortingPageNumber = 1;
            this.newclassList = [];
            this.classSorting();
        }
        else {
            this.selectnotApplicable = true;
            this.selectnew = true;
            this.allSelected = true;
            this.levelId = [];
            this.classSorting();
        }
    };
    ClassListComponent.prototype.getlevelgroup = function () {
        var _this = this;
        this.api.get('getlevelgroup').subscribe(function (res) {
            _this.allLevels = res.levelData;
            _this.allLevels = res.levelData.sort(function (a, b) { return a.level.toLowerCase().localeCompare(b.level.toLowerCase()); });
            //console.log(res);
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
    ClassListComponent.prototype.selectFromAge = function (event) {
        this.datefrom = event;
        // this.event.AgeFrom = event;
        this.agetoselect = this.selectsTo.filter(function (item) {
            return item.value >= event;
        });
        this.agefrom = event;
        this.event.AgeFrom = event;
        this.classsortingPageNumber = 1;
        this.searchvalue = '';
        this.newclassList = [];
        this.classSorting();
    };
    ClassListComponent.prototype.selectToAge = function (event) {
        this.event.Ageto = event;
        this.ageto = event;
        // this.event.Ageto = event;
        this.dateto = this.ageto;
        this.classsortingPageNumber = 1;
        this.newclassList = [];
        this.searchvalue = '';
        this.classSorting();
    };
    ClassListComponent.prototype.resetFilter = function () {
        this.isfunctionstart = true;
        this.types = 'all';
        this.optionsLevels = [];
        this.agefrom = '0';
        this.ageto = '0';
        this.event.AgeFrom = '0';
        this.event.Ageto = '0';
        this.searchvalue = '';
        this.selectedlevel = [];
        this.levelId = [];
        this.newclassList = [];
        this.classsortingPageNumber = 1;
        this.selectedOptionsLevels = [];
        this.unselectAll();
        this.getlevelgroup();
        this.classSorting();
        if (this.tagvalue) {
            // this.router.navigate(['/view/class-list/' + this.id]);
            // this.getAllclasses();
        }
    };
    ClassListComponent.prototype.classSorting = function () {
        var _this = this;
        this.isshowClass = false;
        var requestData = {};
        if (this.levelId.length > 0) {
            requestData['level'] = this.levelId.join(',');
        }
        if (this.agefrom && this.agefrom != null && this.agefrom !== '0') {
            requestData['agefrom'] = this.agefrom;
        }
        else {
            requestData['agefrom'] = '1';
        }
        if (this.ageto && this.ageto != null && this.ageto !== '0') {
            requestData['ageto'] = this.ageto;
        }
        else {
            requestData['ageto'] = '18';
        }
        if (this.types && this.types !== '') {
            requestData['type'] = this.types;
        }
        if (this.tagvalue) {
            requestData['tag'] = this.tagvalue;
        }
        requestData['limit'] = this.itemperpage;
        requestData['page'] = this.classsortingPageNumber;
        if (!this.tagvalue) {
            requestData['subcatId'] = this.id;
        }
        this.api.post('sortclasses', requestData).subscribe(function (res) {
            var _a;
            _this.sortingbool = true;
            _this.isfunctionstart = false;
            //console.log(res);
            _this.classSortingData = res.data;
            (_a = _this.newclassList).push.apply(_a, res.data);
            if (_this.storage.isLoggednIn()) {
                _this.getWishlist();
            }
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
    ClassListComponent.prototype.addtoClassWishList = function (classId, likebool) {
        if (this.storage.isLoggednIn()) {
            this.favadded = likebool;
            for (var i = 0; i < this.newclassList.length; i++) {
                if (this.newclassList[i]._id === classId) {
                    this.newclassList[i].selected = true;
                    this.favadded = false;
                    this.api.alert('Added to Shortlist', 'success');
                }
                //  else {
                //   // this.newclassList[i].selected = false;
                //   // this.api.alert('Remove to wishlist', 'error');
                // }
            }
            var requestData = {};
            requestData["type"] = 'classes';
            requestData["wishlistedId"] = classId;
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    ClassListComponent.prototype.deleteClassWishlist = function (classId) {
        if (this.storage.isLoggednIn()) {
            for (var i = 0; i < this.newclassList.length; i++) {
                if (this.newclassList[i]._id === classId) {
                    this.newclassList[i].selected = false;
                    this.api.alert('Removed from Shortlist', 'success');
                }
                //  } else {
                //   this.newclassList[i].selected = true;
                //   // this.api.alert('Add to wishlist', 'error');
                // }
            }
            var requestData = {};
            requestData["wishlistedId"] = classId;
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    ClassListComponent.prototype.getClassesbytags = function () {
        var _this = this;
        this.clearIcon = true;
        this.isshowClass = false;
        if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
            this.api.get("searchontype?type=classes&selectedName=" + this.tagvalue + '&text=' + this.searchvalue).subscribe(function (res) {
                _this.newclassList = res.data;
                if (_this.storage.isLoggednIn()) {
                    _this.getWishlist();
                }
                _this.types = 'all';
                _this.levelId = [];
                _this.agefrom = '0';
                _this.ageto = '0';
                _this.event.AgeFrom = '0';
                _this.event.Ageto = '0';
                _this.levelId = [];
                _this.selectedlevel = [];
                _this.event.selectedLevelName = [];
                _this.selectedOptionsLevels = [];
            });
        }
        else if (this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
            if (this.storage.isLoggednIn()) {
                this.getWishlist();
            }
            this.types = 'all';
            this.agefrom = '0';
            this.event.AgeFrom = '0';
            this.event.Ageto = '0';
            this.ageto = '0';
            this.levelId = [];
            this.selectedlevel = [];
            this.event.selectedLevelName = [];
            this.selectedOptionsLevels = [];
            if (this.searchpagenumber <= 1) {
                this.newclassList = [];
            }
            var newconst_1 = this.newclassList;
            this.api.get("searchontype?type=classes&selectedName=" + this.subCategoryName + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.searchpagenumber).subscribe(function (res) {
                if (_this.storage.isLoggednIn()) {
                    _this.getWishlist();
                }
                var searchclassData = [];
                searchclassData.push.apply(searchclassData, __spreadArrays(newconst_1, res.data));
                _this.newclassList = searchclassData;
            });
        }
        else if (this.searchvalue.trim() === '') {
            this.newclassList = [];
            this.searchpagenumber = 1;
            this.classsortingPageNumber = 1;
            this.classSorting();
        }
    };
    ClassListComponent.prototype.getClassCategory = function (id) {
        var encodeID = atob(id);
        this.router.navigate(["/view/class-details/" + encodeID]);
    };
    ClassListComponent.prototype.onScroll = function (e) {
        if (this.isshowClass) {
            this.classPageNumber += 1;
            this.getAllclasses();
        }
        else if (!this.isshowClass && this.searchvalue.trim() === '') {
            this.classsortingPageNumber += 1;
            this.classSorting();
            if (this.searchvalue && !this.isshowClass) {
                this.searchpagenumber += 1;
                this.getClassesbytags();
            }
        }
    };
    ClassListComponent.prototype.onKeySearchLevel = function (value) {
        this.optionsLevels = this.searchbyLevelName(value);
    };
    ClassListComponent.prototype.searchbyLevelName = function (value) {
        if (value && value.trim() !== '' && value.length > 0) {
            return this.allLevels.filter(function (level) {
                return level.level.toLowerCase().startsWith(value.toLowerCase());
            });
        }
        else {
            return this.allLevels;
        }
    };
    ClassListComponent.prototype.clearSearch = function () {
        //console.log('clicked');
        // this.selectnew = true;
        this.searchKey = '';
        this.onKeySearchLevel('');
    };
    ClassListComponent.prototype.selectAll = function () {
        this.selectedOptionsLevels = [];
        this.selectnew = false;
        this.selectedOptionsLevels = this.allselectedArray;
        this.event.selectedLevelName = this.selectedOptionsLevels;
        this.levelId = this.selectedOptionsLevels;
        this.allSelected = false;
        this.classSorting();
        //console.log(this.selectedOptionsLevels, 'this.selectedOptionsLevels');
    };
    ClassListComponent.prototype.unselectAll = function () {
        this.selectnew = true;
        this.allSelected = true;
        this.selectnew = true;
        this.selectnotApplicable = true;
        this.selectedOptionsLevels = [];
        this.levelId = [];
        this.classSorting();
    };
    ClassListComponent.prototype.clearData = function () {
        this.searchvalue = '';
        this.searchpagenumber = 1;
        this.getClassesbytags();
        this.clearIcon = false;
    };
    ClassListComponent = __decorate([
        core_1.Component({
            selector: "app-class-list",
            templateUrl: "./class-list.component.html",
            styleUrls: ["./class-list.component.scss"]
        })
    ], ClassListComponent);
    return ClassListComponent;
}());
exports.ClassListComponent = ClassListComponent;
