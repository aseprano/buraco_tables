import { TableState } from '../TableState';
import { PlayerID } from '../../value_objects/PlayerID';
import { ChairID } from '../../value_objects/ChairID';
import { TableNotAvailableException } from '../../exceptions/TableNotAvailableException';
import { TableAlreadyOpenedException } from '../../exceptions/TableAlreadyOpenedException';

export class TableStateIdle implements TableState {

    public occupy(): void { }

    public sit(player: PlayerID, toChair: ChairID): void {
        throw new TableNotAvailableException();
    }

    public getUp(player: PlayerID, fromChair: ChairID): void {
        throw new TableNotAvailableException();
    }

    public canBeClosed(): boolean {
        return true;
    }

    public reOpen(): void {
        throw new TableAlreadyOpenedException();
    }

    public reset(): void {
        throw new TableNotAvailableException();
    }

}