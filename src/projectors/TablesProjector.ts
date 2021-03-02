import { AbstractProjector, IncomingEvent, Injectable, Queryable } from '@darkbyte/herr';
import { TableInitialized } from '../domain/events/TableInitialized';

@Injectable()
export class TablesProjector extends AbstractProjector {

    constructor(
        connection: Queryable
    ) {
        super(connection);
    }

    private async handleTableInitialized(event: IncomingEvent): Promise<void> {
        return this.getConnection()
            .query(
                'INSERT INTO `tables` (id, name) VALUES (:id, :name)',
                {
                    id: event.getPayload().id,
                    name: event.getPayload().name,
                }
            ).then(() => {});
    }

    public getId(): string {
        return 'com.herrdoktor.buraco.games.projectors.GamesProjector';
    }

    public getEventsOfInterest(): Array<string> {
        return [
            TableInitialized.EventName,
        ];
    }

    public async handleEvent(event: IncomingEvent): Promise<void> {
        switch (event.getName()) {
            case TableInitialized.EventName:
                return this.handleTableInitialized(event);
        }
    }

    public async clear(): Promise<void> {
        return this.getConnection()
            .query('DELETE FROM `tables`')
            .then(() => {});
    }

}