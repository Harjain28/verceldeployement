import { newArray } from "@angular/compiler/src/util";
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  email: any;
  name: any;
  image: any;
  type: any;
  userId: any;
  token: any;
  isNotshowsearch: boolean = false;
  searchautofocus: boolean = true;

  searchKey: any = '';
  // @Output() searchkeys = new EventEmitter<any>();
  newSearchItem: any;
  loginShowHeader: string;
  currentURL: string;
  userName: any;
  suggestionData: any = [];
  SuggTags: any = [];
  suggtaggroup: any = [];
  suggsubcategory: any = [];
  suggGroup: any = [];
  newSuggtags: any;
  suggestions: any = [];
  Rcenents: any = [];
  newSuggestionsArray: any = [];
  previousData: any = [];
  recentsearch: any = [];
  clearIcon: boolean = false;
  editEventSubscription: Subscription;
  isSticky: boolean = false;
  newArray: any = [];
  suggestionsArray: any = [];
  searchType: any;
  searchValue: any;
  searchMsg: string = "Search everything on Klassbook";
  searchBool: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 10;
  }

  constructor(
    public event: EventService,
    private storage: StorageService,
    public router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {
    this.event.getHeaderSearchdata().subscribe(data => {
      this.searchKey = Object.values(data)[0];
      this.searchType = Object.values(data)[1];
    });

    this.editEventSubscription = this.event.getEditEvent().subscribe(() => {
      this.editProfile();
      this.loginOrNot();
    });
  }

  ngOnInit(): void {
    setInterval(() =>{
      this.event.sectionData = [];
      this.event.bannerImageDesktop = [];
      this.event.bannerImageMobile = [];
      this.event.SubcategoryData = [];
      this.event.sectionInfo = [];
      this.event.categoryData = [];
      this.event.tagsData = [];
    },180000);
    
    this.gethomesection();
    this.currentURL = this.router.url;
    this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd) {
        this.currentURL = res.url;
      }
    });

    this.loginOrNot();
    this.location.subscribe(event => {
      this.loginOrNot();
    });
    this.searchType = 'Classes';

    // this.event.searchKey = this.searchKey;
  }

  loginOrNot() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.loginShowHeader = localStorage.getItem("LoggedIn");
    this.email = userData?.email;
    this.name = userData?.name;
    this.image = userData?.image;
    this.type = userData?.type;
    this.userName = userData?.userName;
  }

  // loadHeader() {
  //   if (!localStorage.getItem("load")) {
  //     localStorage.setItem("load", "no reload");
  //     location.reload();
  //   } else {
  //     localStorage.removeItem("load");
  //   }
  // }

  changesiteType() {
  }

  getAutocompleteValue(searchkey: any) {
    // if (this.searchKey?.length > 3) {
    //   this.searchBool = true;
    // } else {
    //   this.searchBool = false;
    // }
    this.clearIcon = true;
    this.newSuggestionsArray = [];
    this.searchValue = searchkey;
    this.searchKey = searchkey;
    if (this.currentURL !== '') {
      if (this.searchValue.length > 1) {
        this.previousData.push(this.searchKey);
        this.recentsearch = [...new Set(this.previousData)];
        localStorage.setItem("Recent Searches", JSON.stringify(this.recentsearch));
      }
    }
    // this.homesearch();
  }

  searchData() {
    this.newSuggestionsArray = [];
    if (this.currentURL !== '') {
      this.event.setHeaderSearchdata({
        searchdata: this.searchKey,
        searchType: this.searchType
      });
      if (this.searchValue?.trim() !== '' && this.searchValue?.length > 2) {
        this.previousData.push(this.searchKey);
        this.recentsearch = [...new Set(this.previousData)];
        localStorage.setItem("Recent Searches", JSON.stringify(this.recentsearch));
        this.homesearch();
      } else {
        this.clearIcon = false;
        this.searchKey = '';
        this.searchMsg = "Please enter atleast 3 character";
      }
    }
    setTimeout(() => {
      this.searchMsg = "Search everything on Klassbook";
    }, 2000);
  }

  clearData() {
    this.clearIcon = false;
    this.searchValue = ''
    this.searchKey = '';
    this.event.setHeaderSearchdata({
      searchdata: '',
      searchType: this.searchType
    });
    this.event.sendResetEvent();
    // this.router.navigate(["/"]);
  }

  clearIconBool() {
    if (this.searchKey?.length === 0) {
      this.event.setHeaderSearchdata({
        searchdata: '',
        searchType: this.searchType
      });
      this.event.sendResetEvent();
      this.clearIcon = false;
    }
    if (this.searchKey?.length > 2) {
      this.searchBool = true;
    } else {
      this.searchBool = false;
    }

  }

  resetfromsearch() {
    this.event.sendResetEvent();
    this.event.indexSelected = 0;
  }

  editProfile() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    // this.loginShowHeader = localStorage.getItem("LoggedIn");
    this.email = userData?.email;
    this.name = userData?.name;
    this.image = userData?.image;
    this.type = userData?.type;
    this.userName = userData?.userName;
    //  this.loadHeader();
  }

  getRecent() {
    if (this.searchKey?.length > 2) {
      this.searchBool = true;
    } else {
      this.searchBool = false;
    }
    this.Rcenents = JSON.parse(localStorage.getItem("Recent Searches"));
    if (this.Rcenents?.length > 0) {
      this.newSuggestionsArray = this.Rcenents;
    } else { }
  }

  getSuggestions() {
    this.suggestions = [];
    this.clearIcon = true;
    this.searchValue = this.searchKey;
    if (this.searchKey?.length > 2) {
      this.searchBool = true;
    } else {
      this.searchBool = false;
    }
    if (this.searchKey.trim() !== '' && this.searchKey?.length > 1) {
      this.api.get('searchkeyword?text=' + this.searchKey).subscribe((res: any) => {
        this.suggestions = [];
        // let suggest = [];
        this.suggestionData = res.searchData;
        if (this.suggestionData.length > 0) {
          // this.suggestionData.forEach(element => {
          //   suggest = [...element.taggroups, ...element.tags , ...element.subcategory, ...element.group];
          // });

          for (let i = 0; i <= this.suggestionData.length; i++) {
            if (this.suggestionData[i]?.taggroups && this.suggestionData[i]?.taggroups.length > 0) {
              this.suggtaggroup = this.suggestionData[i].taggroups;
              this.suggtaggroup.forEach(element => {
                this.suggestions.push(element.groupName);
              });
            }
            if (this.suggestionData[i]?.tags && this.suggestionData[i]?.tags.length > 0) {
              this.SuggTags = this.suggestionData[i].tags;
              this.SuggTags.forEach(element => {
                this.suggestions.push(element.tags);
              });
            }

            if (this.suggestionData[i]?.subcategory && this.suggestionData[i]?.subcategory.length > 0) {
              this.suggsubcategory = this.suggestionData[i].subcategory;
              this.suggsubcategory.forEach(element => {
                let subcategory = [];
                subcategory = element.subCategory;
                this.suggestions.push(subcategory);
              });
            }
            if (this.suggestionData[i]?.group && this.suggestionData[i]?.group.length > 0) {
              this.suggGroup = this.suggestionData[i]?.group;
              this.suggGroup.forEach(element => {
                this.suggestions.push(element.groups);
              });
            }
            let newArray = [];
            let suggestionsArray = [];
            let filter = this.searchKey.toLowerCase();

            newArray = [...new Set(this.suggestions)];

            newArray.map((item) => {
              if (item.toLowerCase().startsWith(filter)) {
                suggestionsArray.push(item);
              }
            });
            newArray.map((item) => {
              if (!item.toLowerCase().startsWith(filter)) {
                suggestionsArray.push(item);
              }
            });

            this.newSuggestionsArray = [...new Set(suggestionsArray)];
          }
        }
      });
    } else {
      this.newSuggestionsArray = [];
      // this.router.navigate(["/"]);
    }
  }

  inboxPageRedirect() {
    if (this.type == "business") {
      this.router.navigate(["/pages/business-inbox"]);
    } else if (this.type == "subbusiness") {
      this.router.navigate(["/pages/business-inbox"]);
    } else {
      this.router.navigate(["/view/inbox"]);
    }
  }

  profilepageRedirect() {
    if (this.type == "business") {
      this.router.navigate(["/pages/business-details"]);
    } else if (this.type == "subbusiness") {
      this.router.navigate(["/pages/business-details"]);
    } else {
      this.router.navigate(["/profile/profile"]);
    }
  }

  mobilepageRedirect() {
    if (this.type == "business") {
      this.router.navigate(["/pages/business-profle-mobile"]);
    } else if (this.type == "subbusiness") {
      this.router.navigate(["/pages/business-profle-mobile"]);
    } else {
      this.router.navigate(["/profile/profile"]);
    }
  }

  mobileChatRedirect() {
    if (this.loginShowHeader) {
      if (this.type === 'business') {
        this.router.navigate(["/pages/business-inbox"]);
      } else {
        this.router.navigate(["/view/inbox"]);
      }
    } else {
      this.router.navigate(["/login/student"]);
    }
  }

  homesearch() {
    this.isNotshowsearch = true;
    if (this.searchValue && this.searchValue.trim() !== '') {
      this.router.navigate(["/view/search/" + this.searchType + "/" + this.searchValue]);
    } else {
      this.router.navigate(["/view/search/" + this.searchType + "/" + 'all']);
    }
  }

  logout() {
    this.event.businessDetails = false;
    this.event.businessName = '';
    this.event.businessPersonName = '';
    this.storage.logout();
    this.router.navigate(["/login/" + this.type]);
  }

  redirection(type: any) {
    this.router.navigate(['/register/' + type]);
    localStorage.setItem('userType', type);
    sessionStorage.setItem("backArrow", "yes");
  }
  
  gethomesection() {
    this.api.get("homesection").subscribe((res: any) => {
      this.event.sectionData = res.description;
    });
  }
  // ngOnDestroy(): void {
  //   if(this.userId && this.token)
  //   this.router.navigate([`/admin/business-profile/${this.userId}/${this.token}`]);
  // }

  clearSearch() {
    this.searchKey = '';
  }

}
