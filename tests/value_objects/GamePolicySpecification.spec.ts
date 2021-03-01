import { GamePolicySpecification } from '../../src/domain/value_objects/GamePolicySpecification';
import { InvalidGamePolicySpecificationException } from '../../src/domain/exceptions/InvalidGamePolicySpecificationException';

describe('GamePolicySpecification', () => {

    it('can be succesfully instantiated for scoring', () => {
        const score1005 = new GamePolicySpecification('score', 1005);
        expect(score1005.getType()).toEqual('score');
        expect(score1005.getLimit()).toEqual(1005);
        expect(score1005.asObject()).toEqual({type: 'score', limit: 1005});

        const score2005 = new GamePolicySpecification('score', 2005);
        expect(score2005.getType()).toEqual('score');
        expect(score2005.getLimit()).toEqual(2005);
        expect(score2005.asObject()).toEqual({type: 'score', limit: 2005});

        const score3005 = new GamePolicySpecification('score', 3005);
        expect(score3005.getType()).toEqual('score');
        expect(score3005.getLimit()).toEqual(3005);
        expect(score3005.asObject()).toEqual({type: 'score', limit: 3005});
    });

    it('can be succesfully instantiated for rounds', () => {
        const rounds1 = new GamePolicySpecification('rounds', 1);
        expect(rounds1.getType()).toEqual('rounds');
        expect(rounds1.getLimit()).toEqual(1);
        expect(rounds1.asObject()).toEqual({type: 'rounds', limit: 1});

        const rounds2 = new GamePolicySpecification('rounds', 2);
        expect(rounds2.getType()).toEqual('rounds');
        expect(rounds2.getLimit()).toEqual(2);
        expect(rounds2.asObject()).toEqual({type: 'rounds', limit: 2});

        const rounds3 = new GamePolicySpecification('rounds', 3);
        expect(rounds3.getType()).toEqual('rounds');
        expect(rounds3.getLimit()).toEqual(3);
        expect(rounds3.asObject()).toEqual({type: 'rounds', limit: 3});
    });

    it('cannot be instantiated with other types', () => {
        expect(() => new GamePolicySpecification('foo', 1))
            .toThrowError(InvalidGamePolicySpecificationException);
    });

    it('cannot be instantiated with invalid score value', () => {
        expect(() => new GamePolicySpecification('score', 1000))
            .toThrowError(InvalidGamePolicySpecificationException);

        expect(() => new GamePolicySpecification('score', 4005))
            .toThrowError(InvalidGamePolicySpecificationException);
    });

});
