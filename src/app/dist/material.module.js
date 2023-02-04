"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialModule = void 0;
// ModuleWithProviders
var core_1 = require("@angular/core");
// MAT_DATE_LOCALE, MAT_LABEL_GLOBAL_OPTIONS
var core_2 = require("@angular/material/core");
// import { MatIconRegistry } from '@angular/material/icon';
var autocomplete_1 = require("@angular/material/autocomplete");
var badge_1 = require("@angular/material/badge");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var card_1 = require("@angular/material/card");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var stepper_1 = require("@angular/material/stepper");
var datepicker_1 = require("@angular/material/datepicker");
var dialog_1 = require("@angular/material/dialog");
var expansion_1 = require("@angular/material/expansion");
var form_field_1 = require("@angular/material/form-field");
var grid_list_1 = require("@angular/material/grid-list");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var paginator_1 = require("@angular/material/paginator");
var progress_bar_1 = require("@angular/material/progress-bar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var radio_1 = require("@angular/material/radio");
var core_3 = require("@angular/material/core");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var snack_bar_1 = require("@angular/material/snack-bar");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var tabs_1 = require("@angular/material/tabs");
var toolbar_1 = require("@angular/material/toolbar");
var tooltip_1 = require("@angular/material/tooltip");
var tree_1 = require("@angular/material/tree");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var divider_1 = require("@angular/material/divider");
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var observers_1 = require("@angular/cdk/observers");
var overlay_1 = require("@angular/cdk/overlay");
var platform_1 = require("@angular/cdk/platform");
var portal_1 = require("@angular/cdk/portal");
var stepper_2 = require("@angular/cdk/stepper");
var table_2 = require("@angular/cdk/table");
var tree_2 = require("@angular/cdk/tree");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var MaterialModule = /** @class */ (function () {
    function MaterialModule(matIconRegistry) {
        this.matIconRegistry = matIconRegistry;
        // matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                // CDK
                a11y_1.A11yModule,
                bidi_1.BidiModule,
                observers_1.ObserversModule,
                overlay_1.OverlayModule,
                platform_1.PlatformModule,
                portal_1.PortalModule,
                stepper_2.CdkStepperModule,
                table_2.CdkTableModule,
                tree_2.CdkTreeModule,
                drag_drop_1.DragDropModule,
                // Material
                autocomplete_1.MatAutocompleteModule,
                badge_1.MatBadgeModule,
                bottom_sheet_1.MatBottomSheetModule,
                button_1.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                card_1.MatCardModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                datepicker_1.MatDatepickerModule,
                dialog_1.MatDialogModule,
                divider_1.MatDividerModule,
                expansion_1.MatExpansionModule,
                form_field_1.MatFormFieldModule,
                grid_list_1.MatGridListModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                paginator_1.MatPaginatorModule,
                progress_bar_1.MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                core_3.MatRippleModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                snack_bar_1.MatSnackBarModule,
                sort_1.MatSortModule,
                stepper_1.MatStepperModule,
                table_1.MatTableModule,
                tabs_1.MatTabsModule,
                toolbar_1.MatToolbarModule,
                tooltip_1.MatTooltipModule,
                tree_1.MatTreeModule,
            ]
        })
        // export class MaterialModule { }
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
