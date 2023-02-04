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
exports.CategoriesComponent = void 0;
var core_1 = require("@angular/core");
var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(api, router) {
        this.api = api;
        this.router = router;
        this.categoryGroupData = [];
        this.newselectProductAttributes = new Map();
        this.clearIcon = false;
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.getallSubcategory();
    };
    CategoriesComponent.prototype.scrollLeft1 = function () {
        this.widgetsContent1.nativeElement.scrollTo({
            left: this.widgetsContent1.nativeElement.scrollLeft - 250,
            behavior: "smooth"
        });
    };
    CategoriesComponent.prototype.scrollRight1 = function () {
        this.widgetsContent1.nativeElement.scrollTo({
            left: this.widgetsContent1.nativeElement.scrollLeft + 250,
            behavior: "smooth"
        });
    };
    CategoriesComponent.prototype.clearData = function () {
        this.searchvalue = '';
        this.onKeySearchAttributes(this.searchvalue);
        this.clearIcon = false;
    };
    CategoriesComponent.prototype.getallSubcategory = function () {
        var _this = this;
        this.api.get("getsubcategorycategorywise").subscribe(function (item) {
            _this.allsubcategory = item.categoryData;
            // console.log(this.allsubcategory , "subategogry");
            _this.allsubcategory.forEach(function (cate) {
                _this.newselectProductAttributes.set(cate._id, __spreadArrays(cate.subcategoryData));
            });
            // console.log(this.categoryGroupData);
        });
    };
    CategoriesComponent.prototype.getClassCategory = function (id) {
        var newId = atob(id);
        this.router.navigate(["/view/class-list/" + newId]);
    };
    CategoriesComponent.prototype.onKeySearchAttributes = function (value) {
        this.searchvalue = value;
        this.searchsubattributes(value);
        this.clearIcon = true;
        // this.newselectProductAttributes = this.searchsubattributes(value , id);
    };
    CategoriesComponent.prototype.searchsubattributes = function (value) {
        var filter = value.toLowerCase();
        for (var i = 0; i < this.allsubcategory.length; i++) {
            this.allsubcategory[i].subcategoryData = this.newselectProductAttributes.get(this.allsubcategory[i]._id);
            if ((value && value.trim() !== '')) {
                this.allsubcategory[i].subcategoryData = this.allsubcategory[i].subcategoryData.filter(function (item) {
                    return item.subCategory.toLowerCase().startsWith(filter);
                });
            }
        }
    };
    __decorate([
        core_1.ViewChild("widgetsContent1", { read: core_1.ElementRef })
    ], CategoriesComponent.prototype, "widgetsContent1");
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: "app-categories",
            templateUrl: "./categories.component.html",
            styleUrls: ["./categories.component.scss"]
        })
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
