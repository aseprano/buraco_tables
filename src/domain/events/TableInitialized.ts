import { DomainEvent } from './DomainEvent';

const EventName = 'com.herrdoktor.buraco.events.TableInitialized';

export class TableInitialized extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        id: number,
        name: string,
    ) {
        super();

        console.debug(`Created event ${this.getName()} with id = ${id}, name = ${name}`);
        
        this.setPayload({
            id,
            name,
        });
    }

    public getName(): string {
        return EventName;
    }

}