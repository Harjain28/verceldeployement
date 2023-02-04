import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SelectAutocompleteComponent } from "mat-select-autocomplete";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm: FormGroup;
  productForm: FormGroup;

  myForm: FormGroup;
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
  SubcategoryData: any;
  index: any;
  images: any = [];
  myFiles: any = [];
  allGroups: any;
  address2: any;
  address1: any;
  fulladdress: any;
  postalcode: any;
  API_URL: string;
  displayCategories: any = [];
  displayGroups: any = [];
  data: any = [];
  newdata: any = [];
  ProductCategoryData: any;
  userType: any;
  isSubmit: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private event:EventService) {
    this.API_URL = environment.BASE_API_ENDPOINT;
  }


  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userdata'));
     this.userType = userData?.type;
    this.address1 = '';

    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };

    this.selectedItems = [
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' }
    ];
    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
    });
    this.getGroups();
    this.getsubcategory();
    this.formInit();
  }
  formInit() {
    this.myForm = new FormGroup({
      file: new FormControl('', Validators.required),
      Selected: new FormControl([], Validators.required),
      SelectedCategories: new FormControl([], Validators.required),
      postalcode: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address2: new FormControl(this.address2),
      price: new FormControl(''),
      pricebox: new FormControl(''),
      condition: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
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

  getsubcategory() {
    this.api.get("getproductCategory").subscribe((res: any) => {
      //console.log(res)
      this.ProductCategoryData = res.CategoryData;
      this.ProductCategoryData.forEach((element: any) => {
        this.optionsCategories.push({
          value: element._id,
          display: element.categoryName,
        });

      });

    });
  }

  getGroups() {
    this.api.get('getgroups').subscribe((res: any) => {
      this.allGroups = res.data;
      this.allGroups.forEach((element) => {
        this.options.push({
          value: element._id,
          display: element.groups,
        });
      });
    });
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();
      //console.log(this.images);
      reader.onload = (event: any) => {
        this.images.push(event.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  deleteImage(i: any): void {
    //console.log(i);
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  }


  getAddressByPostalcode() {
    const formValue = this.myForm.value;
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (formValue.postalcode?.toString().length == 6) {
        if (!formValue.postalcode) {
          this.address1 = '';
        }
        let requestData = {};
        requestData["postalCode"] = formValue.postalcode;
        this.api.post("getAddressPostcode", requestData).subscribe((res: any) => {
          this.fulladdress = res.addressfrompostcode?.address;
          this.fulladdress?.forEach((element) => {
            this.address1 = element.ADDRESS;
          });
          if (!this.address1) {
            this.postalcode = ''
          }
        });
      }
    }, 300);

  }

  SubmitMarketPlaceProducListing() {
    const formValue = this.myForm.value;
    const formData: FormData = new FormData();

    formData.append("groupsId", [...formValue.Selected].join(","));
    formData.append("subcategory", [...formValue.SelectedCategories].join(","));
    formData.append("condition", formValue.condition);
    formData.append("title", formValue.title);
    if (this.myForm.value.price === 'forsale') {
      formData.append("price", formValue.pricebox);
    } else {
      formData.append("price", formValue.price);
    }
    formData.append("description", formValue.description);
    formData.append("country", 'singapore');
    if (this.address1 !== '') {
      formData.append("address1", this.address1);
    }
    formData.append("address2", formValue.address2);
    formData.append("postalCode", formValue.postalcode);

    this.displayCategories = formValue.SelectedCategories.forEach((item: any) => {
      this.optionsCategories.forEach((element: any) => {
        if (element.value == item) {
          this.data.push(element.display);
        }
      })
    })
    this.displayGroups = formValue.Selected.forEach((item: any) => {
      this.options.forEach((element: any) => {
        if (element.value == item) {
          this.newdata.push(element.display);
        }
      })
    })
    formData.append("groupsName", [this.selected ? [...this.newdata] : [...this.selected], this.selectedCategories ? [...this.data] : [...this.selectedCategories], formValue.class].join(","));
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("image", this.myFiles[i]);
    }
    if (this.myForm.valid) {
      this.isSubmit = true;
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("LoggedIn"),
      });
      this.http.post(`${this.API_URL}createproduct`, formData, { headers: headers, }).subscribe((res: any) => {
        //console.log(res)
        if (res.status == true) {
          if (this.userType === 'business') {
            this.router.navigate(["pages/my-listing"]);
          } else {
            this.router.navigate(["profile/profile"]);
          }
        
        } else {
          this.api.alert(res.message, "error");
        }
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  back(){
    this.event.back();
  }

}
