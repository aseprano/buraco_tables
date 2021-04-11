import { PlayerLeftChair } from '../../src/domain/events/PlayerLeftChair';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { TableID } from '../../src/domain/value_objects/TableID';

describe("PlayerLeftChair", () => {

    it("has proper data", () => {
        expect(PlayerLeftChair.EventName).toBe("com.herrdoktor.buraco.events.PlayerLeftChair");

        const event = new PlayerLeftChair(
            new PlayerID('johndoe'),
            new TableID(1),
            2,
        );

        expect(event.getName()).toEqual(PlayerLeftChair.EventName);

        expect(event.getPayload()).toEqual({
            table: 1,
            player: 'johndoe',
            chair: 2,
        });
    });

});
