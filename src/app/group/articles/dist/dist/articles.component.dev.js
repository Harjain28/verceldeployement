"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;
exports.ArticlesComponent = void 0;

var core_1 = require("@angular/core");

var ArticlesComponent =
/** @class */
function () {
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
    this.route.params.subscribe(function (params) {
      _this.tagvalue = params['value'];
      _this.types = params['type'];

      _this.getAllarticleData();
    });
  }

  ArticlesComponent.prototype.ngOnInit = function () {
    this.loginOrNot = localStorage.getItem("LoggedIn");
    this.getAllArticles();
    this.getTags();

    if (this.storage.isLoggednIn()) {
      this.getFavouriteArticlesbyUser();
      this.getJoinGroupArticles();
    }
  };

  ArticlesComponent.prototype.getAllarticleData = function () {
    var _this = this;

    if (this.tagvalue && this.tagvalue.trim() !== '') {
      if (this.types === 'subjects') {
        this.api.get("searchontype?type=articles&selectedName=&subject=" + this.tagvalue).subscribe(function (res) {
          _this.articles = res.data;
          _this.newArticledata = _this.articles;
          //console.log(_this.newArticledata);

          if (_this.storage.isLoggednIn()) {
            _this.getWishlist();
          }
        });
      } else {
        this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue).subscribe(function (res) {
          _this.articles = res.data;
          _this.newArticledata = _this.articles;
          //console.log(_this.newArticledata);
        });
      }

      if (this.storage.isLoggednIn()) {
        this.getWishlist();
      }
    }
  };

  ArticlesComponent.prototype.getAllArticles = function () {
    var _this = this;

    if (!this.tagvalue) {
      this.api.get("getarticles").subscribe(function (res) {
        _this.articles = res.articleData;
        _this.newArticledata = _this.articles;
        _this.articledatabool = true;

        _this.forRepetedtags();

        _this.forTrendingArticles();

        if (_this.storage.isLoggednIn()) {
          _this.getWishlist();
        }

        //console.log(_this.articles, "getarticles");
      });
    }
  };

  ArticlesComponent.prototype.forTrendingArticles = function () {
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
      _this.favArticles = res.wishlistedData;
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

    this.Repetedtags = __spreadArrays(new Set(this.newallTags));
    this.newTagsArray = this.Repetedtags;
  };

  ArticlesComponent.prototype.onKeySearchTags = function (value) {
    this.Repetedtags = this.searchByTags(value);
  };

  ArticlesComponent.prototype.searchByTags = function (value) {
    if (value && value.trim() !== '') {
      return this.newTagsArray.filter(function (tags) {
        return tags.toLowerCase().startsWith(value.toLowerCase());
      });
    }
  }; // getwishListData() {
  //   this.api.get('getWishlist?type=wishlisted&wishlistedId=628607cd014954d55758ab2e').subscribe((res: any) => {
  //     res.forEach(element => {
  //       this.itemid = element.item_id;
  //       if (this.id === this.itemid) {
  //         this.favItem = true;
  //       } 
  //     });     
  //   });
  // }


  ArticlesComponent.prototype.getWishlist = function () {
    var _this = this;

    var userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=articles').subscribe(function (res) {
      var _a;

      //console.log(res.wishlistedData);
      _this.articleWishlisteddata = res.wishlistedData;

      var _loop_1 = function _loop_1(i) {
        if (((_a = _this.articleWishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
          _this.newArticledata.forEach(function (element) {
            var _a;

            if (element._id === ((_a = _this.articleWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
              element.selected = true;
            } else {
              element.selected = false;
            }
          });

          if (_this.favArticles && _this.favArticles.length > 0) {
            _this.favArticles.forEach(function (element) {
              var _a, _b;

              if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === ((_b = _this.articleWishlisteddata[i]) === null || _b === void 0 ? void 0 : _b.wishlistedId)) {
                element.selected = true;
              } else {
                element.selected = false;
              }
            });
          }

          _this.articleWithGroup.forEach(function (element) {
            var _a;

            if ((element === null || element === void 0 ? void 0 : element._id) === ((_a = _this.articleWishlisteddata[i]) === null || _a === void 0 ? void 0 : _a.wishlistedId)) {
              element.selected = true;
            } else {
              element.selected = false;
            }
          });
        }
      };

      for (var i = 0; i < _this.articleWishlisteddata.length; i++) {
        _loop_1(i);
      }
    });
  };

  ArticlesComponent.prototype.addtoArticleWishList = function (articleId) {
    var _this = this;

    var requestData = {};
    requestData["type"] = 'articles';
    requestData["wishlistedId"] = articleId;

    if (this.storage.isLoggednIn()) {
      this.api.post('addwishlist', requestData).subscribe(function (res) {
        var favAdded = res.message;

        for (var i = 0; i < _this.newArticledata.length; i++) {
          if (favAdded === "Added to your wishlist successfully") {
            if (_this.newArticledata[i]._id === articleId) {
              _this.newArticledata[i].selected = true;

              _this.getFavouriteArticlesbyUser();

              _this.api.alert('Added to your Shortlist', 'success');
            }

            _this.favArticles.forEach(function (element) {
              var _a;

              if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === articleId) {
                element.selected = true;
              }
            });

            _this.articleWithGroup.forEach(function (element) {
              if ((element === null || element === void 0 ? void 0 : element._id) === articleId) {
                element.selected = true;
              }
            });
          } else {
            _this.newArticledata[i].selected = false; // this.api.alert('Remove to wishlist', 'error');
          }
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ArticlesComponent.prototype.deleteArticleWishlist = function (articleId, type) {
    var _this = this;

    var requestData = {};
    requestData["wishlistedId"] = articleId;

    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
        var favAdded = res.message;

        for (var i = 0; i < _this.newArticledata.length; i++) {
          if (favAdded === "Your wishlisted Item removed successfully") {
            if (_this.newArticledata[i]._id === articleId) {
              _this.newArticledata[i].selected = false;

              _this.getFavouriteArticlesbyUser();

              _this.api.alert('Removed to wishlist', 'success');
            }
          } else {
            _this.newArticledata[i].selected = true; // this.api.alert('Add to wishlist', 'error');
          }
        }

        _this.favArticles.forEach(function (element) {
          var _a;

          if (((_a = element.wishlistedId) === null || _a === void 0 ? void 0 : _a._id) === articleId) {
            element.selected = false; // this.getFavouriteArticlesbyUser();
          }
        });

        _this.articleWithGroup.forEach(function (element) {
          if ((element === null || element === void 0 ? void 0 : element._id) === articleId) {
            element.selected = true;
          } else {
            element.selected = false;
          }
        });
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  };

  ArticlesComponent.prototype.resetbyTag = function () {
    var _this = this;

    if (!this.tagvalue) {
      this.api.get("getarticles").subscribe(function (res) {
        _this.articles = res.articleData;
        _this.newArticledata = _this.articles;
      });
    }
  };

  ArticlesComponent.prototype.articleFilterbyTags = function (value) {
    var _this = this;

    if (value) {
      this.tagsValue = value;
      this.api.get("searchontype?type=articles&selectedName=" + value).subscribe(function (res) {
        _this.articles = res.data;
        _this.newArticledata = _this.articles;
      });
    }
  }; // getArticlesection() {
  //   this.api.get("articlessection").subscribe((res: any) => {
  //     this.sectionData = res.description;
  //     console.log(this.sectionData, res, "sectionData")
  //     this.sectionData.forEach((item: any) => {
  //       this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
  //     })
  //   });
  // }


  ArticlesComponent.prototype.getArticlebytags = function () {
    var _this = this;

    if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue + '&text=' + this.searchvalue).subscribe(function (res) {
        if (_this.articledatabool) {
          _this.newArticledata = res.data;
        } else {
          _this.newArticledata;
        }
      });
    } else if (this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=articles&selectedName=" + '&text=' + this.searchvalue).subscribe(function (res) {
        _this.newArticledata = res.data;
      });
    } else {
      this.newArticledata = [];
      this.newArticledata = this.articles; // this.trendingArticles = res.data;
    }
  };

  ArticlesComponent.prototype.getTags = function () {
    var _this = this;

    this.api.get("gettag").subscribe(function (res) {
      _this.tagsData = res.tagData;
      //console.log(_this.tagsData, "tagsData");
    });
  };

  ArticlesComponent.prototype.getArticeDetails = function (id) {
    this.router.navigate(["/group/articles-details/" + id]);
  };

  __decorate([core_1.ViewChild('tabs', {
    "static": false
  })], ArticlesComponent.prototype, "tabs");

  ArticlesComponent = __decorate([core_1.Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
  })], ArticlesComponent);
  return ArticlesComponent;
}();

exports.ArticlesComponent = ArticlesComponent;