import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
      `${this.backUrl}/admin/label`,
      { headers: headers }
    )
  }

  deleteLabel(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(
      `${this.backUrl}/admin/label/${id}`,
      { headers: headers }
    )
  }

  updateLabel(label: Label) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.backUrl}/admin/label`,
      { name: label.name, description: label.description, id_criteria: label.id_criteria, role: label.role },
      { headers: headers }
    )
  }

  insertLabel(label: Label) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `${this.backUrl}/admin/label`,
      { name: label.name, description: label.description, role: label.role },
      { headers: headers }
    )
  }

  getLabelsToRate(trip_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // return of([{
    //   "name": "joviale",
    //   "id": 1
    // },
    // {
    //   "name": "sympathique",
    //   "id": 2
    // },
    // {
    //   "name": "bonne conduite",
    //   "id": 3
    // }])
    return this.http.get(
      `${this.backUrl}/user/label/info/${trip_id}`
    )
  }

  submitRating(trip_id: number, label_value: number, rating_criteria_id: number ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log("données")
    console.log(trip_id)
    console.log(label_value)
    console.log(rating_criteria_id)
    return this.http.post(
      `${this.backUrl}/trip/rating`,
      { trip_id: trip_id, value: label_value, rating_criteria_id: rating_criteria_id },
      { headers: headers }
    )

  }
}
