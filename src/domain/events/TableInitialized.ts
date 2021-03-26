import { DomainEvent } from './DomainEvent';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableInitialized';

export class TableInitialized extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        id: TableID,
        name: string,
    ) {
        super();

        this.setPayload({
            id: id.asNumber(),
            name,
        });
    }

    public getName(): string {
        return EventName;
    }

}