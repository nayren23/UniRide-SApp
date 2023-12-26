import { Student } from "./student.model";

export class DocumentVerificationDisplay {
    request_number!: number;
    documents_to_verify!: number;
    student!: Student;

    constructor(request_number: number, documents_to_verify: number, student: Student) {
        this.request_number = request_number;
        this.documents_to_verify = documents_to_verify;
        this.student = student;
    }
}