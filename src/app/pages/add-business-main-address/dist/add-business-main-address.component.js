"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddBusinessMainAddressComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddBusinessMainAddressComponent = /** @class */ (function () {
    function AddBusinessMainAddressComponent(storage, event, api, router) {
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
        this.sDisabled = false;
        this.showDetails = false;
        this.subadminPermission = true;
        this.isSubmit = false;
        this.adminType = localStorage.getItem('__admintype');
        this.diabledFeilds = this.adminType == "subadmin" ? true : false;
        if (this.adminType == "admin") {
            this.diabledFeilds = false;
        }
        else if (this.adminType == "subadmin") {
            this.diabledFeilds = true;
        }
        else {
            this.diabledFeilds = false;
        }
    }
    AddBusinessMainAddressComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.postalcode = this.fulldata.postalCode;
        if (localStorage.getItem("branchStatus") == 'editbranch') {
            this.address1 = this.fulldata.address1 ? this.fulldata.address1 : '';
        }
        else {
            this.address1 = '';
        }
        this.address2 = this.fulldata.address2;
        if (this.fulldata.businessmobileNo) {
            this.mobileNo = this.fulldata.businessmobileNo;
        }
        // else {
        //   this.mobileNo = this.fulldata.businessmobileNo.toString()
        // }
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
    AddBusinessMainAddressComponent.prototype.formInit = function () {
        this.locationform = new forms_1.FormGroup({
            postalcode: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{6})$")]),
            address2: new forms_1.FormControl(this.address2),
            phonenumber: new forms_1.FormControl(this.mobileNo, [forms_1.Validators.required, forms_1.Validators.pattern("^([0-9]{0}|[0-9]{8})$")])
        });
    };
    AddBusinessMainAddressComponent.prototype.submitbusinessLocaion = function () {
        var _this = this;
        var _a;
        if ((_a = this.fulldata) === null || _a === void 0 ? void 0 : _a.postalCode) {
            this.geocodeAddress();
        }
        if (this.address1 && this.address1.trim() !== '' && this.isSubmit) {
            var formValue = this.locationform.value;
            this.mobile = parseInt("+65" + formValue.phonenumber);
            var requestObject = {};
            requestObject["postalCode"] = formValue.postalcode;
            requestObject["address1"] = this.address1;
            requestObject["lat"] = this.position.lat;
            requestObject["long"] = this.position.lng;
            requestObject["address2"] = formValue.address2;
            requestObject["mobileNo"] = this.mobile;
            requestObject["country"] = "Singapore";
            if (this.locationform.valid) {
                this.api.post("addmainbranch", requestObject).subscribe(function (res) {
                    if (res.status == true) {
                        localStorage.setItem("userdata", JSON.stringify(res.businessData));
                        _this.api.alert(res.message, "success");
                        // this.router.navigate(["pages/business-profile"]);
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
