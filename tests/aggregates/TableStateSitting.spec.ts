import { TableStateSitting } from '../../src/domain/aggregates/impl/TableStateSitting';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { ChairImpl } from '../../src/domain/entities/impl/ChairImpl';
import { ChairNotAvailableException } from '../../src/domain/exceptions/ChairNotAvailableException';
import { instance, mock, when } from 'ts-mockito';
import { ChairNotOccupiedException } from '../../src/domain/exceptions/ChairNotOccupiedException';

describe('TableStateSitting', () => {
    const tableState = new TableStateSitting([
        new ChairImpl(0),
        new ChairImpl(1),
        new ChairImpl(2),
        new ChairImpl(3),
    ]);

    const tableNotAvailableException = new TableNotAvailableException();
    const john = new PlayerID('john');
    const chairId = 1;

    it('throws TableNotAvailableException if try to occupy', () => {
        expect(() => tableState.occupy())
            .toThrow(tableNotAvailableException);
    });

    it('throws ChairNotAvailableException if trying to sit to a non existing chair', () => {
        expect(() => tableState.sit(john, 5))
            .toThrow(new ChairNotAvailableException());
    });

    it('throws ChairNotAvailableException if trying to sit to an already occupied chair', () => {
        const mockedChair = mock(ChairImpl);

        when(mockedChair.getId())
            .thenReturn(chairId);

        when(mockedChair.sit(john))
            .thenThrow(new ChairNotAvailableException());

        const tableState = new TableStateSitting([
            instance(mockedChair),
            instance(mockedChair),
            instance(mockedChair),
            instance(mockedChair),
        ]);

        expect(() => tableState.sit(john, chairId))
            .toThrow(new ChairNotAvailableException());
    });

    it('allows to sit a player to a free chair', () => {
        expect(() => tableState.sit(john, chairId))
            .not.toThrow();
    });

    it('throws ChairNotOccupiedException if getting up a user from a chair occupied by another user', () => {
        const mockedChair = mock(ChairImpl);
        when(mockedChair.getId()).thenReturn(1);
        when(mockedChair.getUp(john)).thenThrow(new ChairNotOccupiedException());

        const tableState = new TableStateSitting([
            new ChairImpl(0),
            instance(mockedChair),
        ]);

        expect(() => tableState.getUp(john, 1))
            .toThrow(new ChairNotOccupiedException());
    });

    it('allows a player to get up from the chair', () => {
        const mockedChair = mock(ChairImpl);
        when(mockedChair.getId()).thenReturn(1);
        when(mockedChair.getUp(john)).thenReturn();

        const tableState = new TableStateSitting([
            new ChairImpl(0),
            instance(mockedChair),
        ]);

        expect(() => tableState.getUp(john, 1))
            .not.toThrow();
    });

    it('cannot be closed', () => {
        expect(tableState.canBeClosed()).toBeFalse();
    });

    it('throws TableNotAvailableException when trying to reopen', () => {
        expect(() => tableState.reOpen())
            .toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException when trying to reset', () => {
        expect(() => tableState.reset())
            .toThrow(tableNotAvailableException);
    });

    it('throws TableNotAvailableException when trying to set player ready', () => {
        expect(() => tableState.setReady(new PlayerID('john')))
            .toThrow(tableNotAvailableException);
    });

});
