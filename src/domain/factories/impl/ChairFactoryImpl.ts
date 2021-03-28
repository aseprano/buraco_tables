import { ChairFactory } from '../ChairFactory';
import { Chair } from '../../entities/Chair';
import { ChairImpl } from '../../entities/impl/ChairImpl';

export class ChairFactoryImpl extends ChairFactory {

    public createChair(
        chairNumber: number
    ): Chair {
        return new ChairImpl(chairNumber);
    }

}