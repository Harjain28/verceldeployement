"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProgrammsComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var ProgrammsComponent = /** @class */ (function () {
    function ProgrammsComponent(api, event, router, http, route) {
        var _this = this;
        this.api = api;
        this.event = event;
        this.router = router;
        this.http = http;
        this.route = route;
        this.programData = [];
        this.showDeleteModal = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    ProgrammsComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.userName = this.fulldata.name;
        this.getprogrammsDetails();
    };
    ProgrammsComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    ProgrammsComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    ProgrammsComponent.prototype.deleteProgrammsDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["programId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admindeleteprogram", requestData, { headers: headers }).subscribe(function (res) {
            if (res.status == true) {
                _this.showDeleteModal = false;
                _this.programData = _this.programData.filter(function (item) {
                    return item.id !== _this.__Id;
                });
            }
            //console.log(res);
        });
        // this.showDeleteModal = false;
    };
    ProgrammsComponent.prototype.getprogrammsDetails = function () {
        var _this = this;
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            //console.log(res, 'getprogrammsDetails');
            res.results[3].programData.forEach(function (program) {
                _this.branchName = program.userId.map(function (item) {
                    //console.log(item);
                    return item.branchName;
                }).slice(1).join(', ');
                _this.programData.push({
                    id: program._id, programsName: program.programsName,
                    description: program === null || program === void 0 ? void 0 : program.description,
                    classId: program.classId, branchName: _this.branchName,
                    status: program.status, trending: program.trending,
                    ProgrambybranchName: program === null || program === void 0 ? void 0 : program.createdby
                });
            });
        });
    };
    ProgrammsComponent.prototype.editprogrammsDetails = function (id) {
        this.router.navigate(["/admin/add-programms/" + id + "/" + this.userId + "/" + this.token]);
    };
    ProgrammsComponent.prototype.handleadminroute = function (name) {
        this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
    };
    ProgrammsComponent = __decorate([
        core_1.Component({
            selector: 'app-programms',
            templateUrl: './programms.component.html',
            styleUrls: ['./programms.component.scss']
        })
    ], ProgrammsComponent);
    return ProgrammsComponent;
}());
exports.ProgrammsComponent = ProgrammsComponent;
