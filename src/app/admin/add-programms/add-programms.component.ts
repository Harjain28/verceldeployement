import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectAutocompleteComponent } from "mat-select-autocomplete";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-add-programms",
  templateUrl: "./add-programms.component.html",
  styleUrls: ["./add-programms.component.scss"],
})
export class AddProgrammsComponent implements OnInit {
  newteacher: any;
  addProgram: FormGroup;
  allbranchData: any;
  classdetails: any;
  tags: any = []
  description: any;

  editorData: 'jkkjk'
  id: any;
  // public Editor = ClassicEditor;
  class: any;
  editProgramData: any;
  programmName: any;
  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;
  options = [];
  selectedOptions = [];
  selected = this.selectedOptions;
  classId: any;
  showError = false;
  errorMessage = "";
  data: string;
  fulldata: any;
  adminId: any;
  textEditordata: any;

  editorConfig: AngularEditorConfig = {
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
  userId: any;
  token: any;
  API_URL: any;

  constructor(
    private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {

    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      if (this.id) {
        let requestData = {};
        requestData["type"] = "program"
        requestData["id"] = this.id
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}admingetdatabyid`, requestData, { headers: headers }).subscribe((res: any) => {
          this.editProgramData = res.data;
          this.programmName = this.editProgramData?.programsName;
          this.editorData = this.editProgramData?.description == "undefined" ? '' : this.editProgramData?.description;
          this.selectedOptions = this.editProgramData?.userId.map((item: any) => { return item }).slice(1)
        });
      }
    });
  }

  openToggle() {
    this.newteacher = !this.newteacher;
  }

  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected) {
    this.selected = selected;
  }

  onResetSelection() {
    this.selectedOptions = [];
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata?._id;
    console.log(this.adminId,'admin id from localstorage')
    this.formInit();
    this.getBranchdetails();
    this.getbusinessDetails();
  }

  formInit() {
    this.addProgram = new FormGroup({
      name: new FormControl("", Validators.required),
      htmlContent: new FormControl(this.editorData),
      Selected: new FormControl([], Validators.required)
    });
  }

  getBranchdetails() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.get(`${this.API_URL}admingetBranchlisting?userId=${this.userId}`, { headers: headers }).subscribe((res: any) => {
      this.allbranchData = res?.branchDetails;
      this.allbranchData.forEach((element) => {
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
      this.classdetails.forEach(element => {
        this.class = element.businessName;
        this.classId = element._id;
      });
    });
  }

  submitaddProgramData() {
    const formValue = this.addProgram.value;
    let requestData = {};
    requestData["classId"] = this.classId
    requestData["adminId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
    requestData["description"] = formValue.htmlContent;
    requestData["programsName"] = formValue.name;

    if (this.id) {
      requestData["programId"] = this.id;
      if (this.addProgram.valid) {
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}admineditProgram`, requestData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.router.navigate([`admin/programms/${this.userId}/${this.token}/${this.adminId}`]);
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.addProgram.markAllAsTouched();
      }
    } else {
      if (this.addProgram.valid) {
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}adminaddprograms`, requestData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.router.navigate([`admin/programms/${this.userId}/${this.token}/${this.adminId}`]);
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.addProgram.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }

}
