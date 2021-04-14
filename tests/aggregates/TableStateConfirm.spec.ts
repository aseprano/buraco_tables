import { TableStateConfirm } from '../../src/domain/aggregates/impl/TableStateConfirm';
import { ChairImpl } from '../../src/domain/entities/impl/ChairImpl';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { Chair } from '../../src/domain/entities/Chair';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { ChairNotAvailableException } from '../../src/domain/exceptions/ChairNotAvailableException';
import { ChairNotOccupiedException } from '../../src/domain/exceptions/ChairNotOccupiedException';

function createChair(chairNumber: number, withPlayer: string): Chair {
    const chair = new ChairImpl(chairNumber);
    chair.setOccupiedBy(new PlayerID(withPlayer));
    return chair;
}

describe('TableStateConfirm', () => {

    const tableState = new TableStateConfirm([
        createChair(0, 'HerrDoktor'),
        createChair(1, 'john'),
        createChair(2, 'mike'),
        createChair(3, 'fab'),
    ]);

    const tableNotAvailableException = new TableNotAvailableException();
    const chairNotAvailableException = new ChairNotAvailableException();

    it('throws TableNotAvailableException if trying to occupy', () => {
        expect(() => tableState.occupy()).toThrow(tableNotAvailableException);
    });

    it('throws ChairNotAvailableException if trying to sit a user', () => {
        expect(() => tableState.sit(new PlayerID('HerrDoktor'), 0))
            .toThrow(chairNotAvailableException);
    });

    it('throws ChairNotAvailableException if trying to getUp a non existing user', () => {
        expect(() => tableState.getUp(new PlayerID('mickey'), 1))
            .toThrow(chairNotAvailableException);
    });

    it('throws ChairNotOccupied if trying to getUp a user from the wrong chair', () => {
        expect(() => tableState.getUp(new PlayerID('HerrDoktor'), 1))
            .toThrow(new ChairNotOccupiedException());
    });

    it('does not throw if trying to getUp a user from the proper chair', () => {
        expect(() => tableState.getUp(new PlayerID('HerrDoktor'), 0))
            .not.toThrow();
    })

    it('cannot be closed', () => {
        expect(tableState.canBeClosed()).toBeFalse();
    });

    it('does not throw if trying to reopen', () => {
        expect(() => tableState.reOpen()).not.toThrow();
    });

    it('throws TableNotAvailableException if trying to reset', () => {
        expect(() => tableState.reset()).toThrow(tableNotAvailableException);
    });

    it('throws ChairNotAvailableException if trying to set ready a non existing player', () => {
        expect(() => tableState.setReady(new PlayerID('darthvader')))
            .toThrow(chairNotAvailableException);
    });

    it('does not throw if trying to set ready a player', () => {
        expect(() => tableState.setReady(new PlayerID('HerrDoktor')))
            .not.toThrow();
    });

});
