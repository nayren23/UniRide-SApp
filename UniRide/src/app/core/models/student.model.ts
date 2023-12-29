export class Student {

    last_name!: String;
    first_name!: String;
    profile_picture?: String
    id?: number;

    constructor(last_name: String, first_name: String, profile_picture?: String, id?: number) {
        this.last_name = last_name;
        this.first_name = first_name;
        this.profile_picture = profile_picture;
        this.id = id;
    }
}
