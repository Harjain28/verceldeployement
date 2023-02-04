"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AddGalleryComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var AddGalleryComponent = /** @class */ (function () {
    function AddGalleryComponent(http, api, event, router, route, compressImage) {
        var _this = this;
        this.http = http;
        this.api = api;
        this.event = event;
        this.router = router;
        this.route = route;
        this.compressImage = compressImage;
        this.myFiles = [];
        this.myForm = new forms_1.FormGroup({
            albumname: new forms_1.FormControl(""),
            file: new forms_1.FormControl(""),
            Selected: new forms_1.FormControl([], forms_1.Validators.required)
        });
        this.images = [];
        this.options = [];
        this.selectedOptions = [];
        this.selected = this.selectedOptions;
        this.showError = false;
        this.errorMessage = "";
        this.allbranchData = [];
        this.imagesDefault = [];
        this.imagesMutating = [];
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.userId = params === null || params === void 0 ? void 0 : params.userId;
            _this.token = params === null || params === void 0 ? void 0 : params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            if (_this.id) {
                var requestData = {};
                requestData["type"] = "";
                requestData["id"] = _this.id;
                var headers = new http_1.HttpHeaders({
                    Authorization: localStorage.getItem("admintoken")
                });
                _this.http.post(_this.API_URL + "admingetdatabyid", requestData, { headers: headers }).subscribe(function (res) {
                    var _a, _b, _c, _d;
                    _this.albumData = res === null || res === void 0 ? void 0 : res.data;
                    _this.albumName = ((_a = _this.albumData) === null || _a === void 0 ? void 0 : _a.albumName) == 'undefined' ? "" : (_b = _this.albumData) === null || _b === void 0 ? void 0 : _b.albumName;
                    _this.imagesDefault = (_c = _this.albumData) === null || _c === void 0 ? void 0 : _c.image.slice();
                    _this.selectedOptions = (_d = _this.albumData) === null || _d === void 0 ? void 0 : _d.userId.map(function (item) { return item; }).slice(1);
                });
            }
        });
    }
    AddGalleryComponent.prototype.ngOnInit = function () {
        var _a;
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.adminId = (_a = this.fulldata) === null || _a === void 0 ? void 0 : _a._id;
        this.getBranchdetails();
        this.getbusinessDetails();
    };
    AddGalleryComponent.prototype.onToggleDropdown = function () {
        this.multiSelect.toggleDropdown();
    };
    AddGalleryComponent.prototype.getSelectedOptions = function (selected) {
        this.selected = selected;
    };
    AddGalleryComponent.prototype.onResetSelection = function () {
        this.selectedOptions = [];
    };
    AddGalleryComponent.prototype.deleteImage = function (i) {
        this.index = i;
        document.getElementById("upLoader" + i).value = '';
        this.images.splice(i, 1);
        this.myFiles.splice(i, 1);
    };
    AddGalleryComponent.prototype.deleteEditImage = function (i) {
        this.index = i;
        document.getElementById("upLoader" + i).value = '';
        this.imagesDefault.splice(i, 1);
    };
    AddGalleryComponent.prototype.onFileChange = function (event) {
        var _this = this;
        for (var i = 0; i < event.target.files.length; i++) {
            var image = event.target.files[i];
            this.compressImage.compress(image)
                .pipe(operators_1.take(1))
                .subscribe(function (compressedImage) {
                // now you can do upload the compressed image 
                _this.myFiles.push(compressedImage);
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.images.push(event.target.result);
                };
                reader.readAsDataURL(compressedImage);
            });
        }
    };
    AddGalleryComponent.prototype.getBranchdetails = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.get(this.API_URL + "admingetBranchlisting?userId=" + this.userId, { headers: headers }).subscribe(function (res) {
            _this.allbranchData = res.branchDetails;
            _this.allbranchData.forEach(function (element) {
                _this.options.push({
                    value: element === null || element === void 0 ? void 0 : element._id,
                    display: element === null || element === void 0 ? void 0 : element.branchName
                });
            });
        });
    };
    AddGalleryComponent.prototype.getbusinessDetails = function () {
        var _this = this;
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            var _a;
            _this.classdetails = (_a = res === null || res === void 0 ? void 0 : res.results[1]) === null || _a === void 0 ? void 0 : _a.classDetails;
            _this.classdetails.forEach(function (element) {
                _this["class"] = element === null || element === void 0 ? void 0 : element.businessName;
                _this.classId = element === null || element === void 0 ? void 0 : element._id;
            });
        });
    };
    AddGalleryComponent.prototype.submit = function () {
        var _this = this;
        var formvalue = this.myForm.value;
        var formData = new FormData();
        if (this.imagesDefault.length > 0) {
            this.myForm.get('file').clearValidators();
            this.myForm.get('file').updateValueAndValidity();
        }
        else if (this.myFiles.length > 0) {
            this.myForm.get('file').clearValidators();
            this.myForm.get('file').updateValueAndValidity();
        }
        else {
            this.myForm.get('file').setValidators([forms_1.Validators.required]);
            this.myForm.get('file').updateValueAndValidity();
        }
        formData.append("classId", this.classId);
        formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
        formData.append("albumName", formvalue === null || formvalue === void 0 ? void 0 : formvalue.albumname);
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        if (this.id) {
            for (var i = 0; i < this.imagesDefault.length; i++) {
                formData.append("image", this.imagesDefault[i]);
            }
            for (var i = 0; i < this.myFiles.length; i++) {
                formData.append("images", this.myFiles[i]);
            }
            formData.append("albumId", this.id);
            if (this.myForm.valid) {
                this.http
                    .post(this.API_URL + "admineditgallery", formData, { headers: headers })
                    .subscribe(function (res) {
                    if (res.status == true) {
                        _this.router.navigate(["admin/gallery/" + _this.userId + "/" + _this.token]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.myForm.markAllAsTouched();
            }
        }
        else {
            for (var i = 0; i < this.myFiles.length; i++) {
                formData.append("image", this.myFiles[i]);
            }
            if (this.myForm.valid) {
                this.http
                    .post(this.API_URL + "adminaddgallery", formData, { headers: headers })
                    .subscribe(function (res) {
                    if (res.status == true) {
                        _this.router.navigate(["admin/gallery/" + _this.userId + "/" + _this.token]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.myForm.markAllAsTouched();
            }
        }
    };
    __decorate([
        core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)
    ], AddGalleryComponent.prototype, "multiSelect");
    AddGalleryComponent = __decorate([
        core_1.Component({
            selector: "app-add-gallery",
            templateUrl: "./add-gallery.component.html",
            styleUrls: ["./add-gallery.component.scss"]
        })
    ], AddGalleryComponent);
    return AddGalleryComponent;
}());
exports.AddGalleryComponent = AddGalleryComponent;