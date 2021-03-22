import { Entity } from '@darkbyte/herr';
import { PlayerID } from '../value_objects/PlayerID';

export interface Chair extends Entity {

    sit(player: PlayerID): void;

    unSit(player: PlayerID): void;

}