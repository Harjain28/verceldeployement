import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teaches',
  templateUrl: './teaches.component.html',
  styleUrls: ['./teaches.component.scss']
})
export class TeachesComponent implements OnInit {
  teacherData: any = [];
  branchName: any;
  userId: any;
  token: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  showDeleteModal: boolean = false;
  private __Id: any;
  fulldata: any;
  data: any;
  adminId: any;
  userName: any;
  API_URL: any;

  constructor(
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
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
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.userName = this.fulldata.name;
    this.getteachersDetails();
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
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}admindeleteteacher`, requestData, { headers: headers }).subscribe((res: any) => {
      //console.log(res);
      this.showDeleteModal = false;
      this.teacherData = this.teacherData.filter((item: any) => {
        return item.id !== this.__Id;
      })
    })
  }

  getteachersDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      //console.log(res);
      res.results[2].teacherData.forEach((teacher: any) => {
        this.branchName = teacher.userId.map((item: any) => {
          //console.log(item)
          return item.branchName;
        }).slice(1).join(', ')

        this.teacherData.push({
          id: teacher._id, teachersName: teacher.teacherName,
          description: teacher?.description == "undefined" ? '' : teacher?.description, classId: teacher.classId, branchName: this.branchName,
          status: teacher.status, trending: teacher.trending, teacherbybranchAdmin: teacher.createdby, image: teacher.image
        })
      })
    });
  }

  editTeacherDetails(id: any) {
    this.router.navigate([`/admin/add-teacher/${id}/${this.userId}/${this.token}`]);
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }
}
