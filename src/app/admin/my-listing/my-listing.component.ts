import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-my-listing",
  templateUrl: "./my-listing.component.html",
  styleUrls: ["./my-listing.component.scss"],
})
export class MyListingComponent implements OnInit {
  data: any;
  fulldata: any;
  allProducts: any = [];
  userId: any;
  token: any;
  API_URL: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
    })
  }

  ngOnInit(): void {

    this.getAllListing();
  }

  getAllListing() {
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.get(`${this.API_URL}admingetproductbyuser?userId=` + this.fulldata._id, { headers: headers }).subscribe((res: any) => {
      this.allProducts = res.productsData;
      //console.log(this.allProducts);
    });
  }

  // redirectToMarketplaceDetails(id: any) {
  //   this.router.navigate([`/admin/admin-marketplace-details/${id}/${this.token}`]);
  // }
  
  back(){
    this.event.back();
  }
}
