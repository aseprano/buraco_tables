import { TableState } from '../TableState';
import { PlayerID } from '../../value_objects/PlayerID';
import { TableNotAvailableException } from '../../exceptions/TableNotAvailableException';

export class TableStatePlaying implements TableState {

    public occupy(): void {
        throw new TableNotAvailableException();
    }

    public sit(player: PlayerID, toChair: number): void {
        throw new TableNotAvailableException();
    }

    public getUp(player: PlayerID, fromChair: number): void {
        throw new TableNotAvailableException();
    }

    public canBeClosed(): boolean {
        return false;
    }

    public reOpen(): void { }

    public reset(): void { }

    public setReady(player: PlayerID): void {
        throw new TableNotAvailableException();
    }

}