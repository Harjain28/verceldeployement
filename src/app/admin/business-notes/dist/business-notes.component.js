"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessNotesComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var BusinessNotesComponent = /** @class */ (function () {
    function BusinessNotesComponent(api, http, router, fb, route) {
        var _this = this;
        this.api = api;
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.showDeleteModal = false;
        this.priorities = [
            { id: 0, value: 0 },
            { id: 1, value: 1 },
            { id: 2, value: 2 },
            { id: 3, value: 3 },
            { id: 4, value: 4 },
            { id: 5, value: 5 }
        ];
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.userId = params === null || params === void 0 ? void 0 : params.userId;
            _this.token = params === null || params === void 0 ? void 0 : params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
            // if (this.id) {
            //   let requestData = {};
            //   requestData["type"] = "program"
            //   requestData["id"] = this.id
            //   const headers = new HttpHeaders({
            //     Authorization: localStorage.getItem("admintoken"),
            //   });
            //   this.http.post("http://34.232.184.181:8900/api/admingetdatabyid", requestData, { headers: headers }).subscribe((res: any) => {
            //     this.editProgramData = res.data;
            //   });
            // }
        });
    }
    BusinessNotesComponent.prototype.ngOnInit = function () {
        this.formInit();
        this.getnotesDetails();
        this.localdata = JSON.parse(localStorage.getItem('classData'));
        this.seletedValue = this.localdata.priority >= 6 ? 5 : this.localdata.priority;
        //console.log(this.seletedValue)
    };
    BusinessNotesComponent.prototype.formInit = function () {
        this.addNotes = new forms_1.FormGroup({
            description: new forms_1.FormControl("")
        });
    };
    BusinessNotesComponent.prototype.geteditData = function () {
        var _this = this;
        if (this.id && this.notesData.length > 0) {
            this.htmlContent = this.notesData.filter(function (item) {
                return item._id !== _this.id;
            }).map(function (item) { return item.notesdescription; }).toString();
        }
    };
    BusinessNotesComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    BusinessNotesComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    BusinessNotesComponent.prototype.deleteNotesDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["notesId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "deletenotes", requestData, { headers: headers }).subscribe(function (res) {
            if (res.status == true) {
                _this.showDeleteModal = false;
                _this.notesData = _this.notesData.filter(function (item) {
                    return item._id !== _this.__Id;
                });
            }
            //console.log(res);
        });
        // this.showDeleteModal = false;
    };
    BusinessNotesComponent.prototype.getnotesDetails = function () {
        var _this = this;
        this.newtoken = localStorage.getItem("admintoken");
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                Authorization: this.newtoken
            })
        };
        this.http.get(this.API_URL + "admingetnotes?userId=" + this.userId, { headers: this.httpOptions.headers }).subscribe(function (res) {
            //console.log(res, 'getnotesDetails');
            if (_this.id) {
                _this.notesData = res.notesData;
                //console.log(this.htmlContent)
                _this.htmlContent = _this.notesData.filter(function (item) {
                    return item._id === _this.id;
                }).map(function (item) { return item.notesdescription; }).toString();
                //console.log(this.htmlContent)
            }
            else {
                _this.notesData = res.notesData;
            }
            // this.geteditData();
        });
    };
    BusinessNotesComponent.prototype.editNotesData = function (id) {
        this.router.navigate(["/admin/business-notes/" + id + "/" + this.userId + "/" + this.token]);
    };
    BusinessNotesComponent.prototype.submitaddNotes = function () {
        var _this = this;
        var formValue = this.addNotes.value;
        var requestData = {};
        requestData["notes"] = formValue.description;
        requestData["priority"] = +this.seletedValue ? +this.seletedValue : 5;
        requestData["userId"] = this.userId;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.localdata['priority'] = +this.seletedValue ? +this.seletedValue : 5;
        localStorage.setItem('classData', JSON.stringify(this.localdata));
        if (!this.id) {
            this.http.post(this.API_URL + "addnotes", requestData, { headers: headers }).subscribe(function (res) {
                //console.log(res)
                if (res.status == true) {
                    _this.htmlContent = null;
                    _this.addNotes.markAsUntouched();
                    _this.getnotesDetails();
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
        else {
            requestData["notesId"] = this.id;
            this.http.post(this.API_URL + "editnotes", requestData, { headers: headers }).subscribe(function (res) {
                if (res.status == true) {
                    _this.htmlContent = null;
                    _this.getnotesDetails();
                    _this.router.navigate(["/admin/business-notes/" + _this.userId + "/" + _this.token]);
                }
                else {
                    _this.api.alert(res.message, "error");
                }
            });
        }
    };
    BusinessNotesComponent = __decorate([
        core_1.Component({
            selector: 'app-business-notes',
            templateUrl: './business-notes.component.html',
            styleUrls: ['./business-notes.component.scss']
        })
    ], BusinessNotesComponent);
    return BusinessNotesComponent;
}());
exports.BusinessNotesComponent = BusinessNotesComponent;
