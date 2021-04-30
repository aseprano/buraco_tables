import { RootEntity } from '@darkbyte/herr';
import { PlayerID } from '../value_objects/PlayerID';
import { GamePolicySpecification } from '../value_objects/GamePolicySpecification';

export interface Table extends RootEntity {

    /**
     * Occupies a table to prepare a game
     * 
     * @param player
     * @param numberOfChairs
     * @param gamePolicy 
     */
    occupy(player: PlayerID, numberOfChairs: number, gamePolicy: GamePolicySpecification): void;

    /**
     * Sits a player to a chair
     * 
     * @param player 
     * @param toChair 
     */
    sit(player: PlayerID, toChair: number): void;

    /**
     * Gets a player up of a chair
     * 
     * @param player 
     * @param fromChair 
     */
    getUp(player: PlayerID, fromChair: number): void;

    /**
     * Closes a table, effectively making it invisible and no more available.
     * If the table is currently used, it is flagged as 'to-be-closed'. The table is closed before becoming idle again.
     */
    close(): boolean;

    /**
     * Reopens a closed table, making it visible and usable, or deletes the 'to-be-closed' flag.
     */
    reOpen(): void;

    /**
     * Resets the table to the IDLE state and kicks off all the users and destroys the chairs
     */
    reset(): void;

    /**
     * Sets a player as ready.
     * If a player is already marked as ready, no exception is triggered.
     *
     * @param player
     */
    setReady(player: PlayerID): void;

}