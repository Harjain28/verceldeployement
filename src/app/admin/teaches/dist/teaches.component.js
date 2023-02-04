"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeachesComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var TeachesComponent = /** @class */ (function () {
    function TeachesComponent(api, event, router, http, route) {
        var _this = this;
        this.api = api;
        this.event = event;
        this.router = router;
        this.http = http;
        this.route = route;
        this.teacherData = [];
        this.showDeleteModal = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    TeachesComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.userName = this.fulldata.name;
        this.getteachersDetails();
    };
    TeachesComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    TeachesComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    TeachesComponent.prototype.deleteTeacherDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["teacherId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admindeleteteacher", requestData, { headers: headers }).subscribe(function (res) {
            //console.log(res);
            _this.showDeleteModal = false;
            _this.teacherData = _this.teacherData.filter(function (item) {
                return item.id !== _this.__Id;
            });
        });
    };
    TeachesComponent.prototype.getteachersDetails = function () {
        var _this = this;
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            //console.log(res);
            res.results[2].teacherData.forEach(function (teacher) {
                _this.branchName = teacher.userId.map(function (item) {
                    //console.log(item);
                    return item.branchName;
                }).slice(1).join(', ');
                _this.teacherData.push({
                    id: teacher._id, teachersName: teacher.teacherName,
                    description: (teacher === null || teacher === void 0 ? void 0 : teacher.description) == "undefined" ? '' : teacher === null || teacher === void 0 ? void 0 : teacher.description,
                    classId: teacher.classId, branchName: _this.branchName,
                    status: teacher.status, trending: teacher.trending, teacherbybranchAdmin: teacher.createdby, image: teacher.image
                });
            });
        });
    };
    TeachesComponent.prototype.editTeacherDetails = function (id) {
        this.router.navigate(["/admin/add-teacher/" + id + "/" + this.userId + "/" + this.token]);
    };
    TeachesComponent.prototype.handleadminroute = function (name) {
        this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
    };
    TeachesComponent = __decorate([
        core_1.Component({
            selector: 'app-teaches',
            templateUrl: './teaches.component.html',
            styleUrls: ['./teaches.component.scss']
        })
    ], TeachesComponent);
    return TeachesComponent;
}());
exports.TeachesComponent = TeachesComponent;
