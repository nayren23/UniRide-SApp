export class DocumentVerification {

    url!: string
    status!: string
    type!: string
    description!: string

    constructor(url: string, status: string, type: string) {
        this.url = url
        this.status = status
        this.type = type
    }
}