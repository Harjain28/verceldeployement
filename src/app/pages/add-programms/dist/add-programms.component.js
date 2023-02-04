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
exports.AddProgrammsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var AddProgrammsComponent = /** @class */ (function () {
    function AddProgrammsComponent(storage, event, api, router, fb, route) {
        var _this = this;
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.tags = [];
        this.options = [];
        this.selectedOptions = [];
        this.selected = this.selectedOptions;
        this.showError = false;
        this.errorMessage = "";
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
            if (_this.id) {
                var requestData = {};
                requestData["type"] = "program";
                requestData["id"] = _this.id;
                _this.api.post("getdatabyid", requestData).subscribe(function (res) {
                    var _a, _b;
                    _this.editProgramData = res.data;
                    _this.programmName = _this.editProgramData.programsName;
                    _this.editorData = ((_a = _this.editProgramData) === null || _a === void 0 ? void 0 : _a.description) == "undefined" ? '' : (_b = _this.editProgramData) === null || _b === void 0 ? void 0 : _b.description;
                    _this.selectedOptions = _this.editProgramData.userId.map(function (item) { return item; }).slice(1);
                });
            }
        });
    }
    AddProgrammsComponent.prototype.openToggle = function () {
        this.newteacher = !this.newteacher;
    };
    AddProgrammsComponent.prototype.onToggleDropdown = function () {
        this.multiSelect.toggleDropdown();
    };
    AddProgrammsComponent.prototype.getSelectedOptions = function (selected) {
        this.selected = selected;
    };
    AddProgrammsComponent.prototype.onResetSelection = function () {
        this.selectedOptions = [];
    };
    AddProgrammsComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.BranchadminId = this.fulldata.admin_id;
        this.branchName = this.fulldata.branchName;
        //console.log(this.fulldata, this.adminId)
        this.formInit();
        this.getBranchdetails();
        this.getbusinessDetails();
    };
    AddProgrammsComponent.prototype.formInit = function () {
        this.addProgram = new forms_1.FormGroup({
            name: new forms_1.FormControl("", forms_1.Validators.required),
            htmlContent: new forms_1.FormControl(this.editorData, forms_1.Validators.required),
            Selected: new forms_1.FormControl([])
        });
    };
    AddProgrammsComponent.prototype.getBranchdetails = function () {
        var _this = this;
        this.api.get("getBranchlisting").subscribe(function (res) {
            _this.allbranchData = res.branchDetails;
            _this.allbranchData.forEach(function (element) {
                _this.options.push({
                    value: element._id,
                    display: element.branchName
                });
            });
        });
    };
    AddProgrammsComponent.prototype.getbusinessDetails = function () {
        var _this = this;
        this.api.getBusineesdetails().subscribe(function (res) {
            _this.classdetails = res.results[1].classDetails;
            _this.classdetails.forEach(function (element) {
                _this["class"] = element.businessName;
                _this.classId = element._id;
            });
        });
    };
    AddProgrammsComponent.prototype.submitaddProgramData = function () {
        var _this = this;
        if (this.adminType == "subadmin") {
            this.addProgram.get('Selected').clearValidators();
            this.addProgram.get('Selected').updateValueAndValidity();
        }
        else {
            this.addProgram.get('Selected').setValidators([forms_1.Validators.required]);
            this.addProgram.get('Selected').updateValueAndValidity();
        }
        var formValue = this.addProgram.value;
        var requestData = {};
        requestData["classId"] = this.classId;
        requestData["description"] = formValue.htmlContent;
        requestData["programsName"] = formValue.name;
        if (this.adminType == "admin") {
            requestData["adminId"] = this.selected ? __spreadArrays([this.adminId], formValue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(",");
            requestData["usertype"] = '';
            requestData["type"] = "admin";
        }
        else if (this.adminType == 'subadmin') {
            requestData["adminId"] = [this.adminId, this.BranchadminId].join(",");
            requestData["usertype"] = 'subadmin';
            requestData['createdby'] = this.branchName;
            requestData["type"] = "subadmin";
        }
        else {
            requestData["adminId"] = this.selected ? __spreadArrays([this.adminId], formValue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(",");
            requestData["usertype"] = '';
            requestData["type"] = "admin";
        }
        if (this.id) {
            requestData["programId"] = this.id;
            if (this.addProgram.valid) {
                this.api.post("editProgram", requestData).subscribe(function (res) {
                    if (res.status == true) {
                        _this.router.navigate(["/pages/programms"]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.addProgram.markAllAsTouched();
            }
        }
        else {
            if (this.addProgram.valid) {
                this.api.post("addprograms", requestData).subscribe(function (res) {
                    if (res.status == true) {
                        _this.router.navigate(["/pages/programms"]);
                    }
                    else {
                        _this.api.alert(res.message, "error");
                    }
                });
            }
            else {
                this.addProgram.markAllAsTouched();
            }
        }
    };
    __decorate([
        core_1.ViewChild(mat_select_autocomplete_1.SelectAutocompleteComponent)
    ], AddProgrammsComponent.prototype, "multiSelect");
    AddProgrammsComponent = __decorate([
        core_1.Component({
            selector: "app-add-programms",
            templateUrl: "./add-programms.component.html",
            styleUrls: ["./add-programms.component.scss"]
        })
    ], AddProgrammsComponent);
    return AddProgrammsComponent;
}());
exports.AddProgrammsComponent = AddProgrammsComponent;
