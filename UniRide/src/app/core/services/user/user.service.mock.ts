import { Injectable } from '@angular/core';
import { UserInterface } from '../../interface/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserServiceMock implements UserInterface {

    private listUsers: any[] = [

        {
            lastname: 'Doe',
            firstname: 'Bob',
            user_id: 4,
            last_modified_date: '2023-10-28 18:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 3,//3:Pending
        },
        {
            lastname: 'Smith',
            firstname: 'Alice',
            user_id: 5,
            last_modified_date: '2023-11-10 14:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 0, //0: admin
        },
        {
            lastname: 'Johnson',
            firstname: 'Bob',
            user_id: 6,
            last_modified_date: '2023-12-11 15:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 1, //1: driver
        },
        {
            lastname: 'Williams',
            firstname: 'Charlie',
            user_id: 7,
            last_modified_date: '2023-10-12 16:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 2, //2: passenger
        },
        {
            lastname: 'Brown',
            firstname: 'David',
            user_id: 8,
            last_modified_date: '2023-09-13 17:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 3, //3: Pending
        },
        {
            lastname: 'Jones',
            firstname: 'Eve',
            user_id: 9,
            last_modified_date: '2023-08-14 18:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 0, //0: admin
        },
        {
            lastname: 'Miller',
            firstname: 'Frank',
            user_id: 10,
            last_modified_date: '2023-07-15 19:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 1, //1: driver
        },
        {
            lastname: 'Davis',
            firstname: 'Grace',
            user_id: 11,
            last_modified_date: '2023-06-16 20:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 2, //2: passenger
        },
        {
            lastname: 'Garcia',
            firstname: 'Harry',
            user_id: 12,
            last_modified_date: '2023-05-17 21:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 3, //3: Pending
        },
        {
            lastname: 'Rodriguez',
            firstname: 'Ivy',
            user_id: 13,
            last_modified_date: '2023-04-18 22:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 0, //0: admin
        },
        {
            lastname: 'Wilson',
            firstname: 'Jack',
            user_id: 14,
            last_modified_date: '2023-03-19 23:04:18',
            profile_picture: 'https://www.w3schools.com/howto/img_avatar.png',
            role: 1, //1: driver
        }

    ]

    private listRanking = {
        "message": "DRIVERS_RATING_CRITERIA_DISPLAYED_SUCCESSFULLY",
        "ranking": [
            {
                "user": {
                    "average": "3.00",
                    "firstname": "Gabrielle",
                    "id": 10,
                    "lastname": "Moreau",
                    "profile_picture": "",
                    "role": 1,
                    "scoreCriteria": [

                        {
                            "id": 83,
                            "name": "Conduite sûre",
                            "notes": 1
                        },
                        {
                            "id": 84,
                            "name": "Courtoisie au volant",
                            "notes": 1
                        },
                        {
                            "id": 87,
                            "name": "Amabilité ",
                            "notes": 0
                        },
                        {
                            "id": 117,
                            "name": "ambiance",
                            "notes": 5
                        }

                    ]
                }
            },
            {
                "user": {
                    "average": "1.00",
                    "firstname": "fraise",
                    "id": 47,
                    "lastname": "FRAISE",
                    "profile_picture": "",
                    "role": 1,
                    "scoreCriteria": [

                        {
                            "id": 83,
                            "name": "Conduite sûre",
                            "notes": 3
                        },
                        {
                            "id": 84,
                            "name": "Courtoisie au volant",
                            "notes": 5
                        },
                        {
                            "id": 87,
                            "name": "Amabilité ",
                            "notes": 4
                        },
                        {
                            "id": 117,
                            "name": "ambiance",
                            "notes": 4
                        }

                    ]
                }
            }
        ]
    };

    private listUsersById: any =
        {
            login: "jdoe",
            student_email: "john@doe.com",
            firstname: "John",
            lastname: "Doe",
            gender: "H", //F
            phone_number: "0123456789",
            description: "I love programming",
            role: 1, // int
            profile_picture: "https://www.w3schools.com/howto/img_avatar.png"
        }


    private listActifCriterias: any = {
        "criterian": [
            {
                "id": 83,
                "name": "Conduite sûre"
            },
            {
                "id": 84,
                "name": "Courtoisie au volant"
            },
            {
                "id": 117,
                "name": "ambiance"
            },
            {
                "id": 87,
                "name": "Amabilité "
            }
        ],
        "message": "ACTIF_CRITERIA_DISPLAYED_SUCCESSFULLY"
    };

    getActiveCriterias(): Observable<any> {
        return of(this.listActifCriterias); //return of is used to return an observable
    }

    getUserInfoSummaryById(userId: number): Observable<any> {
        return of({}); //return of is used to return an observable
    }

    /**
     * This method is used to get the list of users for the admin
     * @returns list of users
     */
    getListUsers(): Observable<any> {
        return of(this.listUsers); //return of is used to return an observable
    }

    getInfosUserById(userId: number): Observable<any> {
        return of(this.listUsersById); //return of is used to return an observable
    }

    deleteUserById(userId: number): Observable<any> {
        return of({}); //return of is used to return an observable
    }

    getDriverRanking(): Observable<any> {
        return of(this.listRanking); //return of is used to return an observable
    }

    getActifCriterias(): Observable<any> {
        return of(this.listActifCriterias); //return of is used to return an observable
    }

    constructor() { }
}