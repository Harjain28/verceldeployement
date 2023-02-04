import { Routes } from '@angular/router';
import { BussinessOwnerComponent } from '../bussiness-owner/bussiness-owner.component';

export const BussinessOwnerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'bussiness_owner',
  },
  {
    path: '',
    component: BussinessOwnerComponent
  },
];
