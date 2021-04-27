import { ChairImpl } from '../../src/domain/entities/impl/ChairImpl';
import { TableID } from '../../src/domain/value_objects/TableID';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { PlayerSatToChair } from '../../src/domain/events/PlayerSatToChair';
import { ChairNotAvailableException } from '../../src/domain/exceptions/ChairNotAvailableException';
import { PlayerLeftChair } from '../../src/domain/events/PlayerLeftChair';
import { TableOccupied } from '../../src/domain/events/TableOccupied';
import { GamePolicySpecification, TYPE_ROUNDS } from '../../src/domain/value_objects/GamePolicySpecification';
import { ChairNotOccupiedException } from '../../src/domain/exceptions/ChairNotOccupiedException';
import { PlayerReady } from '../../src/domain/events/PlayerReady';

describe('ChairImpl', () => {

    function createChair(chairNumber = 1): ChairImpl {
        return new ChairImpl(chairNumber);
    }

    it('returns its id', () => {
        const chairId = 3;
        const chair = new ChairImpl(chairId);
        expect(chair.getId()).toEqual(chairId);
    });

    it('is created with no occupant', () => {
        const chair = createChair();
        expect(chair.getCurrentPlayer()).toBeUndefined();
        expect(chair.isOccupied()).toBeFalse();
    });

    it('marks as occupied when the relative event is applied', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('john'), new TableID(111), 1));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('john'));
        expect(chair.isOccupied()).toBeTrue();
        expect(chair.isOccupiedByPlayer(new PlayerID('john'))).toBeTrue();
        expect(chair.isOccupiedByPlayer(new PlayerID('mike'))).toBeFalse();
    });

    it('marks as free when an event says that its occupant did sit to another chair', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('john'), new TableID(111), 1));
        chair.applyEvent(new PlayerSatToChair(new PlayerID('john'), new TableID(111), 0));
        expect(chair.getCurrentPlayer()).toBeUndefined();
        expect(chair.isOccupied()).toBeFalse();
        expect(chair.isOccupiedByPlayer(new PlayerID('john'))).toBeFalse();
    });

    it('does not remove the occupant if the applied event is not about the occupant', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('john'), new TableID(111), 1));
        chair.applyEvent(new PlayerSatToChair(new PlayerID('mark'), new TableID(111), 0));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('john'));
    });

    it('can sit an user when empty', () => {
        const chair = createChair();
        expect(() => chair.sit(new PlayerID('john'))).not.toThrow();
    });

    it('does not throw if the same occupant sits to the chair again', () => {
        const john = new PlayerID('john');

        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(john, new TableID(111), 1));
        expect(() => chair.sit(john)).not.toThrow();
    });

    it('does not allow a player to sit if it is already occupied by someone else', () => {
        const john = new PlayerID('john');
        const mike = new PlayerID('mike');

        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(john, new TableID(111), 1));
        expect(() => chair.sit(mike)).toThrow(new ChairNotAvailableException());
    });

    it('allows an user to get up', () => {
        const john = new PlayerID('john');

        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(john, new TableID(111), 1));
        expect(() => chair.getUp(john)).not.toThrow();
    });

    it('throws an error if getting up from an empty chair', () => {
        const chair = createChair();

        expect(() => chair.getUp(new PlayerID('foo')))
            .toThrow(new ChairNotAvailableException());
    });

    it('throws an error if trying to get up an user from a chair occupied by another user', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('mike'), new TableID(111), 1));

        expect(() => chair.getUp(new PlayerID('john')))
            .toThrow(new ChairNotOccupiedException());
    });

    it('removes the user from the chair if the relative PlayerLeftChair event is processed', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('mike'), new TableID(123), 1));
        chair.applyEvent(new PlayerLeftChair(new PlayerID('mike'), new TableID(123), 1));
        expect(chair.getCurrentPlayer()).toBeUndefined();
        expect(chair.isOccupied()).toBeFalse();
    });

    it('ignores the PlayerLeftChair event for different user', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerSatToChair(new PlayerID('mike'), new TableID(123), 1));
        chair.applyEvent(new PlayerLeftChair(new PlayerID('john'), new TableID(123), 1));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('mike'));
        expect(chair.isOccupied()).toBeTrue();
    });

    it('sets the player when table is occupied and chair id is zero', () => {
        const chair = createChair(0);

        chair.applyEvent(
            new TableOccupied(
                new TableID(123),
                new PlayerID('mike'),
                4,
                new GamePolicySpecification(TYPE_ROUNDS, 3),
            )
        );

        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('mike'));
        expect(chair.isOccupied()).toBeTrue();
    });

    it('ignores the TableOccupied event if chair id is not zero', () => {
        const chair = createChair(1);

        chair.applyEvent(
            new TableOccupied(
                new TableID(123),
                new PlayerID('mike'),
                4,
                new GamePolicySpecification(TYPE_ROUNDS, 3),
            )
        );

        expect(chair.getCurrentPlayer()).toBeUndefined();
    });

    it('returns false when asked if ready and is not', () => {
        const chair = createChair(1);
        expect(chair.isReady()).toBeFalse();
    });

    it('can be set as occupied', () => {
        const chair = createChair(1);
        chair.setOccupiedBy(new PlayerID('mike'));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('mike'));
    })

    it('marks as ready on PlayerReady event if chair is occupied by the ready player', () => {
        const chair = createChair(1);
        chair.setOccupiedBy(new PlayerID('john'));
        chair.applyEvent(new PlayerReady(new TableID(123), new PlayerID('john')));
        expect(chair.isReady()).toBeTrue();
    });

    it('ignores the PlayerReady event if not occupied by that user', () => {
        const chair = createChair(1);
        chair.setOccupiedBy(new PlayerID('john'));
        chair.applyEvent(new PlayerReady(new TableID(123), new PlayerID('mike')));
        expect(chair.isReady()).toBeFalse();
    });

    it('ignores the PlayerReady event if not occupied by any user', () => {
        const chair = createChair(1);
        chair.applyEvent(new PlayerReady(new TableID(123), new PlayerID('mike')));
        expect(chair.isReady()).toBeFalse();
    });

    it('clears the ready flag when a user gets up', () => {
        const chair = createChair(1);
        chair.setOccupiedBy(new PlayerID('mike'));
        chair.applyEvent(new PlayerReady(new TableID(123), new PlayerID('mike')));
        chair.applyEvent(new PlayerLeftChair(new PlayerID('john'), new TableID(123), 2));
        expect(chair.isReady()).toBeFalse();
    });

});
