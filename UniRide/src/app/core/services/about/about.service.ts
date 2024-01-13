import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getConditions() {
    return this.http.get(`${environment.backUrl}/about/conditions`);
  }
}
