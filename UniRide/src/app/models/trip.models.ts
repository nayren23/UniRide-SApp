import { Address } from "./address.models";

export class Trip {
    id!: number;
    driverId!: number;
    price!: number;
    departure!: Address;
    arrival!: Address;
    proposedDate!: Date;
    numberOfPassenger?: number;
    distance?: number;
}