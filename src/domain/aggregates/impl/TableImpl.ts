import { AbstractRootEntity, Event, SnapshotState } from '@darkbyte/herr';
import { TableInitialized } from '../../events/TableInitialized';
import { TableID } from '../../value_objects/TableID';
import { TableName } from '../../value_objects/TableName';
import { Table } from '../Table';

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
    
    protected doApplyEvent(event: Event): void {
        switch (event.getName()) {
            case TableInitialized.EventName:
                this.handleTableInitializedEvent(event);
                break;
        }
    }

    public initialize(id: number, name: TableName) {
        this.appendUncommittedEvent(new TableInitialized(id, name.asString()));
    }

    public canBeDeleted(): boolean {
        return true;
    }

    public getId(): TableID {
        return this.id!;
    }

} 