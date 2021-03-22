import { PlayerSitToChairEvent } from '../../src/domain/events/PlayerSitToChairEvent';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { ChairID } from '../../src/domain/value_objects/ChairID';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('PlayerSitToChairEvent', () => {

    it('has the proper data', () => {
        expect(PlayerSitToChairEvent.EventName).toEqual('com.herrdoktor.buraco.events.PlayerSitToChair');

        const event = new PlayerSitToChairEvent(
            new PlayerID('darkbyte'),
            new ChairID(2, new TableID(123)),
        );

        expect(event.getName()).toEqual(PlayerSitToChairEvent.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
            chairId: 2,
            player: 'darkbyte',
        });
    });

});