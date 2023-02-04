"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventDetailsComponent = void 0;
var core_1 = require("@angular/core");
var EventDetailsComponent = /** @class */ (function () {
    function EventDetailsComponent(api, router, storage, route, event) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.event = event;
        this.eventsList = [];
        this.image = [];
        this.sectionData = [];
        this.sections = [];
        this.favItem = false;
        this.isIcon = false;
        this.locationchoosen = false;
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            autoWidth: true,
            items: 4,
            responsive: {
                0: {
                    items: 1
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
        this.alltags = [];
        this.eventTags = [];
        this.loginShowHeader = localStorage.getItem("LoggedIn");
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.getEventdetailsbyId();
            _this.getEvents();
        });
    }
    EventDetailsComponent.prototype.getEventdetailsbyId = function () {
        var _this = this;
        this.api
            .get("eventdetailsbyId?eventId=" + this.id)
            .subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f, _g;
            _this.eventsList = res.eventData;
            if (_this.storage.isLoggednIn()) {
                _this.getWishlist();
            }
            _this.image = _this.eventsList.image;
            _this.title = (_a = _this.eventsList) === null || _a === void 0 ? void 0 : _a.title;
            _this.tagName = (_b = _this.eventsList) === null || _b === void 0 ? void 0 : _b.tags;
            _this.groupsName = (_c = _this.eventsList) === null || _c === void 0 ? void 0 : _c.groupId;
            _this.contactName = (_d = _this.eventsList) === null || _d === void 0 ? void 0 : _d.contactName;
            _this.contactEmail = (_e = _this.eventsList) === null || _e === void 0 ? void 0 : _e.contactEmail;
            if (_this.loginShowHeader && _this.contactEmail) {
                _this.showMessageButton = true;
            }
            else {
                _this.showMessageButton = false;
            }
            if (_this.eventsList.seteventtype == 'Inperson') {
                _this.seteventtype = "In-Person";
                _this.lat = (_f = _this.eventsList.loc) === null || _f === void 0 ? void 0 : _f.coordinates[1];
                _this.lng = (_g = _this.eventsList.loc) === null || _g === void 0 ? void 0 : _g.coordinates[0];
                _this.zoomValue = 18;
            }
            else {
                _this.seteventtype = _this.eventsList.seteventtype;
                _this.lat = 1.3521;
                _this.lng = 103.8198;
                _this.zoomValue = 8;
            }
            _this.Date = _this.eventsList.Date;
            _this.dayName = new Date(_this.Date).toLocaleString("en-us", {
                weekday: "long"
            });
            _this.endDate = _this.eventsList.endDate;
            _this.endDayName = new Date(_this.endDate).toLocaleString("en-us", {
                weekday: "long"
            });
            _this.startTime = new Date("1970-01-01T" + _this.eventsList.startTime + "Z").toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour12: true,
                hour: "numeric",
                minute: "numeric"
            });
            _this.endTime = new Date("1970-01-01T" + _this.eventsList.endTime + "Z").toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour12: true,
                hour: "numeric",
                minute: "numeric"
            });
            _this.price = _this.eventsList.price;
            _this.description = _this.eventsList.description;
            _this.address1 = _this.eventsList.address1;
            _this.address2 = _this.eventsList.address2;
            _this.country = _this.eventsList.country;
            _this.isIcon = true;
        });
        this.getPublicTags();
    };
    EventDetailsComponent.prototype.ngOnInit = function () {
    };
    EventDetailsComponent.prototype.searchbytag = function (value) {
        this.router.navigate(['view/events/' + value]);
        // console.log('tags', value);
    };
    EventDetailsComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    EventDetailsComponent.prototype.copyToClipboard = function () {
        if (this.storage.isLoggednIn()) {
            this.event.copyClipboard();
            this.api.alert('Link Copied', 'success');
        }
    };
    EventDetailsComponent.prototype.getPublicTags = function () {
        var _this = this;
        this.api.get('gettag').subscribe(function (res) {
            _this.alltags = res.tagData;
            _this.alltags.forEach(function (element) {
                var _a;
                (_a = _this.eventsList) === null || _a === void 0 ? void 0 : _a.tags.filter(function (tags) {
                    if (element.tags === tags) {
                        if (element.status == true) {
                            _this.eventTags.push(element.tags);
                        }
                    }
                });
            });
            console.log(_this.eventTags, "classTags");
        });
    };
    EventDetailsComponent.prototype.getEvents = function () {
        var _this = this;
        this.api.get("eventdetailssection?eventId=" + this.id).subscribe(function (res) {
            _this.sectionData = res.description;
            // console.log(this.sectionData, res, "sectionData")
            // this.sectionData.forEach((item: any) => {
            //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
            // })
        });
    };
    // getEvents() {
    //   this.api.get("eventdetailssection").subscribe((res: any) => {
    //     this.sectionData = res.description;
    //     console.log(this.sectionData, res, "sectionData")
    //     this.sectionData.forEach((item: any) => {
    //       this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
    //     })
    //   });
    // }
    EventDetailsComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=events').subscribe(function (res) {
            var _a, _b, _c;
            //console.log(res.wishlistedData);
            _this.wishlisteddata = res.wishlistedData;
            for (var i = 0; i < _this.wishlisteddata.length; i++) {
                if (((_a = _this.wishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    if (((_b = _this.eventsList) === null || _b === void 0 ? void 0 : _b._id) === ((_c = _this.wishlisteddata[i]) === null || _c === void 0 ? void 0 : _c.wishlistedId)) {
                        _this.favItem = true;
                    }
                }
                // } else {
                //   this.favItem = false;
                // }
            }
        });
    };
    EventDetailsComponent.prototype.addtoClassWishList = function (eventid) {
        if (this.storage.isLoggednIn()) {
            this.favItem = true;
            this.api.alert('Added to Shortlist', 'success');
            var requestData = {};
            requestData["type"] = 'events';
            requestData["wishlistedId"] = eventid;
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (favAdded === "Added to your wishlist successfully") {
                    // this.api.alert('Added to Shortlist', 'success');
                }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    EventDetailsComponent.prototype.deleteClassWishlist = function (eventid) {
        if (this.storage.isLoggednIn()) {
            this.favItem = false;
            this.api.alert('Removed from Shortlist', 'success');
            var requestData = {};
            requestData["wishlistedId"] = eventid;
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (favAdded === "Your wishlisted Item removed successfully") {
                }
                // } else {
                //   this.favItem = true;
                //   // this.api.alert('Remove to wishlist', 'error');
                // }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    EventDetailsComponent.prototype.showMoreData = function (sectiontitle) {
        var DetailType = 'forevents';
        this.router.navigate(["/group/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
    };
    EventDetailsComponent.prototype.mapClicked = function (event) {
        // console.log(event);
        // // this.lat = event.coords.latitude;
        // // this.lng = event.coords.longitude;
        // this.locationchoosen = true;
    };
    EventDetailsComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    EventDetailsComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    EventDetailsComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    EventDetailsComponent.prototype.getClassDetails = function (id) {
        var newId = atob(id);
        this.router.navigate(["/view/class-details/" + newId]);
    };
    EventDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-event-details",
            templateUrl: "./event-details.component.html",
            styleUrls: ["./event-details.component.scss"],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], EventDetailsComponent);
    return EventDetailsComponent;
}());
exports.EventDetailsComponent = EventDetailsComponent;
