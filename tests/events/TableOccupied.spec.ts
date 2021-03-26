import { TableOccupied } from '../../src/domain/events/TableOccupied';
import { TableID } from '../../src/domain/value_objects/TableID';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { GamePolicySpecification, TYPE_ROUNDS } from '../../src/domain/value_objects/GamePolicySpecification';

describe('TableOccupied', () => {

    it('has proper data', () => {
        expect(TableOccupied.EventName).toEqual('com.herrdoktor.buraco.events.TableOccupied');

        const event = new TableOccupied(
            new TableID(123),
            new PlayerID('mik'),
            2,
            new GamePolicySpecification(TYPE_ROUNDS, 3),
        );

        expect(event.getName()).toEqual(TableOccupied.EventName);
        expect(event.getPayload()).toEqual({
            id: 123,
            player: 'mik',
            chairs: 2,
            policy: {
                type: TYPE_ROUNDS,
                limit: 3,
            },
        });
    });

});
