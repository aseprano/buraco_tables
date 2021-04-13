import { DomainEvent } from './DomainEvent';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableReadyForPlaying';

export class TableReadyForPlaying extends DomainEvent {
    public static readonly EventName = EventName;

    public constructor(
        table: TableID,
    ) {
        super();

        this.setPayload({
            id: table.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }

}