export class ScoreCriteria {
    id: number;
    name: string;
    value: number | null;

    constructor(id: number, name: string, value: number | null) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}