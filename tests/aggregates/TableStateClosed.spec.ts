import { TableStateClosed } from '../../src/domain/aggregates/impl/TableStateClosed';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';

describe('TableStateClosed', () => {
    const tableState = new TableStateClosed();
    const tableNotAvailableException = new TableNotAvailableException();
    const john = new PlayerID('john');
    const chairId = 1;

    it('does not allow to be closed', () => {
        expect(tableState.canBeClosed()).toBeFalse();
    });

    it('triggers TableNotAvailableException if try to occupy', () => {
        expect(() => tableState.occupy())
            .toThrow(tableNotAvailableException);
    });

    it('triggers TableNotAvailableException if try to sit', () => {
        expect(() => tableState.sit(john, chairId))
            .toThrow(tableNotAvailableException);
    });

    it('triggers TableNotAvailableException if try to getup', () => {
        expect(() => tableState.getUp(john, chairId))
            .toThrow(tableNotAvailableException);
    });

    it('allows to be reopened', () => {
        expect(() => tableState.reOpen())
            .not.toThrow();
    });

    it('triggers TableNotAvailableException if try to reset', () => {
        expect(() => tableState.reset())
            .toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException when trying to set player ready', () => {
        expect(() => tableState.setReady(new PlayerID('john')))
            .toThrow(tableNotAvailableException);
    });

});
