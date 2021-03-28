import { Injectable } from '@darkbyte/herr';
import { Chair } from '../entities/Chair';

@Injectable()
export abstract class ChairFactory {

    public abstract createChair(chairNumber: number): Chair;

}
