import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branchDetails: any = [];
  userId: any;
  token: any;
  showDeleteModal: boolean = false;
  private __Id: any;
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
    this.getbranchDetails()
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
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}admindeletebranch`, requestData, { headers: headers }).subscribe((res: any) => {
      if (res.status == true) {
        this.showDeleteModal = false;
        this.branchDetails = this.branchDetails.filter((item: any) => {
          return item._id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }

  getbranchDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      this.branchDetails = res?.results[5]?.branchDetails;
      // console.log(this.branchDetails);
    });
  }

  editBranchDetails(id: any, branchStatus: any) {
    this.router.navigate([`/admin/add-new-branch/${branchStatus}/${id}/${this.userId}/${this.token}`]);
  }

  handleadminroute(name: any, branchStatus: any) {
    this.router.navigate([`/admin/${name}/${branchStatus}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }
}
