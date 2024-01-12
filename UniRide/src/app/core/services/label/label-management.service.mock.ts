import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LabelInterface } from '../../interface/label.interface';
import { Label } from '../../models/label.model';

@Injectable({
    providedIn: 'root'
})


export class LabelServiceMock implements LabelInterface {
    constructor() { }

    getLabels(): Observable<any> {
        return of({
            "labels": [
                {
                    "label": {
                        "id_criteria": 1,
                        "name": "ponctuel",
                        "description": "Définit si le conducteur est ponctuel ou non"
                    }
                },
                {
                    "label": {
                        "id_criteria": 2,
                        "name": "sympathique",
                        "description": "Si l'utilisateur a été sympathique ou non durant le trajet"
                    }
                },
                {
                    "label": {
                        "id_criteria": 3,
                        "name": "bon conducteur",
                        "description": ""
                    }
                },
                {
                    "label": {
                        "id_criteria": 4,
                        "name": "confortable",
                        "description": ""
                    }
                }
            ]
        });
    }

    deleteLabel(id: number): Observable<any> {
        return of({
            "message": "Le label a bien été supprimé"
        });
    }

    updateLabel(label: Label): Observable<any> {
        return of({
            "message": "Le label a bien été mis à jour"
        });
    }

    insertLabel(label: Label): Observable<any> {
        return of({
            "message": "Le label a bien été ajouté"
        });
    }
}