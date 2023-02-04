import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from "ngx-owl-carousel-o";
import { ApiService } from "../services/api.service";
import { NavigationEnd, Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { EventService } from "../services/event.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DisableRightClickService } from "../services/disable-right-click";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  classList: any = [];
  images: any = [];
  trendingImages: any = [];
  subCategories: any = [];
  articles: any = [];
  events: any = [];
  eventsData: any = [];
  articleData: any = [];
  groups: any = [];
  sectionData: any = [];
  sections: any = [];
  bannerImage: any = [];
  sectionInfo: any = [];
  AppTitle: any;
  AppDescription: any;
  googlePlayLink: any;
  appleStore: any;
  faceBookLink: any;
  twitterLink: any;
  instagramLink: any;
  googleLink: any;
  aboutUs: any;
  loginShow: string;
  locationKey: any;
  selectedCategoryLevel = [];
  optionsClasses: any = [];
  catSearchKey: any;
  allsubcategory: any;
  newOptionsClasses: any = [];
  userAddress: any;
  userLatitude: any;
  userLongitude: any;
  categoryId: any;
  sectionAllInfo: any;


  constructor(private api: ApiService, public router: Router, private event: EventService, private storage: StorageService,
    private disableCopyAndCut: DisableRightClickService,
    public breakpointObserver: BreakpointObserver) {
    this.allowLocation();
  }


  customOptions: OwlOptions = {
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
    navText: ["<img class='navTxtImg' src='./assets/images/icons/left-chevron-svgrepo-com.svg'>", "<img class='navTxtImg' src='./assets/images/icons/left-chevron-svgrepo-com.svg'>"],
    responsive: {
      0: {
        items: 1,
        skip_validateItems: true,
      },
      400: {
        items: 2,
        skip_validateItems: true,
      },
      740: {
        items: 3,
        skip_validateItems: true,
      },
      940: {
        items: 1,
        skip_validateItems: true,
      },
    },
  };
  slides: any = [
  ];

  customOptions2: OwlOptions = {
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
        loop: true,
      },
      400: {
        items: 2,
        skip_validateItems: true,
        loop: true,
      },
      768: {
        items: 2,
        skip_validateItems: true,
        loop: true,
      },
      940: {
        items: 4,
        skip_validateItems: true,
        loop: true,
      },
    },
    nav: false,
  };

  customOptions3: OwlOptions = {
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
        loop: true,
      },
      400: {
        items: 3,
        responsiveRefreshRate: 200,
        skip_validateItems: true,
        loop: true,
      },
      768: {
        items: 2,
        responsiveRefreshRate: 200,
        skip_validateItems: true,
        loop: true,
      },
      940: {
        items: 4,
        // responsiveRefreshRate: 200,
        skip_validateItems: true,
        loop: true,
      },
    },
  };

  customOptions4: OwlOptions = {
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
        items: 2,
      },
      400: {
        items: 7,
      },
      768: {
        items: 5,
      },
      940: {
        items: 10,
      },
    },
    nav: false,
  };

  customOptions5: OwlOptions = {
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

  customOptions6: OwlOptions = {
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
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  options = {
    componentRestrictions: {
      country: ["SG"]
    }
  }

  ngOnInit(): void {
    this.disableCopyAndCut.disableCopyAndCut();
    if (this.event.sectionData?.length > 0) {
      this.gethomesectionFromEvent();
    } else {
      this.gethomesection();
    }

    this.getOptionsCategories();

    this.loginShow = localStorage.getItem("LoggedIn");
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.homeBannerDesktop();
        } else {
          this.homeBannerMobile();
        }
      });
    this.getsubcategory();
    this.clearAdminData();
  }

  clearAdminData() {
    this.event.adminBusinessDetails = [];
    this.event.adminSideBarData = [];
  }

  homeBannerDesktop() {
    if (this.event.bannerImageDesktop.length === 0) {
      this.api.get("getHomepagebanner?type=web").subscribe((res: any) => {
        this.bannerImage = res.result;
        this.event.bannerImageDesktop = res.result;
      });
    } else {
      this.bannerImage = this.event.bannerImageDesktop;
    }
  }

  homeBannerMobile() {
    if (this.event.bannerImageMobile?.length === 0) {
      this.api.get("getHomepagebanner?type=application").subscribe((res: any) => {
        this.bannerImage = res.result;
        this.event.bannerImageMobile = res.result;
      });
    } else {
      this.bannerImage = this.event.bannerImageMobile;
    }
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  allowLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
    });
  }

  getLatLong(lat, long) {
  }

  redirectionBanner(bannerdata: any) {
    if (bannerdata?.objtype === 'articles') {
      this.router.navigate(["/articles-details/" + bannerdata.Obj]);
    } else if (bannerdata?.objtype === 'classes') {
      let newb = atob(bannerdata.Obj);
      this.router.navigate(["/view/class-details/" + newb]);
    } else if (bannerdata?.objtype === 'events') {
      this.router.navigate(["/event-details/" + bannerdata.Obj]);
    } else if (bannerdata?.objtype === 'groups') {
      this.router.navigate(["/group-details/" + bannerdata.Obj]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  redirection(type: any) {
    this.router.navigate(['/register/' + type]);
    localStorage.setItem('userType', type);
  }

  gethomesection() {
    this.api.get("homesection").subscribe((res: any) => {
      this.sectionData = res.description;
      this.event.sectionData = this.sectionData;
      this.sectionData.forEach((item: any) => {
        this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      })
      if (this.sectionData?.length > 0) {
        this.getStaticPageInfo();
      }
    });
  }

  gethomesectionFromEvent() {
    this.sectionData = this.event.sectionData;
    this.sectionData.forEach((item: any) => {
      this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
    })
    if (this.sectionData.length > 0) {
      this.getStaticPageInfo();
    }
  }

  getsubcategory() {
    if (this.event.SubcategoryData?.length === 0) {
      this.api.get("getsubcategory").subscribe((item: any) => {
        this.event.SubcategoryData = item.SubcategoryData;
        const data = item.SubcategoryData;
        data.forEach((cate) => {
          this.subCategories.push({
            subCategoryId: cate._id,
            subCategoryName: cate.subCategory,
            subCategoryImage: cate.image,
          });
        });
        // this.gethomesection();
      });
    } else {
      const data = this.event.SubcategoryData;
      data.forEach((cate) => {
        this.subCategories.push({
          subCategoryId: cate._id,
          subCategoryName: cate.subCategory,
          subCategoryImage: cate.image,
        });
      });
    }

  }

  showAllData(sectiontitle: any) {
    this.router.navigate(["/view/homepage-more/" + sectiontitle]);
  }

  getStaticPageInfo() {
    if (this.event.sectionInfo.length === 0) {
      this.api.get('staticpageinfosection').subscribe((res: any) => {
        this.event.sectionInfo = res;
        this.sectionAllInfo = res;
        this.sectionInfo = this.sectionAllInfo?.sectionData;
        this.aboutUs = this.sectionAllInfo?.sectionData[0];
        this.AppTitle = this.sectionAllInfo?.sectionData[7];
        this.AppDescription = this.sectionAllInfo?.sectionData[8];
        this.googlePlayLink = this.sectionAllInfo?.sectionData[9];
        this.appleStore = this.sectionAllInfo?.sectionData[10];
        this.faceBookLink = this.sectionAllInfo?.sectionData[11];
        this.twitterLink = this.sectionAllInfo?.sectionData[12];
        this.instagramLink = this.sectionAllInfo?.sectionData[13];
        this.googleLink = this.sectionAllInfo?.sectionData[14];
      });
    } else {
      this.sectionAllInfo = this.event.sectionInfo;
      this.sectionInfo = this.sectionAllInfo?.sectionData;
      this.aboutUs = this.sectionAllInfo?.sectionData[0];
      this.AppTitle = this.sectionAllInfo?.sectionData[7];
      this.AppDescription = this.sectionAllInfo?.sectionData[8];
      this.googlePlayLink = this.sectionAllInfo?.sectionData[9];
      this.appleStore = this.sectionAllInfo?.sectionData[10];
      this.faceBookLink = this.sectionAllInfo?.sectionData[11];
      this.twitterLink = this.sectionAllInfo?.sectionData[12];
      this.instagramLink = this.sectionAllInfo?.sectionData[13];
      this.googleLink = this.sectionAllInfo?.sectionData[14];
    }
  }

  getOptionsCategories() {
    this.optionsClasses = [];
    if (this.event.categoryData.length === 0) {
      this.api.get("getsubcategorycategorywise").subscribe((item: any) => {
        this.event.categoryData = item;
        this.allsubcategory = item.categoryData;
        for (let i = 0; i < this.allsubcategory.length; i++) {
          for (let j = 0; j < this.allsubcategory[i]?.subcategoryData.length; j++) {
            this.optionsClasses.push({ subcategoryName: this.allsubcategory[i]?.subcategoryData[j]?.subCategory, subcategoryId: this.allsubcategory[i]?.subcategoryData[j]._id });
          }
        }
        let val = 'subcategoryName';
        this.optionsClasses.sort((a, b) => (a[val] || "").toString().localeCompare((b[val] || "").toString()));
        this.newOptionsClasses = this.optionsClasses;
      });
    } else {
      this.allsubcategory = this.event.categoryData.categoryData;
      for (let i = 0; i < this.allsubcategory.length; i++) {
        for (let j = 0; j < this.allsubcategory[i]?.subcategoryData.length; j++) {
          this.optionsClasses.push({ subcategoryName: this.allsubcategory[i]?.subcategoryData[j]?.subCategory, subcategoryId: this.allsubcategory[i]?.subcategoryData[j]._id });
        }
      }
      let val = 'subcategoryName';
      this.optionsClasses.sort((a, b) => (a[val] || "").toString().localeCompare((b[val] || "").toString()));
      this.newOptionsClasses = this.optionsClasses;
    }
  }

  locationInput() {
  }

  getSelectedCategory(selected) {
    this.redirecttoSearch(selected, 'category');
  }

  redirecttoSearch(value: any, selecttype: any) {
    if (selecttype === 'category') {
      this.optionsClasses.forEach(element => {
        if (element.subcategoryName === value) {
          this.categoryId = element?.subcategoryId;
        }
      });
    } else if (selecttype === 'categories') {
      selecttype = 'category';
      this.subCategories.forEach(element => {
        if (element.subCategoryName === value) {
          this.categoryId = element?.subCategoryId;
        }
      });
    }
    this.event.setHomeSearchData({
      searchdata: value,
      searchType: 'Classes',
      selectype: selecttype,
      categoryId: this.categoryId
    });
    this.event.setHeaderSearchdata({
      searchdata: '',
      searchType: 'Classes'
    });
    this.router.navigate(["/view/search/" + 'Classes' + "/" + selecttype]);
  }

  onKeySearchCategory() {
    this.optionsClasses = this.newOptionsClasses.filter((item) =>
      item?.subcategoryName.toLowerCase().startsWith(this.catSearchKey.toLowerCase()));
  }

  handleAddressChange(address: any) {
    // this.event.locationHome = address.formatted_address;
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    this.redirecttoSearch(address, 'location');
  }


  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }
  getClassCategory(id: any) {
    let newID = atob(id);
    this.router.navigate(["/view/class-list/" + newID]);
  }
  getClassDetails(id: any) {
    let newID = atob(id);
    this.router.navigate(["/view/class-details/" + newID]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }

}
