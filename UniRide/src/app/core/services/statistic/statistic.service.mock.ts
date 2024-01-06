import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatisticInterface } from 'src/app/core/interface/statistic.interface';

@Injectable({
    providedIn: 'root'
})


export class StatisticServiceMock implements StatisticInterface {
    constructor() { }

    getStatisticByUserId(userId: number): Observable<any> {
        return of({
            "statistics": [
                {
                    "driver_trip": {
                        "completed_count": "0",
                        "pending_count": "0",
                        "canceled_count": "0",
                        "oncourse_count": "0"
                    }
                },
                {
                    "passenger_trip": {
                        "completed_count": "0",
                        "pending_count": "0"
                    }
                },
                {
                    "average_rating": "3.5",
                },
            ],
        });
    }

    getNumberOfUsers(): Observable<any> {
        return of({}); //return of is used to return an observable
    }

    getTripsNumber(): Observable<any> {
        return of({}); //return of is used to return an observable
    }

}