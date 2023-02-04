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
    function MarketplaceDetailsComponent(api, router, route, storage) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.storage = storage;
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
        this.productwishlisteddata = [];
        this.ischatButton = true;
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.getAllproducts();
        });
    }
    MarketplaceDetailsComponent.prototype.ngOnInit = function () {
        // this.productdetailssection();
    };
    MarketplaceDetailsComponent.prototype.getAllproducts = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.userId = userData === null || userData === void 0 ? void 0 : userData._id;
        this.api.get('getproductsbyid?productId=' + this.id).subscribe(function (res) {
            var _a, _b;
            _this.allProductData = res.productsData;
            _this.productUserId = (_b = (_a = _this.allProductData) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b._id;
            if (_this.userId === _this.productUserId) {
                _this.ischatButton = true;
            }
            else {
                _this.ischatButton = false;
            }
            _this.getWishlist();
        });
    };
    MarketplaceDetailsComponent.prototype.chatToBusiness = function () {
        this.router.navigate(["/pages/chat/" + '/' + this.productUserId]);
    };
    MarketplaceDetailsComponent.prototype.productdetailssection = function () {
        var _this = this;
        this.api.get("productdetailssection?productId=" + this.id).subscribe(function (res) {
            _this.sectionData = res.description;
            //console.log(_this.sectionData, res, "sectionData");
            _this.sectionData.forEach(function (item) {
                _this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section });
            });
        });
    };
    MarketplaceDetailsComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=products').subscribe(function (res) {
            var _a, _b, _c;
            //console.log(res.wishlistedData);
            _this.productwishlisteddata = res.wishlistedData;
            for (var i = 0; i < _this.productwishlisteddata.length; i++) {
                if (((_a = _this.productwishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    if (((_b = _this.allProductData) === null || _b === void 0 ? void 0 : _b._id) === ((_c = _this.productwishlisteddata[i]) === null || _c === void 0 ? void 0 : _c.wishlistedId)) {
                        _this.favItem = true;
                    }
                }
                else {
                    _this.favItem = false;
                }
            }
        });
    };
    MarketplaceDetailsComponent.prototype.addtoClassWishList = function (classId) {
        var _this = this;
        var requestData = {};
        requestData["type"] = 'classes';
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (favAdded === "Added to your wishlist successfully") {
                    _this.favItem = true;
                    _this.api.alert('Added to your Shortlist', 'success');
                }
                else {
                    _this.favItem = false;
                    // this.api.alert('Remove to wishlist', 'error');
                }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    MarketplaceDetailsComponent.prototype.deleteClassWishlist = function (classId) {
        var _this = this;
        var requestData = {};
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (favAdded === "Your wishlisted Item removed successfully") {
                    _this.favItem = false;
                    _this.api.alert('Removed to wishlist', 'success');
                }
                else {
                    _this.favItem = true;
                    // this.api.alert('Remove to wishlist', 'error');
                }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
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
