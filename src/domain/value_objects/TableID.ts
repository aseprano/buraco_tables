import { InvalidTableIDException } from '../exceptions/InvalidTableIDException';

export class TableID {

    constructor(
        private readonly id: number
    ) {
        if (!Number.isInteger(id) || id < 1) {
            throw new InvalidTableIDException();
        }
    }

    public asNumber(): number {
        return this.id;
    }

}