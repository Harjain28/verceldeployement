import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-new-branch',
  templateUrl: './add-new-branch.component.html',
  styleUrls: ['./add-new-branch.component.scss']
})
export class AddNewBranchComponent implements OnInit {

  myform: FormGroup;
  fulladdress: any;
  adminPassword: any;
  adminPhoneno: any;
  adminnEmail: any;
  adminName: any;
  address1: any;
  id: any;
  branchDetails: any;
  address: any;
  mobileNo: any;
  email: any;
  editbranchName: any;
  postalcode: any;
  address2: any;
  webAddress: any;
  EditadminnEmail: any;
  showpassword: boolean;
  pvisibility: boolean;
  pcvisibility: boolean;
  adminType: string;
  diabledFeilds: boolean;
  branchstatus: any;
  // booleanbranchStatus: boolean;
  branchOfflinestatus: boolean;
  disabledBranchName: boolean;
  branchOnlinestatus: boolean;
  labelBranchname: string;
  infoTextData: any = [];
  userAddress: any;
  userLatitude: any;
  userLongitude: any;
  position: { lat: number, lng: number };
  isLatong: boolean = false;
  regex: any;
  isSubmit: boolean = false;
  isSubmitBool: boolean = false;;



  constructor(private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pvisibility = false;
    this.pcvisibility = false;
    this.adminType = localStorage.getItem('__admintype')
    // this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.branchstatus = params["type"];
      // this.booleanbranchStatus = this.branchstatus == 'offline' ? true : false;
      if (this.branchstatus == 'offline') {
        this.labelBranchname = 'Offline'
        this.branchOfflinestatus = true;
        this.branchOnlinestatus = true;
      } else {
        this.labelBranchname = 'Online'
        this.branchOfflinestatus = true;
        this.branchOnlinestatus = false;
      }
      if (this.id) {
        this.disabledBranchName = true;
      } else {
        this.disabledBranchName = false;
      }
    });
  }

  ngOnInit(): void {
    this.address1 = '';
    if (this.id) {
      this.getbranchdetails();
    }
    this.formInit();

    if (this.event.infoTextData.length > 0) {
      this.infoTextData = this.event.infoTextData;
    }else{
      this.getInfoText();
    }
  }


  getInfoText() {
    this.api.getInfoSection().subscribe((res: any) => {
      this.infoTextData = res?.sectionData;
    })
  }


  getbranchdetails() {
    if (this.id && this.adminType == "admin") {
      this.api.get("getBranchdetails?branchId=" + this.id).subscribe((res: any) => {
        this.branchDetails = res?.branchDetails[0];
        this.address1 = this.branchDetails.address1;
        this.address2 = this.branchDetails.address2;
        this.mobileNo = this.branchDetails.businessmobileNo;
        this.email = this.branchDetails.businessemail;
        this.adminName = this.branchDetails.name;
        this.adminPhoneno = this.branchDetails.mobileNo;
        if (this.branchDetails.email) {
          this.showpassword = true;
        } else {
          this.showpassword = false;
        }

        this.EditadminnEmail = this.branchDetails.email;
        this.adminnEmail = this.branchDetails.email;

        this.editbranchName = this.branchDetails.branchName;
        this.postalcode = this.branchDetails.postalCode;
        this.webAddress = this.branchDetails.webAddress;
        this.position = {
          "lat": this.branchDetails.loc.coordinates[1],
          "lng": this.branchDetails.loc.coordinates[0]
        }
      });
    } else if (this.id && this.adminType == "subadmin") {
      this.api.get("getsubBranchdetails?branchId=" + this.id).subscribe((res: any) => {
        this.branchDetails = res?.branchDetails[0];
        this.address1 = this.branchDetails.address1;
        this.address2 = this.branchDetails.address2;
        this.mobileNo = this.branchDetails.businessmobileNo;
        this.email = this.branchDetails.businessemail;
        this.adminName = this.branchDetails.name;
        this.adminPhoneno = this.branchDetails.mobileNo;
        if (this.branchDetails.email) {
          this.showpassword = true
        } else {
          this.showpassword = false
        }
        this.EditadminnEmail = this.branchDetails.email;
        this.adminnEmail = this.branchDetails.email;

        this.editbranchName = this.branchDetails.branchName;
        this.postalcode = this.branchDetails.postalCode;
        this.webAddress = this.branchDetails.webAddress;
        this.position = {
          "lat": this.branchDetails.loc.coordinates[1],
          "lng": this.branchDetails.loc.coordinates[0]
        }
      });
    } else {
      this.api.get("getBranchdetails?branchId=" + this.id).subscribe((res: any) => {
        this.branchDetails = res?.branchDetails[0];
        this.address1 = this.branchDetails.address1;
        this.address2 = this.branchDetails.address2;
        this.mobileNo = this.branchDetails.businessmobileNo;
        this.email = this.branchDetails.businessemail;
        this.adminName = this.branchDetails.name;
        this.adminPhoneno = this.branchDetails.mobileNo;
        if (this.branchDetails.email) {
          this.showpassword = true
        } else {
          this.showpassword = false
        }
        this.EditadminnEmail = this.branchDetails.email;
        this.adminnEmail = this.branchDetails.email;

        this.editbranchName = this.branchDetails.branchName;
        this.postalcode = this.branchDetails.postalCode;
        this.webAddress = this.branchDetails.webAddress;
        this.position = {
          "lat": this.branchDetails.loc.coordinates[1],
          "lng": this.branchDetails.loc.coordinates[0]
        }
      });
    }
  }

  formInit() {
    this.myform = new FormGroup({
      branchName: new FormControl('', Validators.required),
      postalcode: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address1: new FormControl('' , [Validators.required]),
      address2: new FormControl(''),
      phonenumber: new FormControl('', [Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
      Website: new FormControl(this.webAddress),
      adminName: new FormControl(''),
      adminPhoneno: new FormControl('', Validators.pattern("[8-9]\\d{7}")),
      // adminPassword: new FormControl('', Validators.minLength(6)),
      // confirm_password: new FormControl(""),
      adminEmail: new FormControl('', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")]),
      email: new FormControl('', Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")),
    });
  }

  // matchinputValue(parentControl: FormControl, childControl: FormControl) {
  //   if (parentControl.value !== childControl.value) {
  //     childControl.setErrors({ noMatch: true });
  //   } else {
  //     childControl.clearValidators();
  //     childControl.updateValueAndValidity();
  //   }
  // }
  geocodeAddressByName() {
    let address = this.myform.controls.address1.value;
    if (address.length > 10) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': address,
          componentRestrictions: {
            country: 'SG',
          }
        }, (results, status) => {
          if (status === 'OK') {
            this.position = {
              "lat": results[0].geometry.location.lat(),
              "lng": results[0].geometry.location.lng()
            }
            this.isSubmit = true;
          }
          // this.getReverseGeocodingData(this.position.lat, this.position.lng);
        });
    } 
  }


  geocodeAddress() {
    let postal = JSON.stringify(this.postalcode);
    if (postal && postal.trim() !== '' && this.postalcode.length == 6) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': postal,
          componentRestrictions: {
            country: 'SG',
          }
        }, (results, status) => {
          if (status === 'OK') {
            this.position = {
              "lat": results[0].geometry.location.lat(),
              "lng": results[0].geometry.location.lng()
            }
            this.isSubmit = true;
          }
          this.getReverseGeocodingData(this.position.lat, this.position.lng);
        });
    } else {
      this.address1 = '';
    }
  }

  getReverseGeocodingData(lat, lng) {
    let latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        let address = results[0].formatted_address;
        this.address1 = address.split(",")[0];
        // return this.address1;
      }
    });
  }

  submitAddbranch() {
    this.isSubmitBool = true;
    const formValue = this.myform.value;
    if (formValue.adminEmail) {
      if (formValue.adminEmail) {
        // this.myform.get('adminPassword').clearValidators();
        // this.myform.get('adminPassword').updateValueAndValidity();
        // this.myform.get('confirm_password').clearValidators();
        // this.myform.get('confirm_password').updateValueAndValidity();
      } else {
        // this.myform.get('adminPassword').setValidators([Validators.required, Validators.minLength(6)]);
        // this.myform.get('confirm_password').setValidators([Validators.required]);
        this.myform.get('adminName').setValidators([Validators.required]);
        this.myform.get('adminPhoneno').setValidators([Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{8})$")]);
        // this.myform.get('adminPassword').updateValueAndValidity();
        this.myform.get('adminName').updateValueAndValidity();
        this.myform.get('adminPhoneno').updateValueAndValidity();
        // this.myform.get('confirm_password').updateValueAndValidity();
      }
    }
    let requestObject = {};
    requestObject["branchName"] = formValue.branchName;
    requestObject["adminName"] = formValue.adminName;
    if (formValue.adminEmail != this.EditadminnEmail) {
      requestObject["adminEmail"] = formValue.adminEmail;
    }
    if (!this.showpassword) {
      // requestObject["adminPassword"] = formValue.adminPassword;
    }

    if (this.branchstatus == 'offline') {
    //   if (this.branchDetails?.postalCode) {
    //   this.geocodeAddress();
    // }
      requestObject["postalCode"] = formValue.postalcode;
      requestObject["address1"] = this.address1;
      requestObject["address2"] = formValue.address2;
      requestObject["branchstatus"] = 'offline';
      if (this.isSubmit) {
        requestObject["lat"] = this.position.lat;
        requestObject["long"] = this.position.lng;
      }

    } else {
      this.myform.get('postalcode').clearValidators();
      this.myform.get('address1').clearValidators();
      this.myform.get('address1').updateValueAndValidity();
      this.myform.get('postalcode').updateValueAndValidity();
      requestObject["branchstatus"] = 'online';
      requestObject["lat"] = '0';
      requestObject["long"] = '0';
    }
    requestObject["adminPhoneno"] = formValue.adminPhoneno;
    requestObject["mobileNo"] = formValue.phonenumber ? formValue.phonenumber : '';
    requestObject["email"] = formValue.email ? formValue.email : '';
    requestObject["webAddress"] = formValue.Website;
    requestObject["country"] = "Singapore";

    if (this.id) {
      if (this.branchstatus == 'offline') {
        // this.geocodeAddress();
        this.isSubmitBool = false;
        requestObject["lat"] = this.position.lat;
        requestObject["long"] = this.position.lng;
      } else {
        requestObject["lat"] = '0';
        requestObject["long"] = '0';
      }
      
      requestObject["branchId"] = this.id;
      if (this.myform.valid) {
        this.api.post("editbranch", requestObject).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitBool = false;
            this.event.businessDetails = false;
            if (formValue.adminEmail == this.EditadminnEmail) {
              this.router.navigate(['pages/branches']);
            } else if (this.EditadminnEmail) {
              this.event.businessDetails = false;
              this.storage.logout();
              this.router.navigate(['/login/student']);
            } else {
              this.router.navigate(['pages/branches']);
            }
          } else {
            this.isSubmitBool = false;
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.isSubmitBool = false;
        this.myform.markAllAsTouched();
      }
    } else {
      if (this.myform.valid) {
        this.api.post("addbranch", requestObject).subscribe((res: any) => {
          if (res.status == true) {
            this.isSubmitBool = false;
            this.event.businessDetails = false;
            this.router.navigate(['pages/branches']);
          } else {
            this.api.alert(res.message, "error");
            this.isSubmitBool = false;
          }
        });
      } else {
        this.isSubmitBool = false;
        this.myform.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }
}
