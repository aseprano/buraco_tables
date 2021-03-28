import { TableState } from '../TableState';
import { PlayerID } from '../../value_objects/PlayerID';
import { ChairID } from '../../value_objects/ChairID';
import { TableNotAvailableException } from '../../exceptions/TableNotAvailableException';

export class TableStateClosed implements TableState {

    public getUp(player: PlayerID, fromChair: ChairID): void {
        throw new TableNotAvailableException();
    }

    public occupy(): void {
        throw new TableNotAvailableException();
    }

    public sit(player: PlayerID, toChair: ChairID): void {
        throw new TableNotAvailableException();
    }

    public canBeClosed(): boolean {
        return false;
    }

    public reOpen() {
    }

    public reset(): void {
        throw new TableNotAvailableException();
    }

}