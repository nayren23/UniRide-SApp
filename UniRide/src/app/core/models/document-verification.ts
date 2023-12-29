export class DocumentVerification {

    user_full_name!: string
    url!: string
    status!: string
    type!: string
    description!: string

    constructor(user_full_name: string, url: string, status: string, type: string) {
        this.user_full_name = user_full_name
        this.url = url
        this.status = status
        this.type = type
    }
}