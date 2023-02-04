import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

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
  productwishlisteddata: any = [];
  favItem: boolean;
  userId: any;
  ischatButton: boolean = true;
  isproductDatabool: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event:EventService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
     
      this.getAllproducts();
      this.getWishlist();
    });
  }


  ngOnInit(): void {
   
    // this.productdetailssection();

  }

  getAllproducts() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userData?._id;
    this.api.get('getproductsbyid?productId=' + this.id).subscribe((res: any) => {
      this.allProductData = res.productsData;
      this.productUserId = this.allProductData?.userId?._id;
      if (this.userId === this.productUserId) {
        this.ischatButton = true;
      } else {
        this.ischatButton = false;
      }
   
    });
  }

  chatToBusiness() {
    this.router.navigate(["/pages/chat/" + '/' + this.productUserId]);
  }

  productdetailssection() {
    this.api.get("productdetailssection?productId=" + this.id).subscribe((res: any) => {
      this.sectionData = res.description;
      //console.log(this.sectionData, res, "sectionData")

      this.sectionData.forEach((item: any) => {
        this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      })
    });
  }


  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=products').subscribe((res: any) => {
      //console.log(res.wishlistedData);
      this.productwishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.productwishlisteddata.length; i++) {
        if (this.productwishlisteddata[i].userId?._id === userData?._id) {
          if (this.allProductData?._id === this.productwishlisteddata[i]?.wishlistedId) {
            this.favItem = true;
            this.isproductDatabool = true;
          }
        } else {
          this.favItem = false;
        }

      }

    });
  }

  addtoClassWishList(classId: any) {
    if (this.storage.isLoggednIn()) {
    this.favItem = true;
    this.api.alert('Added to Shortlist', 'success');
    let requestData = {};
    requestData["type"] = 'products';
    requestData["wishlistedId"] = classId;
    
      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        // if (favAdded === "Added to your wishlist successfully") {
       
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
    if (this.storage.isLoggednIn()) {
    this.favItem = false;
    this.api.alert('Removed from Shortlist', 'success');
    let requestData = {};
    requestData["wishlistedId"] = classId;
   
      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        const favAdded = res.message;
        // if (favAdded === "Your wishlisted Item removed successfully") {
          
        // } else {
        //   this.favItem = true;
        //   // this.api.alert('Remove to wishlist', 'error');
        // }
      });
    } else {
      this.router.navigate(["/login/student"]);
    }

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
    this.router.navigate(["/view/class-details/" + id]);
  }

  back(){
    this.event.back();
  }
}
