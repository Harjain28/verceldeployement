import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-business-main-address',
  templateUrl: './add-business-main-address.component.html',
  styleUrls: ['./add-business-main-address.component.scss']
})
export class AddBusinessMainAddressComponent implements OnInit {
  locationform: FormGroup;
  sDisabled = false;
  showDetails: boolean = false;
  fulladdress: any;
  address1: any;
  data: string;
  fulldata: any;
  adminId: any;
  postalcode: any;
  address2: any;
  mobileNo: any;
  webAddress: any;
  mobile: number;
  adminType: string;
  diabledFeilds: boolean;
  subadminPermission: boolean = true;
  infoTextData: any = '';
  position: { lat: number, lng: number };
  isSubmit: boolean = false;

  constructor(private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router) {
    this.adminType = localStorage.getItem('__admintype')
    this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
  }

  ngOnInit(): void {
    this.formInit();
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.postalcode = this.fulldata?.postalCode ? this.fulldata?.postalCode : '';

    if (localStorage.getItem("branchStatus") == 'editbranch') {
      this.address1 = this.fulldata?.address1 ? this.fulldata?.address1 : '';
    } else {
      this.address1 = '';
    }

    this.address2 = this.fulldata?.address2 ? this.fulldata?.address2 : '';
    if (this.fulldata.loc?.coordinates?.length > 0) {
      this.position = {
        "lat": this.fulldata.loc?.coordinates[1],
        "lng": this.fulldata.loc?.coordinates[0]
      }
      this.isSubmit = true;
      //console.log(this.position, 'from api')
    }

    if (this.fulldata?.businessmobileNo) {
      this.mobileNo = this.fulldata?.businessmobileNo.toString().slice(2);
    } else {
      this.mobileNo = '';
    }
    this.formInit();

    // else {
    //   this.mobileNo = this.fulldata.businessmobileNo.toString()
    // }

    this.getInfoText();

  }

  getInfoText() {
    if (this.event.infoTextData.length > 0) {
      this.infoTextData = this.event.infoTextData[2]?.description;
    } else {
      this.api.getInfoSection().subscribe((res: any) => {
        this.infoTextData = res?.sectionData[2]?.description;
      })
    }
  }

  formInit() {
    this.locationform = new FormGroup({
      postalcode: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(this.address2),
      phonenumber: new FormControl(this.mobileNo, [Validators.required, Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
    });
  }

  geocodeAddressByName() {
    let address = this.locationform.controls.address1.value;
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


  submitbusinessLocaion() {
    // if (this.fulldata?.postalCode) {
    //   this.geocodeAddress();
    // }

    if (this.address1 && this.address1.trim() !== '' && this.isSubmit) {
      //console.log(this.position,'from post')
      const formValue = this.locationform.value;
      this.mobile = parseInt("+65" + formValue.phonenumber);
      let requestObject = {};
      requestObject["postalCode"] = formValue.postalcode;
      requestObject["address1"] = this.address1;
      requestObject["lat"] = this.position.lat;
      requestObject["long"] = this.position.lng;
      requestObject["address2"] = formValue.address2;
      requestObject["mobileNo"] = this.mobile;
      requestObject["country"] = "Singapore";

      if (this.locationform.valid) {
        this.api.post("addmainbranch", requestObject).subscribe((res: any) => {
          if (res.status == true) {
            localStorage.setItem("userdata", JSON.stringify(res.businessData));
            this.api.alert(res.message, "success");
            this.router.navigate(["pages/business-details"]);
          } else {
            this.api.alert(res.message, "error");
          }
        });
      } else {
        this.locationform.markAllAsTouched();
      }
    }
  }

  back() {
    this.event.back();
  }
}
