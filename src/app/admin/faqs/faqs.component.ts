import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  panelOpenState = false;
  API_URL: string;
  faqs: any = [];
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  faqData: any;
  branchName: any;
  fulldata: any;
  data: any;
  adminId: any;
  userName: any;
  userId: any;
  token: any;

  constructor(private api: ApiService,
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private event: EventService
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
    this.getFaqs();
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  deleteFaqsDetails() {
    let requestData = {};
    requestData["FAQId"] = this.__Id;
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}admindeletefaq`, requestData, { headers: headers }).subscribe((res: any) => {
      if (res.status == true) {
        this.showDeleteModal = false;
        this.faqs = this.faqs.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
      //console.log(res);
    })
    // this.showDeleteModal = false;
  }


  getFaqs() {
    let faqdata = [];
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      //console.log(res, 'getFaqs');
      res.results[7].faqData.forEach((faq: any) => {
        this.faqs.push({
          id: faq._id, question: faq.question, answers: faq.answer, classId: faq.classId,
          status: faq.status, faqbybranchName: faq?.createdBy, isDisabled: this.typeDisabled,
        })
      })
    });
    //console.log(faqdata, "faqs")
  }

  editFAQDetails(id: any) {
    this.router.navigate([`/admin/add-faqs/${id}/${this.userId}/${this.token}`]);
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }
}
