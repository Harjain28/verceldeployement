import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Location } from '@angular/common';
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-class-details",
  templateUrl: "./class-details.component.html",
  styleUrls: ["./class-details.component.scss"],
})
export class ClassDetailsComponent implements OnInit {
  panelOpenState = false;
  id: any;
  allClassDetails: any;
  classSubcategory: any;
  mobileNo: any;
  branchName: any = [];
  branchDetails: any = [];
  address: any;
  email: any;
  sectionData: any = [];
  sections: any = [];
  webAddress: any;
  branchID: any;
  hideclass: boolean = true;
  allreviews: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  branchname: any;
  showAddreview: boolean = true;
  replyBox: boolean = false;
  showreplyReview: boolean = false;
  replyvalue: any;
  ReviewId: any;
  reveiewId: any;
  userId: any;
  classuserId: any;
  branchAdminEmail: any;
  allData: any;
  classdataSize: number;
  favItem: boolean = false;
  wishlisteddata: any;
  ischatButton: boolean = true;
  lat: any;
  lng: any;
  zoomValue: number;

  @ViewChild('tabs', { static: false }) tabs;
  selectedIndex: number = 0;
  isHidden: boolean = true;
  isAddreview: boolean = false;
  locationchoosen: boolean = false;
  branchstatus: any;
  branch: any;
  isSelected: boolean = false;
  branchSelected: any;
  alltags: any = [];
  classTags: any = [];
  newclassTags: any = [];
  isbranchSelected: boolean = false;
  moreaddress: any;
  postalcode: any;
  country: any;
  chatShowBool: boolean;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event: EventService,
    private location: Location
  ) {
    this.route.params.subscribe((params) => {
      let encodedId = params['id']
      // this.branch =  params["branchName"];
      this.id = btoa(encodedId);
      this.getbranchListing();
      this.getallClassDetails();
      this.getSection();
      this.getAllreview();
    });
  }

  customOptions: OwlOptions = {
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

  ngOnInit(): void {
    this.selectedIndex = this.event.indexSelected;
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userData?._id;
    if (userData?.type !== "student") {
      const classData = JSON.parse(localStorage.getItem('classData'));
      if (classData?._id === this.id) {
        this.showAddreview = false;
      }
    }

    if (this.event.selectedBranch) {
      this.isSelected = true;
      this.selectedIndex = 1;
      this.branchID = this.event.selectedBranch;
      this.branchSelected = this.event.selectedBranch;
      this.api.get('branchlist?classId=' + this.id).subscribe((res: any) => {
        this.branchDetails = res.branchData;
        this.branchDetails.forEach((branch) => {
          if (branch._id === this.event.selectedBranch) {
            this.branchname = branch?.branchName;
            this.address = branch?.address1;
            this.branchAdminEmail = branch?.email;
            this.mobileNo = branch?.businessmobileNo;
            this.email = branch?.businessemail ? branch?.businessemail : branch?.email;
            this.webAddress = branch?.webAddress;
            this.branchstatus = branch?.branchstatus;
            if (this.branchstatus === 'offline') {
              this.lat = branch?.loc?.coordinates[1];
              this.lng = branch?.loc?.coordinates[0];
              this.zoomValue = 18;
            } else {
              this.lat = 1.3521;
              this.lng = 103.8198;
              this.zoomValue = 9;
            }
            this.getallClassDetails();

            if (this.branchAdminEmail || this.allClassDetails?.email) {
              this.chatShowBool = true;
            } else {
              this.chatShowBool = false;
            }
          }
          // this.event.selectedBranch = ''

        })
      });
    }


  }

  mapClicked(event: any) {
    // this.lat = event.coords.latitude;
    // this.lng = event.coords.longitude;
    this.locationchoosen = true;
  }

  private getSection() {
    this.api.get("classdetailsection?classId=" + this.id).subscribe((res: any) => {
      this.sectionData = res.description;
      // this.sectionData.forEach((item: any) => {
      //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      // })
    });
  }



  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=classes').subscribe((res: any) => {
      this.wishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.wishlisteddata.length; i++) {
        if (this.wishlisteddata[i].userId?._id === userData?._id) {
          if (this.allClassDetails?._id === this.wishlisteddata[i]?.wishlistedId) {
            this.favItem = true;
          }
        } else {
          this.favItem = false;
        }
      }
    });
  }

  addtoClassWishList(classId: any) {
    this.favItem = true;
    let requestData = {};
    requestData["type"] = 'classes';
    requestData["wishlistedId"] = classId;
    if (this.storage.isLoggednIn()) {
      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        // if (favAdded === "Added to your wishlist successfully") {
        if (res.status) {
          this.api.alert('Added to Shortlist', 'success');
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

  deleteClassWishlist(classId: any) {
    this.favItem = false;
    let requestData = {};
    requestData["wishlistedId"] = classId;
    if (this.storage.isLoggednIn()) {
      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        if (res.status) {
          this.api.alert('Removed from Shortlist', 'success');
        }
        //  else {
        // //   this.favItem = true;
        //   // this.api.alert('Remove to wishlist', 'error');
        // // }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  }

  public searchData(value: any) {
    this.event.setHeaderSearchdata({
      searchdata: value,
      searchType: 'Classes'
    });
    this.router.navigate(["/view/search/" + 'Classes' + "/" + value]);
  }
  countStar(star) {
    this.selectedValue = star;
  }

  reviewReply(id: any) {
    this.replyBox = !this.replyBox;
    this.reveiewId = id;
    this.showreplyReview = !this.showreplyReview;
  }

  copyToClipboard() {
    if (this.storage.isLoggednIn()) {
      this.event.copyClipboard();
      this.api.alert('Link Copied', 'success');
    }
  }

  getallClassDetails() {
    this.isHidden = false;
    this.api.get("classDetails?classId=" + this.id + '&branchId=' + this.branchID).subscribe((res: any) => {
      this.allData = res;
      this.allClassDetails = res.classData;
      this.classuserId = this.allClassDetails?.admin_id;
      this.classdataSize = Object.keys(this.allClassDetails).length;
      if (this.userId === this.classuserId) {
        this.ischatButton = true;
      } else {
        this.ischatButton = false;
      }
      if (this.branchAdminEmail || this.allClassDetails?.email) {
        this.chatShowBool = true;
      } else {
        this.chatShowBool = false;
      }
      if (this.storage.isLoggednIn()) {
        this.getWishlist();
      }
    });
    if (!this.isbranchSelected) {
      this.getPublicTags();
    }

  }

  getPublicTags() {
    this.classTags = [];
    this.newclassTags = [];
    this.api.get('gettag').subscribe((res: any) => {
      this.alltags = res.tagData;
      this.alltags.forEach(element => {
        this.allClassDetails?.tags.filter((tags) => {
          if (element.tags === tags) {
            if (element.status == true) {
              this.newclassTags.push(element.tags);
            }
          }
        });
      });
      this.classTags = [...new Set(this.newclassTags)];
    });
  }


  chatToBusiness() {
    const classId = 'classId';
    console.log(this.branchAdminEmail,this.classdataSize,)
    if (this.branchAdminEmail && this.classdataSize > 0) {
      this.router.navigate(["/pages/chat/" + this.branchID]);
    } else if (this.classdataSize > 0) {
      this.router.navigate(["/pages/chat/" + this.classuserId]);
    } else {
      this.router.navigate(["/pages/chat/" + this.userId]);
    }
  }

  getbranchListing() {
    if (!this.isSelected) {
      this.api.get('branchlist?classId=' + this.id).subscribe((res: any) => {
        this.branchDetails = res.branchData;
        this.branchID = this.branchDetails[0]?._id;
        this.email = this.branchDetails[0].businessemail;
        this.branchAdminEmail = this.branchDetails[0].email;
        this.getallClassDetails();
        if (this.branchAdminEmail || this.allClassDetails?.email) {
          this.chatShowBool = true;
        } else {
          this.chatShowBool = false;
        }
        this.branchname = this.branchDetails[0]?.branchName;
        this.address = this.branchDetails[0].address1;
        this.moreaddress = this.branchDetails[0].address2;
        this.postalcode = this.branchDetails[0].postalCode;
        this.country = this.branchDetails[0].country;
        this.mobileNo = this.branchDetails[0].businessmobileNo;
      
        this.webAddress = this.branchDetails[0].webAddress;
        this.branchstatus = this.branchDetails[0].branchstatus;
        if (this.branchstatus === 'offline') {
          this.lat = this.branchDetails[0]?.loc?.coordinates[1];
          this.lng = this.branchDetails[0]?.loc?.coordinates[0];
          this.zoomValue = 18;
        } else {
          this.lat = 1.3521;
          this.lng = 103.8198;
          this.zoomValue = 9;
        }
       
        // this.branchName = this.branchDetails.map((item) => {
        //   return { value: item.branchName, branchId: item._id };
        // });
      })

      this.getAllreview();
    }
  }

  public selectBranch(event: Event) {
    this.isbranchSelected = true;
    this.event.selectedBranch = event;
    this.branchID = event;
    console.log(this.branchDetails)
    this.branchDetails.forEach((branch) => {
      if (branch._id === event) {
        this.branchname = branch?.branchName;
        this.address = branch?.address1;
        this.moreaddress = branch.address2;
        this.postalcode = branch.postalCode;
        this.country = branch.country;
        this.branchAdminEmail = branch?.email;
        this.mobileNo = branch?.businessmobileNo;
        this.email = branch?.businessemail ? branch?.businessemail : branch?.email;
        this.webAddress = branch?.webAddress;
        this.branchstatus = branch?.branchstatus;
        if (this.branchAdminEmail || this.allClassDetails?.email) {
          this.chatShowBool = true;
        } else {
          this.chatShowBool = false;
        }
        if (this.branchstatus === 'offline') {
          this.lat = branch?.loc?.coordinates[1];
          this.lng = branch?.loc?.coordinates[0];
          this.zoomValue = 18;
        } else {
          this.lat = 1.3521;
          this.lng = 103.8198;
          this.zoomValue = 9;
        }
      }

    });
    // console.log(this.branchname);
    this.getallClassDetails();
   


  }

  private getAllreview() {
    this.api.get('getreview?classId=' + this.id).subscribe((res: any) => {
      this.allreviews = res.data;
      // console.log(this.allreviews, "allreviews");
    });
  }

  showAboutClass() {
    this.hideclass = !this.hideclass;
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  back() {
    this.location.back();
  }

  SendReply(id: any) {
    this.ReviewId = id;
    let requestdata = {};
    requestdata['reviewId'] = this.ReviewId;
    requestdata['replyreview'] = { review: this.replyvalue };
    this.api.post('replyreview', requestdata).subscribe((res: any) => {
      if (res && res.status == true) {
        this.replyvalue = '';
        this.getAllreview();
      }
      this.showreplyReview = true;
      this.replyBox = false;
    });
  }

  selectedTabChange(tabVal) {
    this.event.indexSelected = tabVal.index;
    // console.log('tab changrd', tabVal.index);
  }

  showMoreData(sectiontitle: any) {
    let DetailType = 'forclassess'
    this.router.navigate(["/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
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
    this.isSelected = false;
    this.event.selectedBranch = '';
    this.router.navigate(["/view/class-details/" + newId]);
  }
  redirectToMarketplaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }
  redirectToaddreview() {
    this.router.navigate(["/pages/add-review/" + this.id + '/' + this.branchname]);

  }
}
