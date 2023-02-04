import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branchDetails: any = [];
  adminType: string;
  diabledFeilds: boolean;
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;

  constructor(
    private api: ApiService,
    private event: EventService,
    private router: Router,
  ) {
    this.adminType = localStorage.getItem('__admintype')
    // this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    //console.log(this.diabledFeilds)
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
  }

  ngOnInit(): void {
    if (this.adminType == "admin") {
      this.getbranchDetails()
    } else if (this.adminType == "subadmin") {
      this.getBranchAdminDetails();
    } else {
      this.getbranchDetails()
    }
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }

  hideModal() {
    this.showDeleteModal = false;
  }

  deleteBranchDetails() {
    let requestData = {};
    requestData["branchId"] = this.__Id;
    this.api.post("deletebranch", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.event.businessDetails = false;
        this.showDeleteModal = false;
        this.branchDetails = this.branchDetails.filter((item: any) => {
          return item._id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }

  getbranchDetails() {
    if (this.event.businessDetails) {
      this.branchDetails = this.event.businessDetails?.results[5]?.branchDetails;
    }else{
      this.api.getBusineesdetails().subscribe((res: any) => {
        this.branchDetails = res?.results[5]?.branchDetails;
      });
    }
  }
  
  getBranchAdminDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      this.branchDetails = res?.results[6]?.subadminbranch;
      //console.log(this.branchDetails);
    });
  }

  editBranchDetails(id: any, branchStatus: any) {
    this.router.navigate([`/pages/add-new-branch/${branchStatus}/` + id]);
  }
  
  back(){
    this.event.back();
  }
}
