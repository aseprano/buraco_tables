import { InvalidTableNameException } from '../exceptions/InvalidTableNameException';

export class TableName {

    constructor(
        private readonly name: string
    ) {
        if (!name || typeof name !== 'string') {
            throw new InvalidTableNameException();
        }
    }

    public asString(): string {
        return this.name;
    }
    
}