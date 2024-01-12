import { Label } from './label.model';
import { User } from './user.model';

export class Ranking {
    user!: User;
    average!: number;
    criteria!: Label[];
}