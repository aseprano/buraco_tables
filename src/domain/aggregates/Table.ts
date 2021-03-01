import { RootEntity } from '@darkbyte/herr';

export interface Table extends RootEntity {

    canBeDeleted(): boolean;

}