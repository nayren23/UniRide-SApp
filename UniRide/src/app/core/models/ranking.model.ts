import { User } from './user.model';

/**
 * Dynamic ranking model
 */
export interface Ranking {
    user: User
    average: number
    [key: string]: number | User| null
}

