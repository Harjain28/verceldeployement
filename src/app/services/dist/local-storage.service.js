"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalStorageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
        this.changes$ = new rxjs_1.Subject();
        this.localStorage = window.sessionStorage;
    }
    LocalStorageService.prototype.get = function (key) {
        if (this.isLocalStorageSupported) {
            return JSON.parse(this.localStorage.getItem(key));
        }
        return null;
    };
    LocalStorageService.prototype.set = function (key, value) {
        if (this.isLocalStorageSupported) {
            this.localStorage.setItem(key, JSON.stringify(value));
            this.changes$.next({
                type: 'set',
                key: key,
                value: value
            });
            return true;
        }
        return false;
    };
    LocalStorageService.prototype.remove = function (key) {
        if (this.isLocalStorageSupported) {
            this.localStorage.removeItem(key);
            this.changes$.next({
                type: 'remove',
                key: key
            });
            return true;
        }
        return false;
    };
    Object.defineProperty(LocalStorageService.prototype, "isLocalStorageSupported", {
        get: function () {
            return !!this.localStorage;
        },
        enumerable: false,
        configurable: true
    });
    LocalStorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
