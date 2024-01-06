import { Observable } from "rxjs";

export interface UserInterface {
    getUserInfoSummaryById(userId: number): Observable<any>
    getListUsers(): Observable<any>
    getInfosUserById(userId: number): Observable<any>
    deleteUserById(userId: number): Observable<any>
}