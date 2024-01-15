import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environements/environement';
import { LabelInterface } from '../../interface/label.interface';
import { Label } from '../../models/label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService implements LabelInterface {

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient) { }

  getLabels(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/user/label`,
      { headers: headers }
    )
  }

  deleteLabel(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(
      `${this.backUrl}/user/label/${id}`,
      { headers: headers }
    )
  }

  updateLabel(label: Label) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.apiUrl}/user/label`,
      { name: label.name, description: label.description, id_criteria: label.id_criteria, role: label.role },
      { headers: headers }
    )
  }

  insertLabel(label: Label) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `${this.apiUrl}/user/label`,
      { name: label.name, description: label.description, role: label.role },
      { headers: headers }
    )
  }
}
