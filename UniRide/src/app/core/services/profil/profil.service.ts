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

saveLicense(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('license', file, file.name);
  return this.http.post<any>(`${this.apiUrl}/documents/save/license`, formData);
}

saveIdCard(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('id_card', file, file.name);
  return this.http.post<any>(`${this.apiUrl}/documents/save/id-card`, formData);
}

saveSchoolCertificate(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('school_certificate', file, file.name);
  return this.http.post<any>(`${this.apiUrl}/documents/save/school-certificate`, formData);
}

saveInsurance(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('insurance', file, file.name);
  return this.http.post<any>(`${this.apiUrl}/documents/save/insurance`, formData);
}

saveDocument(file: File, type: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append(type, file, file.name);  // Utilisez le nom du fichier comme valeur de la clé
  console.log(formData);
  return this.http.post<any>(`${this.apiUrl}/user/save/${type}`, formData);
}


}

