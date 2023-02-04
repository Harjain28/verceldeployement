import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-teaches',
  templateUrl: './teaches.component.html',
  styleUrls: ['./teaches.component.scss']
})
export class TeachesComponent implements OnInit {
  teacherData: any = [];
  branchName: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  showDeleteModal: boolean = false;
  private __Id: any;
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
      this.getteachersDetailsFromEvent();
    }else{
      this.getteachersDetails();
    }
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  deleteTeacherDetails() {
    let requestData = {};
    requestData["teacherId"] = this.__Id;
    this.api.post("deleteteacher", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.event.businessDetails = false;
        this.showDeleteModal = false;
        this.teacherData = this.teacherData.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }

  getteachersDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      res.results[2].teacherData.forEach((teacher: any) => {
        this.branchName = teacher.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(',')


        if (this.disabledBranchAdmin == 'admin') {
          this.typeDisabled = false;
        } else if (this.disabledBranchAdmin == 'subadmin') {
          this.typeDisabled = teacher.type == 'admin' ? true : false;
        } else {
          this.typeDisabled = false;
        }

        this.teacherData.push({
          id: teacher._id, teachersName: teacher.teacherName,
          description: teacher?.description == "undefined" ? '' : teacher?.description, classId: teacher.classId, branchName: this.branchName,
          status: teacher.status, trending: teacher.trending, image: teacher.image, teacherbybranchAdmin: teacher.createdby, isDisabled: this.typeDisabled,
        })
      })
    });
  }

  getteachersDetailsFromEvent() {
    this.event.businessDetails.results[2].teacherData.forEach((teacher: any) => {
      this.branchName = teacher.userId.map((item: any) => {
        return item.branchName;
      }).slice(1).join(',')

      if (this.disabledBranchAdmin == 'admin') {
        this.typeDisabled = false;
      } else if (this.disabledBranchAdmin == 'subadmin') {
        this.typeDisabled = teacher.type == 'admin' ? true : false;
      } else {
        this.typeDisabled = false;
      }

      this.teacherData.push({
        id: teacher._id, teachersName: teacher.teacherName,
        description: teacher?.description == "undefined" ? '' : teacher?.description, classId: teacher.classId, branchName: this.branchName,
        status: teacher.status, trending: teacher.trending, image: teacher.image, teacherbybranchAdmin: teacher.createdby, isDisabled: this.typeDisabled,
      })
    })
  }

  editTeacherDetails(id: any) {
    this.router.navigate(["/pages/add-teacher/" + id]);
  }

  back() {
    this.event.back();
  }
}
