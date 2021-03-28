import { ChairID } from '../value_objects/ChairID';
import { PlayerID } from '../value_objects/PlayerID';
import { DomainEvent } from './DomainEvent';

const EventName = 'com.herrdoktor.buraco.events.PlayerSatToChair';

export class PlayerSatToChair extends DomainEvent{
    public static readonly EventName = EventName;

    constructor(
        player: PlayerID,
        chair: ChairID,
    ) {
        super();

        this.setPayload({
            table: chair.getTableID().asNumber(),
            player: player.asString(),
            chair: chair.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }
}