import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { environment } from "src/environments/environment";
import { EventService } from "src/app/services/event.service";

@Component({
  selector: "app-admin-event",
  templateUrl: "./admin-event.component.html",
  styleUrls: ["./admin-event.component.scss"],
})
export class AdminEventComponent implements OnInit, OnDestroy {
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
  token: any;
  httpOptions: { headers: HttpHeaders };
  newtoken: any;
  API_URL: any;
  groupsName: any = [];
  tagName: any;
  contactName: any;
  seteventtype: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      this.newtoken = localStorage.getItem("admintoken");
      // console.log(this.newtoken);
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.newtoken,
        }),
      };
      this.http
        .get(
          `${this.API_URL}eventdetailsbyIdadmin?eventId=` +
          this.id,
          { headers: this.httpOptions.headers, params }
        )
        .subscribe((res: any) => {
          // console.log(res, "eventdetailsbyId");
          this.eventsList = res.eventData;
          this.title = this.eventsList.title;
          this.Date = this.eventsList.Date;
          this.dayName = new Date(this.Date).toLocaleString("en-us", {
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
          this.image = this.eventsList.image;
          this.contactName = this.eventsList?.contactName;
          this.tagName = this.eventsList?.tags;     //hj
          this.groupsName.push(this.eventsList?.groupId);  //hj
          if (this.eventsList.seteventtype == 'Inperson') {
            this.seteventtype = "In-Person"
          } else {
            this.seteventtype = this.eventsList.seteventtype
          }
        });
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

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.router.navigate([`/admin/admin-events/${this.id}/${this.token}`]);
  }

  back(){
    this.event.back();
  }
}
