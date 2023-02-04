import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-adminbusiness-right-sidebar',
  templateUrl: './adminbusiness-right-sidebar.component.html',
  styleUrls: ['./adminbusiness-right-sidebar.component.scss']
})
export class AdminbusinessRightSidebarComponent implements OnInit {
  businessDetails: any;
  classDetails: any;
  id: any;
  token: any;
  httpOptions: { headers: HttpHeaders };
  urlData: string;
  showSidebar: boolean;
  showDeleteModal: boolean = false;
  showMessageDynamically: String;
  verifyprogrammeDetails: any = [];
  verifybranchDetails: any;
  verifybusinessDetails: any;
  verifyclassDetails: any;
  status: any;
  newtoken: string;
  verifiedbuttonName: any;
  userId: any;
  fulldata: any;
  infoTextData: any = '';
  adminId: any;

  constructor(private router: Router,
    private storage: StorageService,
    private event: EventService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,) {
    this.urlData = this.route.routeConfig.path
    this.showSidebar = this.urlData == "business-details" ? true : false;
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.adminId = params?.AdminId;
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getbusinessDetails();
    }, 500);
    //console.log(this.route.snapshot.routeConfig.path)
    if (this.event.infoTextData.length === 0) {
      this.getInfoText();
    } else {
      this.getInfoTextFromEvent();
    }
  }

  getInfoText() {
    this.api.getInfoSection().subscribe((res: any) => {
      this.event.infoTextData = res?.sectionData;
      const path = this.route.routeConfig.path
      if (path.includes('business-profile')) {
        this.infoTextData = res?.sectionData[1]?.description;
      } else if (path.includes('business-details')) {
        this.infoTextData = res?.sectionData[4]?.description;
      } else if (path.includes('add-new-branch') || path.includes('branches')) {
        this.infoTextData = res?.sectionData[8]?.description;
      } else if (path.includes('programms')) {
        this.infoTextData = res?.sectionData[9]?.description;
      } else if (path.includes('teachers')) {
        this.infoTextData = res?.sectionData[10]?.description;
      } else if (path.includes('gallery')) {
        this.infoTextData = res?.sectionData[11]?.description;
      } else if (path.includes('my-listing')) {
        this.infoTextData = res?.sectionData[12]?.description;
      } else if (path.includes('business-reviews')) {
        this.infoTextData = res?.sectionData[13]?.description;
      } else if (path.includes('business-inbox')) {
        this.infoTextData = res?.sectionData[14]?.description;
      } else if (path.includes('faqs')) {
        //console.log("faqs")
        this.infoTextData = res?.sectionData[15]?.description;
      } else {
        this.infoTextData = 'Information Text Not Found'
      }
    })
  }

  getInfoTextFromEvent() {
    const path = this.route.routeConfig.path
    if (path.includes('business-profile')) {
      this.infoTextData = this.event.infoTextData[1]?.description;
    } else if (path.includes('business-details')) {
      this.infoTextData = this.event.infoTextData[4]?.description;
    } else if (path.includes('add-new-branch') || path.includes('branches')) {
      this.infoTextData = this.event.infoTextData[8]?.description;
    } else if (path.includes('programms')) {
      this.infoTextData = this.event.infoTextData[9]?.description;
    } else if (path.includes('teachers')) {
      this.infoTextData = this.event.infoTextData[10]?.description;
    } else if (path.includes('gallery')) {
      this.infoTextData = this.event.infoTextData[11]?.description;
    } else if (path.includes('my-listing')) {
      this.infoTextData = this.event.infoTextData[12]?.description;
    } else if (path.includes('business-reviews')) {
      this.infoTextData = this.event.infoTextData[13]?.description;
    } else if (path.includes('business-inbox')) {
      this.infoTextData = this.event.infoTextData[14]?.description;
    } else if (path.includes('faqs')) {
      this.infoTextData = this.event.infoTextData[15]?.description;
    } 
  }

  getbusinessDetails() {
    if (this.event.adminBusinessDetails?.length === 0) {
      this.api.getAdminBusinessDetails().subscribe((res: any) => {
        this.event.adminBusinessDetails = res;
        this.status = res.status;
        this.businessDetails = res.results[0]?.businessDetails;
        this.verifiedbuttonName = res?.results?.[1]?.classDetails[0]?.profilestatus ? res?.results?.[1]?.classDetails[0]?.profilestatus : 'Submit Verify Requests';;
        this.verifybusinessDetails = res?.results?.[0]?.businessDetails.postalCode ? true : false
        this.classDetails = res?.results?.[1]?.classDetails[0];
        this.verifyclassDetails = res?.results?.[1]?.classDetails[0].aboutBusiness ? true : false;
        this.verifyprogrammeDetails = res?.results?.[3]?.programData.length === 0 ? false : true;
        this.verifybranchDetails = res?.results?.[5]?.branchDetails.length === 0 ? false : true;
      });
    } else{
      this.status = this.event.adminBusinessDetails.status;
      this.businessDetails = this.event.adminBusinessDetails.results[0]?.businessDetails;
      this.verifiedbuttonName = this.event.adminBusinessDetails?.results?.[1]?.classDetails[0]?.profilestatus ? this.event.adminBusinessDetails?.results?.[1]?.classDetails[0]?.profilestatus : 'Submit Verify Requests';
      this.verifybusinessDetails = this.event.adminBusinessDetails?.results?.[0]?.businessDetails.postalCode ? true : false;
      this.classDetails = this.event.adminBusinessDetails?.results?.[1]?.classDetails[0];
      this.verifyclassDetails = this.event.adminBusinessDetails?.results?.[1]?.classDetails[0].aboutBusiness ? true : false;
      this.verifyprogrammeDetails = this.event.adminBusinessDetails?.results?.[3]?.programData.length === 0 ? false : true;
      this.verifybranchDetails = this.event.adminBusinessDetails?.results?.[5]?.branchDetails.length === 0 ? false : true;
    }

  }


  hideModal() {
    this.showDeleteModal = false;
  }

  getClassDetails() {
    this.fulldata = JSON.parse(localStorage.getItem("classData"));
    this.router.navigate([`/admin/admin-class-details/${this.fulldata._id}/${this.userId}/${this.token}/${this.adminId}`]);
  }

}
