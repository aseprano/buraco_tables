import { Chair } from '../../entities/Chair';
import { ChairNotAvailableException } from '../../exceptions/ChairNotAvailableException';
import { TableNotAvailableException } from '../../exceptions/TableNotAvailableException';
import { PlayerID } from '../../value_objects/PlayerID';
import { TableState } from '../TableState';

export class TableStateConfirm implements TableState {

    public constructor(
        private readonly chairs: Array<Chair>
    ) {}

    private getChairByNumber(chairNumber: number): Chair {
        const chair = this.chairs.find((chair) => chair.getId() === chairNumber);

        if (!chair) {
            throw new ChairNotAvailableException();
        }

        return chair;
    }

    private getChairByPlayer(player: PlayerID): Chair {
        const chair = this.chairs.find((chair) => chair.isOccupiedByPlayer(player));

        if (!chair) {
            throw new ChairNotAvailableException();
        }

        return chair;
    }

    public occupy(): void {
        throw new TableNotAvailableException();
    }

    public sit(player: PlayerID, toChair: number): void {
        throw new ChairNotAvailableException();
    }

    public getUp(player: PlayerID, fromChair: number): void {
        this.getChairByNumber(fromChair).getUp(player);
    }

    public canBeClosed(): boolean {
        return false;
    }

    public reOpen(): void {
        
    }

    public reset(): void {
        throw new TableNotAvailableException();
    }

    public setReady(player: PlayerID): void {
        this.getChairByPlayer(player); // just to throw if that chair does not exist
    }

}