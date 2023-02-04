import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-homepagemore',
  templateUrl: './homepagemore.component.html',
  styleUrls: ['./homepagemore.component.scss']
})
export class HomepagemoreComponent implements OnInit {

  groups: any = [];
  sectionData: any = [];
  sections: any = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 300,
    //autoplayTimeout:2000,
    //autoplaySpeed: 1500,
    navText: ["", ""],
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
    nav: false,
  };
  slides: any = [
    { id: 1, img: "./assets/images/banner2.svg" },
    { id: 2, img: "./assets/images/banner2.svg" },
    { id: 3, img: "./assets/images/banner1.svg" },
    { id: 4, img: "./assets/images/banner1.svg" },
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
  sectionTitle: any;

  constructor(private api: ApiService, private router: Router, private storage: StorageService,
    private route: ActivatedRoute, private event: EventService) {

    this.route.params.subscribe((params) => {
      this.sectionTitle = params["sectionName"];
      this.gethomesection();
    });

  }

  ngOnInit(): void {
    // this.gethomesection();
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  gethomesection() {
    if (this.event.sectionData.length === 0) {
      this.api.get("homesection").subscribe((res: any) => {
        for (let i = 0; i <= res.description.length; i++) {
          if (res.description[i]?.title === this.sectionTitle) {
            this.sectionData.push(res.description[i]);
            this.sectionData.forEach((item: any) => {
              this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
            })
          }
        }
      });
    } else {
      for (let i = 0; i <= this.event.sectionData.length; i++) {
        if (this.event.sectionData[i]?.title === this.sectionTitle) {
          this.sectionData.push(this.event.sectionData[i]);
          this.sectionData.forEach((item: any) => {
            this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
          })
        }
      }
    }

  }

  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }

  getClassDetails(id: any) {
    let newID = atob(id);
    this.router.navigate(["/view/class-details/" + newID]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }

  back() {
    this.event.back();
  }

}
