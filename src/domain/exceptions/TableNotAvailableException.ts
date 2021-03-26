import { DomainException } from './DomainException';

/**
 * Triggered when a user tries to perform some action to a table that is in the IDLE status
 */
export class TableNotAvailableException extends DomainException {}