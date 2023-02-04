import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  
  constructor(
    private api: ApiService,
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private event:EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.userName = this.fulldata.name;
    if (this.event.businessDetails) {
      this.getFaqsFromEvent();
    }else{
      this.getFaqs();
    }
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
    this.api.post("deletefaq", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.event.businessDetails = false;
        this.showDeleteModal = false;
        this.faqs = this.faqs.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }


  getFaqs() {
      this.api.getBusineesdetails().subscribe((res: any) => {
        // console.log(res, 'getFaqs');
        res.results[7].faqData.forEach((faq: any) => {
          this.faqData = faq.userId.map((item: any) => {
            // console.log(item);
            return item.branchName;
          }).slice(1).join(', ')
          // if (this.disabledBranchAdmin == 'admin') {
          //   this.typeDisabled = false;
          // } else if (this.disabledBranchAdmin == 'subadmin') {
          //   this.typeDisabled = faq.type == 'admin' ? true : false;
          // } else {
          //   this.typeDisabled = false;
          // }
  
          this.faqs.push({
            id: faq._id, question: faq.question, answers:  faq.answer , classId: faq.classId, branchName: this.branchName,
            status: faq.status, faqbybranchName: faq?.createdBy,   isDisabled: this.typeDisabled,
          })
        })
  
      });
  }

  getFaqsFromEvent() {
      this.event.businessDetails.results[7].faqData.forEach((faq: any) => {
        this.faqData = faq.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(', ')
        // if (this.disabledBranchAdmin == 'admin') {
        //   this.typeDisabled = false;
        // } else if (this.disabledBranchAdmin == 'subadmin') {
        //   this.typeDisabled = faq.type == 'admin' ? true : false;
        // } else {
        //   this.typeDisabled = false;
        // }

        this.faqs.push({
          id: faq._id, question: faq.question, answers:  faq.answer , classId: faq.classId, branchName: this.branchName,
          status: faq.status, faqbybranchName: faq?.createdBy,   isDisabled: this.typeDisabled,
        })
      })
}

  editFAQDetails(id: any) {
    this.router.navigate(["/pages/add-faqs/" + id]);
  }

  back(){
    this.event.back();
  }
}
