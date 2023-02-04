"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessReviewsComponent = void 0;
var core_1 = require("@angular/core");
var BusinessReviewsComponent = /** @class */ (function () {
    function BusinessReviewsComponent(api, event, router) {
        this.api = api;
        this.event = event;
        this.router = router;
        this.allreviews = [];
        this.showAddreview = true;
        this.replyBox = false;
        this.showreplyReview = false;
        this.stars = [1, 2, 3, 4, 5];
    }
    BusinessReviewsComponent.prototype.ngOnInit = function () {
        this.data = localStorage.getItem("classData");
        this.fulldata = JSON.parse(this.data);
        this.classId = this.fulldata._id;
        this.getAllreview();
    };
    BusinessReviewsComponent.prototype.getAllreview = function () {
        var _this = this;
        this.api.get('getreview?classId=' + this.classId).subscribe(function (res) {
            _this.allreviews = res.data;
            //console.log(_this.allreviews);
        });
    };
    BusinessReviewsComponent.prototype.SendReply = function (id) {
        var _this = this;
        this.ReviewId = id;
        this.showreplyReview = true;
        this.replyBox = false;
        var requestdata = {};
        requestdata['reviewId'] = this.ReviewId;
        requestdata['replyreview'] = { review: this.replyvalue };
        this.api.post('replyreview', requestdata).subscribe(function (res) {
            //console.log(res);
            if (res && res.status == true) {
                _this.replyvalue = '';
                _this.getAllreview();
            }
        });
    };
    BusinessReviewsComponent = __decorate([
        core_1.Component({
            selector: 'app-business-reviews',
            templateUrl: './business-reviews.component.html',
            styleUrls: ['./business-reviews.component.scss']
        })
    ], BusinessReviewsComponent);
    return BusinessReviewsComponent;
}());
exports.BusinessReviewsComponent = BusinessReviewsComponent;
