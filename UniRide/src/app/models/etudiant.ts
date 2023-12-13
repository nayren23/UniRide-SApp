export class Etudiant {

    full_name!: String;
    profile_picture?: String

    constructor(full_name: String, profile_picture?: String) {
        this.full_name = full_name;
        this.profile_picture = profile_picture;
    }
}
