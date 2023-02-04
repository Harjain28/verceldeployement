import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-marketplace-details',
  templateUrl: './marketplace-details.component.html',
  styleUrls: ['./marketplace-details.component.scss']
})
export class MarketplaceDetailsComponent implements OnInit {
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
        items: 4,
      },
      940: {
        items: 4,
      }
    },
    nav: false
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
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  };


  id: any;
  allProductData: any;
  sectionData: any = [];
  sections: any = [];
  productUserId: any;
  token: any;
  userId: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private event:EventService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.token = params["token"];
      this.api.get('getproductsbyid?productId=' + this.id).subscribe((res: any) => {
        this.allProductData = res.productsData;
        this.productUserId = this.allProductData?.userId?._id;
      });
    });
  }

  ngOnInit(): void {
    this.productdetailssection();
  }

  chatToBusiness() {
    const productId = 'productId';
    this.router.navigate(["/pages/chat/" + productId + '/' + this.id + '/' + this.productUserId]);
  }

  productdetailssection() {
    this.api.get("productdetailssection").subscribe((res: any) => {
      this.sectionData = res.description;
      //console.log(this.sectionData, res, "sectionData")

      this.sectionData.forEach((item: any) => {
        this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      })
    });
  }

  redirectToMarketplace(value: any) {
    this.router.navigate(["/view/marketplace/" + value]);
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
    this.router.navigate(["/class-details/" + id]);
  }

  // ngOnDestroy(): void {
  //   this.router.navigate([`/admin/admin-marketplace-details/${this.id}/${this.token}`]);
  // }

  back(){
    this.event.back();
  }
}
