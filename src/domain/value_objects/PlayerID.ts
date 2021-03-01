import { InvalidPlayerIDException } from '../exceptions/InvalidPlayerIDException';

export class PlayerID {

    constructor(
        private readonly id: string
    ) {
        if (typeof id !== 'string' || !id.length) {
            throw new InvalidPlayerIDException();
        }
    }

    public asString(): string {
        return this.id;
    }
}
