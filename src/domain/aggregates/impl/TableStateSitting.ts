import { TableState } from '../TableState';
import { PlayerID } from '../../value_objects/PlayerID';
import { TableNotAvailableException } from '../../exceptions/TableNotAvailableException';
import { TableAlreadyOpenedException } from '../../exceptions/TableAlreadyOpenedException';
import { Chair } from '../../entities/Chair';
import { ChairNotAvailableException } from '../../exceptions/ChairNotAvailableException';

export class TableStateSitting implements TableState {

    constructor(
        private readonly chairs: Array<Chair>
    ) { }

    private getChair(chairNumber: number): Chair {
        const chair = this.chairs.find((chair) => chair.getId() == chairNumber);

        if (chair) {
            return chair;
        }

        throw new ChairNotAvailableException();
    }

    public occupy(): void {
        throw new TableNotAvailableException();
    }

    public sit(player: PlayerID, toChair: number): void {
        this.getChair(toChair)
            .sit(player);
    }

    public getUp(player: PlayerID, fromChair: number): void {
        this.getChair(fromChair)
            .getUp(player);
    }

    public canBeClosed(): boolean {
        return false;
    }

    public reOpen(): void {
        throw new TableAlreadyOpenedException();
    }

    public reset() {
        throw new TableNotAvailableException();
    }

}
