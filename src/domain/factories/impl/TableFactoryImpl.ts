import { IDGenerator, Injectable } from '@darkbyte/herr';
import { TableImpl } from '../../aggregates/impl/TableImpl';
import { Table } from '../../aggregates/Table';
import { TableName } from '../../value_objects/TableName';
import { TableFactory } from '../TableFactory';

@Injectable()
export class TableFactoryImpl extends TableFactory {
    
    constructor(
        private readonly idGenerator: IDGenerator
    ) {
        super();
    }

    public createEmpty(): Table {
        return new TableImpl();
    }

    public async createTable(name: TableName): Promise<Table> {
        return this.idGenerator
            .generate()
            .then((newTableId) => {
                const table = new TableImpl();
                table.initialize(newTableId, name);
                return table;
            });
    }

}