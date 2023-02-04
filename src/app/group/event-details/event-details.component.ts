import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailsComponent implements OnInit {
  id: any;
  eventsList: any = [];
  title: any;
  startTime: any;
  endTime: any;
  Date: any;
  price: any;
  description: any;
  address1: any;
  address2: any;
  country: any;
  image: any = [];
  dayName: any;
  sectionData: any = [];
  sections: any = [];
  groupsName: any;
  endDate: any;
  endDayName: string;
  seteventtype: any;
  tagName: any;
  contactName: any;
  contactEmail: string;
  loginShowHeader: string;
  showMessageButton: boolean;
  wishlisteddata: any;
  favItem: boolean = false;
  isIcon: boolean = false;
  lat: number;
  lng: number;
  zoomValue: any;
  locationchoosen: boolean = false;
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
        items: 1,
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
  alltags: any = [];
  eventTags: any = [];


  constructor(
    private api: ApiService,
    private router: Router,
    private storage: StorageService,
    private route: ActivatedRoute,
    private event: EventService
  ) {
    this.loginShowHeader = localStorage.getItem("LoggedIn");
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.getEventdetailsbyId();
      this.getEvents();

    });
  }


  getEventdetailsbyId() {
    this.api
      .get("eventdetailsbyId?eventId=" + this.id)
      .subscribe((res: any) => {
        this.eventsList = res.eventData;
        if (this.storage.isLoggednIn()) {
          this.getWishlist();
        }
        this.image = this.eventsList.image;
        this.title = this.eventsList?.title;
        this.tagName = this.eventsList?.tags;
        this.groupsName = this.eventsList?.groupId;
        this.contactName = this.eventsList?.contactName;
        this.contactEmail = this.eventsList?.contactEmail
        if (this.loginShowHeader && this.contactEmail) {
          this.showMessageButton = true
        } else {
          this.showMessageButton = false
        }
        if (this.eventsList.seteventtype == 'Inperson') {
          this.seteventtype = "In-Person"
          this.lat = this.eventsList.loc?.coordinates[1];
          this.lng = this.eventsList.loc?.coordinates[0];
          this.zoomValue = 18;
        } else {
          this.seteventtype = this.eventsList.seteventtype;
          this.lat = 1.3521;
          this.lng = 103.8198;
          this.zoomValue = 8;
        }
        this.Date = this.eventsList.Date;
        this.dayName = new Date(this.Date).toLocaleString("en-us", {
          weekday: "long",
        });
        this.endDate = this.eventsList.endDate;
        this.endDayName = new Date(this.endDate).toLocaleString("en-us", {
          weekday: "long",
        });
        this.startTime = new Date(
          "1970-01-01T" + this.eventsList.startTime + "Z"
        ).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        });
        this.endTime = new Date(
          "1970-01-01T" + this.eventsList.endTime + "Z"
        ).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        });

        this.price = this.eventsList.price;
        this.description = this.eventsList.description;
        this.address1 = this.eventsList.address1;
        this.address2 = this.eventsList.address2;
        this.country = this.eventsList.country;
        this.isIcon = true;

      });
      this.getPublicTags();

  }


  ngOnInit(): void {

  }

  searchbytag(value: any) {
    this.router.navigate(['view/events/' + value]);
    // console.log('tags', value);
  }
  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }
  copyToClipboard() {
    if (this.storage.isLoggednIn()) {
      this.event.copyClipboard();
      this.api.alert('Link Copied', 'success');
    }
  }
  getPublicTags() {
    this.api.get('gettag').subscribe((res: any) => {
      this.alltags = res.tagData;
      this.alltags.forEach(element => {
        this.eventsList?.tags.filter((tags) => {
          if (element.tags === tags) {
            if (element.status == true) {
              this.eventTags.push(element.tags);
            }
          }
        });
      });
      // console.log(this.eventTags, "classTags");
    });
  }


  getEvents() {
    this.api.get("eventdetailssection?eventId=" + this.id).subscribe((res: any) => {
      this.sectionData = res.description;
      // console.log(this.sectionData, res, "sectionData")
      // this.sectionData.forEach((item: any) => {
      //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      // })
    });
  }

  // getEvents() {
  //   this.api.get("eventdetailssection").subscribe((res: any) => {
  //     this.sectionData = res.description;
  //     console.log(this.sectionData, res, "sectionData")

  //     this.sectionData.forEach((item: any) => {
  //       this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
  //     })
  //   });
  // }

  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=events').subscribe((res: any) => {
      //console.log(res.wishlistedData);
      this.wishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.wishlisteddata.length; i++) {
        if (this.wishlisteddata[i].userId?._id === userData?._id) {
          if (this.eventsList?._id === this.wishlisteddata[i]?.wishlistedId) {
            this.favItem = true;
          }
        }
        // } else {
        //   this.favItem = false;
        // }

      }

    });
  }

  addtoClassWishList(eventid: any) {
    if (this.storage.isLoggednIn()) {
      this.favItem = true;
      this.api.alert('Added to Shortlist', 'success');
      let requestData = {};
      requestData["type"] = 'events';
      requestData["wishlistedId"] = eventid;
      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        if (favAdded === "Added to your wishlist successfully") {
          // this.api.alert('Added to Shortlist', 'success');
        }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  }

  deleteClassWishlist(eventid: any) {
    if (this.storage.isLoggednIn()) {
      this.favItem = false;
      this.api.alert('Removed from Shortlist', 'success');
      let requestData = {};
      requestData["wishlistedId"] = eventid;
      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        if (favAdded === "Your wishlisted Item removed successfully") {

        }
        // } else {
        //   this.favItem = true;
        //   // this.api.alert('Remove to wishlist', 'error');
        // }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }

  }

  showMoreData(sectiontitle: any) {
    let DetailType = 'forevents'
    this.router.navigate(["/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
  }

  mapClicked(event: any) {
    // console.log(event);
    // // this.lat = event.coords.latitude;
    // // this.lng = event.coords.longitude;
    // this.locationchoosen = true;
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

  back(){
    this.event.back();
  }
}
