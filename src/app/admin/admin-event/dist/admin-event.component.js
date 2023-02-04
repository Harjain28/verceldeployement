"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminEventComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var AdminEventComponent = /** @class */ (function () {
    function AdminEventComponent(api, router, route, http) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.http = http;
        this.eventsList = [];
        this.image = [];
        this.groupsName = [];
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
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            _this.newtoken = localStorage.getItem("admintoken");
            // console.log(_this.newtoken);
            _this.httpOptions = {
                headers: new http_1.HttpHeaders({
                    Authorization: _this.newtoken
                })
            };
            _this.http
                .get(_this.API_URL + "eventdetailsbyIdadmin?eventId=" +
                _this.id, { headers: _this.httpOptions.headers, params: params })
                .subscribe(function (res) {
                var _a, _b, _c;
                // console.log(res, "eventdetailsbyId");
                _this.eventsList = res.eventData;
                _this.title = _this.eventsList.title;
                _this.Date = _this.eventsList.Date;
                _this.dayName = new Date(_this.Date).toLocaleString("en-us", {
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
                _this.image = _this.eventsList.image;
                _this.contactName = (_a = _this.eventsList) === null || _a === void 0 ? void 0 : _a.contactName;
                _this.tagName = (_b = _this.eventsList) === null || _b === void 0 ? void 0 : _b.tags; //hj
                _this.groupsName.push((_c = _this.eventsList) === null || _c === void 0 ? void 0 : _c.groupId); //hj
                if (_this.eventsList.seteventtype == 'Inperson') {
                    _this.seteventtype = "In-Person";
                }
                else {
                    _this.seteventtype = _this.eventsList.seteventtype;
                }
            });
        });
    }
    AdminEventComponent.prototype.ngOnInit = function () { };
    AdminEventComponent.prototype.ngOnDestroy = function () {
        this.router.navigate(["/admin/admin-events/" + this.id + "/" + this.token]);
    };
    AdminEventComponent = __decorate([
        core_1.Component({
            selector: "app-admin-event",
            templateUrl: "./admin-event.component.html",
            styleUrls: ["./admin-event.component.scss"]
        })
    ], AdminEventComponent);
    return AdminEventComponent;
}());
exports.AdminEventComponent = AdminEventComponent;
