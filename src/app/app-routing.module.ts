import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.gaurd';
import { StoprediectionGuard } from './services/stoprediection.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [StoprediectionGuard]
  },

  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
  },

  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },

  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },

  {
    path: '',
    loadChildren: () => import('./group/group.module').then(m => m.GroupModule),
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
