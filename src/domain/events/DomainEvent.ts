import { Event, EventPayload } from '@darkbyte/herr';

export abstract class DomainEvent implements Event {
    private payload: EventPayload = Object.freeze({});

    protected setPayload(payload: EventPayload): void {
        this.payload = Object.freeze(payload);
    }

    public getPayload(): EventPayload {
        return this.payload;
    }
    
    public abstract getName(): string;

}