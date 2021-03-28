import { Entity } from '@darkbyte/herr';
import { PlayerID } from '../value_objects/PlayerID';

export interface Chair extends Entity {

    getId(): number;

    /**
     * Makes a player sit on the chair.
     *
     * @throws ChairNotAvailableException if the chair is already occupied by another user
     */
    sit(player: PlayerID): void;

    /**
     * Makes a player get up from the chair.
     *
     * @throws ChairNotOccupiedException if the chair is not occupied by the provided user
     */
    getUp(player: PlayerID): void;

    /**
     * Tells whether the chair is occupied by a user or not
     */
    isOccupied(): boolean;

}