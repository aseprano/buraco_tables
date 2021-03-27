import { PlayerID } from '../value_objects/PlayerID';
import { ChairID } from '../value_objects/ChairID';

export interface TableState {

    occupy(): void;

    sit(player: PlayerID, toChair: ChairID): void;

    getUp(player: PlayerID, fromChair: ChairID): void;

    canBeClosed(): boolean;

    reOpen(): void;

    reset(): void;

}