import { DomainEvent } from './DomainEvent';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableNoMoreFlaggedToBeClosed';

export class TableNoMoreFlaggedToBeClosed extends DomainEvent{
    public static readonly EventName = EventName;

    public constructor(id: TableID) {
        super();

        this.setPayload({
            id: id.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }
}