"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarketplaceDetailsComponent = void 0;
var core_1 = require("@angular/core");
var MarketplaceDetailsComponent = /** @class */ (function () {
    function MarketplaceDetailsComponent(api, router, route) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
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
                    items: 2
                },
                400: {
                    items: 3
                },
                740: {
                    items: 4
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
            navText: ['', ''],
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
        this.sectionData = [];
        this.sections = [];
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.api.get('getproductsbyid?productId=' + _this.id).subscribe(function (res) {
                _this.allProductData = res.productsData;
                //console.log(_this.allProductData);
            });
        });
    }
    MarketplaceDetailsComponent.prototype.ngOnInit = function () {
        this.productdetailssection();
        window.scrollTo(0, 0);
    };
    MarketplaceDetailsComponent.prototype.productdetailssection = function () {
        var _this = this;
        this.api.get("productdetailssection").subscribe(function (res) {
            _this.sectionData = res.description;
            //console.log(_this.sectionData, res, "sectionData");
            _this.sectionData.forEach(function (item) {
                _this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section });
            });
        });
    };
    MarketplaceDetailsComponent.prototype.redirectToMarketplace = function (value) {
        this.router.navigate(["/view/marketplace/" + value]);
    };
    MarketplaceDetailsComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    MarketplaceDetailsComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    MarketplaceDetailsComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    MarketplaceDetailsComponent.prototype.getClassDetails = function (id) {
        this.router.navigate(["/group/class-details/" + id]);
    };
    MarketplaceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-marketplace-details',
            templateUrl: './marketplace-details.component.html',
            styleUrls: ['./marketplace-details.component.scss']
        })
    ], MarketplaceDetailsComponent);
    return MarketplaceDetailsComponent;
}());
exports.MarketplaceDetailsComponent = MarketplaceDetailsComponent;
