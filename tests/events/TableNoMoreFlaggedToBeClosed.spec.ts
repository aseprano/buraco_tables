import { TableNoMoreFlaggedToBeClosed } from '../../src/domain/events/TableNoMoreFlaggedToBeClosed';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableNoMoreFlaggedToBeclosed', () => {
    it('has proper data', () => {
        expect(TableNoMoreFlaggedToBeClosed.EventName)
            .toEqual('com.herrdoktor.buraco.events.TableNoMoreFlaggedToBeClosed');

        const event = new TableNoMoreFlaggedToBeClosed(new TableID(111));
        expect(event.getName()).toEqual(TableNoMoreFlaggedToBeClosed.EventName);
        expect(event.getPayload())
            .toEqual({
                id: 111,
            });
    });
});
