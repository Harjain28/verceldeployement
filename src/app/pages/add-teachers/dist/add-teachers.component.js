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
exports.AddTeachersComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var environment_1 = require("src/environments/environment");
var operators_1 = require("rxjs/operators");
var AddTeachersComponent = /** @class */ (function () {
    function AddTeachersComponent(http, api, event, router, route, compressImage) {
        var _this = this;
        this.http = http;
        this.api = api;
        this.event = event;
        this.router = router;
        this.route = route;
        this.compressImage = compressImage;
        this.localValue = localStorage.getItem("businessId");
        this.images = '';
        this.options = [];
        this.selectedOptions = [];
        this.selected = this.selectedOptions;
        this.showError = false;
        this.errorMessage = "";
        this.allbranchData = [];
        this.editorConfig = {
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: '10',
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
                { "class": 'arial', name: 'Arial' },
                { "class": 'times-new-roman', name: 'Times New Roman' },
                { "class": 'calibri', name: 'Calibri' },
                { "class": 'comic-sans-ms', name: 'Comic Sans MS' }
            ],
            customClasses: [
                {
                    name: 'quote',
                    "class": 'quote'
                },
                {
                    name: 'redText',
                    "class": 'redText'
                },
                {
                    name: 'titleText',
                    "class": 'titleText',
                    tag: 'h1'
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
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
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
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            var requestData = {};
            requestData["type"] = "teacher";
            requestData["id"] = _this.id;
            //console.log(requestData, this.id, "getdatabyid")
            _this.api.post("getdatabyid", requestData).subscribe(function (res) {
                var _a, _b, _c, _d;
                //console.log(res, "getdatabyid");
                _this.teacherData = res.data;
                _this.images = ((_a = _this.teacherData) === null || _a === void 0 ? void 0 : _a.image) == "undefined" ? '' : (_b = _this.teacherData) === null || _b === void 0 ? void 0 : _b.image;
                _this.description = ((_c = _this.teacherData) === null || _c === void 0 ? void 0 : _c.description) == "undefined" ? '' : (_d = _this.teacherData) === null || _d === void 0 ? void 0 : _d.description;
                _this.teacherName = _this.teacherData.teacherName;
                _this.selectedOptions = _this.teacherData.userId.map(function (item) { return item; }).slice(1);
            });
        });
    }
    AddTeachersComponent.prototype.openToggle = function () {
        this.newteacher = !this.newteacher;
    };
    AddTeachersComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.BranchadminId = this.fulldata.admin_id;
        this.branchName = this.fulldata.branchName;
        this.getBranchdetails();
        this.getbusinessDetails();
        this.formInit();
    };
    AddTeachersComponent.prototype.formInit = function () {
        this.myForm = new forms_1.FormGroup({
            teachername: new forms_1.FormControl("", [forms_1.Validators.required]),
            description: new forms_1.FormControl(this.description, [forms_1.Validators.required]),
            // description: new FormControl("", ),
            image: new forms_1.FormControl(""),
            Selected: new forms_1.FormControl([])
            // fileSource: new FormControl("", [Validators.required]),
        });
    };
    AddTeachersComponent.prototype.onToggleDropdown = function () {
        this.multiSelect.toggleDropdown();
    };
    AddTeachersComponent.prototype.getSelectedOptions = function (selected) {
        this.selected = selected;
        //console.log(this.selected, "getSelectedOptions");
    };
    AddTeachersComponent.prototype.onResetSelection = function () {
        this.selectedOptions = [];
    };
    AddTeachersComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var image = event.target.files[0];
        console.log("Image size before compressed: " + image.size + " bytes.");
        this.compressImage.compress(image)
            .pipe(operators_1.take(1))
            .subscribe(function (compressedImage) {
            console.log("Image size after compressed: " + compressedImage.size + " bytes.");
            for (var i = 0; i < event.target.files.length; i++) {
                _this.myFiles = compressedImage;
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.images = event.target.result;
                };
                reader.readAsDataURL(compressedImage);
            }
        });
    };
    AddTeachersComponent.prototype.deleteImage = function () {
        this.images = '';
        document.getElementById('deleteimg').value = '';
    };
    AddTeachersComponent.prototype.getBranchdetails = function () {
        var _this = this;
        this.api.get("getBranchlisting").subscribe(function (res) {
            _this.allbranchData = res.branchDetails;
            //console.log(this.allbranchData);
            _this.allbranchData.forEach(function (element) {
                _this.options.push({
                    value: element._id,
                    display: element.branchName
                });
            });
        });
    };
    AddTeachersComponent.prototype.getbusinessDetails = function () {
        var _this = this;
        this.api.getBusineesdetails().subscribe(function (res) {
            //console.log(res);
            _this.classdetails = res.results[1].classDetails;
            _this.classdetails.forEach(function (element) {
                _this["class"] = element.businessName;
                _this.classId = element._id;
            });
        });
    };
    AddTeachersComponent.prototype.submit = function () {
        var _this = this;
        var formvalue = this.myForm.value;
        var formData = new FormData();
        if (this.adminType == "subadmin") {
            this.myForm.get('Selected').clearValidators();
            this.myForm.get('Selected').updateValueAndValidity();
        }
        else {
            this.myForm.get('Selected').setValidators([forms_1.Validators.required]);
            this.myForm.get('Selected').updateValueAndValidity();
        }
        if (this.adminType == "admin") {
            formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
            formData.append("usertype", '');
            formData.append("type", 'admin');
            formData.append("classId", this.classId);
        }
        else if (this.adminType == 'subadmin') {
            formData.append("adminId", [this.adminId, this.BranchadminId].join(","));
            formData.append("usertype", 'subadmin');
            formData.append("createdby", this.branchName);
            formData.append("type", 'subadmin');
            formData.append("classId", this.adminId);
        }
        else {
            formData.append("adminId", this.selected ? __spreadArrays([this.adminId], formvalue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(","));
            formData.append("usertype", '');
            formData.append("type", 'admin');
            formData.append("classId", this.classId);
        }
        formData.append("description", formvalue.description);
        formData.append("teacherName", formvalue.teachername);
        formData.append("image", this.myFiles ? this.myFiles : this.images);
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn")
        });
        //console.log(this.myForm, this.id);
        if (this.id) {
            formData.append("teacherId", this.id);
            //console.log(this.myForm.valid);
            if (this.myForm.valid) {
                this.http
                    .post(this.API_URL + "editTeacher", formData, { headers: headers })
                    .subscribe(function (res) {
                    //console.log(res);
                    if (res.status == true) {
                        _this.router.navigate(["pages/teachers"]);
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
            if (this.myForm.valid) {
                this.http
                    .post(this.API_URL + "addTeacher", formData, { headers: headers })
                    .subscribe(function (res) {
                    //console.log(res);
                    if (res.status == true) {
                        _this.router.navigate(["pages/teachers"]);
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
    ], AddTeachersComponent.prototype, "multiSelect");
    AddTeachersComponent = __decorate([
        core_1.Component({
            selector: "app-add-teachers",
            templateUrl: "./add-teachers.component.html",
            styleUrls: ["./add-teachers.component.scss"]
        })
    ], AddTeachersComponent);
    return AddTeachersComponent;
}());
exports.AddTeachersComponent = AddTeachersComponent;
