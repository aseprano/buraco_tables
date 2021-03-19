import { DomainEvent } from './DomainEvent';

const EventName = 'com.herrdoktor.buraco.events.TableClosed';

export class TableClosed extends DomainEvent {
    static readonly EventName = EventName;

    constructor(id: number) {
        super();

        this.setPayload({
            id
        });
    }

    public getName(): string {
        return EventName;
    }

}
