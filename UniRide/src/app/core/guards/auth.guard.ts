import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from "@angular/core";

export const AuthGuard = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
}
