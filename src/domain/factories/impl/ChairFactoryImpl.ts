import { ChairFactory } from '../ChairFactory';
import { Chair } from '../../entities/Chair';
import { TableID } from '../../value_objects/TableID';
import { ChairImpl } from '../../entities/impl/ChairImpl';
import { ChairID } from '../../value_objects/ChairID';

export class ChairFactoryImpl extends ChairFactory {

    public createChair(
        chairNumber: number,
        atTable: TableID
    ): Chair {
        return new ChairImpl(new ChairID(chairNumber, atTable));
    }

}