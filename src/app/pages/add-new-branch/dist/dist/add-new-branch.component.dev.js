"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AddNewBranchComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var AddNewBranchComponent =
/** @class */
function () {
  function AddNewBranchComponent(storage, event, api, router, route) {
    var _this = this;

    this.storage = storage;
    this.event = event;
    this.api = api;
    this.router = router;
    this.route = route;
    this.infoTextData = [];
    this.isLatong = false;
    this.isSubmit = false;
    this.pvisibility = false;
    this.pcvisibility = false;
    this.adminType = localStorage.getItem('__admintype'); // this.diabledFeilds = this.adminType == "subadmin" ? true : false;

    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }

    this.route.params.subscribe(function (params) {
      _this.id = params["id"];
      _this.branchstatus = params["type"]; // this.booleanbranchStatus = this.branchstatus == 'offline' ? true : false;

      if (_this.branchstatus == 'offline') {
        _this.labelBranchname = 'Branch Name';
        _this.branchOfflinestatus = true;
        _this.branchOnlinestatus = true;
      } else {
        _this.labelBranchname = 'Online';
        _this.branchOfflinestatus = true;
        _this.branchOnlinestatus = false;
      }

      if (_this.id) {
        _this.disabledBranchName = true;
      } else {
        _this.disabledBranchName = false;
      }
    });
    this.getInfoText();
  }

  AddNewBranchComponent.prototype.ngOnInit = function () {
    this.address1 = '';

    if (this.id) {
      this.getbranchdetails();
    }

    this.formInit();
  };

  AddNewBranchComponent.prototype.getInfoText = function () {
    var _this = this;

    this.api.getInfoSection().subscribe(function (res) {
      _this.infoTextData = res === null || res === void 0 ? void 0 : res.sectionData;
    });
  };

  AddNewBranchComponent.prototype.getbranchdetails = function () {
    var _this = this;

    if (this.id && this.adminType == "admin") {
      this.api.get("getBranchdetails?branchId=" + this.id).subscribe(function (res) {
        //console.log(res)
        _this.branchDetails = res === null || res === void 0 ? void 0 : res.branchDetails[0];
        _this.address1 = _this.branchDetails.address1;
        _this.address2 = _this.branchDetails.address2;
        _this.mobileNo = _this.branchDetails.businessmobileNo;
        _this.email = _this.branchDetails.businessemail;
        _this.adminName = _this.branchDetails.name;
        _this.adminPhoneno = _this.branchDetails.mobileNo;

        if (_this.branchDetails.email) {
          _this.showpassword = true;
        } else {
          _this.showpassword = false;
        }

        _this.EditadminnEmail = _this.branchDetails.email;
        _this.adminnEmail = _this.branchDetails.email;
        _this.editbranchName = _this.branchDetails.branchName;
        _this.postalcode = _this.branchDetails.postalCode;
        _this.webAddress = _this.branchDetails.webAddress;
      });
    } else if (this.id && this.adminType == "subadmin") {
      this.api.get("getsubBranchdetails?branchId=" + this.id).subscribe(function (res) {
        //console.log(res)
        _this.branchDetails = res === null || res === void 0 ? void 0 : res.branchDetails[0];
        _this.address1 = _this.branchDetails.address1;
        _this.address2 = _this.branchDetails.address2;
        _this.mobileNo = _this.branchDetails.businessmobileNo;
        _this.email = _this.branchDetails.businessemail;
        _this.adminName = _this.branchDetails.name;
        _this.adminPhoneno = _this.branchDetails.mobileNo;

        if (_this.branchDetails.email) {
          _this.showpassword = true;
        } else {
          _this.showpassword = false;
        }

        _this.EditadminnEmail = _this.branchDetails.email;
        _this.adminnEmail = _this.branchDetails.email;
        _this.editbranchName = _this.branchDetails.branchName;
        _this.postalcode = _this.branchDetails.postalCode;
        _this.webAddress = _this.branchDetails.webAddress;
      });
    } else {
      this.api.get("getBranchdetails?branchId=" + this.id).subscribe(function (res) {
        //console.log(res)
        _this.branchDetails = res === null || res === void 0 ? void 0 : res.branchDetails[0];
        _this.address1 = _this.branchDetails.address1;
        _this.address2 = _this.branchDetails.address2;
        _this.mobileNo = _this.branchDetails.businessmobileNo;
        _this.email = _this.branchDetails.businessemail;
        _this.adminName = _this.branchDetails.name;
        _this.adminPhoneno = _this.branchDetails.mobileNo;

        if (_this.branchDetails.email) {
          _this.showpassword = true;
        } else {
          _this.showpassword = false;
        }

        _this.EditadminnEmail = _this.branchDetails.email;
        _this.adminnEmail = _this.branchDetails.email;
        _this.editbranchName = _this.branchDetails.branchName;
        _this.postalcode = _this.branchDetails.postalCode;
        _this.webAddress = _this.branchDetails.webAddress;
      });
    }
  };

  AddNewBranchComponent.prototype.formInit = function () {
    this.myform = new forms_1.FormGroup({
      branchName: new forms_1.FormControl('', forms_1.Validators.required),
      postalcode: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
      address2: new forms_1.FormControl(''),
      phonenumber: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
      Website: new forms_1.FormControl(this.webAddress),
      adminName: new forms_1.FormControl(''),
      adminPhoneno: new forms_1.FormControl('', forms_1.Validators.pattern("[8-9]\\d{7}")),
      // adminPassword: new FormControl('', Validators.minLength(6)),
      // confirm_password: new FormControl(""),
      adminEmail: new forms_1.FormControl('', [forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")]),
      email: new forms_1.FormControl('', forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"))
    });
  }; // matchinputValue(parentControl: FormControl, childControl: FormControl) {
  //   if (parentControl.value !== childControl.value) {
  //     childControl.setErrors({ noMatch: true });
  //   } else {
  //     childControl.clearValidators();
  //     childControl.updateValueAndValidity();
  //   }
  // }


  AddNewBranchComponent.prototype.geocodeAddress = function () {
    var _this = this;

    var postal = JSON.stringify(this.postalcode);

    if (postal && postal.trim() !== '' && this.postalcode.length == 6) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': postal,
        componentRestrictions: {
          country: 'SG'
        }
      }, function (results, status) {
        if (status === 'OK') {
          _this.position = {
            "lat": results[0].geometry.location.lat(),
            "lng": results[0].geometry.location.lng()
          };
          _this.isSubmit = true;
        }

        _this.getReverseGeocodingData(_this.position.lat, _this.position.lng);
      });
    } else {
      this.address1 = '';
    }
  };

  AddNewBranchComponent.prototype.getReverseGeocodingData = function (lat, lng) {
    var _this = this;

    var latlng = new google.maps.LatLng(lat, lng); // This is making the Geocode request

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      location: latlng
    }, function (results, status) {
      if (status === 'OK') {
        var address = results[0].formatted_address;
        _this.address1 = address.split(",")[0];
        console.log(_this.address1, 'from event'); // return this.address1;
      }
    });
  };

  AddNewBranchComponent.prototype.submitAddbranch = function () {
    var _this = this;

    var _a;

    if ((_a = this.branchDetails) === null || _a === void 0 ? void 0 : _a.postalCode) {
      this.geocodeAddress();
    }

    var formValue = this.myform.value;

    if (formValue.adminEmail) {
      if (formValue.adminEmail) {// this.myform.get('adminPassword').clearValidators();
        // this.myform.get('adminPassword').updateValueAndValidity();
        // this.myform.get('confirm_password').clearValidators();
        // this.myform.get('confirm_password').updateValueAndValidity();
      } else {
        // this.myform.get('adminPassword').setValidators([Validators.required, Validators.minLength(6)]);
        // this.myform.get('confirm_password').setValidators([Validators.required]);
        this.myform.get('adminName').setValidators([forms_1.Validators.required]);
        this.myform.get('adminPhoneno').setValidators([forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")]); // this.myform.get('adminPassword').updateValueAndValidity();

        this.myform.get('adminName').updateValueAndValidity();
        this.myform.get('adminPhoneno').updateValueAndValidity(); // this.myform.get('confirm_password').updateValueAndValidity();
      }
    }

    var requestObject = {};
    requestObject["branchName"] = formValue.branchName;
    requestObject["adminName"] = formValue.adminName;

    if (formValue.adminEmail != this.EditadminnEmail) {
      requestObject["adminEmail"] = formValue.adminEmail;
    }

    if (!this.showpassword) {// requestObject["adminPassword"] = formValue.adminPassword;
    }

    if (this.branchstatus == 'offline') {
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
      this.myform.get('postalcode').updateValueAndValidity();
      requestObject["branchstatus"] = 'online';
      requestObject["lat"] = '0';
      requestObject["long"] = '0';
    }

    requestObject["adminPhoneno"] = formValue.adminPhoneno;
    requestObject["mobileNo"] = formValue.phonenumber;
    requestObject["email"] = formValue.email;
    requestObject["webAddress"] = formValue.Website;
    requestObject["country"] = "Singapore";

    if (this.id) {
      requestObject["branchId"] = this.id;

      if (this.myform.valid) {
        this.api.post("editbranch", requestObject).subscribe(function (res) {
          if (res.status == true) {
            if (formValue.adminEmail == _this.EditadminnEmail) {
              _this.router.navigate(['pages/branches']);
            } else if (_this.EditadminnEmail) {
              _this.storage.logout();

              _this.router.navigate(['/login/student']);
            } else {
              _this.router.navigate(['pages/branches']);
            }
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myform.markAllAsTouched();
      }
    } else {
      //console.log(this.myform)
      if (this.myform.valid) {
        this.api.post("addbranch", requestObject).subscribe(function (res) {
          //console.log(res)
          if (res.status == true) {
            _this.router.navigate(['pages/branches']);
          } else {
            _this.api.alert(res.message, "error");
          }
        });
      } else {
        this.myform.markAllAsTouched();
      }
    }
  };

  AddNewBranchComponent = __decorate([core_1.Component({
    selector: 'app-add-new-branch',
    templateUrl: './add-new-branch.component.html',
    styleUrls: ['./add-new-branch.component.scss']
  })], AddNewBranchComponent);
  return AddNewBranchComponent;
}();

exports.AddNewBranchComponent = AddNewBranchComponent;