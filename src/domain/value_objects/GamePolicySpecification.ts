import { InvalidGamePolicySpecificationException } from '../exceptions/InvalidGamePolicySpecificationException';

export const TYPE_ROUNDS = 'rounds';
export const TYPE_SCORE  = 'score';

export class GamePolicySpecification {

    public constructor(
        private readonly type: string,
        private readonly limit: number,
    ) {
        if (!this.isValidType(type)) {
            throw new InvalidGamePolicySpecificationException(`Invalid game policy type: ${type}`);
        }

        switch (type) {
            case TYPE_ROUNDS:
                if (!this.isValidNumberOfRounds(limit)) {
                    throw new InvalidGamePolicySpecificationException(`Invalid number of rounds: ${limit}`);
                }
                break;

            case TYPE_SCORE:
                if (!this.isValidScoreLimit(limit)) {
                    throw new InvalidGamePolicySpecificationException(`Invalid score limit: ${limit}`);
                }
                break;
        }
    }

    private isValidType(type: string): boolean {
        return type === TYPE_ROUNDS
            || type === TYPE_SCORE;
    }

    private isValidNumberOfRounds(numberOfRounds: number): boolean {
        return Number.isInteger(numberOfRounds)
            && numberOfRounds >= 1
            && numberOfRounds <= 4;
    }

    private isValidScoreLimit(scoreLimit: number): boolean {
        return scoreLimit === 1005
            || scoreLimit === 2005
            || scoreLimit === 3005;
    }

    public getType(): string {
        return this.type;
    }

    public getLimit(): number {
        return this.limit;
    }

    public asObject(): any {
        return {
            type: this.type,
            limit: this.limit,
        };
    }

}