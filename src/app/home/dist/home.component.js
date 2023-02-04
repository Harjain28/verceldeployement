"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(api, router, event, storage, breakpointObserver) {
        this.api = api;
        this.router = router;
        this.event = event;
        this.storage = storage;
        this.breakpointObserver = breakpointObserver;
        this.classList = [];
        this.images = [];
        this.trendingImages = [];
        this.subCategories = [];
        this.articles = [];
        this.events = [];
        this.eventsData = [];
        this.articleData = [];
        this.groups = [];
        this.sectionData = [];
        this.sections = [];
        this.bannerImage = [];
        this.sectionInfo = [];
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 300,
            nav: true,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            // navText: ["", ""],
            navText: ["<img src='https://appicsoftwares.com/wp-content/themes/appic/assets/website/images/arrow-left.svg'>", "<img src='https://appicsoftwares.com/wp-content/themes/appic/assets/website/images/arrow-left.svg'>"],
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
            }
        };
        this.slides = [];
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
        this.allowLocation();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breakpointObserver
            .observe(['(min-width: 500px)'])
            .subscribe(function (state) {
            if (state.matches) {
                _this.api.get("getHomepagebanner?type=web").subscribe(function (res) {
                    _this.bannerImage = res.result;
                });
            }
            else {
                _this.api.get("getHomepagebanner?type=application").subscribe(function (res) {
                    _this.bannerImage = res.result;
                });
            }
        });
        this.getsubcategory();
    };
    HomeComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    HomeComponent.prototype.allowLocation = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log(position.coords.latitude, position.coords.longitude);
        });
    };
    HomeComponent.prototype.getLatLong = function (lat, long) {
        // console.log(lat, long);
    };
    HomeComponent.prototype.redirectionBanner = function (bannerdata) {
        if ((bannerdata === null || bannerdata === void 0 ? void 0 : bannerdata.objtype) === 'articles') {
            this.router.navigate(["/group/articles-details/" + bannerdata.Obj]);
        }
        else if ((bannerdata === null || bannerdata === void 0 ? void 0 : bannerdata.objtype) === '"classes"') {
            this.router.navigate(["/view/class-details/" + bannerdata.Obj]);
        }
        else if ((bannerdata === null || bannerdata === void 0 ? void 0 : bannerdata.objtype) === 'events') {
            this.router.navigate(["/group/event-details/" + bannerdata.Obj]);
        }
        else {
            this.router.navigate(["/group/group-details/" + bannerdata.Obj]);
        }
    };
    HomeComponent.prototype.gethomesection = function () {
        var _this = this;
        this.api.get("homesection").subscribe(function (res) {
            _this.sectionData = res.description;
            _this.sectionData.forEach(function (item) {
                _this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section });
            });
            if (_this.sectionData.length > 0) {
                _this.getStaticPageInfo();
            }
        });
    };
    HomeComponent.prototype.getsubcategory = function () {
        var _this = this;
        this.api.get("getsubcategory").subscribe(function (item) {
            var data = item.SubcategoryData;
            data.forEach(function (cate) {
                _this.subCategories.push({
                    subCategoryId: cate._id,
                    subCategoryName: cate.subCategory,
                    subCategoryImage: cate.image
                });
            });
            _this.gethomesection();
        });
    };
    HomeComponent.prototype.showAllData = function (sectiontitle) {
        this.router.navigate(["/view/homepage-more/" + sectiontitle]);
    };
    HomeComponent.prototype.getStaticPageInfo = function () {
        var _this = this;
        this.api.get('staticpageinfosection').subscribe(function (res) {
            // console.log(res);
            _this.sectionInfo = res.sectionData;
            _this.aboutUs = res.sectionData[0];
            _this.AppTitle = res.sectionData[7];
            _this.AppDescription = res.sectionData[8];
            _this.googlePlayLink = res.sectionData[9];
            _this.appleStore = res.sectionData[10];
            _this.faceBookLink = res.sectionData[11];
            _this.twitterLink = res.sectionData[12];
            _this.instagramLink = res.sectionData[13];
            _this.googleLink = res.sectionData[14];
        });
    };
    // getArticles() {
    //   this.api.get("getarticles").subscribe((res: any) => {
    //     this.articles = res.articleData;
    //   });
    // }
    // getEvents() {
    //   this.api.get("getevent").subscribe((res: any) => {
    //     this.events = res.eventData;
    //     console.log(this.events);
    //   });
    // }
    // getGroups() {
    //   this.api.get("getgroups").subscribe((res: any) => {
    //     this.groups = res.data;
    //     console.log(res, "groupsgroups");
    //   });
    // }
    // getClassListing() {
    //   this.api.get("classListing?type=").subscribe((res: any) => {
    //     this.classList = res?.classData;
    //     console.log(this.classList);
    //     this.classList.forEach((item) => {
    //       this.images.push({
    //         id: item?._id,
    //         image: item?.image[0],
    //         businessName: item?.businessName,
    //         location: item?.admin_id?.address1
    //       });
    //     });
    //     console.log(this.images, "imagesin ");
    //   });
    //   this.api.get("classListing?type=trending").subscribe((res: any) => {
    //     this.classList = res?.classData;
    //     console.log(this.classList);
    //     this.classList.forEach((item) => {
    //       this.trendingImages.push({
    //         id: item?._id,
    //         image: item?.image[0],
    //         businessName: item?.businessName,
    //         location: item?.admin_id?.address1
    //       });
    //     });
    //   });
    // }
    HomeComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    HomeComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    HomeComponent.prototype.getClassCategory = function (id) {
        var newID = atob(id);
        this.router.navigate(["/view/class-list/" + newID]);
    };
    HomeComponent.prototype.getClassDetails = function (id) {
        var newID = atob(id);
        this.router.navigate(["/view/class-details/" + newID]);
    };
    HomeComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.scss"]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
