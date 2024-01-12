import { Observable } from "rxjs";

export interface UserInterface {
    getUserInfoSummaryById(userId: number): Observable<any>
    getListUsers(): Observable<any>
    getInfosUserById(userId: number): Observable<any>
    deleteUserById(userId: number): Observable<any>

    /**
     * This method is used to get the ranking of the users
     */
    getDriverRanking(): Observable<any>;

    getActifCriterias(): Observable<any>;
}