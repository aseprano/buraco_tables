import { DomainEvent } from './DomainEvent';
import { PlayerID } from '../value_objects/PlayerID';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.PlayerReady';

export class PlayerReady extends DomainEvent {
    public static readonly EventName = EventName;

    public constructor(
        table: TableID,
        player: PlayerID,
    ) {
        super();

        this.setPayload({
            table: table.asNumber(),
            player: player.asString(),
        });
    }

    public getName(): string {
        return EventName;
    }
}