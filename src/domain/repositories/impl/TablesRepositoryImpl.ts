import { EventStore, Injectable, SnapshotsRepository } from '@darkbyte/herr';
import { Table } from '../../aggregates/Table';
import { TableID } from '../../value_objects/TableID';
import { TablesRepository } from '../TablesRepository';

@Injectable()
export class TablesRepositoryImpl extends TablesRepository {

    constructor(
        eventStore: EventStore,
        snapshotsRepo: SnapshotsRepository,
    ) {
        super(eventStore, snapshotsRepo);
    }

    protected streamNameForId(id: TableID): string {
        return `table-${id.asNumber()}`;
    }

    protected getSnapshotInterval(): number {
        return -1;
    }

    public save(table: Table): Promise<void> {
        return this.saveEntity(table);
    }

    public delete(tableId: TableID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}