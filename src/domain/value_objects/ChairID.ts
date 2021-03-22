import { InvalidTableIDException } from '../exceptions/InvalidTableIDException';
import { TableID } from './TableID';

export class ChairID {

    constructor(
        private readonly chairNumber: number,
        private readonly tableId: TableID,
    ) {
        if (!Number.isInteger(chairNumber) || chairNumber < 0 || chairNumber > 3) {
            throw new InvalidTableIDException();
        }
    }

    public getTableID(): TableID {
        return this.tableId;
    }

    public asNumber(): number {
        return this.chairNumber;
    }

    public isEqualTo(other: ChairID): boolean {
        return this === other || this.tableId.isEqualTo(other.tableId) && this.chairNumber === other.chairNumber;
    }

}
