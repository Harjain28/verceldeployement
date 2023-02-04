import { SlicePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-programms',
  templateUrl: './programms.component.html',
  styleUrls: ['./programms.component.scss']
})
export class ProgrammsComponent implements OnInit {
  programData: any = [];
  branchName: any;
  userId: any;
  token: any;
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
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
    this.getprogrammsDetails();
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
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}admindeleteprogram`, requestData, { headers: headers }).subscribe((res: any) => {
      if (res.status == true) {
        this.showDeleteModal = false;
        this.programData = this.programData.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
      //console.log(res);
    })
    // this.showDeleteModal = false;
  }

  getprogrammsDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      //console.log(res, 'getprogrammsDetails');
      res.results[3].programData.forEach((program: any) => {
        this.branchName = program.userId.map((item: any) => {
          //console.log(item)
          return item.branchName;
        }).slice(1).join(', ')

        this.programData.push({
          id: program._id, programsName: program.programsName,
          description: program?.description, classId: program.classId, branchName: this.branchName,
          status: program.status, trending: program.trending, ProgrambybranchName: program?.createdby,
        })
      })

    });
  }

  editprogrammsDetails(id: any) {
    this.router.navigate([`/admin/add-programms/${id}/${this.userId}/${this.token}`]);
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }
}
