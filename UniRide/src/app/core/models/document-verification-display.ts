import { User } from "./user.model";

export class DocumentVerificationDisplay {
    request_number!: number;
    documents_to_verify!: number;
    user!: User;

    constructor(request_number: number, documents_to_verify: number, user: User) {
        this.request_number = request_number;
        this.documents_to_verify = documents_to_verify;
        this.user = user;
    }
}