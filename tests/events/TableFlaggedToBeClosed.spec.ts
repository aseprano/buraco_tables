import { TableFlaggedToBeClosed } from '../../src/domain/events/TableFlaggedToBeClosed';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableFlaggedToBeClosed', () => {

    it('holds proper data', () => {
        expect(TableFlaggedToBeClosed.EventName).toEqual('com.herrdoktor.buraco.events.TableFlaggedToBeClosed');

        const event = new TableFlaggedToBeClosed(new TableID(111));
        expect(event.getName()).toEqual(TableFlaggedToBeClosed.EventName);
        expect(event.getPayload()).toEqual({
            id: 111,
        });
    });

});