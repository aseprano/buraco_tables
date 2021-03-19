import { Injectable } from '@darkbyte/herr';
import { Table } from '../aggregates/Table';
import { TableName } from '../value_objects/TableName';

@Injectable()
export abstract class TableFactory {

    public abstract createEmpty(): Table;

    public abstract createTable(name: TableName): Promise<Table>;

}