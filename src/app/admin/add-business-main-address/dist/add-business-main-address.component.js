"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddBusinessMainAddressComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var AddBusinessMainAddressComponent = /** @class */ (function () {
    function AddBusinessMainAddressComponent(storage, event, api, http, router, route) {
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.http = http;
        this.router = router;
        this.route = route;
        this.sDisabled = false;
        this.showDetails = false;
        this.subadminPermission = true;
        this.position = { lat: 0, lng: 0 };
        this.issubmit = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.adminType = localStorage.getItem('__admintype');
        if (this.adminType == "superAdmin") {
            this.diabledFeilds = false;
        }
        else {
            this.diabledFeilds = true;
        }
    }
    AddBusinessMainAddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.route.params.subscribe(function (params) {
            _this.userId = params === null || params === void 0 ? void 0 : params.userId;
            _this.token = params === null || params === void 0 ? void 0 : params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            _this.newtoken = localStorage.getItem("admintoken");
        });
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.postalcode = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.postalCode;
        this.address1 = ((_b = this.fulldata) === null || _b === void 0 ? void 0 : _b.address1) ? (_c = this.fulldata) === null || _c === void 0 ? void 0 : _c.address1 : '';
        this.address2 = (_d = this.fulldata) === null || _d === void 0 ? void 0 : _d.address2;
        if (this.fulldata.businessmobileNo.toString().length > 8) {
            this.mobileNo = this.fulldata.businessmobileNo.toString().slice(2);
        }
        else {
            this.mobileNo = ((_e = this.fulldata) === null || _e === void 0 ? void 0 : _e.businessmobileNo.toString()) === '65' ? '' : (_f = this.fulldata) === null || _f === void 0 ? void 0 : _f.businessmobileNo.toString();
        }
        this.formInit();
        this.getInfoText();
    };
    AddBusinessMainAddressComponent.prototype.getInfoText = function () {
        var _this = this;
        this.api.getInfoSection().subscribe(function (res) {
            var _a;
            _this.infoTextData = (_a = res === null || res === void 0 ? void 0 : res.sectionData[2]) === null || _a === void 0 ? void 0 : _a.description;
        });
    };
    AddBusinessMainAddressComponent.prototype.geocodeAddress = function () {
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
    AddBusinessMainAddressComponent.prototype.getReverseGeocodingData = function (lat, lng) {
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
    //   // console.log(address);
    //   var geocoder = new google.maps.Geocoder;
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
    //   const formValue = this.locationform?.value;
    //   if (formValue.postalcode?.toString().length == 6) {
    //     if (!formValue?.postalcode) {
    //       this.address1 = '';
    //     }
    //     let requestData = {};
    //     requestData["postalCode"] = formValue?.postalcode;
    //     const headers = new HttpHeaders({
    //       Authorization: localStorage.getItem("admintoken"),
    //     });
    //     this.http.post(`${this.API_URL}admingetAddressPostcode`, requestData, { headers: headers, }).subscribe((res: any) => {
    //       this.fulladdress = res.addressfrompostcode?.address;
    //       this.fulladdress.forEach((element) => {
    //         this.address1 = element?.ADDRESS;
    //       });
    //       this.geocodeAddress(this.address1);
    //       if (!this.address1) {
    //         this.postalcode = ''
    //       }
    //     });
    //   }
    // }
    AddBusinessMainAddressComponent.prototype.formInit = function () {
        this.locationform = new forms_1.FormGroup({
            postalcode: new forms_1.FormControl(this.postalcode, [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
            address2: new forms_1.FormControl(this.address2),
            phonenumber: new forms_1.FormControl(this.mobileNo, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$"))
        });
    };
    AddBusinessMainAddressComponent.prototype.submitbusinessLocaion = function () {
        var _this = this;
        var _a;
        if ((_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.postalCode) {
            this.geocodeAddress();
        }
        if (this.address1) {
            var formValue = this.locationform.value;
            this.mobile = parseInt("+65" + formValue.phonenumber);
            var requestObject = {};
            requestObject["postalCode"] = formValue === null || formValue === void 0 ? void 0 : formValue.postalcode;
            requestObject["address1"] = this.address1;
            requestObject["lat"] = this.position.lat;
            requestObject["long"] = this.position.lng;
            requestObject["address2"] = formValue === null || formValue === void 0 ? void 0 : formValue.address2;
            requestObject["mobileNo"] = this.mobile;
            requestObject["admin_id"] = this.userId;
            requestObject["country"] = "Singapore";
            if (this.locationform.valid) {
                var headers = new http_1.HttpHeaders({
                    Authorization: localStorage.getItem("admintoken")
                });
                this.http.post(this.API_URL + "adminaddmainbranch", requestObject, { headers: headers }).subscribe(function (res) {
                    if (res.status == true) {
                        localStorage.setItem("userData", JSON.stringify(res.businessData));
                        _this.router.navigate(["admin/business-profile/" + _this.userId + "/" + _this.token]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.locationform.markAllAsTouched();
            }
        }
    };
    AddBusinessMainAddressComponent = __decorate([
        core_1.Component({
            selector: 'app-add-business-main-address',
            templateUrl: './add-business-main-address.component.html',
            styleUrls: ['./add-business-main-address.component.scss']
        })
    ], AddBusinessMainAddressComponent);
    return AddBusinessMainAddressComponent;
}());
exports.AddBusinessMainAddressComponent = AddBusinessMainAddressComponent;
