import { TableClosed } from '../../src/domain/events/TableClosed';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableClosed', () => {

    it('has proper data', () => {
        expect(TableClosed.EventName).toEqual('com.herrdoktor.buraco.events.TableClosed');

        const event = new TableClosed(
            new TableID(123)
        );

        expect(event.getName()).toEqual(TableClosed.EventName);

        expect(event.getPayload()).toEqual({
            id: 123
        });
    });

});
