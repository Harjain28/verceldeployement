"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoaderInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var LoaderInterceptor = /** @class */ (function () {
    function LoaderInterceptor(event) {
        this.event = event;
        this.requests = [];
    }
    LoaderInterceptor.prototype.removeRequest = function (req) {
        var i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.event.isHttpRequest.next(this.requests.length > 0);
    };
    LoaderInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var TOKEN = localStorage.getItem('LoggedIn');
        if (TOKEN) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN
                }
            });
        }
        else {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        this.requests.push(req);
        //console.log(this.requests);
        this.event.isHttpRequest.next(true);
        // if(!this.requests[0].url.includes('verifyOTP')) {
        //   this.event.isHttpRequest.next(false);
        // }
        return new rxjs_1.Observable(function (observer) {
            var subscription = next.handle(req)
                .subscribe(function (event) {
                if (event instanceof http_1.HttpResponse) {
                    _this.removeRequest(req);
                    observer.next(event);
                }
            }, function (err) {
                _this.removeRequest(req);
                observer.error(err);
            }, function () {
                _this.removeRequest(req);
                observer.complete();
            });
            // remove request from queue when cancelled
            return function () {
                _this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    };
    LoaderInterceptor = __decorate([
        core_1.Injectable()
    ], LoaderInterceptor);
    return LoaderInterceptor;
}());
exports.LoaderInterceptor = LoaderInterceptor;
