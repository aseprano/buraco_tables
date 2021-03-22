import { ChairID } from '../../src/domain/value_objects/ChairID';
import { TableID } from '../../src/domain/value_objects/TableID';
import { InvalidChairIDException } from '../../src/domain/exceptions/InvalidChairIDException';

describe("ChairID", () => {

    it('can be built with the proper values', () => {
        const chairId = new ChairID(3, new TableID(123));
        expect(chairId.asNumber()).toEqual(3);
        expect(chairId.getTableID()).toEqual(new TableID(123));
    });

    it('cannot be built with an out-of-range id', () => {
        expect(() => new ChairID(-1, new TableID(123))).toThrow(new InvalidChairIDException());
        expect(() => new ChairID(4, new TableID(123))).toThrow(new InvalidChairIDException());
    });

    it('handles equality', () => {
        const chairId = new ChairID(3, new TableID(111));
        expect(chairId.isEqualTo(chairId)).toBeTrue();
        expect(chairId.isEqualTo(new ChairID(3, new TableID(111)))).toBeTrue();
        expect(chairId.isEqualTo(new ChairID(2, new TableID(111)))).toBeFalse();
        expect(chairId.isEqualTo(new ChairID(3, new TableID(112)))).toBeFalse();
    });

});
