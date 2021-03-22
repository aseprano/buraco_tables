import { AbstractEntity, Event, Optional } from '@darkbyte/herr';
import { Chair } from '../Chair';
import { PlayerID } from '../../value_objects/PlayerID';
import { ChairID } from '../../value_objects/ChairID';
import { ChairNotAvailableException } from '../../exceptions/ChairNotAvailableException';
import { PlayerDidSitToChair } from '../../events/PlayerDidSitToChair';
import { TableID } from '../../value_objects/TableID';

export class ChairImpl extends AbstractEntity implements Chair {
    private currentPlayer?: PlayerID;

    constructor(
        private readonly id: ChairID
    ) {
        super();
    }

    private eventIsAboutThisChair(event: Event): boolean {
        const chairId = event.getPayload()['chairId'];
        const tableId = new TableID(event.getPayload()['id']);
        return this.id.isEqualTo(new ChairID(chairId, tableId));
    }

    private isOccupied(): boolean {
        return this.currentPlayer !== undefined;
    }

    private isOccupiedBy(playerId: PlayerID|string): boolean {
        if (playerId instanceof PlayerID) {
            return this.isOccupiedBy(playerId.asString());
        }

        return this.currentPlayer !== undefined && this.currentPlayer.asString() === playerId;
    }

    private handlePlayerDidSitToChairEvent(event: Event): void {
        if (this.eventIsAboutThisChair(event)) {
            this.currentPlayer = new PlayerID(event.getPayload()['playerId']);
        } else if (this.isOccupiedBy(event.getPayload()['playerId'])) {
            this.currentPlayer = undefined;
        }
    }

    protected doApplyEvent(event: Event): void {
        switch (event.getName()) {
            case PlayerDidSitToChair.EventName:
                this.handlePlayerDidSitToChairEvent(event);
                break;
        }
    }

    public getCurrentPlayer(): Optional<PlayerID> {
        return this.currentPlayer;
    }

    public getId(): any {
        return this.id;
    }

    public sit(player: PlayerID): void {
        if (this.isOccupied() && !this.isOccupiedBy(player)) {
            throw new ChairNotAvailableException();
        }
    }

    public getUp(player: PlayerID): void {
        if (!this.isOccupiedBy(player)) {
            throw new ChairNotAvailableException();
        }
    }

}