import { TableReopened } from '../../src/domain/events/TableReopened';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableReopened', () => {

    it('has proper data', () => {
        expect(TableReopened.EventName).toEqual('com.herrdoktor.buraco.events.TableReopened');

        const event = new TableReopened(new TableID(123));
        expect(event.getName()).toEqual(TableReopened.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
        });
    });

});
