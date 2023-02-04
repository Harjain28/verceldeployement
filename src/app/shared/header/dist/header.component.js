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
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(event, storage, router, route, api, location) {
        var _this = this;
        this.event = event;
        this.storage = storage;
        this.router = router;
        this.route = route;
        this.api = api;
        this.location = location;
        this.isNotshowsearch = false;
        this.searchautofocus = true;
        this.suggestionData = [];
        this.SuggTags = [];
        this.suggtaggroup = [];
        this.suggsubcategory = [];
        this.suggGroup = [];
        this.suggestions = [];
        this.Rcenents = [];
        this.newSuggestionsArray = [];
        this.previousData = [];
        this.recentsearch = [];
        this.clearIcon = false;
        this.isSticky = false;
        this.editEventSubscription = this.event.getEditEvent().subscribe(function () {
            _this.editProfile();
            _this.loginOrNot();
        });
    }
    HeaderComponent.prototype.checkScroll = function () {
        this.isSticky = window.pageYOffset >= 10;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentURL = this.router.url;
        this.router.events.subscribe(function (res) {
            if (res instanceof router_1.NavigationEnd) {
                _this.currentURL = res.url;
                // console.log(this.currentURL);
            }
        });
        if (this.currentURL !== 'view/search') {
            this.searchKey = '';
        }
        this.loginOrNot();
        this.location.subscribe(function (event) {
            _this.loginOrNot();
        });
        // this.event.searchKey = this.searchKey;
    };
    HeaderComponent.prototype.loginOrNot = function () {
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.loginShowHeader = localStorage.getItem("LoggedIn");
        this.email = userData === null || userData === void 0 ? void 0 : userData.email;
        this.name = userData === null || userData === void 0 ? void 0 : userData.name;
        this.image = userData === null || userData === void 0 ? void 0 : userData.image;
        this.type = userData === null || userData === void 0 ? void 0 : userData.type;
        this.userName = userData === null || userData === void 0 ? void 0 : userData.userName;
    };
    // loadHeader() {
    //   if (!localStorage.getItem("load")) {
    //     localStorage.setItem("load", "no reload");
    //     location.reload();
    //   } else {
    //     localStorage.removeItem("load");
    //   }
    // }
    HeaderComponent.prototype.getAutocompleteValue = function (searchkey) {
        this.clearIcon = true;
        // console.log(searchkey, 'searchkey');
        this.newSuggestionsArray = [];
        this.searchKey = searchkey;
        this.event.setsearchData({
            searchdata: this.searchKey
        });
        this.previousData.push(this.searchKey);
        this.recentsearch = __spreadArrays(new Set(this.previousData));
        localStorage.setItem("Recent Searches", JSON.stringify(this.recentsearch));
        this.homesearch();
    };
    HeaderComponent.prototype.searchData = function () {
        this.newSuggestionsArray = [];
        if (this.searchKey.length > 2) {
            this.event.setsearchData({
                searchdata: this.searchKey
            });
            this.previousData.push(this.searchKey);
            this.recentsearch = __spreadArrays(new Set(this.previousData));
            localStorage.setItem("Recent Searches", JSON.stringify(this.recentsearch));
            this.homesearch();
        }
    };
    HeaderComponent.prototype.clearData = function () {
        this.searchKey = '';
        this.clearIcon = false;
        this.router.navigate(["/"]);
    };
    HeaderComponent.prototype.clearIconBool = function () {
        if (this.searchKey.length === 0) {
            this.clearIcon = false;
        }
    };
    HeaderComponent.prototype.resetfromsearch = function () {
        this.event.sendResetEvent();
        this.event.indexSelected = 0;
    };
    HeaderComponent.prototype.editProfile = function () {
        var userData = JSON.parse(localStorage.getItem('userdata'));
        // this.loginShowHeader = localStorage.getItem("LoggedIn");
        this.email = userData === null || userData === void 0 ? void 0 : userData.email;
        this.name = userData === null || userData === void 0 ? void 0 : userData.name;
        this.image = userData === null || userData === void 0 ? void 0 : userData.image;
        this.type = userData === null || userData === void 0 ? void 0 : userData.type;
        this.userName = userData === null || userData === void 0 ? void 0 : userData.userName;
        //  this.loadHeader();
    };
    HeaderComponent.prototype.getRecent = function () {
        this.Rcenents = JSON.parse(localStorage.getItem("Recent Searches"));
        if (this.Rcenents.length > 0) {
            this.newSuggestionsArray = this.Rcenents;
        }
        else { }
    };
    HeaderComponent.prototype.getSuggestions = function () {
        var _this = this;
        this.suggestions = [];
        this.clearIcon = true;
        if (this.searchKey.trim() !== '' && this.searchKey.length > 2) {
            this.api.get('searchkeyword?text=' + this.searchKey).subscribe(function (res) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                _this.suggestions = [];
                var suggest = [];
                _this.suggestionData = res.searchData;
                if (_this.suggestionData.length > 0) {
                    // this.suggestionData.forEach(element => {
                    //   suggest = [...element.taggroups, ...element.tags , ...element.subcategory, ...element.group];
                    // });
                    for (var i = 0; i <= _this.suggestionData.length; i++) {
                        if (((_a = _this.suggestionData[i]) === null || _a === void 0 ? void 0 : _a.taggroups) && ((_b = _this.suggestionData[i]) === null || _b === void 0 ? void 0 : _b.taggroups.length) > 0) {
                            _this.suggtaggroup = _this.suggestionData[i].taggroups;
                            _this.suggtaggroup.forEach(function (element) {
                                _this.suggestions.push(element.groupName);
                            });
                        }
                        if (((_c = _this.suggestionData[i]) === null || _c === void 0 ? void 0 : _c.tags) && ((_d = _this.suggestionData[i]) === null || _d === void 0 ? void 0 : _d.tags.length) > 0) {
                            _this.SuggTags = _this.suggestionData[i].tags;
                            _this.SuggTags.forEach(function (element) {
                                _this.suggestions.push(element.tags);
                            });
                        }
                        if (((_e = _this.suggestionData[i]) === null || _e === void 0 ? void 0 : _e.subcategory) && ((_f = _this.suggestionData[i]) === null || _f === void 0 ? void 0 : _f.subcategory.length) > 0) {
                            _this.suggsubcategory = _this.suggestionData[i].subcategory;
                            _this.suggsubcategory.forEach(function (element) {
                                var subcategory = [];
                                subcategory = element.subCategory;
                                _this.suggestions.push(subcategory);
                            });
                        }
                        if (((_g = _this.suggestionData[i]) === null || _g === void 0 ? void 0 : _g.group) && ((_h = _this.suggestionData[i]) === null || _h === void 0 ? void 0 : _h.group.length) > 0) {
                            _this.suggGroup = (_j = _this.suggestionData[i]) === null || _j === void 0 ? void 0 : _j.group;
                            _this.suggGroup.forEach(function (element) {
                                _this.suggestions.push(element.groups);
                            });
                        }
                        _this.newSuggestionsArray = __spreadArrays(new Set(_this.suggestions));
                    }
                }
            });
        }
        else {
            this.newSuggestionsArray = [];
            this.router.navigate(["/"]);
        }
    };
    HeaderComponent.prototype.inboxPageRedirect = function () {
        if (this.type == "business") {
            this.router.navigate(["/pages/business-inbox"]);
        }
        else if (this.type == "subbusiness") {
            this.router.navigate(["/pages/business-inbox"]);
        }
        else {
            this.router.navigate(["/view/inbox"]);
        }
    };
    HeaderComponent.prototype.profilepageRedirect = function () {
        if (this.type == "business") {
            this.router.navigate(["/pages/business-details"]);
        }
        else if (this.type == "subbusiness") {
            this.router.navigate(["/pages/business-details"]);
        }
        else {
            this.router.navigate(["/profile/profile"]);
        }
    };
    HeaderComponent.prototype.homesearch = function () {
        this.isNotshowsearch = true;
        this.router.navigate(["/view/search"]);
    };
    HeaderComponent.prototype.logout = function () {
        this.storage.logout();
        this.router.navigate(["/login/" + this.type]);
    };
    HeaderComponent.prototype.redirection = function (type) {
        this.router.navigate(['/register/' + type]);
        localStorage.setItem('userType', type);
    };
    // ngOnDestroy(): void {
    //   if(this.userId && this.token)
    //   this.router.navigate([`/admin/business-profile/${this.userId}/${this.token}`]);
    // }
    HeaderComponent.prototype.clearSearch = function () {
        this.searchKey = '';
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], HeaderComponent.prototype, "checkScroll");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "app-header",
            templateUrl: "./header.component.html",
            styleUrls: ["./header.component.scss"]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
