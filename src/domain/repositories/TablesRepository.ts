import { AbstractRepository, Injectable } from '@darkbyte/herr';
import { Table } from '../aggregates/Table';
import { TableID } from '../value_objects/TableID';

@Injectable()
export abstract class TablesRepository extends AbstractRepository {

    public abstract save(table: Table): Promise<void>;

    public abstract delete(tableId: TableID): Promise<void>;

}