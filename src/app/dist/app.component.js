"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import * as firebase from 'firebase';
// const config = {
//   apiKey: 'AIzaSyCNi8EN9RbiJr3AJlfxDgsuhrwjv1xgFjc',
//   databaseURL: 'https://klassbookchat-default-rtdb.asia-southeast1.firebasedatabase.app'
// };
var AppComponent = /** @class */ (function () {
    function AppComponent(router, event) {
        this.router = router;
        this.event = event;
        this.title = 'Klassbook';
        this.showHeader = true;
        // firebase.initializeApp(config);
    }
    AppComponent.prototype.SearchALldata = function (value) {
        // this.searchKey = value;
        // this.SearchALl();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.myHeader.loadHeader();
        this.currentURL = this.router.url;
        this.router.events.subscribe(function (res) {
            if (res instanceof router_1.NavigationEnd) {
                _this.currentURL = res.url;
                if (_this.currentURL.includes('/admin')) {
                    _this.showHeader = false;
                }
                // console.log(this.currentURL , 'url');
                if (_this.currentURL === '/' || _this.currentURL === '/view/category' || _this.currentURL === '/group/group' || _this.currentURL === '/view/events' || _this.currentURL === '/view/articles' || _this.currentURL === '/view/marketplace' || _this.currentURL === '/profile/profile' || _this.currentURL === '/view/inbox' || _this.currentURL === '/pages/business-details' || _this.currentURL === '/pages/business-inbox') {
                    _this.myHeader.clearSearch();
                    _this.myHeader.clearIcon = false;
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild('myHeader')
    ], AppComponent.prototype, "myHeader");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
