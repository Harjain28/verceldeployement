import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { EventService } from 'src/app/services/event.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  panelOpenState = false;
  articles: any = [];
  // expanded: boolean = true;
  tagsData: any = [];
  trendingArticles: any = [];
  sectionData: any = [];
  sections: any = [];
  tagvalue: any;
  articleData: any = [];
  newArticledata: any = [];
  searchvalue: any;
  allTags: any = [];
  newallTags: any = [];
  articlebySearch: any;
  Repetedtags: any = [];
  newTagsArray: any = [];
  groupName: any;
  types: any = '';
  newTrendingData: any = [];
  tagsValue: string;
  articledatabool: boolean = false;
  favItem: boolean = false;
  favArticles: any = [];
  loginOrNot: string;
  articleWithGroup: any = [];
  searchArticles: any;
  itemperpage: number = 10;
  pagenumber: number = 1;
  tagspagenumber: number = 1;
  iscallarticle: boolean = false;

  customOptions: OwlOptions = {
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
      0: {
      },
      400: {
      },
      740: {
      },
      940: {
      }
    },
    nav: false
  };
  articleWishlisteddata: any = [];


  @ViewChild('tabs', { static: false }) tabs;
  selectedIndex: number;
  tagsbool: boolean = false;
  searchpagenumber: number = 1;
  tagSearchpageNumber: number = 1;
  redirectSubjectpagenumber: number = 1;
  redirecttagspagenumber: number = 0;
  favAdded: boolean;
  isTagShow: boolean = true;
  subjectName: any;
  clearIcon: boolean = false;


  // isHidden: boolean = true;



  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event: EventService,
    public breakpointObserver: BreakpointObserver) {

    this.route.params.subscribe((params) => {
      this.tagvalue = params['value'];
      this.types = params['type'];
      this.getWishlist();
    });
    if (!this.tagsValue) {
      this.getAllArticles();
    }
  }


  ngOnInit(): void {
    this.selectedIndex = this.event.articalTag;
    this.searchArticles = '';
    this.loginOrNot = localStorage.getItem("LoggedIn");
    this.getTags();
    this.getAllarticleData();
    if (this.storage.isLoggednIn()) {
      this.getFavouriteArticlesbyUser();
      this.getJoinGroupArticles();
    }
    // this.getWishlist();
    //console.log(this.searchArticles, 'searchArticles')
  }

//   expansion() {
//     expanded: true;
//     this.breakpointObserver
//     .observe(['(min-width: 767px)'])
//     .subscribe((state: BreakpointState) => {
//       if (state.matches) {
//         expanded: true;
//       } else {
//         expanded: false;
//       }
//     });
// }
    


  getAllarticleData() {
    this.iscallarticle = false;
    if (this.tagvalue && this.tagvalue.trim() !== '') {
      if (this.types === 'subjects') {
        this.api.get("searchontype?type=articles&selectedName=&subject=" + this.tagvalue + '&limit=' + this.itemperpage + '&page=' + this.redirectSubjectpagenumber).subscribe((res: any) => {
          this.articles = res.data;
          this.newArticledata = this.articles;
          this.functionForTrending(this.articles);
          //console.log(this.newArticledata);
          // this.getWishlist();

        });
      } else {
        if (this.redirecttagspagenumber <= 1) {
          this.newArticledata = [];
        }
        const newconst = this.newArticledata;
        this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue + '&limit=' + this.itemperpage + '&page=' + this.redirecttagspagenumber).subscribe((res: any) => {
          let tagsarticledata = [];
          tagsarticledata.push(...newconst, ...res.data);
          this.newArticledata = tagsarticledata;
          // this.getWishlist(); 
          //console.log(this.newArticledata);
        });
      }

    }
  }
  //for all trending
  functionForTrending(data: any) {
    let tagsfilterArticles = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].trending === true) {
        tagsfilterArticles.push(data[i]);
      }
    }
    this.newTrendingData = tagsfilterArticles;
  }
  selectedTabChange(event) {
    this.event.articalTag = event.index;
  }

  filterBySubject(subject: any) {
    if (!this.tagvalue) {
      let tagsfilterArticles = [];
      this.subjectName = subject;
      this.api.get("searchontype?type=articles&selectedName=&subject=" + subject).subscribe((res: any) => {
        this.articles = res.data;
        this.isTagShow = false;
        this.newArticledata = this.articles;
        this.functionForTrending(this.articles);
        //console.log(this.newArticledata);
        this.getWishlist();

      });
    }

  }

  getAllArticles() {
    if (!this.tagvalue) {
      this.api.get('getarticles?limit=' + this.itemperpage + '&page=' + this.pagenumber).subscribe((res: any) => {
        this.articles = res.articleData;
        this.newArticledata.push(...this.articles);
        this.articledatabool = true;
        this.iscallarticle = true;
        this.forRepetedtags();
        this.forTrendingArticles();
        this.getWishlist();
        //console.log(this.articles, "getarticles");
      });
    }
  }
  forTrendingArticles() {
    this.iscallarticle = true;
    for (var i = 0; i < this.articles.length; i++) {
      if (this.articles[i].trending === true) {
        this.trendingArticles.push(this.articles[i]);
        this.newTrendingData = this.trendingArticles;
      }
    }
  }

  getFavouriteArticlesbyUser() {
    this.api.get('favarticle').subscribe((res: any) => {
      this.favArticles = new Set(res.wishlistedData);
    })
  }

  getJoinGroupArticles() {
    this.api.get('favarticle').subscribe((res: any) => {
      this.articleWithGroup = res.articleData;
    })
  }

  forRepetedtags() {

    this.newArticledata.forEach((element: any) => {
      this.allTags.push([...element.tags]);
    })
    for (var i = 0; i < this.allTags.length; i++) {
      this.newallTags = this.newallTags.concat(this.allTags[i]);
    }
    let newTags = [];
    newTags = [...new Set(this.newallTags)];
    this.Repetedtags = newTags.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    //console.log(this.Repetedtags);

    this.newTagsArray = this.Repetedtags;
  }

  clearData() {
    this.searchvalue = '';
    this.clearIcon = false;
    this.newArticledata = [];
    this.pagenumber = 1;
    this.searchpagenumber = 1;
    this.getAllArticles();
  }
  // onKeySearchTags(value) {
  //   this.searchArticles = value;
  // }
  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  searchByTags(): void {
    let term = this.searchArticles;
    this.Repetedtags = this.newTagsArray.filter(function (tag) {
      return tag.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }

  // searchByTags(value: string) {
  //   if (value && value.trim() !== '') {
  //     return this.newTagsArray.filter((tags) =>
  //       tags.toLo  werCase().startsWith(value.toLowerCase())
  //     );
  //   }
  // }


  copyToClipboard(val) {
    if (this.storage.isLoggednIn()) {
      var inputc = document.body.appendChild(document.createElement("input"));
      inputc.value = window.location.href + '-details/' + val.toString();
      inputc.focus();
      inputc.select();
      document.execCommand('copy');
      inputc.parentNode.removeChild(inputc);
      this.api.alert('Link Copied', 'success');
    } else {
      this.router.navigate(['/login/student']);
    }
  }
  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=articles').subscribe((res: any) => {
      //console.log(res.wishlistedData);
      this.articleWishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.articleWishlisteddata.length; i++) {
        if (this.articleWishlisteddata[i].userId?._id === userData?._id) {
          this.newArticledata.forEach(element => {
            if (element._id === this.articleWishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
            // else {
            //   element.selected = false;
            // }
          });
          if (this.favArticles && this.favArticles.length > 0) {
            this.favArticles.forEach(element => {
              if (element.wishlistedId?._id === this.articleWishlisteddata[i]?.wishlistedId) {
                element.selected = true;
              }
              // else {
              //   element.selected = false;
              // }
            });
          }
          this.articleWithGroup.forEach(element => {
            if (element?._id === this.articleWishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
            // else {
            //   element.selected = false;
            // }
          });
        }

      }

    });
  }


  addtoArticleWishList(articleId: any, likebool: boolean) {
    if (this.storage.isLoggednIn()) {
      this.favAdded = likebool;
      if (this.favAdded) {
        let requestData = {};
        requestData["type"] = 'articles';
        requestData["wishlistedId"] = articleId;
        this.api.post('addwishlist', requestData).subscribe((res: any) => {
          const favAdded = res.message;
          // this.getWishlist();
          this.favAdded = false;
          if (res.status) {
            this.getFavouriteArticlesbyUser();
          }

        });
      } else {
        this.router.navigate(["/login/student"]);
      }


      if (this.storage.isLoggednIn()) {

        this.newArticledata.forEach(element => {
          if (element._id === articleId) {
            element.selected = true;
            this.api.alert('Added to Shortlist', 'success');
          }
          // else {
          //   this.newArticledata[i].selected = false;
          //   // this.api.alert('Remove to wishlist', 'error');
          // }
        });

        this.favArticles.forEach(element => {
          if (element.wishlistedId?._id === articleId) {
            element.selected = true;

          }
        });
        this.articleWithGroup.forEach(element => {
          if (element?._id === articleId) {
            element.selected = true;
            this.api.alert('Added to Shortlist', 'success');
          }
        });
      }
    } else {
      this.router.navigate(["/login/student"]);
    }



  }

  private deleteArticleWishlist(articleId: any, typelikebool: boolean) {
    let requestData = {};
    requestData["wishlistedId"] = articleId;
    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        if (res.status) {
          this.getFavouriteArticlesbyUser();
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
    if (this.storage.isLoggednIn()) {
      this.newArticledata.forEach(element => {
        if (element._id === articleId) {
          element.selected = false;
          this.api.alert('Removed from Shortlist', 'success');
        }
        // } else {
        //   this.newArticledata[i].selected = true;
        //   // this.api.alert('Add to wishlist', 'error');
        // }
      });

      this.favArticles.forEach(element => {
        if (element.wishlistedId?._id === articleId) {
          element.wishlistedId.selected = false;
          // this.getFavouriteArticlesbyUser();
        }
      });
      this.articleWithGroup.forEach(element => {
        if (element?._id === articleId) {
          element.selected = false;
          this.api.alert('Removed from Shortlist', 'success');
        }
      });
    }


  }


  resetbyTag() {
    this.iscallarticle = true;
    if (!this.tagvalue) {
      this.tagsValue = '';
      this.searchArticles = '';
      this.Repetedtags = this.newTagsArray;
      this.itemperpage = 10;
      this.pagenumber = 1;
      this.api.get('getarticles?limit=' + this.itemperpage + '&page=' + this.pagenumber).subscribe((res: any) => {
        this.articles = res.articleData;
        this.isTagShow = true;
        this.newArticledata = this.articles;
        this.trendingArticles = [];
        this.forTrendingArticles();
        this.getWishlist();

      })
    }
  }

  articleFilterbyTags(value: any, bool: boolean) {
    this.iscallarticle = false;
    if (value) {
      this.tagsValue = value;
      if (!bool) {
        this.tagspagenumber = 1;
        this.api.get("searchontype?type=articles&selectedName=" + value + '&limit=' + this.itemperpage + '&page=' + this.tagspagenumber).subscribe((res: any) => {
          this.articles = res.data;
          this.newArticledata = [];
          this.newArticledata.push(...this.articles);
          this.functionForTrending(this.newArticledata);
          this.getWishlist();
        });
      } else {
        this.api.get("searchontype?type=articles&selectedName=" + value + '&limit=' + this.itemperpage + '&page=' + this.tagspagenumber).subscribe((res: any) => {
          this.articles = res.data;
          this.newArticledata.push(...this.articles);
          this.functionForTrending(this.newArticledata);
          this.getWishlist();
        });
      }

    }
  }

  getArticlebytags() {
    if (this.searchvalue === '') {
      this.clearIcon = false;
    } else {
      this.clearIcon = true;
    }
    this.tagsValue = '';
    this.iscallarticle = false;
    if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '') {
      if (this.tagSearchpageNumber <= 1) {
        this.newArticledata = [];
      }
      const tagsconst = this.newArticledata;
      this.api.get("searchontype?type=articles&selectedName=" + this.tagvalue + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.tagSearchpageNumber).subscribe((res: any) => {
        if (!this.articledatabool) {
          let searcharticleData = [];
          searcharticleData.push(...tagsconst, ...res.data);
          this.newArticledata = searcharticleData;

        } else {
          this.newArticledata = [];
        }

      });
    } else if (this.searchvalue && this.searchvalue.trim() !== '') {
      if (this.searchpagenumber <= 1) {
        this.newArticledata = [];
      }
      const newconst = this.newArticledata;
      this.api.get("searchontype?type=articles&selectedName=" + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.searchpagenumber).subscribe((res: any) => {
        let searcharticleData = [];
        searcharticleData.push(...newconst, ...res.data);
        this.newArticledata = searcharticleData;
      });
    } else {
      this.newArticledata = [];
      this.pagenumber = 1;
      this.searchpagenumber = 1;
      this.getAllArticles();
      // this.trendingArticles = res.data;
    }
  }

  getTags() {
    if (this.event.tagsData.length === 0) {
      this.api.get("gettag").subscribe((res: any) => {
        this.tagsData = res.tagData;
        this.event.tagsData = res.tagData;
      });
    }else{
      this.tagsData = this.event.tagsData;
    }
  }


  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }

  onScroll(e) {
    //console.log(e);
    if (this.iscallarticle) {
      this.pagenumber += 1;
      // this.getArticlebytags();
      this.getAllArticles();
    } else {
      this.tagspagenumber += 1;
      this.tagsbool = true;
      // this.getAllarticleData();
      this.articleFilterbyTags(this.tagsValue, true);
      if (this.searchvalue && this.tagvalue) {
        this.tagSearchpageNumber += 1;
        this.getArticlebytags();
      } else if (this.searchvalue) {
        this.searchpagenumber += 1;
        this.getArticlebytags();
      } else if (this.tagvalue) {
        this.redirecttagspagenumber += 1;
        this.getAllarticleData();
      }
    }
  }

  back() {
    this.event.back();
  }

}
