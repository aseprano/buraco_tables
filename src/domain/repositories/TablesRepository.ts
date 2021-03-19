import { AbstractRepository, Injectable } from '@darkbyte/herr';
import { Table } from '../aggregates/Table';
import { TableID } from '../value_objects/TableID';

@Injectable()
export abstract class TablesRepository extends AbstractRepository {

    /**
     * Returns the Table associated to the specified id
     *
     * @param id The id of the table to restore
     * @throws TableNotFoundException if no table can be found with the specified id
     */
    public abstract getById(id: TableID): Promise<Table>;

    public abstract save(table: Table): Promise<void>;

    public abstract delete(tableId: TableID): Promise<void>;

}