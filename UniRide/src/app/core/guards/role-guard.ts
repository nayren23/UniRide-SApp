import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { NgModule, inject } from "@angular/core";

export function roleGuardFactory(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as number[];
  if (authService.hasRole(requiredRoles)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
}


@NgModule({
  providers: [
    AuthService
  ]
})
export class AppModule { }
