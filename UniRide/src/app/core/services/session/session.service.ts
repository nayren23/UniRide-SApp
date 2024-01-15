import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'userSessionStarted';

  checkAndStartSession(): boolean {
    const sessionStarted = sessionStorage.getItem(this.sessionKey);
    if (!sessionStarted) {
      sessionStorage.setItem(this.sessionKey, 'true');
      return true; // New Session
    }
    return false; // Session already started
  }
}
