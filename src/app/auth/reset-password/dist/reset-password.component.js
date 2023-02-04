"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(storage, event, api, router) {
        this.storage = storage;
        this.event = event;
        this.api = api;
        this.router = router;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.formInit();
    };
    ResetPasswordComponent.prototype.formInit = function () {
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$')])
        });
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        var formValue = this.form.value;
        var requestData = {};
        requestData['email'] = formValue.email;
        if (this.form.valid) {
            this.api.post('forgotpassword', requestData).subscribe(function (res) {
                //console.log(res);
                if (res.status == true) {
                    _this.api.alert(res.message, 'success');
                    _this.router.navigate(['/login/student']);
                }
                else {
                    _this.api.alert(res.message, 'error');
                }
            });
        }
        else {
            this.form.markAllAsTouched();
        }
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
