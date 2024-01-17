import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environements/environement';
import { CheckData } from 'src/app/core/models/check-data.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient) { }

  /**
   * Return the document verification for the current user
   * @returns 
   */
  getDocumentVerification(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/verify/document`,
      { headers: headers }
    )
  }

  /**
   * Return the document verification for the current user
   * @returns 
   */
  getDocumentVerificationForUser(id_user: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/document-user/${id_user}`,
      { headers: headers }
    )
  }

  /**
   * Update the document verification for the current user
   * @param checkData 
   * @returns 
   */
  updateDocumentVerificationForUser(checkData: CheckData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(
      `${this.backUrl}/admin/check`,
      JSON.stringify(checkData),
      { headers: headers }
    );
  }
}