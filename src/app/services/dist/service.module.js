"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var event_service_1 = require("./event.service");
var api_service_1 = require("./api.service");
var storage_service_1 = require("./storage.service");
var material_module_1 = require("../material.module");
var ServicesModule = /** @class */ (function () {
    function ServicesModule() {
    }
    ServicesModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule
            ],
            providers: [
                event_service_1.EventService,
                api_service_1.ApiService,
                storage_service_1.StorageService,
                material_module_1.MaterialModule
            ]
        })
    ], ServicesModule);
    return ServicesModule;
}());
exports.ServicesModule = ServicesModule;
