import { PlayerID } from '../value_objects/PlayerID';
import { TableID } from '../value_objects/TableID';
import { DomainEvent } from './DomainEvent';

const EventName = 'com.herrdoktor.buraco.events.PlayerSatToChair';

export class PlayerSatToChair extends DomainEvent{
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