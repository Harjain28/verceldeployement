"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EventService = /** @class */ (function () {
    function EventService(storage) {
        this.storage = storage;
        this.data = new rxjs_1.Subject();
        this.positionData = new rxjs_1.Subject();
        this.NotApplicableArray = [];
        this.selectlevelName = '';
        this.articalTag = 0;
        this.groupTag = 0;
        this.indexSelected = 0;
        this.selectedBranch = '';
        this.selectedLevelSearch = [];
        this.AgeFromSearch = '';
        this.AgetoSearch = '';
        this.dateFromSearch = 1;
        this.dateToSearch = 18;
        this.searchType = '';
        this.checkVal = '';
        this.selectedLevelName = [];
        this.Ageto = '';
        this.AgeFrom = '';
        this.type = 'all';
        this.timeType = 'upcoming';
        this.eventType = '';
        this.sort = 'Date';
        this.otherType = '';
        this.searchKey = '';
        this.Login = new rxjs_1.BehaviorSubject(this.storage.isLoggednIn());
        this.isLogin = this.Login.asObservable();
        this.isHttpRequest = new rxjs_1.Subject();
        this.Loading = new rxjs_1.BehaviorSubject(true);
        this.isLoading = this.Loading.asObservable();
        this.searchData = new rxjs_1.BehaviorSubject({ sharedata: '' });
        this.editProf = new rxjs_1.Subject();
        this.sharefunc = new rxjs_1.Subject();
    }
    // postalAddressGlobal(postal) {
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({
    //     'address': postal,
    //     componentRestrictions: {
    //       country: 'SG',
    //     }
    //   }, (results, status) => {
    //     if (status === 'OK') {
    //       this.position = {
    //         "lat": results[0].geometry.location.lat(),
    //         "lng": results[0].geometry.location.lng()
    //       }
    //       this.positionData.next(this.position);
    //     }
    //     this.getReverseGeocodingData(this.position.lat, this.position.lng);
    //   });
    // }
    EventService.prototype.getReverseGeocodingData = function (lat, lng) {
        var _this = this;
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === 'OK') {
                var address = (results[0].formatted_address);
                _this.address1 = address.split(",")[0];
                console.log(_this.address1, 'from event');
                _this.data.next(_this.address1);
                // return this.address1;
            }
        });
    };
    EventService.prototype.sendResetEvent = function () {
        this.sharefunc.next();
    };
    EventService.prototype.getResetEvent = function () {
        return this.sharefunc.asObservable();
    };
    EventService.prototype.sendEditEvent = function () {
        this.editProf.next();
    };
    EventService.prototype.getEditEvent = function () {
        return this.editProf.asObservable();
    };
    EventService.prototype.setsearchData = function (data) {
        this.searchData.next(data);
    };
    EventService.prototype.getSearchdata = function () {
        return this.searchData.asObservable();
    };
    EventService.prototype.copyClipboard = function () {
        var inputc = document.body.appendChild(document.createElement("input"));
        inputc.value = window.location.href;
        inputc.focus();
        inputc.select();
        document.execCommand('copy');
        inputc.parentNode.removeChild(inputc);
    };
    EventService.prototype.setLoginEmmit = function (isLogin) {
        return this.Login.next(isLogin);
    };
    EventService.prototype.setLoaderEmmit = function (isLoading) {
        return this.Loading.next(isLoading);
    };
    EventService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
