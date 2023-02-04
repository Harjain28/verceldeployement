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
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { I } from "@angular/cdk/keycodes";


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

  editorData: any;
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
  isSubmitbool: boolean = false;

  editorConfig: AngularEditorConfig = {
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
  adminType: string;
  diabledFeilds: boolean;
  BranchadminId: any;
  branchName: any;

  constructor(
    private event: EventService,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
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
        requestData["type"] = "program"
        requestData["id"] = this.id
        this.api.post("getdatabyid", requestData).subscribe((res: any) => {
          this.editProgramData = res.data;
          this.programmName = this.editProgramData.programsName;
          this.editorData = this.editProgramData?.description == "undefined" ? '' : this.editProgramData?.description;
          this.selectedOptions = this.editProgramData.userId.map((item: any) => { return item }).slice(1)
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
    if (this.event.businessDetails) {
      this.getbusinessDetailsFromEvent();
    }else{
      this.getbusinessDetails();
    }
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    this.branchName = this.fulldata.branchName;
    //console.log(this.fulldata, this.adminId)
    this.formInit();
    this.getBranchdetails();
  }

  formInit() {
    this.addProgram = new FormGroup({
      name: new FormControl("", Validators.required),
      htmlContent: new FormControl(this.editorData, Validators.required),
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

  getbusinessDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      this.classdetails = res.results[1].classDetails;
      this.classdetails.forEach(element => {
        this.class = element.businessName;
        this.classId = element._id;
      });
    });
  }
  
  getbusinessDetailsFromEvent() {
      this.classdetails = this.event.businessDetails.results[1].classDetails;
      this.classdetails.forEach(element => {
        this.class = element.businessName;
        this.classId = element._id;
      });
  }

  submitaddProgramData() {
    this.isSubmitbool = true;
    if (this.adminType == "subadmin") {
      this.addProgram.get('Selected').clearValidators();
      this.addProgram.get('Selected').updateValueAndValidity();
    } else {
      this.addProgram.get('Selected').setValidators([Validators.required]);
      this.addProgram.get('Selected').updateValueAndValidity();
    }

    const formValue = this.addProgram.value;
    let requestData = {};
    requestData["classId"] = this.classId
    requestData["description"] = formValue.htmlContent;
    requestData["programsName"] = formValue.name;

    if (this.adminType == "admin") {
      requestData["adminId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
      requestData["usertype"] = '';
      requestData["type"] = "admin"
    } else if (this.adminType == 'subadmin') {
      requestData["adminId"] = [this.adminId, this.BranchadminId].join(",");
      requestData["usertype"] = 'subadmin';
      requestData['createdby'] = this.branchName;
      requestData["type"] = "subadmin"
    } else {
      requestData["adminId"] = this.selected ? [this.adminId, ...formValue.Selected].join(",") : [this.adminId, ...this.selected].join(",");
      requestData["usertype"] = '';
      requestData["type"] = "admin"
    }

    if (this.id) {
      requestData["programId"] = this.id;
      if (this.addProgram.valid) {
        this.api.post("editProgram", requestData).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitbool = false;
            this.event.businessDetails = false;
            this.router.navigate(["/pages/programms"]);
          } else {
            this.api.alert(res.message, "error");
            this.isSubmitbool = false;
          }
        });
      } else {
        this.isSubmitbool = false;
        this.addProgram.markAllAsTouched();
      }
    } else {
      if (this.addProgram.valid) {
        this.api.post("addprograms", requestData).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitbool = false;
            this.event.businessDetails = false;
            this.router.navigate(["/pages/programms"]);
          } else {
            this.api.alert(res.message, "error");
            this.isSubmitbool = false;
          }
        });
      } else {
        this.isSubmitbool = false;
        this.addProgram.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }
}
