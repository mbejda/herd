import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';


export const AdminGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService)
  if(!authService.isAdmin) {
    router.navigate(['/dashboard']);
  }
   return true;
  }
