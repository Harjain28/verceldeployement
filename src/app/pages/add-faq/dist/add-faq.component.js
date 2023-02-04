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
exports.AddFaqComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mat_select_autocomplete_1 = require("mat-select-autocomplete");
var AddFaqComponent = /** @class */ (function () {
    function AddFaqComponent(http, api, event, router, route) {
        var _this = this;
        this.http = http;
        this.api = api;
        this.event = event;
        this.router = router;
        this.route = route;
        this.options = [];
        this.selectedOptions = [];
        this.showError = false;
        this.errorMessage = "";
        this.selected = this.selectedOptions;
        this.editorQuestionConfig = {
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: '0',
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
        this.editorAnswerConfig = {
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
                requestData["type"] = "faq";
                requestData["id"] = _this.id;
                _this.api.post("getdatabyid", requestData).subscribe(function (res) {
                    var _a, _b;
                    //console.log(res, "getdatabyid")
                    _this.editFaqData = res.data;
                    _this.editorQuestionData = _this.editFaqData.question;
                    _this.editorAnswersData = ((_a = _this.editFaqData) === null || _a === void 0 ? void 0 : _a.answer) == "undefined" ? '' : (_b = _this.editFaqData) === null || _b === void 0 ? void 0 : _b.answer;
                    _this.selectedOptions = _this.editFaqData.userId.map(function (item) { return item; }).slice(1);
                });
            }
        });
    }
    AddFaqComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userdata");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.BranchadminId = this.fulldata.admin_id;
        //console.log(this.fulldata, this.adminId)
        this.getBranchdetails();
        this.formInit();
    };
    AddFaqComponent.prototype.onToggleDropdown = function () {
        this.multiSelect.toggleDropdown();
    };
    AddFaqComponent.prototype.getSelectedOptions = function (selected) {
        this.selected = selected;
        //console.log(this.selected, "getSelectedOptions");
    };
    AddFaqComponent.prototype.onResetSelection = function () {
        this.selectedOptions = [];
    };
    AddFaqComponent.prototype.formInit = function () {
        this.myForm = new forms_1.FormGroup({
            quetions: new forms_1.FormControl(this.editorQuestionData, forms_1.Validators.required),
            answers: new forms_1.FormControl(this.editorAnswersData, forms_1.Validators.required),
            Selected: new forms_1.FormControl([])
        });
    };
    AddFaqComponent.prototype.getBranchdetails = function () {
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
    AddFaqComponent.prototype.submitFaqs = function () {
        var _this = this;
        if (this.adminType == "subadmin") {
            this.myForm.get('Selected').clearValidators();
            this.myForm.get('Selected').updateValueAndValidity();
        }
        else {
            this.myForm.get('Selected').setValidators([forms_1.Validators.required]);
            this.myForm.get('Selected').updateValueAndValidity();
        }
        var formValue = this.myForm.value;
        var requestData = {};
        requestData["question"] = formValue.quetions;
        requestData["answer"] = formValue.answers;
        if (this.adminType == "admin") {
            requestData["userId"] = this.selected ? __spreadArrays([this.adminId], formValue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(",");
            requestData["usertype"] = '';
            requestData["type"] = "admin";
        }
        else if (this.adminType == 'subadmin') {
            requestData["userId"] = [this.adminId, this.BranchadminId].join(",");
            requestData["usertype"] = 'subadmin';
            requestData["type"] = "subadmin";
        }
        else {
            requestData["userId"] = this.selected ? __spreadArrays([this.adminId], formValue.Selected).join(",") : __spreadArrays([this.adminId], this.selected).join(",");
            requestData["usertype"] = '';
            requestData["type"] = "admin";
        }
        if (this.id) {
            requestData["FAQId"] = this.id;
            if (this.myForm.valid) {
                this.api.post("editFAQ", requestData).subscribe(function (res) {
                    if (res.status == true) {
                        _this.router.navigate(["/pages/faqs"]);
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
                this.api.post("addFAQ", requestData).subscribe(function (res) {
                    if (res.status == true) {
                        _this.api.alert("FAQ's Added Successfully", "success");
                        setTimeout(function () {
                            _this.router.navigate(['/pages/faqs']);
                        }, 200);
                    }
                    else {
                        _this.api.alert(res.message, 'error');
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
    ], AddFaqComponent.prototype, "multiSelect");
    AddFaqComponent = __decorate([
        core_1.Component({
            selector: 'app-add-faq',
            templateUrl: './add-faq.component.html',
            styleUrls: ['./add-faq.component.scss']
        })
    ], AddFaqComponent);
    return AddFaqComponent;
}());
exports.AddFaqComponent = AddFaqComponent;
