"use strict";
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
exports.ArticlesComponent = void 0;
var core_1 = require("@angular/core");
var ArticlesComponent = /** @class */ (function () {
    // isHidden: boolean = true;
    function ArticlesComponent(api, router, route, storage) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.panelOpenState = false;
        this.articles = [];
        this.expanded = true;
        this.tagsData = [];
        this.trendingArticles = [];
        this.sectionData = [];
        this.sections = [];
        this.articleData = [];
        this.newArticledata = [];
        this.allTags = [];
        this.newallTags = [];
        this.Repetedtags = [];
        this.newTagsArray = [];
        this.types = '';
        this.newTrendingData = [];
        this.articledatabool = false;
        this.favItem = false;
        this.favArticles = [];
        this.articleWithGroup = [];
        this.itemperpage = 10;
        this.pagenumber = 1;
        this.tagspagenumber = 1;
        this.iscallarticle = false;
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            autoWidth: true,
            items: 2,
            responsive: {
                0: {},
                400: {},
                740: {},
                940: {}
            },
            nav: false
        };
        this.articleWishlisteddata = [];
        this.tagsbool = false;
        this.searchpagenumber = 1;
        this.tagSearchpageNumber = 1;
        this.redirectSubjectpagenumber = 1;
        this.redirecttagspagenumber = 0;
        this.isTagShow = true;
        this.clearIcon = false;
        this.route.params.subscribe(function (params) {
            _this.tagvalue = params['value'];
            _this.types = params['type'];
            _this.getWishlist();
        });
        if (!this.tagsValue) {
            this.getAllArticles();
        }
    }
    ArticlesComponent.prototype.ngOnInit = function () {
        this.searchArticles = '';
        this.loginOrNot = localStorage.getItem("LoggedIn");
        this.getTags();
        this.getAllarticleData();
        if (this.storage.isLoggednIn()) {
            this.getFavouriteArticlesbyUser();
            this.getJoinGroupArticles();
        }
        // this.getWishlist();
        //console.log(this.searchArticles, 'searchArticles');
    };
    ArticlesComponent.prototype.getAllarticleData = function () {
        var _this = this;
        this.iscallarticle = false;
        if (this.tagvalue && this.tagvalue.trim() !== '') {
            if (this.types === 'subjects') {
                this.api.get("searchontype?type=articles&selectedName=&subject=" + this.tagvalue + '&limit=' + this.itemperpage + '&page=' + this.redirectSubjectpagenumber).subscribe(function (res) {
                    _this.articles = res.data;
                    _this.newArticledata = _this.articles;
                    _this.functionForTrending(_this.articles);
                    //console.log(_this.newArticledata);
                    // this.getWishlist();
                });
            }
            else {
                if (this.redirecttagspagenumber <= 1) {
                    this.newArticledata = [];
                }
                var newconst_1 = this.newArticledata;
                this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue + '&limit=' + this.itemperpage + '&page=' + this.redirecttagspagenumber).subscribe(function (res) {
                    var tagsarticledata = [];
                    tagsarticledata.push.apply(tagsarticledata, __spreadArrays(newconst_1, res.data));
                    _this.newArticledata = tagsarticledata;
                    // this.getWishlist(); 
                    //console.log(_this.newArticledata);
                });
            }
        }
    };
    //for all trending
    ArticlesComponent.prototype.functionForTrending = function (data) {
        var tagsfilterArticles = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].trending === true) {
                tagsfilterArticles.push(data[i]);
            }
        }
        this.newTrendingData = tagsfilterArticles;
    };
    ArticlesComponent.prototype.filterBySubject = function (subject) {
        var _this = this;
        if (!this.tagvalue) {
            var tagsfilterArticles = [];
            this.subjectName = subject;
            this.api.get("searchontype?type=articles&selectedName=&subject=" + subject).subscribe(function (res) {
                _this.articles = res.data;
                _this.isTagShow = false;
                _this.newArticledata = _this.articles;
                _this.functionForTrending(_this.articles);
                //console.log(_this.newArticledata);
                _this.getWishlist();
            });
        }
    };
    ArticlesComponent.prototype.getAllArticles = function () {
        var _this = this;
        if (!this.tagvalue) {
            this.api.get('getarticles?limit=' + this.itemperpage + '&page=' + this.pagenumber).subscribe(function (res) {
                var _a;
                _this.articles = res.articleData;
                (_a = _this.newArticledata).push.apply(_a, _this.articles);
                _this.articledatabool = true;
                _this.iscallarticle = true;
                _this.forRepetedtags();
                _this.forTrendingArticles();
                _this.getWishlist();
                //console.log(_this.articles, "getarticles");
            });
        }
    };
    ArticlesComponent.prototype.forTrendingArticles = function () {
        this.iscallarticle = true;
        for (var i = 0; i < this.articles.length; i++) {
            if (this.articles[i].trending === true) {
                this.trendingArticles.push(this.articles[i]);
                this.newTrendingData = this.trendingArticles;
            }
        }
    };
    ArticlesComponent.prototype.getFavouriteArticlesbyUser = function () {
        var _this = this;
        this.api.get('favarticle').subscribe(function (res) {
            //console.log(res, "fav");
            _this.favArticles = new Set(res.wishlistedData);
        });
    };
    ArticlesComponent.prototype.getJoinGroupArticles = function () {
        var _this = this;
        this.api.get('favarticle').subscribe(function (res) {
            _this.articleWithGroup = res.articleData;
        });
    };
    ArticlesComponent.prototype.forRepetedtags = function () {
        var _this = this;
        this.newArticledata.forEach(function (element) {
            _this.allTags.push(__spreadArrays(element.tags));
        });
        for (var i = 0; i < this.allTags.length; i++) {
            this.newallTags = this.newallTags.concat(this.allTags[i]);
        }
        var newTags = [];
        newTags = __spreadArrays(new Set(this.newallTags));
        this.Repetedtags = newTags.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); });
        //console.log(this.Repetedtags);
        this.newTagsArray = this.Repetedtags;
    };
    ArticlesComponent.prototype.clearData = function () {
        this.searchvalue = '';
        this.clearIcon = false;
        // this.pagenumber = 1;
        // this.redirecttagspagenumber = 1;
        // this.newArticledata = [];
        //  this.getAllArticles()
    };
    // onKeySearchTags(value) {
    //   this.searchArticles = value;
    // }
    ArticlesComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    ArticlesComponent.prototype.searchByTags = function () {
        var term = this.searchArticles;
        this.Repetedtags = this.newTagsArray.filter(function (tag) {
            return tag.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    // searchByTags(value: string) {
    //   if (value && value.trim() !== '') {
    //     return this.newTagsArray.filter((tags) =>
    //       tags.toLo  werCase().startsWith(value.toLowerCase())
    //     );
    //   }
    // }
    ArticlesComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=articles').subscribe(function (res) {
            var _a;
            //console.log(res.wishlistedData);
            _this.articleWishlisteddata = res.wishlistedData;
            var _loop_1 = function (i) {
                if (((_a = _this.articleWishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    _this.newArticledata.forEach(function (element) {
                        var _a;
                        if (element._id === ((_a = _this.articleWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                        // else {
                        //   element.selected = false;
                        // }
                    });
                    if (_this.favArticles && _this.favArticles.length > 0) {
                        _this.favArticles.forEach(function (element) {
                            var _a, _b;
                            if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === ((_b = _this.articleWishlisteddata[i]) === null || _b === void 0 ? void 0 : _b.wishlistedId)) {
                                element.selected = true;
                            }
                            // else {
                            //   element.selected = false;
                            // }
                        });
                    }
                    _this.articleWithGroup.forEach(function (element) {
                        var _a;
                        if ((element === null || element === void 0 ? void 0 : element._id) === ((_a = _this.articleWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
                            element.selected = true;
                        }
                        // else {
                        //   element.selected = false;
                        // }
                    });
                }
            };
            for (var i = 0; i < _this.articleWishlisteddata.length; i++) {
                _loop_1(i);
            }
        });
    };
    ArticlesComponent.prototype.addtoArticleWishList = function (articleId, likebool) {
        var _this = this;
        if (this.storage.isLoggednIn()) {
            this.favAdded = likebool;
            if (this.favAdded) {
                var requestData = {};
                requestData["type"] = 'articles';
                requestData["wishlistedId"] = articleId;
                this.api.post('addwishlist', requestData).subscribe(function (res) {
                    var favAdded = res.message;
                    // this.getWishlist();
                    _this.favAdded = false;
                    if (res.status) {
                        _this.getFavouriteArticlesbyUser();
                    }
                });
            }
            else {
                this.router.navigate(["/login/student"]);
            }
            if (this.storage.isLoggednIn()) {
                this.newArticledata.forEach(function (element) {
                    if (element._id === articleId) {
                        element.selected = true;
                        _this.api.alert('Added to Shortlist', 'success');
                    }
                    // else {
                    //   this.newArticledata[i].selected = false;
                    //   // this.api.alert('Remove to wishlist', 'error');
                    // }
                });
                this.favArticles.forEach(function (element) {
                    var _a;
                    if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === articleId) {
                        element.selected = true;
                    }
                });
                this.articleWithGroup.forEach(function (element) {
                    if ((element === null || element === void 0 ? void 0 : element._id) === articleId) {
                        element.selected = true;
                        _this.api.alert('Added to Shortlist', 'success');
                    }
                });
            }
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    ArticlesComponent.prototype.deleteArticleWishlist = function (articleId, typelikebool) {
        var _this = this;
        var requestData = {};
        requestData["wishlistedId"] = articleId;
        if (this.storage.isLoggednIn()) {
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                if (res.status) {
                    _this.getFavouriteArticlesbyUser();
                }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
        if (this.storage.isLoggednIn()) {
            this.newArticledata.forEach(function (element) {
                if (element._id === articleId) {
                    element.selected = false;
                    _this.api.alert('Removed from Shortlist', 'success');
                }
                // } else {
                //   this.newArticledata[i].selected = true;
                //   // this.api.alert('Add to wishlist', 'error');
                // }
            });
            this.favArticles.forEach(function (element) {
                var _a;
                if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === articleId) {
                    element.wishlistedId.selected = false;
                    // this.getFavouriteArticlesbyUser();
                }
            });
            this.articleWithGroup.forEach(function (element) {
                if ((element === null || element === void 0 ? void 0 : element._id) === articleId) {
                    element.selected = false;
                    _this.api.alert('Removed from Shortlist', 'success');
                }
            });
        }
    };
    ArticlesComponent.prototype.resetbyTag = function () {
        var _this = this;
        this.iscallarticle = true;
        if (!this.tagvalue) {
            this.tagsValue = '';
            this.searchArticles = '';
            this.Repetedtags = this.newTagsArray;
            this.itemperpage = 10;
            this.pagenumber = 1;
            this.api.get('getarticles?limit=' + this.itemperpage + '&page=' + this.pagenumber).subscribe(function (res) {
                _this.articles = res.articleData;
                _this.isTagShow = true;
                _this.newArticledata = _this.articles;
                _this.trendingArticles = [];
                _this.forTrendingArticles();
                _this.getWishlist();
            });
        }
    };
    ArticlesComponent.prototype.articleFilterbyTags = function (value, bool) {
        var _this = this;
        this.iscallarticle = false;
        if (value) {
            this.tagsValue = value;
            if (!bool) {
                this.tagspagenumber = 1;
                this.api.get("searchontype?type=articles&selectedName=" + value + '&limit=' + this.itemperpage + '&page=' + this.tagspagenumber).subscribe(function (res) {
                    var _a;
                    _this.articles = res.data;
                    _this.newArticledata = [];
                    (_a = _this.newArticledata).push.apply(_a, _this.articles);
                    _this.functionForTrending(_this.newArticledata);
                    _this.getWishlist();
                });
            }
            else {
                this.api.get("searchontype?type=articles&selectedName=" + value + '&limit=' + this.itemperpage + '&page=' + this.tagspagenumber).subscribe(function (res) {
                    var _a;
                    _this.articles = res.data;
                    (_a = _this.newArticledata).push.apply(_a, _this.articles);
                    _this.functionForTrending(_this.newArticledata);
                    _this.getWishlist();
                });
            }
        }
    };
    ArticlesComponent.prototype.getArticlebytags = function () {
        var _this = this;
        this.clearIcon = true;
        this.tagsValue = '';
        this.iscallarticle = false;
        if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '') {
            if (this.tagSearchpageNumber <= 1) {
                this.newArticledata = [];
            }
            var tagsconst_1 = this.newArticledata;
            this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.tagSearchpageNumber).subscribe(function (res) {
                if (!_this.articledatabool) {
                    var searcharticleData = [];
                    searcharticleData.push.apply(searcharticleData, __spreadArrays(tagsconst_1, res.data));
                    _this.newArticledata = searcharticleData;
                }
                else {
                    _this.newArticledata = [];
                }
            });
        }
        else if (this.searchvalue && this.searchvalue.trim() !== '') {
            if (this.searchpagenumber <= 1) {
                this.newArticledata = [];
            }
            var newconst_2 = this.newArticledata;
            this.api.get("searchontype?type=articles&selectedName=" + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.searchpagenumber).subscribe(function (res) {
                var searcharticleData = [];
                searcharticleData.push.apply(searcharticleData, __spreadArrays(newconst_2, res.data));
                _this.newArticledata = searcharticleData;
            });
        }
        else {
            this.newArticledata = [];
            this.pagenumber = 1;
            this.searchpagenumber = 1;
            this.getAllArticles();
            // this.trendingArticles = res.data;
        }
    };
    ArticlesComponent.prototype.getTags = function () {
        var _this = this;
        this.api.get("gettag").subscribe(function (res) {
            _this.tagsData = res.tagData;
        });
    };
    ArticlesComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    ArticlesComponent.prototype.onScroll = function (e) {
        //console.log(e);
        if (this.iscallarticle) {
            this.pagenumber += 1;
            // this.getArticlebytags();
            this.getAllArticles();
        }
        else {
            this.tagspagenumber += 1;
            this.tagsbool = true;
            // this.getAllarticleData();
            this.articleFilterbyTags(this.tagsValue, true);
            if (this.searchvalue && this.tagvalue) {
                this.tagSearchpageNumber += 1;
                this.getArticlebytags();
            }
            else if (this.searchvalue) {
                this.searchpagenumber += 1;
                this.getArticlebytags();
            }
            else if (this.tagvalue) {
                this.redirecttagspagenumber += 1;
                this.getAllarticleData();
            }
        }
    };
    __decorate([
        core_1.ViewChild('tabs', { static: false })
    ], ArticlesComponent.prototype, "tabs");
    ArticlesComponent = __decorate([
        core_1.Component({
            selector: 'app-articles',
            templateUrl: './articles.component.html',
            styleUrls: ['./articles.component.scss']
        })
    ], ArticlesComponent);
    return ArticlesComponent;
}());
exports.ArticlesComponent = ArticlesComponent;
