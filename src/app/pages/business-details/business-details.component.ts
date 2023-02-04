import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import { COMMA, E, ENTER } from "@angular/cdk/keycodes";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Observable } from "rxjs";
import { map, startWith, take } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SelectAutocompleteComponent } from "mat-select-autocomplete";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ImageCompressService } from "src/app/services/image-compress.service";

@Component({
  selector: "app-business-details",
  templateUrl: "./business-details.component.html",
  styleUrls: ["./business-details.component.scss"],
})
export class BusinessDetailsComponent implements OnInit {
  @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('firstName') firstNameRef: ElementRef;
  myFiles: any[] = [];
  businessdetails: any;
  programdetails: any;
  businessName: any;
  businessEmail: any;
  aboutBusiness: any;
  webaddress: any;
  mobile: any;
  category: any;
  subcategory: any;
  classdetails: any;
  address2: any;
  address1: any;
  country: any;
  postalCode: any;

  branchdetails: any;
  albumData: any;
  teacherData: any;
  images: any = [];

  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;
  options = [];
  showError = false;
  errorMessage = "";
  selectedMessage: any;
  selectedOptions = [];
  selected = this.selectedOptions;
  @ViewChild(SelectAutocompleteComponent)
  multiSelectCategories: SelectAutocompleteComponent;
  optionsCategories = [];
  showErrorCategories = false;
  errorMessageCategories = "";
  selectedMessageCategories: any;
  selectedOptionsCategories = [];
  selectedCategories = this.selectedOptionsCategories;
  @ViewChild(SelectAutocompleteComponent)
  multiSelectLevels: SelectAutocompleteComponent;
  optionsLevels = [];
  showErrorLevels = false;
  errorMessageLevels = "";
  selectedMessageLevels: any;
  selectedOptionsLevels = [];
  selectedLevel = this.selectedOptionsLevels;
  @ViewChild(SelectAutocompleteComponent)
  multiSelectGroup: SelectAutocompleteComponent;
  optionsGroups = [];
  showErrorGroups = false;
  errorMessageGroups = "";
  selectedMessageGroups: any;
  selectedOptionsGroups = [];
  selectedGroups = this.selectedOptionsGroups;

  myForm: FormGroup;
  class: any;
  classId: any;
  API_URL: string;
  alltags: any = [];
  editorData: any;
  data: any = [];
  fulldata: any;
  email: any;
  name: any;
  mobileNo: String;
  aboutClass: any;
  classImages: any = [];
  SubcategoryData: any = [];
  imagesDefault: any = [];
  imagesMutating: any = [];
  index: any;
  headerClass: any;
  checkedSiteType: boolean;
  displayCategories: any = [];
  adminType: string;
  subadminPermission: boolean = true;
  diabledFeilds: boolean;
  agefromselect: any;
  agetoselect: any;
  searchArticles: any;
  newTagsArray: any = [];

  Data: Array<any> = [
    { name: 'On-Line', value: 'Online', checkedSiteType: false },
    { name: 'In-Person', value: 'Face to Face', checkedSiteType: false },
  ];
  allGroups: any = [];

  selectsFrom: Array<any> = [];
  selectsTo: Array<any> = [];

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
  selectedgroup: any;
  selectedlevel: any;
  allLevels: any = [];
  agefrom: any;
  ageto: any;
  specificFromAge: any;
  specificToAge: any;
  // allinfodata: any;
  infoTextData: any = '';
  selectedList: any = [];
  alllevelId: any = [];
  levelId: string;
  searchTerm = '';
  filterdOptions = [];
  searchKey: '';
  allSelected: boolean = true;
  allselectedArray = [];

  constructor(
    private event: EventService,
    private api: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private compressImage: ImageCompressService
  ) {
    this.formInit();
    for (let i = 1; i <= 18; i++) {
      this.selectsFrom.push({ value: i, name: i });
      this.selectsTo.push({ value: i, name: i });
    }
  }

  async ngOnInit(): Promise<void> {

    this.getlevelgroup();
    this.getInfoText();
    // this.api.getInfoSection().subscribe((res: any) => {
    //   this.allinfodata = res.sectionData;
    // });
    this.getTags();
    this.getsubcategory();
    // this.getGroups();
    this.formInit();
    setTimeout(() => {
      this.fetchBusinessData();
    }, 1000);
  }

  fetchBusinessData() {
    this.myFiles = [];
    this.images = [];
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype');
    // this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
      this.editorConfig.editable = true;
      this.api.getBusineesdetails().subscribe((res: any) => {
        this.classdetails = res.results[1].classDetails[0];
        this.event.businessDetails = res;
        // this.allselectedArray = this.classdetails?.level;
        this.email = this.classdetails?.email;
        this.classId = this.classdetails?._id;
        this.headerClass = this.classdetails?.businessName;
        this.class = this.classdetails?.businessName;
        this.mobileNo = this.classdetails?.mobileNo;
        this.webaddress = this.classdetails?.webAddress;
        this.imagesDefault = this.classdetails?.image.slice();
        this.selectedOptions = this.classdetails?.tags;
        this.Data.map((item: any, index: any) => {
          this.classdetails?.sitetype.forEach((element: any) => {
            if (item.value == element) {
              this.Data[index].checkedSiteType = true;
              // this.myForm.controls.checkArray.setValue(item.value);
              const checkArray: FormArray = this.myForm.get('checkArray') as FormArray;
              checkArray.push(new FormControl(item.value));
            }
          })
        })
        this.selectedOptionsCategories = this.classdetails?.businesssubCategory;
        this.selectedOptionsGroups = this.classdetails?.groupId;
        if (this.classdetails?.level.toString() === '') {
          this.allSelected = true;
          this.selectedOptionsLevels = [];
        } else {
          this.selectedOptionsLevels = this.classdetails?.level;
          this.allSelected = true;
          if (this.allLevels.length === this.selectedOptionsLevels.length) {
            this.allSelected = false;
          }
        }
        this.specificFromAge = this.classdetails?.agefrom;
        this.specificToAge = this.classdetails?.ageto;
        this.editorData = this.classdetails?.aboutBusiness;
      });

    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
      this.editorConfig.editable = false;
      this.api.getBusinessBranchDetails().subscribe((res: any) => {
        this.classdetails = res.results[1].classDetails[0];

        // this.allselectedArray = this.classdetails?.level;
        this.email = this.classdetails?.email;
        this.classId = this.classdetails?._id;
        this.headerClass = this.classdetails?.businessName;
        this.class = this.classdetails?.businessName;
        this.mobileNo = this.classdetails?.mobileNo;
        this.webaddress = this.classdetails?.webAddress;
        this.imagesDefault = this.classdetails?.image.slice();
        this.selectedOptions = this.classdetails?.tags;
        this.Data.map((item: any, index: any) => {
          this.classdetails.sitetype.forEach((element: any) => {
            if (item.value == element) {
              this.Data[index].checkedSiteType = true;
              // this.myForm.controls.checkArray.setValue(item.value);
              const checkArray: FormArray = this.myForm.get('checkArray') as FormArray;
              checkArray.push(new FormControl(item.value));
            }
          })
        })
        this.selectedOptionsCategories = this.classdetails?.businesssubCategory;
        this.selectedOptionsGroups = this.classdetails?.groupId;

        if (this.classdetails?.level.toString() === '') {
          this.allSelected = true;
          this.selectedOptionsLevels = [];
        } else {
          this.selectedOptionsLevels = this.classdetails?.level;
          this.allSelected = true;
          if (this.allLevels.length === this.selectedOptionsLevels.length) {
            this.allSelected = false;
          }
        }
        this.specificFromAge = this.classdetails?.agefrom;
        this.specificToAge = this.classdetails?.ageto;
        this.editorData = this.classdetails?.aboutBusiness;
      });
    } else {
      this.api.getBusineesdetails().subscribe((res: any) => {
        this.classdetails = res.results[1].classDetails[0];

        this.email = this.classdetails?.email;
        this.classId = this.classdetails?._id;
        this.headerClass = this.classdetails?.businessName;
        this.class = this.classdetails?.businessName;
        this.mobileNo = this.classdetails?.mobileNo;
        this.webaddress = this.classdetails?.webAddress;
        this.imagesDefault = this.classdetails?.image.slice();
        this.selectedOptions = this.classdetails?.tags;
        this.Data.map((item: any, index: any) => {
          this.classdetails.sitetype.forEach((element: any) => {
            if (item.value == element) {
              this.Data[index].checkedSiteType = true;
              // this.myForm.controls.checkArray.setValue(item.value);
              let checkArray: FormArray = this.myForm.get('checkArray') as FormArray;
              checkArray.push(new FormControl(item.value));
            }
          })
        })
        this.selectedOptionsCategories = this.classdetails?.businesssubCategory;
        this.selectedOptionsGroups = this.classdetails?.groupId;

        if (this.classdetails?.level.toString() === '') {
          this.allSelected = true;
          this.selectedOptionsLevels = [];
        } else {
          this.selectedOptionsLevels = this.classdetails?.level;
          this.allSelected = true;
          if (this.allLevels.length === this.selectedOptionsLevels.length) {
            this.allSelected = false;
          }
        }
        this.specificFromAge = this.classdetails?.agefrom;
        this.specificToAge = this.classdetails?.ageto;
        this.editorData = this.classdetails?.aboutBusiness;
      });

    }
    this.agefromselect = this.selectsFrom;
    this.agetoselect = this.selectsTo;
  }

  getInfoText() {
    if (this.event.infoTextData.length === 0) {
      this.api.getInfoSection().subscribe((res: any) => {
        this.infoTextData = res?.sectionData[3]?.description;
        this.event.infoTextData = res?.sectionData;
      })
    } else {
      this.infoTextData = this.event.infoTextData[3]?.description;
    }
  }

  selectFromAge(event: any) {
    this.agetoselect = this.selectsTo.filter((item: any) => {
      return item.value >= event;
    });
    this.agefrom = event;
  }
  selectToAge(event: any) {
    this.ageto = event;
  }

  formInit() {
    this.myForm = new FormGroup({
      file: new FormControl(''),
      class: new FormControl(this.class, Validators.required),
      Selected: new FormControl([], Validators.required),
      SelectedCategories: new FormControl([], Validators.required),
      // selectedgroup: new FormControl([], Validators.required),
      selectedlevel: new FormControl([], Validators.required),
      checkArray: this.fb.array([], [Validators.required]),
      aboutclass: new FormControl(this.editorData, { validators: [Validators.required] }),
      Website: new FormControl(this.webaddress),
    });
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.myForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  // getLocation = async () =>
  // new Promise<void>((resolve, reject) => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: any) => {
  //       this.lat2 = position.coords.latitude;
  //       this.lng2 = position.coords.longitude;
  //       resolve();
  //     });
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //     reject();
  //   }
  // });


  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected) {
    this.selected = selected;
  }

  getSelectedOptionsCategories(selectedCategories) {
    this.selectedCategories = selectedCategories;
  }

  onResetSelection() {
    this.selectedOptions = [];
  }

  onResetSelectionCategories() {
    this.selectedOptionsCategories = [];
  }

  // getSelectedgroupOptions(selected) {
  //   this.selectedgroup = selected;
  // }

  getSelectedlevelOptions(selected) {
    this.selectedlevel = selected;
    this.allSelected = true;
  }

  onKeySearchLevel(value) {
    this.optionsLevels = this.searchbylevel(value);
  }

  searchbylevel(value: string) {
    if (value && value.trim() !== '' && value.length > 0) {
      return this.allLevels.filter((level) =>
        level.level.toLowerCase().startsWith(value.toLowerCase())
      )
    } else {
      return this.allLevels;
    }
  }

  //   searchByTags(): void {
  //     let term = this.searchArticles;
  //     this.filterdOptions = this.optionsLevels.filter(item => item.value.toLowerCase().includes(term.toLowerCase())
  //     );
  //   //  this.optionsLevels = this.filterdOptions ;
  //   }

  // getGroups() {
  //   this.api.get('getgroups').subscribe((res: any) => {
  //     this.allGroups = res.data;
  //     this.allGroups.forEach((element) => {
  //       this.optionsGroups.push({
  //         value: element._id,
  //         display: element.groups,
  //       });
  //     });
  //   });
  // }

  getlevelgroup() {
    this.api.get('getlevelgroup').subscribe((res: any) => {
      this.allLevels = res.levelData;

      this.allLevels = res.levelData.sort((a, b) => a.level.toLowerCase().localeCompare(b.level.toLowerCase()));
      this.allLevels.forEach((element: any) => {
        if (element.level !== 'Not Applicable') {
          this.optionsLevels.push(element);
          this.allselectedArray.push(element._id);
          // this.optionsLevels.push({
          //   value: element._id,
          //   display: element.level.toString(),
          // });
        }
      });
    });
  }

  getsubcategory() {
    this.api.get("getsubcategory?type=homepage").subscribe((res: any) => {
      this.SubcategoryData = res.SubcategoryData;
      this.SubcategoryData.forEach((element) => {
        this.optionsCategories.push({
          value: element._id,
          display: element.subCategory,
        });
      });
    });
  }

  getTags() {
    this.api.get('gettag').subscribe((res: any) => {
      this.alltags = res.tagData;
      this.alltags.forEach((element) => {
        this.options.push({
          value: element.tags,
          display: element.tags,
        });
      });
    });
  }

  selectAll() {
    this.selectedOptionsLevels = [];
    this.selectedlevel = [];
    this.selectedOptionsLevels = this.allselectedArray;
    this.allSelected = false;
    // localStorage.removeItem("level");
  }

  unselectAll() {
    this.allSelected = true;
    this.selectedOptionsLevels = [];
    this.selectedlevel = [];
  }

  clearSearch() {
    this.searchKey = '';
    this.onKeySearchLevel('');
    this.searchbylevel('');
  }

  onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let image: File = event.target.files[i];

      this.compressImage.compress(image)
        .pipe(take(1))
        .subscribe(compressedImage => {
          // now you can do upload the compressed image 
          this.myFiles.push(compressedImage);
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.images.push(event.target.result);
            setTimeout(() => this.firstNameRef.nativeElement.focus(), 500);
          };
          reader.readAsDataURL(compressedImage);
        })
    }
  }

  deleteImage(i: any) {
    this.index = i;
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
  }

  deleteEditImage(i: any) {
    this.index = i;
    this.images.splice(i, 1);
    this.imagesDefault.splice(i, 1);
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
  }


  editbusinessInformation() {
    const formValue = this.myForm.value;
    const formData: FormData = new FormData();
    // const data = [];
    this.displayCategories = formValue.SelectedCategories.forEach((item: any) => {
      this.optionsCategories.forEach((element: any) => {
        if (element.value == item) {
          this.data.push(element.display);
        }
      })
    });
    if (this.imagesDefault.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else {
      this.myForm.get('file').setValidators([Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    }

    formData.append("tags", this.selected ? [...formValue.Selected].join(",") : [...this.selected].join(","));
    formData.append("businesssubCategory", this.selectedCategories ? [...formValue.SelectedCategories].join(",") : [...this.selectedCategories].join(","));

    formData.append("level", this.selectedlevel ? [...formValue.selectedlevel].join(",") : [...this.selectedOptionsLevels].join(","));

    // formData.append("groupsId", this.selectedgroup ? [...formValue.selectedgroup].join(",") : [...this.selectedgroup].join(","));
    formData.append("groupsId", '6322d831c34c98a9bb49dff8');

    formData.append("classId", this.classId);
    formData.append("sitetype", formValue.checkArray.join(','));
    formData.append("businessName", formValue.class);
    formData.append("aboutBusiness", formValue.aboutclass);
    if (this.agefrom) {
      formData.append("agefrom", this.agefrom);
    } else if (this.specificFromAge) {
      formData.append("agefrom", this.specificFromAge);
    } else {
      formData.append("agefrom", '1');
    }

    if (this.ageto) {
      formData.append("ageto", this.ageto);
    } else if (this.specificToAge) {
      formData.append("ageto", this.specificToAge);
    } else {
      formData.append("ageto", '18');
    }
    formData.append("webAddress", formValue.Website);
    // formData.append("email", formValue?.email);
    formData.append("groupsName", [this.selected ? [...formValue.Selected] : [...this.selected], this.selectedCategories ? [...this.data] : [...this.selectedCategories], formValue.class].join(","));

    if (this.myForm.valid) {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("images", this.myFiles[i]);
      }
      for (var i = 0; i < this.imagesDefault.length; i++) {
        formData.append("image", this.imagesDefault[i]);
      }
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("LoggedIn"),
      });
      this.http.post(`${this.API_URL}editclass`, formData, { headers: headers, }).subscribe((res: any) => {
        if (res.status == true) {
          this.api.alert(res.message, "success");
          this.event.businessDetails = false;
          // this.event.sendUpdateSideBar();

          // this.fetchBusinessData();
          this.router.navigate(["pages/branches"]);
        } else {
          this.api.alert(res.message, "error");
        }
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  }
  back() {
    this.event.back();
  }
}
