import { Entity } from '@darkbyte/herr';
import { PlayerID } from '../value_objects/PlayerID';

export interface Chair extends Entity {

    /**
     * Makes a player sit on the chair.
     *
     * @throws ChairNotAvailableException if the chair is already occupied by someone else
     */
    sit(player: PlayerID): void;

    /**
     * Makes a player get up from the chair.
     *
     * @throws ChairNotAvailableException if the chair is empty or occupied by someone else
     */
    getUp(player: PlayerID): void;

}