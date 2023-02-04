"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticlesDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ArticlesDetailsComponent = /** @class */ (function () {
    function ArticlesDetailsComponent(api, router, storage, route, event) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.event = event;
        this.sectionData = [];
        this.sections = [];
        this.favItem = false;
        this.alltags = [];
        this.articleTags = [];
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
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.getWishlist();
            _this.getArticles();
            _this.api.get("getarticlesbyid?articleId=" + _this.id).subscribe(function (res) {
                //console.log(res);
                _this.ArticleList = res.articleData;
                _this.getPublicTags();
            });
        });
    }
    ArticlesDetailsComponent.prototype.ngOnInit = function () {
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.userId = userData === null || userData === void 0 ? void 0 : userData._id;
    };
    ArticlesDetailsComponent.prototype.getArticles = function () {
        var _this = this;
        this.api.get("articledetailsection?articleId=" + this.id).subscribe(function (res) {
            _this.sectionData = res.description;
        });
    };
    // getArticles() {
    //   this.api.get("articledetailsection").subscribe((res: any) => {
    //     this.sectionData = res.description;
    //     console.log(this.sectionData, res, "sectionData")
    //     this.sectionData.forEach((item: any) => {
    //       this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
    //     })
    //   });
    // }
    ArticlesDetailsComponent.prototype.searchbyTag = function (value) {
        var tags = "tags";
        this.router.navigate(['group/articles/' + tags + '/' + value]);
        // console.log('tags', value);
    };
    ArticlesDetailsComponent.prototype.searchbyGroup = function (value) {
        this.router.navigate(['group/group-details/' + value]);
        // console.log('tags', value);
    };
    ArticlesDetailsComponent.prototype.searchbySubject = function (value) {
        var subjects = "subjects";
        this.router.navigate(['group/articles/' + subjects + '/' + value]);
        // console.log('tags', value);
    };
    ArticlesDetailsComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=articles').subscribe(function (res) {
            var _a, _b, _c;
            //console.log(res.wishlistedData);
            _this.wishlisteddata = res.wishlistedData;
            for (var i = 0; i < _this.wishlisteddata.length; i++) {
                if (((_a = _this.wishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    if (((_b = _this.ArticleList) === null || _b === void 0 ? void 0 : _b._id) === ((_c = _this.wishlisteddata[i]) === null || _c === void 0 ? void 0 : _c.wishlistedId)) {
                        _this.favItem = true;
                    }
                }
            }
        });
    };
    ArticlesDetailsComponent.prototype.getPublicTags = function () {
        var _this = this;
        this.api.get('gettag').subscribe(function (res) {
            _this.alltags = res.tagData;
            _this.alltags.forEach(function (element) {
                var _a;
                (_a = _this.ArticleList) === null || _a === void 0 ? void 0 : _a.tags.filter(function (tags) {
                    if (element.tags === tags) {
                        if (element.status == true) {
                            _this.articleTags.push(element.tags);
                        }
                    }
                });
            });
            console.log(_this.articleTags, "classTags");
        });
    };
    ArticlesDetailsComponent.prototype.addtoArticlesWishList = function (articleId) {
        var _this = this;
        this.favItem = true;
        var requestData = {};
        requestData["type"] = 'articles';
        requestData["wishlistedId"] = articleId;
        if (this.storage.isLoggednIn()) {
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (favAdded === "Added to your wishlist successfully") {
                    _this.api.alert('Added to  Shortlist', 'success');
                }
                // } else {
                //   this.favItem = false;
                //   // this.api.alert('Remove to wishlist', 'error');
                // }
            });
        }
        else {
            this.router.navigate(["/login"]);
        }
    };
    ArticlesDetailsComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    ArticlesDetailsComponent.prototype.deleteArticlesWishlist = function (articleId) {
        this.favItem = false;
        this.api.alert('Removed from Shortlist', 'success');
        var requestData = {};
        requestData["wishlistedId"] = articleId;
        if (this.storage.isLoggednIn()) {
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
                // if (favAdded === "Your wishlisted Item removed successfully") {
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
    ArticlesDetailsComponent.prototype.copyToClipboard = function () {
        if (this.storage.isLoggednIn()) {
            this.event.copyClipboard();
            this.api.alert('Link Copied', 'success');
        }
    };
    ArticlesDetailsComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    ArticlesDetailsComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    ArticlesDetailsComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    ArticlesDetailsComponent.prototype.getClassDetails = function (id) {
        var newId = atob(id);
        this.router.navigate(["/view/class-details/" + newId]);
    };
    ArticlesDetailsComponent.prototype.showMoreData = function (sectiontitle) {
        var DetailType = 'forarticles';
        this.router.navigate(["/group/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
    };
    ArticlesDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-articles-details",
            templateUrl: "./articles-details.component.html",
            styleUrls: ["./articles-details.component.scss"]
        })
    ], ArticlesDetailsComponent);
    return ArticlesDetailsComponent;
}());
exports.ArticlesDetailsComponent = ArticlesDetailsComponent;
