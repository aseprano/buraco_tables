import { AbstractRootEntity, Event, SnapshotState } from '@darkbyte/herr';
import { TableInitialized } from '../../events/TableInitialized';
import { TableID } from '../../value_objects/TableID';
import { TableName } from '../../value_objects/TableName';
import { Table } from '../Table';
import { TableClosed } from '../../events/TableClosed';

export class TableImpl extends AbstractRootEntity implements Table {
    private id?: TableID;

    constructor() {
        super();
    }

    protected buildSnapshot(): SnapshotState {
        return {
            entityId: this.id,
        };
    }

    protected applySnapshot(snapshot: SnapshotState): void {
        
    }

    protected propagateEvent(event: Event): void {
        
    }

    private handleTableInitializedEvent(event: Event) {
        this.id = new TableID(event.getPayload()['id'] as number);
    }

    private handleTableClosedEvent(event: Event) {
        this.markDeleted();
    }

    protected doApplyEvent(event: Event): void {
        switch (event.getName()) {
            case TableInitialized.EventName:
                this.handleTableInitializedEvent(event);
                break;

            case TableClosed.EventName:
                this.handleTableClosedEvent(event);
                break;
        }
    }

    public initialize(id: number, name: TableName) {
        this.appendUncommittedEvent(new TableInitialized(id, name.asString()));
    }

    public getId(): TableID {
        return this.id!;
    }

    public close() {
        this.appendUncommittedEvent(
            new TableClosed(this.id!.asNumber())
        );
    }

} 