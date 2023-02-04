import { I } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

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
  adminnName: any;
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
  userId: any;
  token: any;
  branchstatus: any;
  EditadminnEmail: any;
  showpassword: boolean;
  branchOfflinestatus: boolean;
  disabledBranchName: boolean;
  branchOnlinestatus: boolean;
  labelBranchname: string;
  adminType: string;
  diabledFeilds: boolean;
  infoTextData: any;
  API_URL: any;
  position = { lat: 0, lng: 0 };
  isSubmit: boolean = false;
  adminId: any;

  constructor(private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {

    this.API_URL = environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype')

    if (this.adminType == "superAdmin") {
      this.diabledFeilds = false;
    } else {
      this.diabledFeilds = false;
    }
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.adminId = params?.AdminId;
      this.userId = params.userId;
      this.token = params.token;
      this.branchstatus = params["type"];
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      if (this.branchstatus == 'offline') {
        this.labelBranchname = 'Branch Name'
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
    if (this.id) {
      this.getbranchdetails();
    }
    this.formInit();
    this.address1 = '';

    this.getInfoText();
  }

  getInfoText() {
    this.api.getInfoSection().subscribe((res: any) => {
      this.infoTextData = res?.sectionData;
    })
  }

  getbranchdetails() {
    if (this.id) {
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("admintoken"),
      });
      this.http.get(`${this.API_URL}admingetBranchdetails?businessId=${this.userId}&branchId=${this.id}`, { headers: headers, }).subscribe((res: any) => {
        this.branchDetails = res?.branchDetails[0];
        this.address1 = this.branchDetails?.address1;
        this.address2 = this.branchDetails?.address2;
        this.mobileNo = this.branchDetails?.businessmobileNo;
        this.email = this.branchDetails?.businessemail;
        this.adminnName = this.branchDetails?.name;
        this.adminPhoneno = this.branchDetails?.mobileNo;
        if (this.branchDetails?.email) {
          this.showpassword = true
        } else {
          this.showpassword = false
        }
        this.EditadminnEmail = this.branchDetails?.email;
        this.adminnEmail = this.branchDetails?.email;
        this.editbranchName = this.branchDetails?.branchName;
        this.postalcode = this.branchDetails?.postalCode;
        this.webAddress = this.branchDetails?.webAddress;
        this.position = {
          "lat": this.branchDetails.loc.coordinates[1],
          "lng": this.branchDetails.loc.coordinates[0]
        }
        //console.log(this.position,'from api')
      });
    }
  }

  formInit() {
    this.myform = new FormGroup({
      branchName: new FormControl('', Validators.required),
      postalcode: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      phonenumber: new FormControl('', [Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
      adminName: new FormControl(''),
      adminPhoneno: new FormControl('', [Validators.pattern("[8-9]\\d{7}")]),
      // adminPassword: new FormControl(''),
      adminEmail: new FormControl('', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")]),
      Website: new FormControl(''),
      email: new FormControl('', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")]),
    });
  }

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
          //console.log(this.position,'from  name')
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
            //console.log(this.position,'from  code')
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

  // geocodeAddress(addressInput) {
  //   const address = addressInput;
  //   var geocoder = new google.maps.Geocoder();
  //        geocoder.geocode({'address': address}, (results, status) => {
  //         if (status === 'OK') {
  //           this.position = {
  //             "lat": results[0].geometry.location.lat(),
  //             "lng": results[0].geometry.location.lng()
  //           }
  //         } else {
  //           alert('Geocode was not successful for the following reason: ' + status);
  //         }
  //   });
  // }

  // getAddressByPostalcode() {
  //   const formValue = this.myform?.value;
  //   if (formValue?.postalcode?.toString().length == 6) {
  //     if (!formValue?.postalcode) {
  //       this.address1 = '';
  //     }
  //     let requestData = {};
  //     requestData["postalCode"] = formValue?.postalcode;
  //     const headers = new HttpHeaders({
  //       Authorization: localStorage.getItem("admintoken"),
  //     });
  //     this.http.post(`${this.API_URL}admingetAddressPostcode`, requestData, { headers: headers, }).subscribe((res: any) => {
  //       this.fulladdress = res?.addressfrompostcode?.address;
  //       this.fulladdress?.forEach((element: any) => {
  //         this.address1 = element?.ADDRESS;
  //       });
  //       this.geocodeAddress(this.address1);
  //       if (!this.address1) {
  //         this.postalcode = ''
  //       }
  //     });
  //   }
  // }

  submitAddbranch() {
    // if (this.branchDetails?.postalCode) {
    //   this.geocodeAddress();
    // }
    const formValue = this.myform?.value;
    if (formValue?.adminEmail) {
      if (formValue?.adminEmail) {
        // this.myform.get('adminPassword').clearValidators();
        // this.myform.get('adminPassword').updateValueAndValidity();
      } else {
        // this.myform.get('adminPassword').setValidators([Validators.required, Validators.minLength(6)]);
        this.myform.get('adminName').setValidators([Validators.required]);
        this.myform.get('adminPhoneno').setValidators([Validators.required, , Validators.pattern("^([0-9]{0}|[0-9]{8})$")]);
        // this.myform.get('adminPassword').updateValueAndValidity();
        this.myform.get('adminName').updateValueAndValidity();
        this.myform.get('adminPhoneno').updateValueAndValidity();
      }
    }
    let requestObject = {};
    requestObject["branchName"] = formValue?.branchName;
    requestObject["adminName"] = formValue?.adminName;
    if (formValue?.adminEmail != this.EditadminnEmail) {
      requestObject["adminEmail"] = formValue?.adminEmail;
    }

    if (this.branchstatus == 'offline') {
      //console.log(this.position,'from post')
      requestObject["postalCode"] = formValue.postalcode;
      requestObject["address1"] = this.address1;
      requestObject["lat"] = this.position.lat;
      requestObject["long"] = this.position.lng;
      requestObject["address2"] = formValue.address2;
      requestObject["branchstatus"] = 'offline';
    } else {
      this.myform.get('postalcode').clearValidators();
      this.myform.get('address1').clearValidators();
      this.myform.get('address1').updateValueAndValidity();
      this.myform.get('postalcode').updateValueAndValidity();
      requestObject["branchstatus"] = 'online';
      requestObject["lat"] = this.position.lat;
      requestObject["long"] = this.position.lng;
    }
    requestObject["adminPhoneno"] = formValue?.adminPhoneno;
    requestObject["mobileNo"] = formValue?.phonenumber ? formValue?.phonenumber : "";
    requestObject["email"] = formValue?.email ? formValue?.email : "";
    requestObject["webAddress"] = formValue?.Website;
    requestObject["country"] = "Singapore";

    if (this.id) {
      requestObject["branchId"] = this.id;
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("admintoken"),
      });
      if (this.myform.valid) {
        requestObject["userId"] = this.userId;
        this.http.post(`${this.API_URL}admineditbranch`, requestObject, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            if (formValue.adminEmail == this.EditadminnEmail) {
              this.api.alert(
                "Branch Details Updated Successfully",
                "success"
              );
              this.router.navigate([`admin/branches/${this.userId}/${this.token}/${this.adminId}`]);
            } else if (this.EditadminnEmail) {
              this.event.businessDetails = false;
              this.storage.logout();
              this.router.navigate(['/login/business']);
            } else {
              this.api.alert(
                "Branch Details Updated Successfully",
                "success"
              );
              // this.router.navigate([`/admin/${name}/${this.BUSINESSADMINID}/${this.ADMINTOKEN}/${this.adminId}`])
              this.router.navigate([`admin/branches/${this.userId}/${this.token}/${this.adminId}`]);
            }
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myform.markAllAsTouched();
      }
    } else {
      if (this.myform.valid) {
        requestObject["userId"] = this.userId;
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}adminaddbranch`, requestObject, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.api.alert(
              "You have successfully registered as Branch Admin",
              "success"
            );
            this.router.navigate([`admin/branches/${this.userId}/${this.token}/${this.adminId}`]);
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myform.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }

}
