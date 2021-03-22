import { TableID } from '../../src/domain/value_objects/TableID';
import { InvalidTableIDException } from '../../src/domain/exceptions/InvalidTableIDException';

describe('TableID', () => {

    it('holds the value', () => {
        const tableId = new TableID(123);
        expect(tableId.asNumber()).toEqual(123);
    })

    it('handles equality', () => {
        const tableId = new TableID(123);
        expect(tableId.isEqualTo(tableId)).toBeTrue();
        expect(tableId.isEqualTo(new TableID(123))).toBeTrue();
    });

    it('cannot be built with an id lower than 1', () => {
        expect(() => new TableID(0)).toThrow(new InvalidTableIDException());
    });

});
