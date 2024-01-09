import { Observable } from "rxjs";
import { Label } from "../models/label.model";

export interface LabelInterface {

    getLabels(): Observable<any>
    deleteLabel(id: number): Observable<any>
    updateLabel(label: Label): Observable<any>
    insertLabel(label: Label): Observable<any>
}