import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  id: any;
  token: any;
  allClassDetails: any = {};
  aboutClass: any;
  className: any;
  classSubcategory: any;
  website: any;
  mobileNo: any;
  images: any = [];
  branchName: any = [];
  branchDetails: any = [];
  address: any;
  email: any;
  businessemail: any;
  programData: any;
  teacherData: any;
  albumData: any;
  articles: any = [];
  events: any = [];
  data: string;
  fulldata: any;
  businessmobileNo: any;
  sectionData: any = [];
  sections: any = [];
  classEmail: any;
  webAddress: any;
  userId: any;
  API_URL: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      this.api.get("classDetails?classId=" + this.id).subscribe((res: any) => {
        // console.log(res, "classDetails");
        this.branchName = res.branchData.map((item) => {
          return { value: item.branchName, branchId: item._id };
        });
        this.programData = res.programData;
        this.teacherData = res.teacherData;
        this.albumData = res.albumData;

        this.branchDetails = res.branchData;
        this.address = res.branchData[0]?.address1;
        this.mobileNo = res.branchData[0]?.mobileNo;
        this.email = res.branchData[0]?.email;
        this.webAddress = res.branchData[0]?.webAddress;

        this.allClassDetails = res.classData;
        this.className = this.allClassDetails.businessName;
        this.aboutClass = this.allClassDetails.aboutBusiness;
        this.classEmail = this.allClassDetails.email;
        this.classSubcategory = this.allClassDetails.businesssubCategory
          .map((item) => {
            return item.subCategory;
          })
          .join(", ");
        this.website = this.allClassDetails.webAddress;
        this.images = this.allClassDetails.image;
      });
    });

    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.businessemail = this.fulldata?.email;
    this.businessmobileNo = this.fulldata?.mobileNo;
  }

  customOptions: OwlOptions = {
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

  ngOnInit(): void {
    this.getClasses();
  }

  selectBranch(event: Event) {
    this.branchDetails.forEach((branch) => {
      if (branch._id === event) {
        this.address = branch.addbranchs1;
        this.mobileNo = branch.mobileNo;
        this.email = branch.email;
        this.webAddress = branch.webAddress;

      }
    });
    // console.log(event, "selectBranch");
  }

  getClasses() {
    this.api.get("classdetailsection").subscribe((res: any) => {
      this.sectionData = res.description;
      // console.log(this.sectionData, res, "sectionData");

      this.sectionData.forEach((item: any) => {
        this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      })
    });
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

  ngOnDestroy(): void {
    this.router.navigate([`/admin/admin-articles/${this.id}/${this.userId}/${this.token}`]);
  }

  back(){
    this.event.back();
  }
}
