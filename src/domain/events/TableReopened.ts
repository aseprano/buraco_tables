import { DomainEvent } from './DomainEvent';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableReopened';

export class TableReopened extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        tableId: TableID
    ) {
        super();

        this.setPayload({
            id: tableId.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }
}
