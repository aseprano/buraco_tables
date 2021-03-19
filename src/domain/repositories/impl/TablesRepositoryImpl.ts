import { EventStore, Injectable, SnapshotsRepository, StreamNotFoundException } from '@darkbyte/herr';
import { Table } from '../../aggregates/Table';
import { TableID } from '../../value_objects/TableID';
import { TablesRepository } from '../TablesRepository';
import { TableFactory } from '../../factories/TableFactory';
import { TableNotFoundException } from '../../exceptions/TableNotFoundException';

@Injectable()
export class TablesRepositoryImpl extends TablesRepository {

    constructor(
        eventStore: EventStore,
        snapshotsRepo: SnapshotsRepository,
        private readonly factory: TableFactory,
    ) {
        super(eventStore, snapshotsRepo);
    }

    protected streamNameForId(id: TableID): string {
        return `table-${id.asNumber()}`;
    }

    protected getSnapshotInterval(): number {
        return -1;
    }

    public getById(id: TableID): Promise<Table> {
        return this.getEventsForId(id)
            .then((data) => {
                const table = this.factory.createEmpty();
                table.restoreFromEventStream(data.stream);

                if (table.isDeleted()) {
                    throw new TableNotFoundException();
                }

                return table;
            }).catch((error) => {
                if (error instanceof StreamNotFoundException) {
                    throw new TableNotFoundException();
                } else {
                    throw error;
                }
            });
    }

    public save(table: Table): Promise<void> {
        return this.saveEntity(table);
    }

    public delete(tableId: TableID): Promise<void> {
        throw new Error('Method not implemented.');
    }

}