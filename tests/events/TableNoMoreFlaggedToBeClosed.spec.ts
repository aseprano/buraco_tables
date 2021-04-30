import { TableID } from '../../src/domain/value_objects/TableID';
import { TableNoMoreFlaggedToBeClosed } from '../../src/domain/events/TableNoMoreFlaggedToBeClosed';

describe('TableNoMoreFlaggedToBeClosed', () => {

    it('holds proper data', () => {
        expect(TableNoMoreFlaggedToBeClosed.EventName).toEqual('com.herrdoktor.buraco.events.TableNoMoreFlaggedToBeClosed');

        const event = new TableNoMoreFlaggedToBeClosed(new TableID(111));
        expect(event.getName()).toEqual(TableNoMoreFlaggedToBeClosed.EventName);
        expect(event.getPayload()).toEqual({
            id: 111,
        });
    });

});