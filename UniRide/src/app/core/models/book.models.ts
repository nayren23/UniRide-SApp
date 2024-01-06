import { User } from "./user.model";
import { TripSummary } from "./trip-summary.model";

export class Book {
    accepted!: number;
    date_requested!: Date;
    passenger_count!: number;
    trip!: TripSummary;
    user!: User;
}