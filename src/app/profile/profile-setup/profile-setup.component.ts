import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  leaveGroup: any;
  data: string;
  fulldata: any;
  email: any;
  image: any;
  userName: any;
  name: any;
  allProfileData: any = [];
  groupData: any = [];
  reviewData: any = [];
  classData: any = [];
  eventData: any = [];
  articleData: any = [];
  productsData: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  type: string;

  constructor(
    private storage: StorageService,
    private router: Router,
    private api: ApiService,
    private event: EventService,
  ) { }
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
    navSpeed: 700,
    items: 4,
    //autoplayTimeout:2000,
    //autoplaySpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    },
    nav: false
  };


  customOptions4: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    navSpeed: 700,
    items: 4,
    //autoplayTimeout:2000,
    //autoplaySpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.type = this.fulldata.type;
    this.email = this.fulldata?.email;
    this.image = this.fulldata?.image;
    this.userName = this.fulldata?.userName;
    this.name = this.fulldata?.name;
    this.getUserProfileData();
    
  }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }


  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }


  getUserProfileData() {
    this.api.get('userprofile').subscribe((res:any) => {
      //console.log(res);
      this.allProfileData = res.results;
      this.groupData = this.allProfileData[0]?.groupData;
      this.reviewData = this.allProfileData[1]?.reviewData;
      this.classData = this.allProfileData[2]?.classData;
      this.eventData = this.allProfileData[3]?.eventData;
      this.articleData = this.allProfileData[4]?.articleData;
      this.productsData = this.allProfileData[5]?.productsData;
    });
  }

  logout() {
    this.event.businessDetails = false;
    this.storage.logout();
    this.router.navigate(['/login/' + this.type]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }

  redirectToMarketplaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }
  getClassCategory(id: any) {
    let newId = atob(id);
    this.router.navigate(["/view/class-details/" + newId]);
  }

  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }
  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  redirectionMorepage(type: any) {
    //console.log("type", type);
    this.router.navigate(["/profile/moreprofiledata/" + type]);
  }

  back(){
    this.event.back();
  }
}
