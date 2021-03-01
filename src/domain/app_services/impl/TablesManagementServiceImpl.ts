import { Injectable } from '@darkbyte/herr';
import { TableFactory } from '../../factories/TableFactory';
import { TablesRepository } from '../../repositories/TablesRepository';
import { TableID } from '../../value_objects/TableID';
import { TableName } from '../../value_objects/TableName';
import { TablesManagementService } from '../TablesManagementService';

@Injectable()
export class TablesManagementServiceImpl extends TablesManagementService {

    constructor(
        private readonly factory: TableFactory,
        private readonly tablesRepository: TablesRepository
    ) {
        super();
    }

    public async create(name: TableName): Promise<TableID> {
        return this.factory
            .createTable(name)
            .then((table) => {
                return this.tablesRepository.save(table)
                    .then(() => table.getId());
            })
    }

    public async delete(tableId: TableID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}