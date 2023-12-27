import { Observable } from "rxjs";

export interface UserInterface {
    getUserInfoSummaryById(userId: number): Observable<any>
    getInfosUser(): Observable<any>
}