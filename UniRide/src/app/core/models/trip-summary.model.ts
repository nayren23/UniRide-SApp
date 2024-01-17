export class TripSummary {
    id!: number;
    arrival_address!: string;
    departure_address!: string;
    departure_date!: Date;
    status?: number;
    book_status?: number;
}