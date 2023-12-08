import { Person } from "./person";

export class DocumentVerification {
    request_number!: number;
    documents_to_verify!: number;
    person!: Person;
}