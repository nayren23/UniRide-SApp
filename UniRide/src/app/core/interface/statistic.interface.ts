import { Observable } from "rxjs";

export interface StatisticInterface {

    getStatisticByUserId(userId: number): Observable<any>
    getNumberOfUsers(): Observable<any>
    getTripsNumber(): Observable<any>
}