import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {
  leaveGroup: any;
  data: string;
  fulldata: any;
  email: any;
  phone: any;
  name: any;
  image: any;
  userId: any;
  token: any;
  newtoken: string;
  infoTextData: any = '';
  API_URL: any;

  constructor(private api: ApiService, private http: HttpClient, private route: ActivatedRoute, private router: Router,
    private event: EventService) {

    this.API_URL = environment.BASE_API_ENDPOINT;
   }
  customOptions2: OwlOptions = {
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
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
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
        items: 2
      },
      740: {
        items: 3
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
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      this.newtoken = localStorage.getItem("admintoken");
    });

    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.email = this.fulldata?.email;
    this.image = this.fulldata?.image;
    this.phone = this.fulldata?.mobileNo;
    this.name = this.fulldata?.name;
    //console.log(this.fulldata, this.image, "this.this.image")
    this.getInfoText();
  }

  getInfoText() {
    if (this.event.infoTextData?.length === 0) {
      this.api.getInfoSection().subscribe((res: any) => {
        this.infoTextData = res?.sectionData[0]?.description;
      })
    }else{
      this.infoTextData = this.event.infoTextData[0]?.description;
    }
  }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }

}
