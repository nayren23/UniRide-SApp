import { DocumentVerification } from './document-verification';

export class CheckData {
    user_id!: number;
    document!: DocumentVerification;

    constructor(user_id: number, document: DocumentVerification) {
        this.user_id = user_id;
        this.document = document;
    }
}

