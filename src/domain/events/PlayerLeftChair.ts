import { DomainEvent } from './DomainEvent';
import { PlayerID } from '../value_objects/PlayerID';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.PlayerLeftChair';

export class PlayerLeftChair extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        player: PlayerID,
        tableId: TableID,
        chairNumber: number,
    ) {
        super();

        this.setPayload({
            table: tableId.asNumber(),
            player: player.asString(),
            chair: chairNumber,
        });
    }

    public getName(): string {
        return EventName;
    }
}
