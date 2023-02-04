import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-programms',
  templateUrl: './programms.component.html',
  styleUrls: ['./programms.component.scss']
})
export class ProgrammsComponent implements OnInit {
  programData: any = [];
  branchName: any;
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  fulldata: any;
  data: any;
  adminId: any;
  userName: any;

  constructor(
    private api: ApiService,
    private event: EventService,
    private router: Router
  ) {
    this.disabledBranchAdmin = localStorage.getItem('__admintype')
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.userName = this.fulldata.name;
    if (this.event.businessDetails) {
      this.getprogrammsDetailsFromEvent();
    }else{
      this.getprogrammsDetails();
    }
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  deleteProgrammsDetails() {
    let requestData = {};
    requestData["programId"] = this.__Id;
    this.api.post("deleteprogram", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.event.businessDetails = false;
        this.showDeleteModal = false;
        this.programData = this.programData.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }


  getprogrammsDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      //console.log(res, 'getprogrammsDetails');
      res.results[3].programData.forEach((program: any) => {
        this.branchName = program.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(', ')
        if (this.disabledBranchAdmin == 'admin') {
          this.typeDisabled = false;
        } else if (this.disabledBranchAdmin == 'subadmin') {
          this.typeDisabled = program.type == 'admin' ? true : false;
        } else {
          this.typeDisabled = false;
        }

        this.programData.push({
          id: program._id, programsName: program.programsName,
          description: program?.description == "undefined" ? '' : program?.description, classId: program.classId, branchName: this.branchName,
          status: program.status, trending: program.trending, ProgrambybranchName: program?.createdby, isDisabled: this.typeDisabled,
        })
      })

    });
  }
  
  getprogrammsDetailsFromEvent() {
      this.event.businessDetails.results[3].programData.forEach((program: any) => {
        this.branchName = program.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(', ')
        if (this.disabledBranchAdmin == 'admin') {
          this.typeDisabled = false;
        } else if (this.disabledBranchAdmin == 'subadmin') {
          this.typeDisabled = program.type == 'admin' ? true : false;
        } else {
          this.typeDisabled = false;
        }

        this.programData.push({
          id: program._id, programsName: program.programsName,
          description: program?.description == "undefined" ? '' : program?.description, classId: program.classId, branchName: this.branchName,
          status: program.status, trending: program.trending, ProgrambybranchName: program?.createdby, isDisabled: this.typeDisabled,
        })
      })

  }

  editprogrammsDetails(id: any) {
    this.router.navigate(["/pages/add-programms/" + id]);
  }

  back(){
    this.event.back();
  }
}
