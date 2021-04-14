import { TableReset } from '../../src/domain/events/TableReset';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableReset', () => {

    it('has the proper data', () => {
        expect(TableReset.EventName).toEqual('com.herrdoktor.buraco.events.TableReset');

        const event = new TableReset(new TableID(111));

        expect(event.getName()).toEqual(TableReset.EventName);;
        expect(event.getPayload()).toEqual({
            id: 111,
        });
    });

});
