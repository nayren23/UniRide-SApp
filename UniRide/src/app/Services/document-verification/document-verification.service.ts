import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../app/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDocumentVerification(page: number = 1): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/document-verification?page=${page}`,
      { headers: headers }
    )
  }
}
