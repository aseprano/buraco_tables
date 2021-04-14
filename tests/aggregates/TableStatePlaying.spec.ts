import { TableStatePlaying } from '../../src/domain/aggregates/impl/TableStatePlaying';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';

describe('TableStatePlaying', () => {

    const tableState = new TableStatePlaying();
    const tableNotAvailableException = new TableNotAvailableException();

    it('throws TableNotAvailableException if trying to occupy', () => {
        expect(() => tableState.occupy()).toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException if trying to sit a player', () => {
        expect(() => tableState.sit(new PlayerID('john'), 1))
            .toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException if trying to getUp a player', () => {
        expect(() => tableState.getUp(new PlayerID('john'), 1))
            .toThrow(tableNotAvailableException);
    });

    it('cannot be closed', () => {
        expect(tableState.canBeClosed()).toBeFalse();
    });

    it('can be reopened', () => {
        expect(() => tableState.reOpen()).not.toThrow();
    });

    it('can be reset', () => {
        expect(() => tableState.reset()).not.toThrow();
    });

    it('throws TableNotAvailableException if trying to set a player Ready', () => {
        expect(() => tableState.setReady(new PlayerID('foobar')))
            .toThrow(tableNotAvailableException);
    });

});
