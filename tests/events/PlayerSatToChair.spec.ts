import { PlayerSatToChair } from '../../src/domain/events/PlayerSatToChair';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { TableID } from '../../src/domain/value_objects/TableID';

describe('PlayerSatToChair', () => {

    it('has the proper data', () => {
        expect(PlayerSatToChair.EventName).toEqual('com.herrdoktor.buraco.events.PlayerSatToChair');

        const event = new PlayerSatToChair(
            new PlayerID('darkbyte'),
            new TableID(123),
            2,
        );

        expect(event.getName()).toEqual(PlayerSatToChair.EventName);

        expect(event.getPayload()).toEqual({
            table: 123,
            chair: 2,
            player: 'darkbyte',
        });
    });

});