import { Person } from "./person";

export class DocumentVerificationDisplay {
    request_number!: number;
    documents_to_verify!: number;
    person!: Person;

    constructor(request_number: number, documents_to_verify: number, person: Person) {
        this.request_number = request_number;
        this.documents_to_verify = documents_to_verify;
        this.person = person;
    }
}