import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-articles-details",
  templateUrl: "./articles-details.component.html",
  styleUrls: ["./articles-details.component.scss"],
})
export class ArticlesDetailsComponent implements OnInit {
  id: any;
  ArticleList: any;
  title: any;
  subject: any;
  bannerImage: any;
  authorName: any;
  image: any;
  description: any;
  authorimage: any;
  authordescription: any;
  createdDate: any;
  sectionData: any = [];
  sections: any = [];
  userId: any;
  wishlisteddata: any;
  favItem: boolean = false;
  alltags: any = [];
  articleTags: any = [];
  customOptions: OwlOptions = {
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
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: StorageService,
    private route: ActivatedRoute,
    private event: EventService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.getWishlist();
      this.getArticles();
      this.api.get("getarticlesbyid?articleId=" + this.id).subscribe((res: any) => {
        //console.log(res);
        this.ArticleList = res.articleData;
        this.getPublicTags();
      });
    });
  }
  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userData?._id;
  }

  getArticles() {
    this.api.get("articledetailsection?articleId=" + this.id).subscribe((res: any) => {
      this.sectionData = res.description;
    });
  }

  // getArticles() {
  //   this.api.get("articledetailsection").subscribe((res: any) => {
  //     this.sectionData = res.description;
  //     console.log(this.sectionData, res, "sectionData")

  //     this.sectionData.forEach((item: any) => {
  //       this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
  //     })
  //   });
  // }

  searchbyTag(value: any) {
    const tags = "tags";
    this.router.navigate(['/articles/' + tags + '/' + value]);
    // console.log('tags', value);
  }

  searchbyGroup(value: any) {
    this.router.navigate(['/group-details/' + value]);
    // console.log('tags', value);
  }
  searchbySubject(value: any) {
    const subjects = "subjects";
    this.router.navigate(['/articles/' + subjects + '/' + value]);
    // console.log('tags', value);
  }

  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=articles').subscribe((res: any) => {
      //console.log(res.wishlistedData);
      this.wishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.wishlisteddata.length; i++) {
        if (this.wishlisteddata[i].userId?._id === userData?._id) {
          if (this.ArticleList?._id === this.wishlisteddata[i]?.wishlistedId) {
            this.favItem = true;
          }
        }
      }

    });
  }
  getPublicTags() {
    this.api.get('gettag').subscribe((res: any) => {
      this.alltags = res.tagData;
      this.alltags.forEach(element => {
        this.ArticleList?.tags.filter((tags) => {
          if (element.tags === tags) {
            if (element.status == true) {
              this.articleTags.push(element.tags);
            }
          }
        });
      });
      // console.log(this.articleTags, "classTags");
    });
  }

  addtoArticlesWishList(articleId: any) {

    let requestData = {};
    requestData["type"] = 'articles';
    requestData["wishlistedId"] = articleId;
    if (this.storage.isLoggednIn()) {
      this.favItem = true;
      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        if (favAdded === "Added to your wishlist successfully") {
          this.api.alert('Added to  Shortlist', 'success');
        }
        // } else {
        //   this.favItem = false;
        //   // this.api.alert('Remove to wishlist', 'error');
        // }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  }
  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  deleteArticlesWishlist(articleId: any) {
    this.favItem = false;
    this.api.alert('Removed from Shortlist', 'success');
    let requestData = {};
    requestData["wishlistedId"] = articleId;
    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        // if (favAdded === "Your wishlisted Item removed successfully") {

        // } else {
        //   this.favItem = true;
        //   // this.api.alert('Remove to wishlist', 'error');
        // }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }

  }
  copyToClipboard() {
    if (this.storage.isLoggednIn()) {
      this.event.copyClipboard();
      this.api.alert('Link Copied', 'success');
    }
  }


  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }
  getClassDetails(id: any) {
    let newId = atob(id);
    this.router.navigate(["/view/class-details/" + newId]);
  }
  showMoreData(sectiontitle: any) {
    let DetailType = 'forarticles'
    this.router.navigate(["/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
  }

  back() {
    this.event.back();
  }
}
