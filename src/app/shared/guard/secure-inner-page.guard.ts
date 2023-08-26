import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';


export const SecureInnerPageGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService)
  if(authService.isLoggedIn !== true) {
    router.navigate(['login'])
  }
  return true;
}
