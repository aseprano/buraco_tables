import { PlayerReady } from '../../src/domain/events/PlayerReady';
import { TableID } from '../../src/domain/value_objects/TableID';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';

describe('PlayerReady', () => {

    it('has the proper data', () => {
        expect(PlayerReady.EventName).toEqual('com.herrdoktor.buraco.events.PlayerReady');

        const event = new PlayerReady(new TableID(123), new PlayerID('herrdoktor'));

        expect(event.getName()).toEqual(PlayerReady.EventName);
        expect(event.getPayload()).toEqual({
            table: 123,
            player: 'herrdoktor',
        });
    });

});
