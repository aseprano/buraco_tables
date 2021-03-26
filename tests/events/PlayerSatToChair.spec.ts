import { PlayerSatToChair } from '../../src/domain/events/PlayerSatToChair';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { ChairID } from '../../src/domain/value_objects/ChairID';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('PlayerSitToChairEvent', () => {

    it('has the proper data', () => {
        expect(PlayerSatToChair.EventName).toEqual('com.herrdoktor.buraco.events.PlayerSatToChair');

        const event = new PlayerSatToChair(
            new PlayerID('darkbyte'),
            new ChairID(2, new TableID(123)),
        );

        expect(event.getName()).toEqual(PlayerSatToChair.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
            chair: 2,
            player: 'darkbyte',
        });
    });

});