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

  /**
 * Function to convert the status of the document
 * @param status 
 * @returns 
 */
  convertStatus(status: string) {
    switch (status) {
      case "1":
        return 'Validé';

      case "0":
        return 'En attente';

      case "-1":
        return 'Refusé';

      default:
        return 'Erreur';
    }
  }

  /**
* Return the severity of the document
* @param document 
* @returns 
*/
  getSeverity(status: string) {
    switch (status) {
      case "1":
        return 'success';

      case "0":
        return 'warning';

      case "-1":
        return 'danger';

      default:
        return 'danger';
    }
  };

  /**
 * Function to convert the type of the document
 * @param type 
 * @returns 
 */
  convertType(type: string) {
    switch (type) {
      case 'license':
        return 'Permis de conduire';

      case 'card':
        return 'Carte d\'identité';

      case 'school_certificate':
        return 'Certificat de scolarité';

      case 'insurance':
        return 'Attestation d\'assurance';

      default:
        return 'Document inconnu';
    }
  }
}