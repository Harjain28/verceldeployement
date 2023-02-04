import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XsHideDirective } from './xs-hide.directive';
import {  XsShowDirective } from './xx-show.directive';



@NgModule({
  declarations: [
    XsHideDirective,
    XsShowDirective
  ],

  imports: [
    CommonModule
  ],
  
  exports: [
  XsHideDirective, 
  XsShowDirective
],

})
export class DirectivesModule { }
