import { IDGenerator, Injectable } from '@darkbyte/herr';
import { TableImpl } from '../../aggregates/impl/TableImpl';
import { Table } from '../../aggregates/Table';
import { TableName } from '../../value_objects/TableName';
import { TableFactory } from '../TableFactory';
import { ChairFactory } from '../ChairFactory';
import { TableID } from '../../value_objects/TableID';

@Injectable()
export class TableFactoryImpl extends TableFactory {
    
    constructor(
        private readonly idGenerator: IDGenerator,
        private readonly chairFactory: ChairFactory,
    ) {
        super();
    }

    private buildTable(): TableImpl {
        return new TableImpl(this.chairFactory);
    }

    public createEmpty(): Table {
        return this.buildTable();
    }

    public async createTable(name: TableName): Promise<Table> {
        return this.idGenerator
            .generate()
            .then((newId) => {
                const table = this.buildTable();
                table.initialize(new TableID(newId), name);
                return table;
            });
    }

}