export class Student {

    full_name!: String;
    profile_picture?: String
    id?: number;

    constructor(full_name: String, profile_picture?: String, id?: number) {
        this.full_name = full_name;
        this.profile_picture = profile_picture;
        this.id = id;
    }
}
