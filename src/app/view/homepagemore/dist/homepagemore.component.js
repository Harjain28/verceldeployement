"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomepagemoreComponent = void 0;
var core_1 = require("@angular/core");
var HomepagemoreComponent = /** @class */ (function () {
    function HomepagemoreComponent(api, router, storage, route) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.groups = [];
        this.sectionData = [];
        this.sections = [];
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: true,
            autoplay: true,
            navSpeed: 300,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 1,
                    skip_validateItems: true
                },
                400: {
                    items: 2,
                    skip_validateItems: true
                },
                740: {
                    items: 3,
                    skip_validateItems: true
                },
                940: {
                    items: 1,
                    skip_validateItems: true
                }
            },
            nav: false
        };
        this.slides = [
            { id: 1, img: "./assets/images/banner2.svg" },
            { id: 2, img: "./assets/images/banner2.svg" },
            { id: 3, img: "./assets/images/banner1.svg" },
            { id: 4, img: "./assets/images/banner1.svg" },
        ];
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
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                400: {
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                768: {
                    items: 2,
                    skip_validateItems: true,
                    loop: true
                },
                940: {
                    items: 4,
                    skip_validateItems: true,
                    loop: true
                }
            },
            nav: false
        };
        this.customOptions3 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 100,
            //autoplayTimeout:2000,
            autoplaySpeed: 100,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 2,
                    responsiveRefreshRate: 200,
                    skip_validateItems: true,
                    loop: true
                },
                400: {
                    items: 3,
                    responsiveRefreshRate: 200,
                    skip_validateItems: true,
                    loop: true
                },
                768: {
                    items: 2,
                    responsiveRefreshRate: 200,
                    skip_validateItems: true,
                    loop: true
                },
                940: {
                    items: 4,
                    // responsiveRefreshRate: 200,
                    skip_validateItems: true,
                    loop: true
                }
            }
        };
        this.customOptions4 = {
            loop: false,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            dots: false,
            autoplay: false,
            navSpeed: 700,
            autoWidth: true,
            items: 4,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            // navText: ["", ""],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 7
                },
                768: {
                    items: 5
                },
                940: {
                    items: 10
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
            autoWidth: true,
            items: 4,
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
        this.customOptions6 = {
            loop: false,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: false,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["<", ">"],
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
        this.route.params.subscribe(function (params) {
            _this.sectionTitle = params["sectionName"];
            _this.gethomesection();
        });
    }
    HomepagemoreComponent.prototype.ngOnInit = function () {
        // this.gethomesection();
    };
    HomepagemoreComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    HomepagemoreComponent.prototype.gethomesection = function () {
        var _this = this;
        this.api.get("homesection").subscribe(function (res) {
            for (var i = 0; i <= res.description.length; i++) {
                if (res.description[i].title === _this.sectionTitle) {
                    _this.sectionData.push(res.description[i]);
                    _this.sectionData.forEach(function (item) {
                        _this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section });
                    });
                }
            }
        });
    };
    HomepagemoreComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    HomepagemoreComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    HomepagemoreComponent.prototype.getClassDetails = function (id) {
        var newID = atob(id);
        this.router.navigate(["/view/class-details/" + newID]);
    };
    HomepagemoreComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    HomepagemoreComponent = __decorate([
        core_1.Component({
            selector: 'app-homepagemore',
            templateUrl: './homepagemore.component.html',
            styleUrls: ['./homepagemore.component.scss']
        })
    ], HomepagemoreComponent);
    return HomepagemoreComponent;
}());
exports.HomepagemoreComponent = HomepagemoreComponent;
