import { Injectable } from '@darkbyte/herr';
import { TableID } from '../value_objects/TableID';
import { TableName } from '../value_objects/TableName';

@Injectable()
export abstract class TablesManagementService {

    public abstract create(name: TableName): Promise<TableID>;

    public abstract delete(tableId: TableID): Promise<void>;

}