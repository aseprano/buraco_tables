import { DomainEvent } from './DomainEvent';
import { PlayerID } from '../value_objects/PlayerID';
import { ChairID } from '../value_objects/ChairID';

const EventName = 'com.herrdoktor.buraco.events.PlayerLeftChair';

export class PlayerLeftChair extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        player: PlayerID,
        chair: ChairID,
    ) {
        super();

        this.setPayload({
            id: chair.getTableID().asNumber(),
            player: player.asString(),
            chair: chair.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }
}
