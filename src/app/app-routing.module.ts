import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RewardComponent } from './reward/reward.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPageGuard } from './shared/guard/secure-inner-page.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guard/admin-guard.guard';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [AuthGuard] },
  {
    path: 'reward',
    component: RewardComponent,
    canActivate: [SecureInnerPageGuard]
    },
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [SecureInnerPageGuard, AdminGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [SecureInnerPageGuard]
      },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
