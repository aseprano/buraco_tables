import { Injectable } from '@darkbyte/herr';
import { TableFactory } from '../../factories/TableFactory';
import { TablesRepository } from '../../repositories/TablesRepository';
import { TableID } from '../../value_objects/TableID';
import { TableName } from '../../value_objects/TableName';
import { TablesManagementService } from '../TablesManagementService';
import { PlayerID } from '../../value_objects/PlayerID';
import { ChairID } from '../../value_objects/ChairID';
import { GamePolicySpecification } from '../../value_objects/GamePolicySpecification';

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
        return this.tablesRepository
            .getById(tableId)
            .then((table) => {
                table.close();
                this.tablesRepository.save(table);
            });
    }

    public getUp(player: PlayerID, fromChair: ChairID): Promise<void> {
        return Promise.resolve(undefined);
    }

    public occupy(player: PlayerID, numberOfChairs: number, gamePolicy: GamePolicySpecification): Promise<void> {
        return Promise.resolve(undefined);
    }

    public sit(player: PlayerID, toChair: ChairID): Promise<void> {
        return Promise.resolve(undefined);
    }

}