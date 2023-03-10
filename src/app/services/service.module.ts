import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './event.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EventService,
    ApiService,
    StorageService,
    MaterialModule
  ]
})
export class ServicesModule { }
