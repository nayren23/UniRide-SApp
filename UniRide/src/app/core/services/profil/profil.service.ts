import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model'
import { Car } from '../../../core/models/car.model'
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service';
import { userDocuments } from '../../../core/models/user-documents.model'

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }



getUserInfo(): Observable<User> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  return this.http.get<User>(`${this.apiUrl}/user/infos`, { headers });
}

editUserInfo(field: keyof User, updatedValue: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  const endpoint = `${this.apiUrl}/user/change/${field.toLowerCase()}`;
  const updatedUser = { [field]: updatedValue };
  
  return this.http.post(endpoint, updatedUser, { headers });
}

addCar(car: Car): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',

  });

  return this.http.post(`${this.apiUrl}/car/add`, car, { headers });
}

updateCar(car: Car): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',

  });

  return this.http.put(`${this.apiUrl}/car/update`, car, { headers });
}

getCarInformation(): Observable<Car> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',

  });

  return this.http.get<Car>(`${this.apiUrl}/car/info`, { headers });
}
getUserDocumentsInfo(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/user/documents/infos`);
}

saveProfilePicture(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append("pfp", file, file.name);  // Utilisez le nom du fichier comme valeur de la clé
  return this.http.post<any>(`${this.apiUrl}/user/save/pfp`, formData);

}

saveDocument(file: File,typeData:string, typeRoute: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append(typeData, file, file.name);  // Utilisez le nom du fichier comme valeur de la clé
  return this.http.post<any>(`${this.apiUrl}/user/save/${typeRoute}`, formData);
}

changePassword(changePasswordFormData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${this.apiUrl}/user/change/password`, changePasswordFormData, { headers });
}

}

