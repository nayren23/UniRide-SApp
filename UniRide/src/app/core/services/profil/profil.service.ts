import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'
import { Car } from '../../../core/models/car.model'
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service';
import { UserDocuments } from '../../../core/models/user-documents.model'

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private backUrl = environment.backUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }



  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<User>(`${this.backUrl}/user/infos`, { headers });
  }

  editUserInfo(fieldRoute: string,fieldData:string, updatedValue: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const endpoint = `${this.backUrl}/user/change/${fieldRoute.toLowerCase()}`;
    const updatedUser = { [fieldData]: updatedValue };

    return this.http.post(endpoint, updatedUser, { headers });
  }

  getUserDocumentsInfo(): Observable<any> {
    return this.http.get<any>(`${this.backUrl}/user/documents/infos`);
  }

  saveProfilePicture(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("pfp", file, file.name);  // Utilisez le nom du fichier comme valeur de la clé
    return this.http.post<any>(`${this.backUrl}/user/save/pfp`, formData);

  }

  saveDocument(file: File, typeData: string, typeRoute: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(typeData, file, file.name);  // Utilisez le nom du fichier comme valeur de la clé
    return this.http.post<any>(`${this.backUrl}/user/save/${typeRoute}`, formData);
  }

  changePassword(changePasswordFormData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backUrl}/user/change/password`, changePasswordFormData, { headers });
  }

}

