// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: any;

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token); // Stockez également le token dans le stockage local (localStorage)
  }

  getToken(): string {
    return this.authToken || localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
}
