"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddNewBranchComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var AddNewBranchComponent = /** @class */ (function () {
    function AddNewBranchComponent(storage, event, api, router, route, http) {
        var _this = this;
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
        this.route = route;
        this.http = http;
        this.position = { lat: 0, lng: 0 };
        this.isSubmit = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.adminType = localStorage.getItem('__admintype');
        if (this.adminType == "superAdmin") {
            this.diabledFeilds = false;
        }
        else {
            this.diabledFeilds = false;
        }
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.userId = params.userId;
            _this.token = params.token;
            _this.branchstatus = params["type"];
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            if (_this.branchstatus == 'offline') {
                _this.labelBranchname = 'Branch Name';
                _this.branchOfflinestatus = true;
                _this.branchOnlinestatus = true;
            }
            else {
                _this.labelBranchname = 'Online';
                _this.branchOfflinestatus = true;
                _this.branchOnlinestatus = false;
            }
            if (_this.id) {
                _this.disabledBranchName = true;
            }
            else {
                _this.disabledBranchName = false;
            }
        });
    }
    AddNewBranchComponent.prototype.ngOnInit = function () {
        if (this.id) {
            this.getbranchdetails();
        }
        this.formInit();
        this.address1 = '';
        this.getInfoText();
    };
    AddNewBranchComponent.prototype.getInfoText = function () {
        var _this = this;
        this.api.getInfoSection().subscribe(function (res) {
            _this.infoTextData = res === null || res === void 0 ? void 0 : res.sectionData;
        });
    };
    AddNewBranchComponent.prototype.getbranchdetails = function () {
        var _this = this;
        if (this.id) {
            var headers = new http_1.HttpHeaders({
                Authorization: localStorage.getItem("admintoken")
            });
            this.http.get(this.API_URL + "admingetBranchdetails?businessId=" + this.userId + "&branchId=" + this.id, { headers: headers }).subscribe(function (res) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                _this.branchDetails = res === null || res === void 0 ? void 0 : res.branchDetails[0];
                _this.address1 = (_a = _this.branchDetails) === null || _a === void 0 ? void 0 : _a.address1;
                _this.address2 = (_b = _this.branchDetails) === null || _b === void 0 ? void 0 : _b.address2;
                _this.mobileNo = (_c = _this.branchDetails) === null || _c === void 0 ? void 0 : _c.businessmobileNo;
                _this.email = (_d = _this.branchDetails) === null || _d === void 0 ? void 0 : _d.businessemail;
                _this.adminnName = (_e = _this.branchDetails) === null || _e === void 0 ? void 0 : _e.name;
                _this.adminPhoneno = (_f = _this.branchDetails) === null || _f === void 0 ? void 0 : _f.mobileNo;
                if ((_g = _this.branchDetails) === null || _g === void 0 ? void 0 : _g.email) {
                    _this.showpassword = true;
                }
                else {
                    _this.showpassword = false;
                }
                _this.EditadminnEmail = (_h = _this.branchDetails) === null || _h === void 0 ? void 0 : _h.email;
                _this.adminnEmail = (_j = _this.branchDetails) === null || _j === void 0 ? void 0 : _j.email;
                _this.editbranchName = (_k = _this.branchDetails) === null || _k === void 0 ? void 0 : _k.branchName;
                _this.postalcode = (_l = _this.branchDetails) === null || _l === void 0 ? void 0 : _l.postalCode;
                _this.webAddress = (_m = _this.branchDetails) === null || _m === void 0 ? void 0 : _m.webAddress;
            });
        }
    };
    AddNewBranchComponent.prototype.formInit = function () {
        this.myform = new forms_1.FormGroup({
            branchName: new forms_1.FormControl('', forms_1.Validators.required),
            postalcode: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
            address2: new forms_1.FormControl(''),
            phonenumber: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")]),
            adminName: new forms_1.FormControl(''),
            adminPhoneno: new forms_1.FormControl('', [forms_1.Validators.pattern("[8-9]\\d{7}")]),
            // adminPassword: new FormControl(''),
            adminEmail: new forms_1.FormControl('', [forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")]),
            Website: new forms_1.FormControl(''),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$")])
        });
    };
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
        }
        else {
            this.address1 = '';
        }
    };
    AddNewBranchComponent.prototype.getReverseGeocodingData = function (lat, lng) {
        var _this = this;
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === 'OK') {
                var address = results[0].formatted_address;
                _this.address1 = address.split(",")[0];
                console.log(_this.address1, 'from event');
                // return this.address1;
            }
        });
    };
    // geocodeAddress(addressInput) {
    //   const address = addressInput;
    //   console.log(address);
    //   var geocoder = new google.maps.Geocoder();
    //        geocoder.geocode({'address': address}, (results, status) => {
    //         if (status === 'OK') {
    //           this.position = {
    //             "lat": results[0].geometry.location.lat(),
    //             "lng": results[0].geometry.location.lng()
    //           }
    //           // console.log(this.position);
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
    //       // console.log(res);
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
    AddNewBranchComponent.prototype.submitAddbranch = function () {
        var _this = this;
        var _a, _b;
        if ((_a = this.branchDetails) === null || _a === void 0 ? void 0 : _a.postalCode) {
            this.geocodeAddress();
        }
        var formValue = (_b = this.myform) === null || _b === void 0 ? void 0 : _b.value;
        if (formValue === null || formValue === void 0 ? void 0 : formValue.adminEmail) {
            if (formValue === null || formValue === void 0 ? void 0 : formValue.adminEmail) {
                // this.myform.get('adminPassword').clearValidators();
                // this.myform.get('adminPassword').updateValueAndValidity();
            }
            else {
                // this.myform.get('adminPassword').setValidators([Validators.required, Validators.minLength(6)]);
                this.myform.get('adminName').setValidators([forms_1.Validators.required]);
                this.myform.get('adminPhoneno').setValidators([forms_1.Validators.required, , forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")]);
                // this.myform.get('adminPassword').updateValueAndValidity();
                this.myform.get('adminName').updateValueAndValidity();
                this.myform.get('adminPhoneno').updateValueAndValidity();
            }
        }
        var requestObject = {};
        requestObject["branchName"] = formValue === null || formValue === void 0 ? void 0 : formValue.branchName;
        requestObject["adminName"] = formValue === null || formValue === void 0 ? void 0 : formValue.adminName;
        if ((formValue === null || formValue === void 0 ? void 0 : formValue.adminEmail) != this.EditadminnEmail) {
            requestObject["adminEmail"] = formValue === null || formValue === void 0 ? void 0 : formValue.adminEmail;
        }
        if (this.branchstatus == 'offline') {
            requestObject["postalCode"] = formValue.postalcode;
            requestObject["address1"] = this.address1;
            requestObject["lat"] = this.position.lat;
            requestObject["long"] = this.position.lng;
            requestObject["address2"] = formValue.address2;
            requestObject["branchstatus"] = 'offline';
        }
        else {
            this.myform.get('postalcode').clearValidators();
            this.myform.get('postalcode').updateValueAndValidity();
            requestObject["branchstatus"] = 'online';
            requestObject["lat"] = this.position.lat;
            requestObject["long"] = this.position.lng;
        }
        requestObject["adminPhoneno"] = formValue === null || formValue === void 0 ? void 0 : formValue.adminPhoneno;
        requestObject["mobileNo"] = formValue === null || formValue === void 0 ? void 0 : formValue.phonenumber;
        requestObject["email"] = formValue === null || formValue === void 0 ? void 0 : formValue.email;
        requestObject["webAddress"] = formValue === null || formValue === void 0 ? void 0 : formValue.Website;
        requestObject["country"] = "Singapore";
        if (this.id) {
            requestObject["branchId"] = this.id;
            var headers = new http_1.HttpHeaders({
                Authorization: localStorage.getItem("admintoken")
            });
            if (this.myform.valid) {
                requestObject["userId"] = this.userId;
                this.http.post(this.API_URL + "admineditbranch", requestObject, { headers: headers }).subscribe(function (res) {
                    if (res.status == true) {
                        if (formValue.adminEmail == _this.EditadminnEmail) {
                            _this.api.alert("Branch Details Updated Successfully", "success");
                            _this.router.navigate(["admin/branches/" + _this.userId + "/" + _this.token]);
                        }
                        else if (_this.EditadminnEmail) {
                            _this.storage.logout();
                            _this.router.navigate(['/login/business']);
                        }
                        else {
                            _this.api.alert("Branch Details Updated Successfully", "success");
                            _this.router.navigate(["admin/branches/" + _this.userId + "/" + _this.token]);
                        }
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.myform.markAllAsTouched();
            }
        }
        else {
            if (this.myform.valid) {
                requestObject["userId"] = this.userId;
                var headers = new http_1.HttpHeaders({
                    Authorization: localStorage.getItem("admintoken")
                });
                this.http.post(this.API_URL + "adminaddbranch", requestObject, { headers: headers }).subscribe(function (res) {
                    if (res.status == true) {
                        _this.api.alert("You have successfully registered as Branch Admin", "success");
                        _this.router.navigate(["admin/branches/" + _this.userId + "/" + _this.token]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.myform.markAllAsTouched();
            }
        }
    };
    AddNewBranchComponent = __decorate([
        core_1.Component({
            selector: 'app-add-new-branch',
            templateUrl: './add-new-branch.component.html',
            styleUrls: ['./add-new-branch.component.scss']
        })
    ], AddNewBranchComponent);
    return AddNewBranchComponent;
}());
exports.AddNewBranchComponent = AddNewBranchComponent;
