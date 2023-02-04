import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectAutocompleteComponent } from "mat-select-autocomplete";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { environment } from "src/environments/environment";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { take } from "rxjs/operators";
import { ImageCompressService } from "src/app/services/image-compress.service";
@Component({
  selector: "app-add-teachers",
  templateUrl: "./add-teachers.component.html",
  styleUrls: ["./add-teachers.component.scss"],
})
export class AddTeachersComponent implements OnInit {
  @ViewChild('firstName') firstNameRef: ElementRef;
  newteacher: boolean;
  localValue: string = localStorage.getItem("businessId");
  images: any = '';
  url: any;
  API_URL: string;
  myForm: FormGroup
  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;
  options = [];
  selectedOptions = [];
  classId: any;
  selected = this.selectedOptions;
  showError = false;
  errorMessage = "";
  selectedMessage: any;
  allbranchData: any = [];
  albumImage: any;
  data: string;
  fulldata: any;
  adminId: any;
  myFiles: any;
  classdetails: any;
  class: any;
  id: any;
  teacherData: any;
  image: any;
  description: any;
  teacherName: any;
  adminType: string;
  diabledFeilds: boolean;
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
  BranchadminId: any;
  branchName: any;
  iisSubmitBool: boolean = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private compressImage: ImageCompressService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
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
      let requestData = {};
      requestData["type"] = "teacher"
      requestData["id"] = this.id
      //console.log(requestData, this.id, "getdatabyid")
      this.api.post("getdatabyid", requestData).subscribe((res: any) => {
        //console.log(res, "getdatabyid");
        this.teacherData = res.data;
        this.images = this.teacherData?.image == "undefined" ? '' : this.teacherData?.image;
        this.description = this.teacherData?.description == "undefined" ? '' : this.teacherData?.description;
        this.teacherName = this.teacherData?.teacherName;
        this.selectedOptions = this.teacherData?.userId.map((item: any) => { return item }).slice(1)
      });
    });
  }



  openToggle() {
    this.newteacher = !this.newteacher;
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    this.branchName = this.fulldata.branchName;
    this.getBranchdetails();
    this.getbusinessDetails();
    this.formInit();
  }
  formInit() {
    this.myForm = new FormGroup({
      teachername: new FormControl("", [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
      // description: new FormControl("", ),
      image: new FormControl(""),
      Selected: new FormControl([])

      // fileSource: new FormControl("", [Validators.required]),
    });
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


  onFileChange(event) {
    let image: File = event.target.files[0]
    // console.log(`Image size before compressed: ${image.size} bytes.`)
    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        // console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        for (var i = 0; i < event.target.files.length; i++) {
          this.myFiles = compressedImage;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.images = event.target.result;
            this.firstNameRef.nativeElement.focus();
          };
          reader.readAsDataURL(compressedImage);
        }
      });
  }

  deleteImage(): void {
    this.images = '';
    (<HTMLInputElement>document.getElementById('deleteimg')).value = ''
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

  submit() {
    this.iisSubmitBool = true;
    const formvalue = this.myForm.value;
    const formData: FormData = new FormData();

    if (this.adminType == "subadmin") {
      this.myForm.get('Selected').clearValidators();
      this.myForm.get('Selected').updateValueAndValidity();
    } else {
      this.myForm.get('Selected').setValidators([Validators.required]);
      this.myForm.get('Selected').updateValueAndValidity();
    }

    if (this.adminType == "admin") {
      formData.append("adminId", this.selected ? [this.adminId, ...formvalue.Selected].join(",") : [this.adminId, ...this.selected].join(","));
      formData.append("usertype", '');
      formData.append("type", 'admin');
      formData.append("classId", this.classId);
    } else if (this.adminType == 'subadmin') {
      formData.append("adminId", [this.adminId, this.BranchadminId].join(","));
      formData.append("usertype", 'subadmin');
      formData.append("createdby", this.branchName);
      formData.append("type", 'subadmin');
      formData.append("classId", this.adminId);
    } else {
      formData.append("adminId", this.selected ? [this.adminId, ...formvalue.Selected].join(",") : [this.adminId, ...this.selected].join(","));
      formData.append("usertype", '');
      formData.append("type", 'admin');
      formData.append("classId", this.classId);
    }


    formData.append("description", formvalue.description);
    formData.append("teacherName", formvalue.teachername);
    formData.append("image", this.myFiles ? this.myFiles : this.images);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });
    if (this.id) {
      formData.append("teacherId", this.id);
      //console.log(this.myForm.valid);
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}editTeacher`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.iisSubmitBool = false;
              this.event.businessDetails = false;
              this.router.navigate(["pages/teachers"]);
            } else {
              this.iisSubmitBool = false;
              this.api.alert(res.message, "error");
            }
          });
      } else {
        this.iisSubmitBool = false;
        this.myForm.markAllAsTouched();
      }
    } else {
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}addTeacher`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.iisSubmitBool = false;
              this.event.businessDetails = false;
              this.router.navigate(["pages/teachers"]);
            } else {
              this.api.alert(res.message, "error");
              this.iisSubmitBool = false;
            }
          });
      } else {
        this.iisSubmitBool = false;
        this.myForm.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }
}
