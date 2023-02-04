import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ClaimComponent } from './claim/claim.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login/:type',
        component: LoginComponent,
      },
     
      {
        path: 'register/:type',
        component: RegisterComponent,
      },
      {
        path: 'email-verify',
        component: VerifyEmailComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'claim',
        component: ClaimComponent,
      },

    ]
  },

  // {
  //   path: 'success',
  //   component: VerifySuccessComponent,
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
