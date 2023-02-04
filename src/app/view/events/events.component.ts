import { E } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyRecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class EventsComponent implements OnInit {
  events: any = [];
  Date: any;
  startTime: any;
  endTime: any;
  nextEvents: any = [];
  selected: any;
  activeDate: Date;
  eventsectiondata: any;
  section1: any;
  section2: any;
  newData: any;
  eventTitle1: any;
  events1: any = [];
  eventSectionName1: any;
  eventTitle2: any;
  eventSectionName2: any;
  events2: any = [];
  eventTitle3: any;
  eventSectionName3: any;
  events3: any = [];
  showDatepicker: boolean = false;
  showFilter: boolean = false;
  seteventtype: string;
  tagvalue: any;
  newNextEvents: any = [];
  searchvalue: any;
  eventData: any = [];
  newEventdata: any = [];
  sort: any;
  sortData: any;
  timeType: any;
  eventType: any;
  otherType: any;
  date: any;
  wishlistedData: any;
  eventwishlisteddata: any = [];
  newdate: any;
  loginOrNot: string;
  resetBool: boolean = false;
  pagenumber: number = 1;
  itemperpage: number = 10;
  iseventData: boolean = false;
  favadded: boolean;
  resetmonth: any;
  clearIcon: boolean = false;
  initDate: any;
  resetClick: boolean = false;

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

  constructor(private api: ApiService, private event: EventService, private cdr: ChangeDetectorRef,
    private router: Router, private storage: StorageService
    , private route: ActivatedRoute,
    private localstorage: LocalStorageService) {
    this.route.params.subscribe((params) => {
      this.tagvalue = params['value'];
      this.getWishlist();
      if (this.tagvalue) {
        this.resetClick = true;
      }
      // this.getWishlisted();
    });
    const localStorageChanges$ = this.localstorage.changes$;
  }


  ngOnInit(): void {
    this.selected = new Date();
    var date = this.selected.getDate();
    var month = this.selected.getMonth() + 1;
    var year = this.selected.getFullYear();
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.newdate = year + "-" + month + "-" + date;
    this.initDate = this.newdate

    this.loginOrNot = localStorage.getItem("LoggedIn");

    this.selected = new Date();
    if (!this.resetBool) {
      this.eventType = this.event.eventType;
      this.timeType = this.event.timeType;
      this.sort = this.event.sort;
      this.otherType = this.event.otherType;
      this.evenSorting();
    }
    // this.getEvents();
    // this.getEventsSections();
  }

  getALlevents() {
    let requestData = {};
    requestData["startDate"] = this.newdate;
    // requestData["limit"] = this.itemperpage;
    // requestData["page"] = this.pagenumber;
    this.api.post("eventSearch", requestData).subscribe((res: any) => {
      this.eventData = res.EventData;
      this.newEventdata = this.eventData;
      if (!this.resetBool) {
        this.eventType = this.event.eventType;
        this.timeType = this.event.timeType;
        this.sort = this.event.sort;
        this.otherType = this.event.otherType;
      }
      this.evenSorting();
    });
  }


  sortingBytagName() {
    if (this.tagvalue && this.tagvalue.trim() !== '') {
      // this.showtags = true;
      this.api.get("searchontype?type=event&selectedName=" + this.tagvalue).subscribe((res: any) => {
        this.eventData = res.data;
        this.newEventdata = this.eventData;
        this.getWishlist();
        // this.evenSorting();
      });
    }
  }

  onSelect(event) {
    this.resetClick = true;
    // console.log(event, "event");
    this.newEventdata = [];
    this.selected = event;
    var date = event.getDate();
    var month = event.getMonth() + 1;
    var year = event.getFullYear();
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let selectdate = year + "-" + month + "-" + date;
    this.searchvalue = '';
    this.sort = 'Date';
    this.timeType = 'upcoming';
    this.pagenumber = 1;
    this.newdate = selectdate
    this.evenSorting();
    // let requestData = {};
    // requestData["startDate"] = selectdate;
    // // requestData["limit"] = this.itemperpage;
    // // requestData["page"] = this.pagenumber;
    // this.api.post("eventSearch", requestData).subscribe((res: any) => {
    //   this.eventData = res.EventData;
    //   this.newEventdata == this.eventData;
    // });
  }

  getEventbytags() {
    if (this.searchvalue.length > 0) {
      this.resetClick = true;
      this.clearIcon = true;
    } else {
      this.clearIcon = false;
    }
    this.pagenumber = 1;
    if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
      this.api.get("searchontype?type=event&selectedName=" + this.tagvalue + '&text=' + this.searchvalue).subscribe((res: any) => {
        this.newEventdata = res.data;
        this.timeType = '';
        this.eventType = '';
        this.sort = '';
        this.otherType = '';
        this.selected = new Date();
        this.newdate = new Date();
        this.getWishlist();
      });
    } else if (!this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
      this.api.get("searchontype?type=event&selectedName=" + '&text=' + this.searchvalue).subscribe((res: any) => {
        this.newEventdata = res.data;
        this.timeType = '';
        this.eventType = '';
        this.sort = '';
        this.otherType = '';
        this.selected = new Date();
        this.newdate = new Date();
        this.getWishlist();
      });
    } else if (!this.searchvalue && this.searchvalue.trim() === '') {
      this.newEventdata = [];
      this.timeType = 'upcoming';
      this.sort = "Date";
      this.pagenumber = 1;
      this.evenSorting();
    } else { }
  }

  resetFilter() {
    if (this.resetClick) {
      this.resetClick = false;
      this.clearIcon = false;
      this.resetBool = true;
      this.timeType = 'upcoming';
      this.event.timeType = 'upcoming';
      this.eventType = '';
      this.sort = 'Date';
      this.otherType = '';
      this.event.otherType = '';
      this.event.eventType = '';
      this.event.sort = 'Date';
      this.searchvalue = '';
      this.selected = new Date();
      this.calendar._goToDateInView(new Date(), 'month');
      this.newdate = this.initDate;
      this.newEventdata = [];
      this.pagenumber = 1;
      this.evenSorting();
      if (this.tagvalue) {
        this.router.navigate(['/view/events']);
      }

      // this.newEventdata = this.eventData;
    }
  }

  showCalender() {
    this.showDatepicker = !this.showDatepicker;
    this.showFilter = false;
  }


  changeSortOrder() {
    this.resetClick = true;
    this.event.eventType = this.eventType;
    // if (this.timeType === '') {
    //   this.event.timeType = 'upcoming';
    // } else {
    //   this.event.timeType = this.timeType;
    // }
    if (this.searchvalue) {
      this.timeType = 'upcoming';
      this.sort = 'Date';
    }
    this.event.timeType = this.timeType;
    // this.timeType = 'upcoming';
    // this.sort = 'Date';
    this.event.sort = this.sort;
    this.event.otherType = this.otherType;
    this.pagenumber = 1;
    this.newEventdata = [];
    this.evenSorting();
    this.searchvalue = '';
  }

  evenSorting() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    let requestData = {};
    if (this.timeType && this.timeType !== '') {
      if (this.timeType === 'upcoming') {
        requestData["upcoming"] = this.newdate;
      } else if (this.timeType === 'Past') {
        requestData["past"] = this.newdate;
      }
    }
    if (this.tagvalue) {
      requestData["tag"] = this.tagvalue;
    }
    requestData["limit"] = this.itemperpage;
    requestData["page"] = this.pagenumber;
    requestData["sortBy"] = this.sort;
    requestData["eventtype"] = this.eventType;
    requestData["otherfilter"] = '';
    if (this.loginOrNot) {
      if (this.otherType && this.otherType !== '') {
        requestData["otherfilter"] = this.otherType;
        requestData["userId"] = userData?._id;
      } else {
        requestData["otherfilter"] = '';
      }
    }
    this.api.post("eventsorting", requestData).subscribe((res: any) => {
      this.iseventData = true;
      this.newEventdata.push(...res.EventData);
      if (this.storage.isLoggednIn()) {
        this.getWishlist();
      }
      // this.newEventdata = this.eventData;
    });
  }

  showAllfilters() {
    this.showDatepicker = false;
    this.showFilter = !this.showFilter;
  }

  getEventsDetails(id: any) {
    this.pagenumber = 1;
    this.router.navigate(["/event-details/" + id]);
  }


  copyToClipboard(val) {
    if (this.storage.isLoggednIn()) {
      var inputc = document.body.appendChild(document.createElement("input"));
      inputc.value = window.location.href.split('view/events').slice(0,-1) + 'event-details/' + val.toString();
      inputc.focus();
      inputc.select();
      document.execCommand('copy');
      inputc.parentNode.removeChild(inputc);
      this.api.alert('Link Copied', 'success');
    } else {
      this.router.navigate(["/login/student"]);
    }
  }
  clearData() {
    this.searchvalue = '';
    this.clearIcon = false;
    this.resetFilter();
  }

  addtoEventWishList(eventId: any, likebool: boolean) {
    if (this.storage.isLoggednIn()) {
      this.favadded = likebool;
      for (let i = 0; i < this.newEventdata.length; i++) {
        if (this.newEventdata[i]._id === eventId) {
          this.newEventdata[i].selected = true;
          this.favadded = false;
          this.api.alert('Added to Shortlist', 'success');
        }
        // } else {
        //   this.newEventdata[i].selected = false;
        //   this.api.alert('Remove to wishlist', 'error');
        // }
      }
      let requestData = {};
      requestData["type"] = 'events';
      requestData["wishlistedId"] = eventId;

      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        // const favAdded = res.message;
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  }

  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=events').subscribe((res: any) => {
      // console.log(res.wishlistedData);
      this.eventwishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.eventwishlisteddata?.length; i++) {
        if (this.eventwishlisteddata[i].userId?._id === userData?._id) {
          this.newEventdata.forEach(element => {
            if (element._id === this.eventwishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
          });
        }
      }
    });
  }

  deleteEventWishlist(eventId: any) {
    if (this.storage.isLoggednIn()) {
      for (let i = 0; i < this.newEventdata.length; i++) {
        if (this.newEventdata[i]._id === eventId) {
          this.newEventdata[i].selected = false;
          this.api.alert('Removed from Shortlist', 'success');
        }
        // } else {
        //   this.newEventdata[i].selected = true;
        //   // this.api.alert('Add to wishlist', 'error');
        // }
      }
      let requestData = {};
      requestData["wishlistedId"] = eventId;

      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        // const favAdded = res.message;
      });
    } else {
      this.router.navigate(["/login/student"]);
    }
  }

  onScroll(e) {
    if (this.iseventData) {
      this.pagenumber += 1;
      // this.getALlevents(); 
      this.evenSorting();
    }
  }

  back() {
    this.event.back();
  }
}
