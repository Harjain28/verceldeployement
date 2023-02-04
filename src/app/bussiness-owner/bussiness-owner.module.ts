import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { BussinessOwnerComponent } from './bussiness-owner/bussiness-owner.component'; 
import { RouterModule } from '@angular/router';
import { BussinessOwnerRoutes } from './routes/bussiness-owner-routing.module';

@NgModule({
  declarations: [BussinessOwnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BussinessOwnerRoutes),
  ],
  providers: []
})
export class BussinessOwnerModule {}
