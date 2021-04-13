import { TableReadyForPlaying } from '../../src/domain/events/TableReadyForPlaying';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('TableReadyForPlaying', () => {

    it('has the proper data', () => {
        expect(TableReadyForPlaying.EventName).toEqual('com.herrdoktor.buraco.events.TableReadyForPlaying');

        const event = new TableReadyForPlaying(new TableID(123));
        expect(event.getName()).toEqual(TableReadyForPlaying.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
        });
    });

});
