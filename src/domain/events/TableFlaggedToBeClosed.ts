import { DomainEvent } from './DomainEvent';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableFlaggedToBeClosed';

export class TableFlaggedToBeClosed extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        id: TableID
    ) {
        super();

        this.setPayload({
            id: id.asNumber(),
        });
    }

    public getName(): string {
        return EventName;
    }

}
