import { ChairImpl } from '../../src/domain/entities/impl/ChairImpl';
import { TableID } from '../../src/domain/value_objects/TableID';
import { ChairID } from '../../src/domain/value_objects/ChairID';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { PlayerDidSitToChair } from '../../src/domain/events/PlayerDidSitToChair';
import { ChairNotAvailableException } from '../../src/domain/exceptions/ChairNotAvailableException';

describe('ChairImpl', () => {

    function createChair(chairNumber = 1, tableId = 111): ChairImpl {
        return new ChairImpl(new ChairID(chairNumber, new TableID(tableId)));
    }

    it('returns its id', () => {
        const chairId = new ChairID(3, new TableID(111));
        const chair = new ChairImpl(chairId);
        expect(chair.getId()).toEqual(chairId);
    });

    it('is created with no occupant', () => {
        const chair = createChair();
        expect(chair.getCurrentPlayer()).toBeUndefined();
    })

    it('marks as occupied when the relative event is applied', () => {
        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('john'), new ChairID(1, new TableID(111))));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('john'));
    });

    it('marks as free when an event says that its occupant did sit to another chair', () => {
        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('john'), new ChairID(1, new TableID(111))));
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('john'), new ChairID(0, new TableID(111))));
        expect(chair.getCurrentPlayer()).toBeUndefined();
    });

    it('does not remove the occupant if the applied event is not about the occupant', () => {
        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('john'), new ChairID(1, new TableID(111))));
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('mark'), new ChairID(0, new TableID(111))));
        expect(chair.getCurrentPlayer()).toEqual(new PlayerID('john'));
    });

    it('can sit an user when empty', () => {
        const chair = createChair();
        expect(() => chair.sit(new PlayerID('john'))).not.toThrow();
    });

    it('does not throw if the same occupant sits to the chair again', () => {
        const john = new PlayerID('john');

        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(john, new ChairID(1, new TableID(111))));
        expect(() => chair.sit(john)).not.toThrow();
    });

    it('does not allow a player to sit if it is already occupied by someone else', () => {
        const john = new PlayerID('john');
        const mike = new PlayerID('mike');

        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(john, new ChairID(1, new TableID(111))));
        expect(() => chair.sit(mike)).toThrow(new ChairNotAvailableException());
    });

    it('allows an user to get up', () => {
        const john = new PlayerID('john');

        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(john, new ChairID(1, new TableID(111))));
        expect(() => chair.getUp(john)).not.toThrow();
    });

    it('throws an error if getting up from an empty chair', () => {
        const chair = createChair();

        expect(() => chair.getUp(new PlayerID('foo')))
            .toThrow(new ChairNotAvailableException());
    });

    it('throws an error if getting up from a chair occupied by someone else', () => {
        const chair = createChair(1, 111);
        chair.applyEvent(new PlayerDidSitToChair(new PlayerID('mike'), new ChairID(1, new TableID(111))));

        expect(() => chair.getUp(new PlayerID('john')))
            .toThrow(new ChairNotAvailableException());
    });

});
