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
      `${this.apiUrl}/user/verify/document`, //?page=${page}
      { headers: headers }
    )
  }

  /**
   * Return the document verification for the current user
   * @returns 
   */
  getDocumentVerificationForUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/document-verification`,
      { headers: headers }
    )
  }


  /**
   * Update the document verification for the current user
   * @param checkData 
   * @returns 
   */
  updateDocumentVerificationForUser(checkData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(
      `${this.apiUrl}/user/check`,
      JSON.stringify(checkData),
      { headers: headers }
    );
  }
}