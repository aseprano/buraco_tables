import { TableInitialized } from '../../src/domain/events/TableInitialized';
import { TableID } from '../../src/domain/value_objects/TableID';
import { TableName } from '../../src/domain/value_objects/TableName';

describe('TableInitialized', () => {

    it('has proper data', () => {
        expect(TableInitialized.EventName).toEqual('com.herrdoktor.buraco.events.TableInitialized');

        const event = new TableInitialized(new TableID(123), 'Mario e i fratelli');
        expect(event.getName()).toEqual(TableInitialized.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
            name: 'Mario e i fratelli',
        });
    });

});
