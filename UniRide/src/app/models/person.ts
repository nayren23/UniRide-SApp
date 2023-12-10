export class Person {
    full_name!: String;
    profile_picture!: String;
    last_modified_date!: Date;
    id_user!: number;

    constructor(full_name: String, profile_picture: String, last_modified_date: Date, id_user: number) {
        this.full_name = full_name;
        this.profile_picture = profile_picture;
        this.last_modified_date = last_modified_date;
        this.id_user = id_user;
    }
}