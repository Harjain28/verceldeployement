import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { SideBar } from './data';

@Component({
  selector: 'app-adminbusiness-left-sidebar',
  templateUrl: './adminbusiness-left-sidebar.component.html',
  styleUrls: ['./adminbusiness-left-sidebar.component.scss']
})
export class AdminbusinessLeftSidebarComponent implements OnInit {

  data: string;
  fulldata: any;
  className: any;
  businessDetails: any;
  userData: any;
  branchStatus: boolean = true;
  ADDEDITBRANCHSTATUS: any;
  BUSINESSADMINID: any;
  ADMINTOKEN: any;
  classDetails: any;
  SidebarArray: any = [];
  getArray: any = ['business_information', 'branch', 'programms'];
  API_URL: string;
  SideBarData: any = [];
  adminId: any;

  constructor(private router: Router,
    private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private route: ActivatedRoute,
    private http: HttpClient) {
    this.API_URL = environment.BASE_API_ENDPOINT;
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   this.adminId = params?.AdminId;
    // });
    this.SidebarArray = SideBar;
    this.ADDEDITBRANCHSTATUS = JSON.parse(localStorage.getItem("userData"));
    this.BUSINESSADMINID = localStorage.getItem("businessadminid");
    this.ADMINTOKEN = localStorage.getItem("admintoken");
    this.adminId = localStorage.getItem("adminid");
    // this.data = localStorage.getItem("classData");
    // this.fulldata = JSON.parse(this.data);
    // this.branchStatus = this.ADDEDITBRANCHSTATUS?.postalCode ? true : false;
    this.getAdminDetails();
    this.getbusinessDetails();
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.BUSINESSADMINID}/${this.ADMINTOKEN}/${this.adminId}`])
  }

  getbusinessDetails() {
    if (this.event.adminBusinessDetails?.length === 0) {
      this.api.getAdminBusinessDetails().subscribe((res: any) => {
        this.event.adminBusinessDetails = res;
        this.classDetails = this.event.adminBusinessDetails.results?.[1]?.classDetails[0];
        this.className = this.classDetails.businessName;
      });
    }else{
      this.classDetails = this.event.adminBusinessDetails.results?.[1]?.classDetails[0];
      this.className = this.classDetails.businessName;
    }
  }

  getAdminDetails() {
    if (this.event.adminSideBarData.length === 0) {
      let requestData = {};
      requestData["adminId"] = this.adminId;
      this.http.post(`${this.API_URL}/getadmindetails`, requestData).subscribe((res: any) => {
        if (res?.adminData[0]?.subroles?.length > 0) {
          this.SideBarData.push({ label: 'Business Information', value: 'business_information', url: 'business-details', svgImg: 'M22.93,11.63 L21,6.80999998 L21,2.99999996 C21,2.44771521 20.5522848,1.99999996 20,1.99999996 L3.99999997,1.99999996 C3.44771521,1.99999996 2.99999996,2.44771521 2.99999996,2.99999996 L2.99999996,6.80999998 L1.06999995,11.63 C0.94725959,11.9381879 0.985339956,12.287184 1.17165598,12.5616496 C1.35797199,12.8361151 1.66826982,13.0003213 1.99999996,13 L2.99999996,13 L2.99999996,22 C2.99999996,22.5522848 3.44771521,23 3.99999997,23 L20,23 C20.5522848,23 21,22.5522848 21,22 L21,13 L22,13 C22.3317302,13.0003213 22.642028,12.8361151 22.828344,12.5616496 C23.01466,12.287184 23.0527404,11.9381879 22.93,11.63 Z M3.47999996,11 L4.67999997,7.99999998 L19.32,7.99999998 L20.52,11 L3.47999996,11 Z M19,3.99999997 L19,5.99999997 L4.99999997,5.99999997 L4.99999997,3.99999997 L19,3.99999997 Z M14,21 L9.99999999,21 L9.99999999,17 L14,17 L14,21 Z M19,21 L16,21 L16,16 C16,15.4477153 15.5522848,15 15,15 L8.99999997,15 C8.44771524,15 7.99999998,15.4477153 7.99999997,16 L7.99999997,21 L4.99999997,21 L4.99999997,13 L19,13 L19,21 Z'});
          this.SidebarArray.forEach(element => {
            res.adminData[0]?.subroles.forEach(subroles => {
              if (element.value === subroles && subroles !== 'business-details') {
                this.SideBarData.push({ label: element.label, value: element.value, url: element.url, svgImg: element.svgImg });
              }
            });
          });
        } else {
          this.SidebarArray.forEach(element => {
            this.SideBarData.push({ label: element.label, value: element.value, url: element.url, svgImg: element.svgImg });
          });
        }
      });
      this.event.adminSideBarData = this.SideBarData;
    }else{
      this.SideBarData = this.event.adminSideBarData;
    }
  }

}
