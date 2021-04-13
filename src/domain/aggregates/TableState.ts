import { PlayerID } from '../value_objects/PlayerID';

export interface TableState {

    occupy(): void;

    sit(player: PlayerID, toChair: number): void;

    getUp(player: PlayerID, fromChair: number): void;

    canBeClosed(): boolean;

    reOpen(): void;

    reset(): void;

    setReady(player: PlayerID): void;
}