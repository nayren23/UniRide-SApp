// init.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  constructor(private authService: AuthService, private sessionService: SessionService) {}

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.sessionService.checkAndStartSession()) {
        this.authService.setLoggedIn(this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
          this.authService.getUserIDAndRole().subscribe({
            next: (data: any) => {
              sessionStorage.setItem('user_id', data.id);
              sessionStorage.setItem('user_r', data.role);
              resolve(null);
            },
            error: (err) => {
              console.error(err);
              reject(err);
            }
          });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }
}