import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  allbranchData: any;
  isSubmitbool: boolean = false;

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


  constructor(
    private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.adminType = localStorage.getItem('__admintype')
    this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id) {
        let requestData = {};
        requestData["type"] = "faq"
        requestData["id"] = this.id
        this.api.post("getdatabyid", requestData).subscribe((res: any) => {
          //console.log(res, "getdatabyid")
          this.editFaqData = res.data;
          this.editorQuestionData = this.editFaqData.question;
          this.editorAnswersData = this.editFaqData?.answer == "undefined" ? '' : this.editFaqData?.answer;
          this.selectedOptions = this.editFaqData.userId.map((item: any) => { return item }).slice(1)
        });
      }
    });
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    //console.log(this.fulldata, this.adminId)
    this.getBranchdetails();
    this.formInit();
  }


  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected) {
    this.selected = selected;
    //console.log(this.selected, "getSelectedOptions");
  }

  onResetSelection() {
    this.selectedOptions = [];
  }

  formInit() {
    this.myForm = new FormGroup({
      quetions: new FormControl(this.editorQuestionData, Validators.required),
      answers: new FormControl(this.editorAnswersData, Validators.required),
      Selected: new FormControl([])
    });
  }

  getBranchdetails() {
    this.api.get("getBranchlisting").subscribe((res: any) => {
      this.allbranchData = res.branchDetails;
      this.allbranchData.forEach((element) => {
        this.options.push({
          value: element._id,
          display: element.branchName,
        });
      });
    });
  }

  submitFaqs() {
    this.isSubmitbool = true;
    if (this.adminType == "subadmin") {
      this.myForm.get('Selected').clearValidators();
      this.myForm.get('Selected').updateValueAndValidity();
    } else {
      this.myForm.get('Selected').setValidators([Validators.required]);
      this.myForm.get('Selected').updateValueAndValidity();
    }

    const formValue = this.myForm.value;
    let requestData = {};
    requestData["question"] = formValue.quetions
    requestData["answer"] = formValue.answers;
    if (this.adminType == "admin") {
      requestData["userId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
      requestData["usertype"] = '';
      requestData["type"] = "admin"
    } else if (this.adminType == 'subadmin') {
      requestData["userId"] = [this.adminId, this.BranchadminId].join(",");
      requestData["usertype"] = 'subadmin';
      requestData["type"] = "subadmin"
    } else {
      requestData["userId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
      requestData["usertype"] = '';
      requestData["type"] = "admin"
    }

    if (this.id) {
      requestData["FAQId"] = this.id;
      if (this.myForm.valid) {
        this.api.post("editFAQ", requestData).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitbool = false;
            this.event.businessDetails = false;
            this.router.navigate(["/pages/faqs"]);
          } else {
            this.api.alert(res.message, "error");
            this.isSubmitbool = false;
          }
        });
      } else {
        this.isSubmitbool = false;
        this.myForm.markAllAsTouched();
      }
    } else {
      if (this.myForm.valid) {
        this.api.post("addFAQ", requestData).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitbool = false;
            this.api.alert("FAQ's Added Successfully", "success");
            this.event.businessDetails = false;
            setTimeout(() => {
              this.router.navigate(['/pages/faqs'])
            }, 200);
          } else {
            this.isSubmitbool = false;
            this.api.alert(res.message, 'error');
          }
        });
      } else {
        this.isSubmitbool = false;
        this.myForm.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }
}
