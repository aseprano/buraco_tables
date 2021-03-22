import { PlayerID } from '../../src/domain/value_objects/PlayerID';
import { InvalidPlayerIDException } from '../../src/domain/exceptions/InvalidPlayerIDException';

describe('PlayerID', () => {
    
    it('cannot be an empty string', () => {
        expect(() => new PlayerID('')).toThrow(new InvalidPlayerIDException());
    });

    it('returns the player id as string', () => {
        const playerId = new PlayerID('darkbyte');
        expect(playerId.asString()).toEqual('darkbyte');
    });

    it('is equal to itself or to an object with the same value', () => {
        const playerId = new PlayerID('darkbyte');
        expect(playerId.isEqualTo(playerId)).toBeTrue();
        expect(playerId.isEqualTo(new PlayerID('darkbyte'))).toBeTrue();
    })

    it('is not equal to another object with different value', () => {
        expect(new PlayerID('darkbyte').isEqualTo(new PlayerID('darkbytes'))).toBeFalse();
    })

});
