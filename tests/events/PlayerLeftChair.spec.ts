import { PlayerLeftChair } from '../../src/domain/events/PlayerLeftChair';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { ChairID } from '../../src/domain/value_objects/ChairID';
import { TableID } from '../../src/domain/value_objects/TableID';

describe("PlayerLeftChair", () => {

    it("has proper data", () => {
        expect(PlayerLeftChair.EventName).toBe("com.herrdoktor.buraco.events.PlayerLeftChair");

        const event = new PlayerLeftChair(
            new PlayerID('johndoe'),
            new ChairID(2, new TableID(1)),
        );

        expect(event.getName()).toEqual(PlayerLeftChair.EventName);

        expect(event.getPayload()).toEqual({
            id: 1,
            playerId: 'johndoe',
            chairId: 2,
        });
    });

});
