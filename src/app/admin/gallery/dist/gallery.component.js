"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GalleryComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(api, event, router, http, route) {
        var _this = this;
        this.api = api;
        this.event = event;
        this.router = router;
        this.http = http;
        this.route = route;
        this.albumData = [];
        this.showDeleteModal = false;
        this.API_URL = environment_1.environment.BASE_API_ENDPOINT;
        this.route.params.subscribe(function (params) {
            _this.userId = params.userId;
            _this.token = params.token;
            localStorage.setItem("admintoken", _this.token);
            localStorage.setItem("businessadminid", _this.userId);
        });
    }
    GalleryComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("userData");
        this.fulldata = JSON.parse(this.data);
        this.adminId = this.fulldata._id;
        this.userName = this.fulldata.name;
        this.getGalleryDetails();
    };
    GalleryComponent.prototype.deleteItem = function (id) {
        this.__Id = id;
        this.showDeleteModal = true;
    };
    GalleryComponent.prototype.hideModal = function () {
        this.showDeleteModal = false;
    };
    GalleryComponent.prototype.deleteAlbumDetails = function () {
        var _this = this;
        var requestData = {};
        requestData["galleryId"] = this.__Id;
        var headers = new http_1.HttpHeaders({
            Authorization: localStorage.getItem("admintoken")
        });
        this.http.post(this.API_URL + "admindeletegallery", requestData, { headers: headers }).subscribe(function (res) {
            if (res.status == true) {
                _this.showDeleteModal = false;
                _this.albumData = _this.albumData.filter(function (item) {
                    return item.id !== _this.__Id;
                });
            }
            //console.log(res);
        });
        // this.showDeleteModal = false;
    };
    GalleryComponent.prototype.getGalleryDetails = function () {
        var _this = this;
        this.api.getAdminBusinessDetails().subscribe(function (res) {
            //console.log(res);
            // this.albumData = res.albumData;
            res.results[4].albumData.forEach(function (album) {
                _this.branchName = album.userId.map(function (item) {
                    //console.log(item);
                    return item.branchName;
                }).slice(1).join(', ');
                _this.albumData.push({
                    id: album._id,
                    albumName: album.albumName === 'undefined' ? "" : album === null || album === void 0 ? void 0 : album.albumName,
                    classId: album.classId, branchName: _this.branchName,
                    status: album.status, trending: album.trending, image: album.image[0]
                });
            });
        });
    };
    GalleryComponent.prototype.editalbumDetails = function (id) {
        this.router.navigate(["/admin/add-gallery/" + id + "/" + this.userId + "/" + this.token]);
    };
    GalleryComponent.prototype.handleadminroute = function (name) {
        this.router.navigate(["/admin/" + name + "/" + this.userId + "/" + this.token]);
    };
    GalleryComponent = __decorate([
        core_1.Component({
            selector: 'app-gallery',
            templateUrl: './gallery.component.html',
            styleUrls: ['./gallery.component.scss']
        })
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
