import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-business-right-sidebar',
  templateUrl: './business-right-sidebar.component.html',
  styleUrls: ['./business-right-sidebar.component.scss']
})
export class BusinessRightSidebarComponent implements OnInit {
  businessDetails: any;
  classDetails: any;
  showSidebar: boolean;
  urlData: string;
  showDeleteModal: boolean = false;
  showMessageDynamically: String;
  verifyprogrammeDetails: any = [];
  verifybranchDetails: any;
  verifybusinessDetails: any;
  verifyclassDetails: any;
  status: any;
  verifiedbuttonName: any;
  infoTextData: any;
  disbalepreview: boolean = false;
  locationchoosen: boolean;
  lng: any;
  lat: any;
  ZoomValue: any;
  restEventSubscription: Subscription;

  constructor(private router: Router,
    private event: EventService,
    private api: ApiService,
    private route: ActivatedRoute) {

    this.restEventSubscription = this.event.getUpdateSideBar().subscribe(() => {
      this.getbusinessDetails();
    });
    this.urlData = this.route.routeConfig.path
    this.showSidebar = this.urlData == "business-details" ? true : false;
  }

  ngOnInit(): void {
    if (this.event.businessDetails) {
      this.getbusinessDetailsFromEvent();
    } else {
      this.getbusinessDetails();
      console.log('i m else running api');
    }
    this.lat = 1.3521;
    this.lng = 103.8198;
    if (this.event.infoTextData.length > 0) {
      this.getInfoTextFromEvent();
    } else {
      this.getInfoText();
    }
  }

  mapClicked(event: any) {
    // this.lat = event.coords.latitude;
    // this.lng = event.coords.longitude;
    this.locationchoosen = true;
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
        this.infoTextData = res?.sectionData[15]?.description;
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
    this.api.getBusineesdetails().subscribe((res: any) => {
      this.event.businessDetails = res;
      // console.log(res);
      this.status = res.status;
      this.businessDetails = res?.results?.[0]?.businessDetails;
      if (this.businessDetails?.loc?.coordinates[1]) {
        this.lat = this.businessDetails?.loc?.coordinates[1];
        this.lng = this.businessDetails?.loc?.coordinates[0];
        this.ZoomValue = 18;
      } else {
        this.lat = 1.3521;
        this.lng = 103.8198;
        this.ZoomValue = 9;
      }

      this.verifybusinessDetails = res?.results?.[0]?.businessDetails?.postalCode ? true : false;
      this.classDetails = res?.results?.[1]?.classDetails[0];
      if (this.classDetails) {
        this.disbalepreview = true;
      }
      this.verifiedbuttonName = res?.results?.[1]?.classDetails[0]?.profilestatus ? res?.results?.[1]?.classDetails[0]?.profilestatus : 'Submit Verify Requests';
      this.verifyclassDetails = res?.results?.[1]?.classDetails[0]?.aboutBusiness ? true : false;
      this.verifyprogrammeDetails = res?.results?.[3]?.programData.length === 0 ? false : true;
      this.verifybranchDetails = res?.results?.[5]?.branchDetails.length === 0 ? false : true;
    });
  }

  getbusinessDetailsFromEvent() {
    this.status = this.event.businessDetails?.status;
    this.businessDetails = this.event.businessDetails?.results?.[0]?.businessDetails;
    if (this.businessDetails?.loc?.coordinates[1]) {
      this.lat = this.businessDetails?.loc?.coordinates[1];
      this.lng = this.businessDetails?.loc?.coordinates[0];
      this.ZoomValue = 18;
    } else {
      this.lat = 1.3521;
      this.lng = 103.8198;
      this.ZoomValue = 9;
    }

    this.verifybusinessDetails = this.event.businessDetails?.results?.[0]?.businessDetails.postalCode ? true : false;
    this.classDetails = this.event.businessDetails?.results?.[1]?.classDetails[0];
    if (this.classDetails) {
      this.disbalepreview = true;
    }
    this.verifiedbuttonName = this.event.businessDetails?.results?.[1]?.classDetails[0].profilestatus ? this.event.businessDetails?.results?.[1]?.classDetails[0].profilestatus : 'Submit Verify Requests';
    this.verifyclassDetails = this.event.businessDetails?.results?.[1]?.classDetails[0].aboutBusiness ? true : false;
    this.verifyprogrammeDetails = this.event.businessDetails?.results?.[3]?.programData.length === 0 ? false : true;
    this.verifybranchDetails = this.event.businessDetails?.results?.[5]?.branchDetails.length === 0 ? false : true;

  }

  showPopup() {
    if (this.verifiedbuttonName !== 'Verified') {
      if (this.status) {
        if (this.verifyclassDetails) {
          if (this.verifybranchDetails) {
            if (this.verifyprogrammeDetails) {
              this.showDeleteModal = false;
              this.api.post("profileStatus", { classId: this.classDetails._id }).subscribe((res: any) => {
                //console.log(res)
                if (res.status == true) {
                  this.verifiedbuttonName = res.message;
                  this.api.alert(res.message, 'success')
                } else {
                  this.api.alert(res.message, 'error')
                }
              })
            } else {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Programmes are not maintioned'
            }
          } else {
            if (this.verifyprogrammeDetails) {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Branches are not maintioned'
            } else {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Programmes and Branches are not maintioned'
            }
          }
        } else {
          if (this.verifybranchDetails) {
            if (this.verifyprogrammeDetails) {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Business information are not maintioned'
            } else {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Business information and Programmes are not maintioned'
            }
          } else {
            if (this.verifyprogrammeDetails) {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Business information and Branches are not maintioned'
            } else {
              this.showDeleteModal = true;
              this.showMessageDynamically = 'Business information , Branches and Programmes are not maintioned'
            }
          }
        }
      } else {
        this.showDeleteModal = false;
      }
    }
   
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  getClassDetails() {
    if (this.classDetails?._id) {
      let newid = atob(this.classDetails?._id);
      this.router.navigate(["/view/class-details/" + newid]);
    }

  }

}
