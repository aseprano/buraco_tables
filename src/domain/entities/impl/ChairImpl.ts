import { AbstractEntity, Event, Optional } from '@darkbyte/herr';
import { Chair } from '../Chair';
import { PlayerID } from '../../value_objects/PlayerID';
import { ChairNotAvailableException } from '../../exceptions/ChairNotAvailableException';
import { PlayerSatToChair } from '../../events/PlayerSatToChair';
import { PlayerLeftChair } from '../../events/PlayerLeftChair';
import { TableOccupied } from '../../events/TableOccupied';
import { ChairNotOccupiedException } from '../../exceptions/ChairNotOccupiedException';
import { PlayerReady } from '../../events/PlayerReady';

export class ChairImpl extends AbstractEntity implements Chair {
    private currentPlayer?: PlayerID;
    private ready = false;

    constructor(
        private readonly chairNumber: number
    ) {
        super();
    }

    private eventIsAboutThisChair(event: Event): boolean {
        return this.chairNumber === event.getPayload()['chair'];
    }

    private isOccupiedBy(playerId: PlayerID|string): boolean {
        if (playerId instanceof PlayerID) {
            return this.isOccupiedBy(playerId.asString());
        }

        return this.currentPlayer !== undefined && this.currentPlayer.asString() === playerId;
    }

    private handleTableOccupiedEvent(event: Event): void {
        if (this.chairNumber === 0) {
            this.currentPlayer = new PlayerID(event.getPayload()['player']);
        }
    }

    private handlePlayerSatToChairEvent(event: Event): void {
        if (this.eventIsAboutThisChair(event)) {
            this.setOccupiedBy(new PlayerID(event.getPayload()['player']));
        } else if (this.isOccupiedBy(event.getPayload()['player'])) {
            this.currentPlayer = undefined;
        }
    }

    private handlePlayerLeftChair(event: Event): void {
        if (this.eventIsAboutThisChair(event) && this.isOccupiedBy(event.getPayload()['player'])) {
            this.currentPlayer = undefined;
        }

        this.ready = false;
    }

    private handlePlayerReady(event: Event): void {
        if (this.isOccupiedBy(event.getPayload()['player'])) {
            this.ready = true;
        }
    }

    protected doApplyEvent(event: Event): void {
        switch (event.getName()) {
            case TableOccupied.EventName:
                this.handleTableOccupiedEvent(event);
                break;

            case PlayerSatToChair.EventName:
                this.handlePlayerSatToChairEvent(event);
                break;

            case PlayerLeftChair.EventName:
                this.handlePlayerLeftChair(event);
                break;

            case PlayerReady.EventName:
                this.handlePlayerReady(event);
                break;
        }
    }

    public getCurrentPlayer(): Optional<PlayerID> {
        return this.currentPlayer;
    }

    public getId(): number {
        return this.chairNumber;
    }

    public setOccupiedBy(player: PlayerID) {
        this.currentPlayer = player;
    }

    public sit(player: PlayerID): void {
        if (this.isOccupied() && !this.isOccupiedBy(player)) {
            throw new ChairNotAvailableException();
        }
    }

    public getUp(player: PlayerID): void {
        if (!this.isOccupiedBy(player)) {
            throw new ChairNotOccupiedException();
        }
    }

    public isOccupied(): boolean {
        return this.currentPlayer !== undefined;
    }

    public isOccupiedByPlayer(player: PlayerID): boolean {
        return this.isOccupiedBy(player);
    }

    public isReady(): boolean {
        return this.ready;
    }

}