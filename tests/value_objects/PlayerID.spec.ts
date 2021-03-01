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

});
