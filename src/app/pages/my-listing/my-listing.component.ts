import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";


@Component({
  selector: "app-my-listing",
  templateUrl: "./my-listing.component.html",
  styleUrls: ["./my-listing.component.scss"],
})
export class MyListingComponent implements OnInit {
  data: any;
  fulldata: any;
  allProducts: any = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private event:EventService
  ) {

  }

  ngOnInit(): void {

    this.getAllListing();
  }

  getAllListing() {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.api.get('getproductbyuser?userId=' + this.fulldata._id).subscribe((res: any) => {
     this.allProducts = res.productsData;
     //console.log(this.allProducts);
    });
  }
  
  redirectToMarketplaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }

  back(){
    this.event.back();
  }
}
