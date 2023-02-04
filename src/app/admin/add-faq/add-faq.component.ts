import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  myForm: FormGroup;
  options = [];
  selectedOptions = [];
  showError = false;
  errorMessage = "";
  selected = this.selectedOptions;
  allbranchData: any;
  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;

  editorQuestionConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  editorAnswerConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '10',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  quetions: any;
  answers: any;
  editorAnswersData: any;
  editorQuestionData: any;
  adminType: string;
  diabledFeilds: boolean;
  BranchadminId: any;
  editFaqData: any;
  id: any;
  data: string;
  fulldata: any;
  adminId: any;
  faqQuestions: any;
  userId: any;
  token: any;
  classdetails: any;
  class: any;
  classId: any;
  API_URL: any;

  constructor(private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute) {

      this.API_URL = environment.BASE_API_ENDPOINT; 
    this.adminType = localStorage.getItem('__admintype')
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      if (this.id) {
        let requestData = {};
        requestData["type"] = "faq"
        requestData["id"] = this.id
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}admingetdatabyid`, requestData, { headers: headers }).subscribe((res: any) => {
          this.editFaqData = res.data; 
          this.editorQuestionData = this.editFaqData.question;
          this.editorAnswersData = this.editFaqData?.answer == "undefined" ? '' : this.editFaqData?.answer;
          this.selectedOptions = this.editFaqData.userId.map((item: any) => { return item }).slice(1)
        });
      }
    });
  }

  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected: any) {
    this.selected = selected;
    // console.log(this.selected, "getSelectedOptions");
  }

  onResetSelection() {
    this.selectedOptions = [];
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    this.getBranchdetails();
    this.formInit();
  }

  formInit() {
    this.myForm = new FormGroup({
      quetions: new FormControl(this.editorQuestionData, Validators.required),
      answers: new FormControl(this.editorAnswersData, Validators.required),
      Selected: new FormControl([], Validators.required)
    });
  }

  getBranchdetails() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.get(`${this.API_URL}admingetBranchlisting?userId=${this.userId}`, { headers: headers }).subscribe((res: any) => {
      this.allbranchData = res?.branchDetails;
      this.allbranchData.forEach((element: any) => {
        this.options.push({
          value: element?._id,
          display: element?.branchName,
        });
      });
    });
  }

  getbusinessDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      this.classdetails = res.results[1].classDetails;
      this.classdetails.forEach((element: any) => {
        this.class = element.businessName;
        this.classId = element._id;
      });
    });
  }

  submitFaqs() {
    const formValue = this.myForm.value;
    let requestData = {};
    requestData["question"] = formValue.quetions
    requestData["answer"] = formValue.answers;
    if (this.adminType == "superAdmin") {
      requestData["userId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
      requestData["usertype"] = '';
      requestData["type"] = "admin"
    }
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    if (this.id) {
      requestData["FAQId"] = this.id;
      if (this.myForm.valid) {
        this.http.post(`${this.API_URL}admineditFAQ`, requestData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.router.navigate([`admin/faqs/${this.userId}/${this.token}/${this.adminId}`]);
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    } else {
      if (this.myForm.valid) {
        this.http.post(`${this.API_URL}adminaddFAQ`, requestData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.api.alert("FAQ's Added Successfully", "success");
            setTimeout(() => {
              this.router.navigate([`admin/faqs/${this.userId}/${this.token}/${this.adminId}`]);
            }, 200);
          } else {
            this.api.alert(res.message, 'error');
          }
        });
      } else {
        this.myForm.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }

}
