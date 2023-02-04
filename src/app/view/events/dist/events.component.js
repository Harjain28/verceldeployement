"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventsComponent = void 0;
var core_1 = require("@angular/core");
var datepicker_1 = require("@angular/material/datepicker");
var EventsComponent = /** @class */ (function () {
    function EventsComponent(api, event, cdr, router, storage, route, localstorage) {
        var _this = this;
        this.api = api;
        this.event = event;
        this.cdr = cdr;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.localstorage = localstorage;
        this.events = [];
        this.nextEvents = [];
        this.events1 = [];
        this.events2 = [];
        this.events3 = [];
        this.showDatepicker = false;
        this.showFilter = false;
        this.newNextEvents = [];
        this.eventData = [];
        this.newEventdata = [];
        this.eventwishlisteddata = [];
        this.resetBool = false;
        this.pagenumber = 1;
        this.itemperpage = 10;
        this.iseventData = false;
        this.clearIcon = false;
        this.route.params.subscribe(function (params) {
            _this.tagvalue = params['value'];
            _this.getWishlist();
            // this.getWishlisted();
        });
        var localStorageChanges$ = this.localstorage.changes$;
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.selected = new Date();
        var date = this.selected.getDate();
        var month = this.selected.getMonth() + 1;
        var year = this.selected.getFullYear();
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }
        this.newdate = year + "-" + month + "-" + date;
        this.loginOrNot = localStorage.getItem("LoggedIn");
        this.selected = new Date();
        if (!this.resetBool) {
            this.eventType = this.event.eventType;
            this.timeType = this.event.timeType;
            this.sort = this.event.sort;
            this.otherType = this.event.otherType;
            this.evenSorting();
        }
        // this.getEvents();
        // this.getEventsSections();
    };
    EventsComponent.prototype.getALlevents = function () {
        var _this = this;
        var requestData = {};
        requestData["startDate"] = this.newdate;
        // requestData["limit"] = this.itemperpage;
        // requestData["page"] = this.pagenumber;
        this.api.post("eventSearch", requestData).subscribe(function (res) {
            _this.eventData = res.EventData;
            _this.newEventdata = _this.eventData;
            if (!_this.resetBool) {
                _this.eventType = _this.event.eventType;
                _this.timeType = _this.event.timeType;
                _this.sort = _this.event.sort;
                _this.otherType = _this.event.otherType;
            }
            _this.evenSorting();
        });
    };
    EventsComponent.prototype.sortingBytagName = function () {
        var _this = this;
        if (this.tagvalue && this.tagvalue.trim() !== '') {
            // this.showtags = true;
            this.api.get("searchontype?type=event&selectedName=" + this.tagvalue).subscribe(function (res) {
                _this.eventData = res.data;
                _this.newEventdata = _this.eventData;
                _this.getWishlist();
                // this.evenSorting();
            });
        }
    };
    EventsComponent.prototype.onSelect = function (event) {
        // console.log(event, "event");
        this.newEventdata = [];
        this.selected = event;
        var date = event.getDate();
        var month = event.getMonth() + 1;
        var year = event.getFullYear();
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var selectdate = year + "-" + month + "-" + date;
        this.searchvalue = '';
        this.sort = 'Date';
        this.timeType = 'upcoming';
        this.pagenumber = 1;
        this.newdate = selectdate;
        this.evenSorting();
        // let requestData = {};
        // requestData["startDate"] = selectdate;
        // // requestData["limit"] = this.itemperpage;
        // // requestData["page"] = this.pagenumber;
        // this.api.post("eventSearch", requestData).subscribe((res: any) => {
        //   this.eventData = res.EventData;
        //   this.newEventdata == this.eventData;
        // });
    };
    EventsComponent.prototype.getEventbytags = function () {
        var _this = this;
        this.clearIcon = true;
        this.pagenumber = 1;
        if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
            this.api.get("searchontype?type=event&selectedName=" + this.tagvalue + '&text=' + this.searchvalue).subscribe(function (res) {
                _this.newEventdata = res.data;
                _this.timeType = '';
                _this.eventType = '';
                _this.sort = '';
                _this.otherType = '';
                _this.selected = new Date();
                _this.newdate = new Date();
                _this.getWishlist();
            });
        }
        else if (!this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
            this.api.get("searchontype?type=event&selectedName=" + '&text=' + this.searchvalue).subscribe(function (res) {
                _this.newEventdata = res.data;
                _this.timeType = '';
                _this.eventType = '';
                _this.sort = '';
                _this.otherType = '';
                _this.selected = new Date();
                _this.newdate = new Date();
                _this.getWishlist();
            });
        }
        else if (!this.searchvalue && this.searchvalue.trim() === '') {
            this.newEventdata = [];
            this.timeType = 'upcoming';
            this.sort = "Date";
            this.pagenumber = 1;
            this.evenSorting();
        }
        else { }
    };
    EventsComponent.prototype.resetFilter = function () {
        this.resetBool = true;
        this.timeType = 'upcoming';
        this.event.timeType = 'upcoming';
        this.eventType = '';
        this.sort = 'Date';
        this.otherType = '';
        this.event.otherType = '';
        this.event.eventType = '';
        this.event.sort = 'Date';
        this.searchvalue = '';
        this.selected = new Date();
        this.calendar._goToDateInView(new Date(), 'month');
        this.newdate = new Date();
        this.newEventdata = [];
        this.pagenumber = 1;
        this.evenSorting();
        if (this.tagvalue) {
            this.router.navigate(['/view/events']);
        }
        // this.newEventdata = this.eventData;
    };
    EventsComponent.prototype.showCalender = function () {
        this.showDatepicker = !this.showDatepicker;
        this.showFilter = false;
    };
    EventsComponent.prototype.changeSortOrder = function () {
        this.event.eventType = this.eventType;
        // if (this.timeType === '') {
        //   this.event.timeType = 'upcoming';
        // } else {
        //   this.event.timeType = this.timeType;
        // }
        if (this.searchvalue) {
            this.timeType = 'upcoming';
            this.sort = 'Date';
        }
        this.event.timeType = this.timeType;
        // this.timeType = 'upcoming';
        // this.sort = 'Date';
        this.event.sort = this.sort;
        this.event.otherType = this.otherType;
        this.pagenumber = 1;
        this.newEventdata = [];
        this.evenSorting();
        this.searchvalue = '';
    };
    EventsComponent.prototype.evenSorting = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        var requestData = {};
        if (this.timeType && this.timeType !== '') {
            if (this.timeType === 'upcoming') {
                requestData["upcoming"] = this.newdate;
            }
            else if (this.timeType === 'Past') {
                requestData["past"] = this.newdate;
            }
        }
        if (this.tagvalue) {
            requestData["tag"] = this.tagvalue;
        }
        requestData["limit"] = this.itemperpage;
        requestData["page"] = this.pagenumber;
        requestData["sortBy"] = this.sort;
        requestData["eventtype"] = this.eventType;
        requestData["otherfilter"] = '';
        if (this.loginOrNot) {
            if (this.otherType && this.otherType !== '') {
                requestData["otherfilter"] = this.otherType;
                requestData["userId"] = userData === null || userData === void 0 ? void 0 : userData._id;
            }
            else {
                requestData["otherfilter"] = '';
            }
        }
        this.api.post("eventsorting", requestData).subscribe(function (res) {
            var _a;
            // console.log(res);
            _this.iseventData = true;
            (_a = _this.newEventdata).push.apply(_a, res.EventData);
            if (_this.storage.isLoggednIn()) {
                _this.getWishlist();
            }
            // console.log(this.sortData);
            // this.newEventdata = this.eventData;
        });
    };
    EventsComponent.prototype.showAllfilters = function () {
        this.showDatepicker = false;
        this.showFilter = !this.showFilter;
    };
    EventsComponent.prototype.getEventsDetails = function (id) {
        this.pagenumber = 1;
        this.router.navigate(["/group/event-details/" + id]);
    };
    EventsComponent.prototype.copyToClipboard = function () {
        this.event.copyClipboard();
        this.api.alert('Link Copied', 'success');
    };
    EventsComponent.prototype.clearData = function () {
        this.searchvalue = '';
        this.clearIcon = false;
        this.resetFilter();
    };
    EventsComponent.prototype.addtoEventWishList = function (eventId, likebool) {
        if (this.storage.isLoggednIn()) {
            this.favadded = likebool;
            for (var i = 0; i < this.newEventdata.length; i++) {
                if (this.newEventdata[i]._id === eventId) {
                    this.newEventdata[i].selected = true;
                    this.favadded = false;
                    this.api.alert('Added to Shortlist', 'success');
                }
                // } else {
                //   this.newEventdata[i].selected = false;
                //   this.api.alert('Remove to wishlist', 'error');
                // }
            }
            var requestData = {};
            requestData["type"] = 'events';
            requestData["wishlistedId"] = eventId;
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    EventsComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=events').subscribe(function (res) {
            var _a;
            // console.log(res.wishlistedData);
            _this.eventwishlisteddata = res.wishlistedData;
            var _loop_1 = function (i) {
                if (((_a = _this.eventwishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    _this.newEventdata.forEach(function (element) {
                        var _a;
                        if (element._id === ((_a = _this.eventwishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                    });
                }
            };
            for (var i = 0; i < _this.eventwishlisteddata.length; i++) {
                _loop_1(i);
            }
        });
    };
    EventsComponent.prototype.deleteEventWishlist = function (eventId) {
        if (this.storage.isLoggednIn()) {
            for (var i = 0; i < this.newEventdata.length; i++) {
                if (this.newEventdata[i]._id === eventId) {
                    this.newEventdata[i].selected = false;
                    this.api.alert('Removed from Shortlist', 'success');
                }
                // } else {
                //   this.newEventdata[i].selected = true;
                //   // this.api.alert('Add to wishlist', 'error');
                // }
            }
            var requestData = {};
            requestData["wishlistedId"] = eventId;
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    EventsComponent.prototype.onScroll = function (e) {
        if (this.iseventData) {
            // console.log(e);
            this.pagenumber += 1;
            // this.getALlevents(); 
            this.evenSorting();
        }
    };
    __decorate([
        core_1.ViewChild(datepicker_1.MatCalendar)
    ], EventsComponent.prototype, "calendar");
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'app-events',
            templateUrl: './events.component.html',
            styleUrls: ['./events.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
