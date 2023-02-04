import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-notes',
  templateUrl: './business-notes.component.html',
  styleUrls: ['./business-notes.component.scss']
})
export class BusinessNotesComponent implements OnInit {
  addNotes: FormGroup;
  htmlContent: any;
  id: any;
  userId: any;
  token: any;
  newtoken: string;
  httpOptions: { headers: HttpHeaders };
  notesData: any;
  showDeleteModal: boolean = false;
  private __Id: any;
  API_URL: any;
  seletedValue: number;

  priorities = [
    { id: 0, value: 0 },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 }
  ];
  localdata: any;

  constructor(private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private event: EventService,
    private route: ActivatedRoute) {

    this.API_URL = environment.BASE_API_ENDPOINT;

    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      // if (this.id) {
      //   let requestData = {};
      //   requestData["type"] = "program"
      //   requestData["id"] = this.id
      //   const headers = new HttpHeaders({
      //     Authorization: localStorage.getItem("admintoken"),
      //   });
      //   this.http.post("http://34.232.184.181:8900/api/admingetdatabyid", requestData, { headers: headers }).subscribe((res: any) => {
      //     this.editProgramData = res.data;

      //   });
      // }
    });
  }

  ngOnInit(): void {
    this.formInit();
    this.getnotesDetails();
    this.localdata = JSON.parse(localStorage.getItem('classData'))
    this.seletedValue = this.localdata.priority >= 6 ? 5 : this.localdata.priority;
    //console.log(this.seletedValue)
  }

  formInit() {
    this.addNotes = new FormGroup({
      description: new FormControl(""),
    });
  }

  geteditData() {
    if (this.id && this.notesData.length > 0) {
      this.htmlContent = this.notesData.filter((item: any) => {
        return item._id !== this.id;
      }).map((item: any) => { return item.notesdescription }).toString();
    }
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  deleteNotesDetails() {
    let requestData = {};
    requestData["notesId"] = this.__Id;
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}deletenotes`, requestData, { headers: headers }).subscribe((res: any) => {
      if (res.status == true) {
        this.showDeleteModal = false;
        this.notesData = this.notesData.filter((item: any) => {
          return item._id !== this.__Id;
        })
      }
      //console.log(res);
    })
    // this.showDeleteModal = false;
  }

  getnotesDetails() {
    this.newtoken = localStorage.getItem("admintoken");
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.newtoken,
      })
    }

    this.http.get(`${this.API_URL}admingetnotes?userId=` + this.userId, { headers: this.httpOptions.headers }).subscribe((res: any) => {
      //console.log(res, 'getnotesDetails');
      if (this.id) {
        this.notesData = res.notesData;
        //console.log(this.htmlContent)
        this.htmlContent = this.notesData.filter((item: any) => {
          return item._id === this.id;
        }).map((item: any) => { return item.notesdescription }).toString();
        //console.log(this.htmlContent)
      } else {
        this.notesData = res.notesData;
      }
      // this.geteditData();
    });
  }



  editNotesData(id: any) {
    this.router.navigate([`/admin/business-notes/${id}/${this.userId}/${this.token}`]);
  }

  submitaddNotes() {
    const formValue = this.addNotes.value;
    let requestData = {};
    requestData["notes"] = formValue.description;
    requestData["priority"] = +this.seletedValue ? +this.seletedValue : 5;
    requestData["userId"] = this.userId;

    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.localdata['priority'] = +this.seletedValue ? +this.seletedValue : 5;
    localStorage.setItem('classData', JSON.stringify(this.localdata))
    if (!this.id) {
        this.http.post(`${this.API_URL}addnotes`, requestData, { headers: headers }).subscribe((res: any) => {
          //console.log(res)
          if (res.status == true) {
            this.htmlContent = null;
            this.addNotes.markAsUntouched();
            this.getnotesDetails();
          } else {
            this.api.alert(res.message, "error");
          }
        });
      
    } else {
      requestData["notesId"] = this.id;
        this.http.post(`${this.API_URL}editnotes`, requestData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.htmlContent = null;
            this.getnotesDetails();
            this.router.navigate([`/admin/business-notes/${this.userId}/${this.token}`]);

          } else {
            this.api.alert(res.message, "error");
          }
        });
    
    }
  }

  back(){
    this.event.back();
  }


}
