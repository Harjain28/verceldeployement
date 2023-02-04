"use strict";
//by Harshit jain for Marketplace product.
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
exports.MarketplaceComponent = void 0;
var core_1 = require("@angular/core");
var MarketplaceComponent = /** @class */ (function () {
    function MarketplaceComponent(api, router, route, storage) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.panelOpenState = false;
        this.allProducts = [];
        this.newProduct = [];
        this.usedProduct = [];
        this.freeProduct = [];
        this.newProducts = [];
        this.allCategories = [];
        this.RepetedCategory = [];
        this.newcategoryArray = [];
        this.newUsedProductdata = [];
        this.newNewProductdata = [];
        this.newFreeProductdata = [];
        this.newNewProduct = [];
        this.productWishlisteddata = [];
        this.newWishlostProduct = [];
        this.route.params.subscribe(function (params) {
            _this.category = params['Category'];
            _this.getMarketplaceProduct();
        });
    }
    MarketplaceComponent.prototype.ngOnInit = function () {
        this.getProductCategories();
        // this.getWishlist();
    };
    MarketplaceComponent.prototype.onTabClick = function (event) {
        this.filterValue = event.tab.textLabel;
        //console.log(this.filterValue);
        this.searchAllproducts();
        if (this.category && this.category.trim() !== '') {
            this.getMarketplaceProduct();
        }
    };
    MarketplaceComponent.prototype.getProductCategories = function () {
        var _this = this;
        this.api.get("getproductCategory").subscribe(function (res) {
            _this.pCategories = res.CategoryData;
        });
    };
    MarketplaceComponent.prototype.getMarketplaceProduct = function () {
        var _this = this;
        if (this.category && this.category.trim() !== '') {
            this.api.get("searchontype?type=product&selectedName=" + this.category).subscribe(function (res) {
                // this.allProducts = res.data;
                _this.newProducts = res.data;
            });
        }
        else {
            this.allProductData();
            this.allUsedProduct();
            this.allNewProduct();
            this.allFreeProduct();
        }
    };
    MarketplaceComponent.prototype.getCategoryinProductData = function () {
        var _this = this;
        this.newProducts.forEach(function (element) {
            element.categoryId.forEach(function (elem) {
                _this.allCategories.push(elem.categoryName);
            });
        });
        this.RepetedCategory = __spreadArrays(new Set(this.allCategories));
        this.newcategoryArray = this.RepetedCategory;
    };
    MarketplaceComponent.prototype.allProductData = function () {
        var _this = this;
        this.api.get("getproducts?limit=50&page=0").subscribe(function (res) {
            _this.allProducts = res.productsData;
            _this.newProducts = _this.allProducts;
            _this.getCategoryinProductData();
            _this.getWishlist();
        });
    };
    MarketplaceComponent.prototype.allUsedProduct = function () {
        var _this = this;
        this.api.get("getproducts?limit=50&page=0&type=used").subscribe(function (res) {
            _this.usedProductdata = res.productsData;
            _this.newUsedProductdata = _this.usedProductdata;
            _this.getCategoryinProductData();
            _this.getWishlist();
            //console.log(_this.usedProductdata, "usedproductdata");
        });
    };
    MarketplaceComponent.prototype.allNewProduct = function () {
        var _this = this;
        this.api.get("getproducts?limit=50&page=0&type=new").subscribe(function (res) {
            _this.newProduct = res.productsData;
            _this.newNewProductdata = _this.newProduct;
            // this.newProducts = this.allProducts;
            _this.getCategoryinProductData();
            _this.getWishlist();
            //console.log(_this.newProduct, "newproductdata");
        });
    };
    MarketplaceComponent.prototype.allFreeProduct = function () {
        var _this = this;
        this.api.get("getproducts?limit=50&page=0&type=free").subscribe(function (res) {
            _this.freeProduct = res.productsData;
            _this.newFreeProductdata = _this.freeProduct;
            _this.getCategoryinProductData();
            _this.getWishlist();
            //console.log(_this.freeProduct, "freeroductdata");
        });
    };
    // productFilters() {
    //   for (var i = 0; i < this.newProducts.length; i++) {
    //     if (this.newProducts[i].condition === 'new') {
    //       this.usedProductdata.push(this.newProducts[i]);
    //     }
    //   }
    //   for (var i = 0; i < this.newProducts.length; i++) {
    //     if (this.newProducts[i].condition === 'used') {
    //       this.newProduct.push(this.newProducts[i]);
    //     }
    //   }
    //   for (var i = 0; i < this.newProducts.length; i++) {
    //     if (this.newProducts[i].price === 'forfree') {
    //       this.freeProduct.push(this.newProducts[i]);
    //     }
    //   }
    // }
    MarketplaceComponent.prototype.searchAllproducts = function () {
        var _this = this;
        if (this.category && this.searchvalue && this.searchvalue.trim() !== '') {
            this.api.get("searchontype?type=product&selectedName=" + this.category + '&filtervalue="' + this.filterValue + '&text=' + this.searchvalue).subscribe(function (res) {
                if (_this.filterValue === 'Used Products') {
                    _this.newUsedProductdata = res.data;
                }
                else if (_this.filterValue === 'New Products') {
                    _this.newNewProduct = res.data;
                }
                else if (_this.filterValue === 'Free Products') {
                    _this.newFreeProductdata = res.data;
                }
                else {
                    _this.newProducts = res.data;
                }
            });
        }
        else if (this.searchvalue && this.searchvalue.trim() !== '') {
            this.api.get("searchontype?type=product&selectedName=&filtervalue=" + this.filterValue + '&text=' + this.searchvalue).subscribe(function (res) {
                if (_this.filterValue === 'Used Products') {
                    _this.newUsedProductdata = res.data;
                }
                else if (_this.filterValue === 'New Products') {
                    _this.newNewProduct = res.data;
                }
                else if (_this.filterValue === 'Free Products') {
                    _this.newFreeProductdata = res.data;
                }
                else {
                    _this.newProducts = res.data;
                }
                //  this.productFilters();
            });
        }
        else {
            this.newProducts = [];
            this.newUsedProductdata = [];
            this.newNewProduct = [];
            this.newFreeProductdata = [];
            this.newUsedProductdata = this.usedProductdata;
            this.newNewProduct = this.newProduct;
            this.newFreeProductdata = this.freeProduct;
            this.newProducts = this.allProducts;
        }
    };
    MarketplaceComponent.prototype.SearchbyCategory = function (value) {
        var _this = this;
        if (value) {
            this.subcategoryValue = value;
            this.api.get("searchontype?type=product&selectedName=" + value).subscribe(function (res) {
                _this.allProducts = res.data;
                _this.newProducts = _this.allProducts;
            });
        }
    };
    MarketplaceComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=products').subscribe(function (res) {
            var _a;
            //console.log(res.wishlistedData);
            _this.productWishlisteddata = res.wishlistedData;
            var _loop_1 = function (i) {
                if (((_a = _this.productWishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    _this.newProducts.forEach(function (element) {
                        var _a;
                        if (element._id === ((_a = _this.productWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                    });
                    _this.newUsedProductdata.forEach(function (element) {
                        var _a;
                        if (element._id === ((_a = _this.productWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                    });
                    _this.newNewProduct.forEach(function (element) {
                        var _a;
                        if (element._id === ((_a = _this.productWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                    });
                    _this.newFreeProductdata.forEach(function (element) {
                        var _a;
                        if ((element === null || element === void 0 ? void 0 : element._id) === ((_a = _this.productWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                    });
                }
            };
            for (var i = 0; i < _this.productWishlisteddata.length; i++) {
                _loop_1(i);
            }
        });
    };
    MarketplaceComponent.prototype.addtoProductWishList = function (classId) {
        var _this = this;
        var requestData = {};
        this.newWishlostProduct = __spreadArrays(this.newProducts, this.newNewProduct, this.newFreeProductdata, this.newUsedProductdata);
        requestData["type"] = 'products';
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var _a;
                var favAdded = res.message;
                for (var i = 0; i <= _this.newWishlostProduct.length; i++) {
                    if (favAdded === "Added to your wishlist successfully") {
                        if (((_a = _this.newWishlostProduct[i]) === null || _a === void 0 ? void 0 : _a._id) === classId) {
                            _this.newWishlostProduct[i].selected = true;
                            _this.api.alert('Added to your Shortlist', 'success');
                        }
                    }
                    else {
                        _this.newWishlostProduct[i].selected = false;
                        _this.api.alert('Remove to wishlist', 'error');
                    }
                }
            });
        }
        else {
            this.router.navigate(['/login/student']);
        }
    };
    MarketplaceComponent.prototype.deleteProductWishlist = function (classId) {
        var _this = this;
        var requestData = {};
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var _a;
                var favAdded = res.message;
                for (var i = 0; i <= _this.newWishlostProduct.length; i++) {
                    if (favAdded === "Your wishlisted Item removed successfully") {
                        if (((_a = _this.newWishlostProduct[i]) === null || _a === void 0 ? void 0 : _a._id) === classId) {
                            _this.newWishlostProduct[i].selected = false;
                            _this.api.alert('Removed to wishlist', 'success');
                        }
                    }
                    else {
                        _this.newWishlostProduct[i].selected = true;
                        // this.api.alert('Add to wishlist', 'error');
                    }
                }
            });
        }
        else {
            this.router.navigate(['/login/student']);
        }
    };
    MarketplaceComponent.prototype.resetbyTag = function () {
        this.allProductData();
        this.subcategoryValue = '';
    };
    MarketplaceComponent.prototype.redirectToMarketplaceDetails = function (id) {
        this.router.navigate(["/view/marketplace-details/" + id]);
    };
    MarketplaceComponent = __decorate([
        core_1.Component({
            selector: 'app-marketplace',
            templateUrl: './marketplace.component.html',
            styleUrls: ['./marketplace.component.scss']
        })
    ], MarketplaceComponent);
    return MarketplaceComponent;
}());
exports.MarketplaceComponent = MarketplaceComponent;
