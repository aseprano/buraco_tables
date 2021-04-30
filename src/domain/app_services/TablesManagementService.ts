import { Injectable } from '@darkbyte/herr';
import { TableID } from '../value_objects/TableID';
import { TableName } from '../value_objects/TableName';
import { GamePolicySpecification } from '../value_objects/GamePolicySpecification';
import { PlayerID } from '../value_objects/PlayerID';
import { ChairID } from '../value_objects/ChairID';

@Injectable()
export abstract class TablesManagementService {

    public abstract create(name: TableName): Promise<TableID>;

    public abstract delete(tableId: TableID): Promise<void>;

    public abstract occupy(player: PlayerID, numberOfChairs: number, gamePolicy: GamePolicySpecification): Promise<void>;

    public abstract sit(player: PlayerID, toChair: ChairID): Promise<void>;

    public abstract getUp(player: PlayerID, fromChair: ChairID): Promise<void>;

}