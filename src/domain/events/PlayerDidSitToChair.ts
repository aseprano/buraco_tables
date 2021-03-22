import { ChairID } from '../value_objects/ChairID';
import { PlayerID } from '../value_objects/PlayerID';
import { DomainEvent } from './DomainEvent';

const EventName = 'com.herrdoktor.buraco.events.PlayerSitToChair';

export class PlayerDidSitToChair extends DomainEvent{
    public static readonly EventName = EventName;

    constructor(
        player: PlayerID,
        chair: ChairID,
    ) {
        super();

        this.setPayload({
            id: chair.getTableID().asNumber(),
            playerId: player.asString(),
            chairId: chair.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }
}