"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BranchesComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var BranchesComponent = /** @class */ (function () {
    function BranchesComponent(api, event, router, http, route) {
        var _this = this;
        this.api = api;
        this.event = event;
        this.router = router;
        this.http = http;
        this.route = route;
        this.branchDetails = [];
        this.showDeleteModal = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    BranchesComponent.prototype.ngOnInit = function () {
        this.getbranchDetails();
    };
    BranchesComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    BranchesComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    BranchesComponent.prototype.deleteBranchDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["branchId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admindeletebranch", requestData, { headers: headers }).subscribe(function (res) {
            if (res.status == true) {
                _this.showDeleteModal = false;
                _this.branchDetails = _this.branchDetails.filter(function (item) {
                    return item._id !== _this.__Id;
                });
            }
            // console.log(res);
        });
        // this.showDeleteModal = false;
    };
    BranchesComponent.prototype.getbranchDetails = function () {
        var _this = this;
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            var _a;
            _this.branchDetails = (_a = res === null || res === void 0 ? void 0 : res.results[5]) === null || _a === void 0 ? void 0 : _a.branchDetails;
            // console.log(_this.branchDetails);
        });
    };
    BranchesComponent.prototype.editBranchDetails = function (id, branchStatus) {
        this.router.navigate(["/admin/add-new-branch/" + branchStatus + "/" + id + "/" + this.userId + "/" + this.token]);
    };
    BranchesComponent.prototype.handleadminroute = function (name, branchStatus) {
        this.router.navigate(["/admin/" + name + "/" + branchStatus + "/" + this.userId + "/" + this.token]);
    };
    BranchesComponent = __decorate([
        core_1.Component({
            selector: 'app-branches',
            templateUrl: './branches.component.html',
            styleUrls: ['./branches.component.scss']
        })
    ], BranchesComponent);
    return BranchesComponent;
}());
exports.BranchesComponent = BranchesComponent;
