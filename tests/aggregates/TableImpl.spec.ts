import { TableImpl } from '../../src/domain/aggregates/impl/TableImpl';
import { ChairFactoryImpl } from '../../src/domain/factories/impl/ChairFactoryImpl';
import { TableName } from '../../src/domain/value_objects/TableName';
import { TableID } from '../../src/domain/value_objects/TableID';
import { TableInitialized } from '../../src/domain/events/TableInitialized';
import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { GamePolicySpecification } from '../../src/domain/value_objects/GamePolicySpecification';
import { TableOccupied } from '../../src/domain/events/TableOccupied';
import { WrongNumberOfChairsException } from '../../src/domain/exceptions/WrongNumberOfChairsException';
import { PlayerLeftChair } from '../../src/domain/events/PlayerLeftChair';
import { PlayerSatToChair } from '../../src/domain/events/PlayerSatToChair';
import { ChairNotAvailableException } from '../../src/domain/exceptions/ChairNotAvailableException';
import { TableNotAvailableException } from '../../src/domain/exceptions/TableNotAvailableException';
import { ChairNotOccupiedException } from '../../src/domain/exceptions/ChairNotOccupiedException';
import { PlayerReady } from '../../src/domain/events/PlayerReady';
import { TableReadyForPlaying } from '../../src/domain/events/TableReadyForPlaying';
import { TableClosed } from '../../src/domain/events/TableClosed';
import { TableFlaggedToBeClosed } from '../../src/domain/events/TableFlaggedToBeClosed';
import { TableReopened } from '../../src/domain/events/TableReopened';
import { TableNoMoreFlaggedToBeClosed } from '../../src/domain/events/TableNoMoreFlaggedToBeClosed';

describe('TableImpl', () => {
    const darkbyte = new PlayerID('darkbyte');
    const tableId = new TableID(1234);
    const twoRoundsPolicy = new GamePolicySpecification('rounds', 2);

    function createEmptyTable(id = 1234, name = 'FooBar'): TableImpl {
        const table = new TableImpl(new ChairFactoryImpl());
        table.initialize(new TableID(id), new TableName(name));
        table.commitEvents();
        return table;
    }

    it('can be initialized', () => {
        const table = new TableImpl(new ChairFactoryImpl());
        table.initialize(new TableID(1234), new TableName('My name'));
        expect(table.getId()).toEqual(new TableID(1234));
        expect(table.isIdle()).toBeTrue();

        expect(table.commitEvents()).toEqual([
            new TableInitialized(new TableID(1234), 'My name'),
        ]);
    });

    it('can be occupied', () => {
        const table = createEmptyTable();

        table.occupy(darkbyte, 4, new GamePolicySpecification('rounds', 3));
        expect(table.isSitting()).toBeTrue();
        expect(table.getChairs().length).toBe(4);
        expect(table.getChairAt(0).isOccupiedByPlayer(darkbyte)).toBeTrue();
        expect(table.getChairAt(1).isOccupied()).toBeFalse();
        expect(table.getChairAt(2).isOccupied()).toBeFalse();
        expect(table.getChairAt(3).isOccupied()).toBeFalse();
        expect(table.commitEvents()).toEqual([
            new TableOccupied(new TableID(1234), darkbyte, 4, new GamePolicySpecification('rounds', 3)),
        ]);
    });

    it('cannot be occupied multiple times', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.sit(darkbyte, 2);

        expect(() => table.occupy(new PlayerID('mike'), 4, new GamePolicySpecification('rounds', 2)))
            .toThrow(new TableNotAvailableException());
    });

    it('cannot be occupied with a wrong number of chairs', () => {
        const table = createEmptyTable();

        expect(() => {
            table.occupy(darkbyte, 3, twoRoundsPolicy)
        }).toThrow(new WrongNumberOfChairsException());

        expect(() => {
            table.occupy(darkbyte, 1, twoRoundsPolicy)
        }).toThrow(new WrongNumberOfChairsException());
    });

    it('becomes idle again when the only sat user gets up', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.commitEvents();

        table.getUp(darkbyte, 0);
        expect(table.isIdle()).toBeTrue();
        expect(table.getChairs()).toEqual([]);
        expect(table.commitEvents()).toEqual([
            new PlayerLeftChair(darkbyte, tableId, 0),
        ]);
    });

    it('can be occupied after becoming idle again', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.getUp(darkbyte, 0);
        expect(() => table.occupy(darkbyte, 4, twoRoundsPolicy)).not.toThrow();
    });

    it('allows a user to switch to any other available chair', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.commitEvents();

        table.sit(darkbyte, 1);
        expect(table.getChairAt(1).isOccupiedByPlayer(darkbyte)).toBeTrue();
        expect(table.getChairAt(0).isOccupied()).toBeFalse();
        expect(table.commitEvents()).toEqual([
            new PlayerSatToChair(darkbyte, tableId, 1),
        ]);
    });

    it('allows any user to sit on any available chair', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.commitEvents();

        table.sit(new PlayerID('john'), 2);
        table.sit(new PlayerID('mike'), 1);
        table.sit(new PlayerID('stef'), 3);

        expect(table.getChairs()[0].isOccupiedByPlayer(darkbyte)).toBeTrue();
        expect(table.getChairs()[1].isOccupiedByPlayer(new PlayerID('mike'))).toBeTrue();
        expect(table.getChairs()[2].isOccupiedByPlayer(new PlayerID('john'))).toBeTrue();
        expect(table.getChairs()[3].isOccupiedByPlayer(new PlayerID('stef'))).toBeTrue();

        expect(table.commitEvents()).toEqual([
            new PlayerSatToChair(new PlayerID('john'), tableId, 2),
            new PlayerSatToChair(new PlayerID('mike'), tableId, 1),
            new PlayerSatToChair(new PlayerID('stef'), tableId, 3),
        ]);
    });

    it('does not allow a player to sit on a chair occupied by another player', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.commitEvents();

        expect(() => table.sit(new PlayerID('john'), 0))
            .toThrow(new ChairNotAvailableException());
    });

    it('allows a player to get up from the chair', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.commitEvents();

        table.sit(new PlayerID('mike'), 3);
        table.getUp(new PlayerID('mike'), 3);

        expect(table.getChairAt(3).isOccupied()).toBeFalse();
        expect(table.commitEvents()).toEqual([
            new PlayerSatToChair(new PlayerID('mike'), tableId, 3),
            new PlayerLeftChair(new PlayerID('mike'), tableId, 3),
        ]);
    });

    it('does not allow a player to get up from a chair that he is not occupying', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        expect(() => table.getUp(darkbyte, 1)).toThrow(new ChairNotOccupiedException());
    });

    it('does not allow a player to set the ready flag if not all the chairs are occupied', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        expect(() => table.setReady(darkbyte)).toThrow(new TableNotAvailableException());
    });

    it('allows a player to set the ready flag when all the chairs are occupied', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.sit(new PlayerID('john'), 1);
        table.sit(new PlayerID('mike'), 2);
        table.sit(new PlayerID('adamwest'), 3);
        expect(table.isAwaitingForReady()).toBeTrue();
        table.commitEvents();

        expect(() => table.setReady(darkbyte)).not.toThrow();
        expect(table.commitEvents()).toEqual([
            new PlayerReady(tableId, darkbyte),
        ]);

        expect(table.getChairAt(0).isReady()).toBeTrue();
        expect(table.getChairAt(1).isReady()).toBeFalse();
        expect(table.getChairAt(2).isReady()).toBeFalse();
        expect(table.getChairAt(3).isReady()).toBeFalse();
    });

    it('clears all the ready flags when a player leaves the chair', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.sit(new PlayerID('john'), 1);
        table.sit(new PlayerID('mike'), 2);
        table.sit(new PlayerID('adamwest'), 3);
        table.setReady(darkbyte);
        table.commitEvents();

        table.getUp(new PlayerID('mike'), 2);
        expect(table.getChairAt(0).isReady()).toBeFalse();
        expect(table.getChairAt(1).isReady()).toBeFalse();
        expect(table.getChairAt(2).isReady()).toBeFalse();
        expect(table.getChairAt(3).isReady()).toBeFalse();
    });

    it('switches the table to the Playing state when all the players are ready', () => {
        const john = new PlayerID('john');
        const mike = new PlayerID('mike');
        const adamWest = new PlayerID('adamwest');

        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.sit(john, 1);
        table.sit(mike, 2);
        table.sit(adamWest, 3);
        table.setReady(darkbyte);
        table.setReady(john);
        table.setReady(mike);
        table.commitEvents();

        table.setReady(adamWest);
        expect(table.isPlaying()).toBeTrue();
        expect(table.commitEvents()).toEqual([
            new PlayerReady(tableId, adamWest),
            new TableReadyForPlaying(tableId),
        ]);

    });

    it('can be closed when is idle', () => {
        const table = createEmptyTable();
        table.close();
        expect(table.isClosed()).toBeTrue();
        expect(table.commitEvents()).toEqual([
            new TableClosed(tableId),
        ]);
        expect(table.getChairs()).toEqual([]);
    });

    it('is flagged to be closed if not idle', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 2, twoRoundsPolicy);
        table.commitEvents();

        table.close();
        expect(table.isFlaggedToBeClosed()).toBeTrue();
        expect(table.isClosed()).toBeFalse();
        expect(table.commitEvents()).toEqual([
            new TableFlaggedToBeClosed(tableId),
        ]);
    });

    it('is automatically closed when becomes idle and was flagged to be closed', () => {
        const table = createEmptyTable();
        table.occupy(darkbyte, 4, twoRoundsPolicy);
        table.close(); // flagged to be closed
        table.commitEvents();

        table.getUp(darkbyte, 0);
        expect(table.commitEvents()).toEqual([
            new PlayerLeftChair(darkbyte, tableId, 0),
            new TableClosed(tableId),
        ]);

        expect(table.isFlaggedToBeClosed()).toBeFalse();
        expect(table.isClosed()).toBeTrue();
    });

    it('can be reopened if closed', () => {
        const table = createEmptyTable();
        table.close();
        table.commitEvents();

        table.reOpen();
        expect(table.commitEvents()).toEqual([
            new TableReopened(tableId),
        ]);
        expect(table.isIdle()).toBeTrue();
    });

    it('clears the flag to be closed when reopened', () => {
        const table = createEmptyTable(1234);
        table.occupy(darkbyte, 2, twoRoundsPolicy);
        table.close(); // flagged to be closed
        table.commitEvents();

        table.reOpen(); // flag removed
        expect(table.isFlaggedToBeClosed()).toBeFalse();

        expect(table.commitEvents()).toEqual([
            new TableNoMoreFlaggedToBeClosed(tableId),
        ]);
    });

});
