import { TableStateIdle } from '../../src/domain/aggregates/impl/TableStateIdle';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { TableAlreadyOpenedException } from '../../src/domain/exceptions/TableAlreadyOpenedException';

describe('TableStateIdle', () => {
    const tableState = new TableStateIdle();
    const john = new PlayerID('john');
    const chairId = 1;
    const tableNotAvailableException = new TableNotAvailableException();

    it('can be occupied', () => {
        expect(() => tableState.occupy()).not.toThrow();
    });

    it('can be closed', () => {
        expect(tableState.canBeClosed()).toBeTrue();
    });

    it('throws TableNotAvailableException when trying to sit a user', () => {
        expect(() => tableState.sit(john, chairId))
            .toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException when trying to getUp a user', () => {
        expect(() => tableState.getUp(john, chairId))
            .toThrow(tableNotAvailableException);
    });

    it('throws TableAlreadyOpenedException when trying to reopen', () => {
        expect(() => tableState.reOpen())
            .toThrow(new TableAlreadyOpenedException());
    });

    it('throws TableNotAvailableException when trying to reset', () => {
        expect(() => tableState.reset())
            .toThrow(tableNotAvailableException);
    });

});
