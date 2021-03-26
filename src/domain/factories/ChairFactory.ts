import { Injectable } from '@darkbyte/herr';
import { Chair } from '../entities/Chair';
import { TableID } from '../value_objects/TableID';

@Injectable()
export abstract class ChairFactory {

    public abstract createChair(chairNumber: number, atTable: TableID): Chair;

}
