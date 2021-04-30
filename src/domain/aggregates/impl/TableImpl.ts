import { Table } from '../Table';
import { AbstractRootEntity, Event, SnapshotState } from '@darkbyte/herr';
import { ChairFactory } from '../../factories/ChairFactory';

// Value Objects
import { TableID } from '../../value_objects/TableID';
import { TableName } from '../../value_objects/TableName';
import { PlayerID } from '../../value_objects/PlayerID';
import { GamePolicySpecification } from '../../value_objects/GamePolicySpecification';

// Events
import { TableInitialized } from '../../events/TableInitialized';
import { TableClosed } from '../../events/TableClosed';
import { TableReopened } from '../../events/TableReopened';
import { TableOccupied } from '../../events/TableOccupied';
import { TableReset } from '../../events/TableReset';
import { TableFlaggedToBeClosed } from '../../events/TableFlaggedToBeClosed';
import { TableNoMoreFlaggedToBeClosed } from '../../events/TableNoMoreFlaggedToBeClosed';
import { TableReadyForPlaying } from '../../events/TableReadyForPlaying';
import { PlayerReady } from '../../events/PlayerReady';
import { PlayerSatToChair } from '../../events/PlayerSatToChair';
import { PlayerLeftChair } from '../../events/PlayerLeftChair';

// State
import { TableState } from '../TableState';
import { TableStateIdle } from './TableStateIdle';
import { TableStateSitting } from './TableStateSitting';
import { TableStateConfirm } from './TableStateConfirm';
import { TableStatePlaying } from './TableStatePlaying';
import { TableStateClosed } from './TableStateClosed';

// Exceptions
import { PlayerNotFound } from '../../exceptions/PlayerNotFound';
import { ChairNotAvailableException } from '../../exceptions/ChairNotAvailableException';
import { WrongNumberOfChairsException } from '../../exceptions/WrongNumberOfChairsException';
import { TableAlreadyClosedException } from '../../exceptions/TableAlreadyClosedException';
import { TableAlreadyOpenedException } from '../../exceptions/TableAlreadyOpenedException';

// Entities
import { Chair } from '../../entities/Chair';

export class TableImpl extends AbstractRootEntity implements Table {
    private id?: TableID;
    private readonly chairs: Array<Chair> = [];
    private readonly stateClosed = new TableStateClosed();
    private readonly stateIdle = new TableStateIdle();
    private readonly stateSitting = new TableStateSitting(this.chairs);
    private readonly stateConfirm = new TableStateConfirm(this.chairs);
    private readonly statePlaying = new TableStatePlaying();
    private currentState: TableState = this.stateIdle;
    private flaggedToBeClosed = false;

    constructor(
        private readonly chairFactory: ChairFactory,
    ) {
        super();
    }

    protected buildSnapshot(): SnapshotState {
        return {
            entityId: this.id,
        };
    }

    protected applySnapshot(snapshot: SnapshotState): void {
        
    }

    protected propagateEvent(event: Event): void {
        this.chairs.forEach((chair) => chair.applyEvent(event));
    }

    private switchTo(newState: TableState): void {
        this.currentState = newState;
    }

    private switchToIdle(): void {
        this.destroyChairs();
        this.flaggedToBeClosed = false;
        this.switchTo(this.stateIdle);
    }

    private switchToClosed(): void {
        this.destroyChairs();
        this.flaggedToBeClosed = false;
        this.switchTo(this.stateClosed);
    }

    private switchToSitting(): void {
        this.switchTo(this.stateSitting);
    }

    private switchToConfirm(): void {
        this.switchTo(this.stateConfirm);
    }

    private switchToPlaying(): void {
        this.switchTo(this.statePlaying);
    }

    private currentStateIs(state: TableState): boolean {
        return this.currentState === state;
    }

    /**
     * Finds a chair by a given player id.
     *
     * @param playerId
     * @return Chair|undefined
     * @private
     */
    private getChairByPlayer(playerId: PlayerID): Chair|undefined {
        return this.chairs
            .find((chair) => chair.isOccupiedByPlayer(playerId));
    }

    private getNumberOfOccupiedChairs(): number {
        return this.chairs.filter((chair) => chair.isOccupied()).length;
    }

    private getNumberOfReadyPlayers(): number {
        return this.chairs.filter((chair) => chair.isReady()).length;
    }

    private isLastSatPlayer(event: Event): boolean {
        return this.getNumberOfOccupiedChairs() === 1;
    }

    private isGoingToBeFull(): boolean {
        return this.getNumberOfOccupiedChairs() === this.chairs.length - 1;
    }

    private isFull(): boolean {
        return this.getNumberOfOccupiedChairs() === this.chairs.length;
    }

    private isEmpty(): boolean {
        return this.getNumberOfOccupiedChairs() === 0;
    }

    private playerIsReady(playerId: PlayerID): boolean {
        const chair = this.getChairByPlayer(playerId);

        if (!chair) {
            throw new PlayerNotFound();
        }

        return chair.isReady();
    }

    private allPlayersAreReady(): boolean {
        return this.getNumberOfReadyPlayers() === this.chairs.length;
    }

    private createChairNumber(chairNumber: number): Chair {
        return this.chairFactory.createChair(chairNumber);
    }

    private createChairs(numberOfChairs: number): void {
        for (let chairNumber = 0; chairNumber < numberOfChairs; ++chairNumber) {
            this.chairs.push(this.createChairNumber(chairNumber));
        }
    }

    private destroyChairs(): void {
        this.chairs.splice(0);
    }

    private handleTableInitializedEvent(event: Event): void {
        this.id = new TableID(event.getPayload()['id'] as number);
    }

    private handleTableClosedEvent(event: Event): void {
        this.switchToClosed();
    }

    private handleTableFlaggedToBeClosedEvent(event: Event): void {
        this.flaggedToBeClosed = true;
    }

    private handleTableNoMoreFlaggedToBeClosedEvent(event: Event): void {
        this.flaggedToBeClosed = false;
    }

    private handleTableReopenedEvent(event: Event): void {
        this.flaggedToBeClosed = false;

        if (this.isClosed()) {
            this.switchToIdle();
        }
    }

    private handleTableOccupiedEvent(event: Event): void {
        this.createChairs(event.getPayload()['chairs']);
        this.switchTo(this.stateSitting);
    }

    private handlePlayerSatToChairEvent(event: Event): void {
        if (this.isGoingToBeFull()) {
            this.switchToConfirm();
        }
    }

    private handlePlayerLeftChairEvent(event: Event): void {
        if (this.isLastSatPlayer(event)) {
            if (!this.isFlaggedToBeClosed()) {
                this.switchToIdle();
            }
        } else if (this.isFull()) {
            this.switchToSitting();
        }
    }

    private handleTableReadyForPlayingEvent(event: Event): void {
        this.switchToPlaying();
    }

    private handleTableResetEvent(event: Event): void {
        if (this.isFlaggedToBeClosed()) {
            this.switchToClosed();
        } else {
            this.switchToIdle();
        }
    }

    protected doApplyEvent(event: Event): void {
        switch (event.getName()) {
            case TableInitialized.EventName:
                return this.handleTableInitializedEvent(event);

            case TableClosed.EventName:
                return this.handleTableClosedEvent(event);

            case TableFlaggedToBeClosed.EventName:
                return this.handleTableFlaggedToBeClosedEvent(event);

            case TableNoMoreFlaggedToBeClosed.EventName:
                return this.handleTableNoMoreFlaggedToBeClosedEvent(event);

            case TableReopened.EventName:
                return this.handleTableReopenedEvent(event);

            case TableOccupied.EventName:
                return this.handleTableOccupiedEvent(event);

            case PlayerSatToChair.EventName:
                return this.handlePlayerSatToChairEvent(event);

            case PlayerLeftChair.EventName:
                return this.handlePlayerLeftChairEvent(event);

            case TableReadyForPlaying.EventName:
                return this.handleTableReadyForPlayingEvent(event);

            case TableReset.EventName:
                return this.handleTableResetEvent(event);
        }
    }

    public initialize(id: TableID, name: TableName) {
        this.appendUncommittedEvent(new TableInitialized(id, name.asString()));
    }

    public getId(): TableID {
        return this.id!;
    }

    public occupy(player: PlayerID, numberOfChairs: number, gamePolicy: GamePolicySpecification): void {
        if (numberOfChairs !== 2 && numberOfChairs !== 4) {
            throw new WrongNumberOfChairsException();
        }

        this.currentState.occupy();

        this.appendUncommittedEvent(
            new TableOccupied(
                this.getId(),
                player,
                numberOfChairs,
                gamePolicy,
            )
        );
    }

    public sit(player: PlayerID, toChair: number): void {
        this.currentState.sit(player, toChair);

        this.appendUncommittedEvent(new PlayerSatToChair(
            player,
            this.getId(),
            toChair,
        ));
    }

    public getUp(player: PlayerID, fromChair: number): void {
        this.currentState.getUp(player, fromChair);

        this.appendUncommittedEvent(new PlayerLeftChair(
            player,
            this.getId(),
            fromChair,
        ));

        if (this.isEmpty() && this.isFlaggedToBeClosed()) {
            this.appendUncommittedEvent(new TableClosed(this.getId()));
        }
    }

    public close(): boolean {
        if (this.isClosed()) {
            throw new TableAlreadyClosedException();
        }

        const canBeClosed = this.currentState.canBeClosed();

        if (canBeClosed) {
            this.appendUncommittedEvent(new TableClosed(this.getId()));
        } else {
            this.appendUncommittedEvent(new TableFlaggedToBeClosed(this.getId()));
        }

        return canBeClosed;
    }

    public reOpen() {
        if (this.isClosed()) {
            this.appendUncommittedEvent(new TableReopened(this.getId()));
        } else if (this.isFlaggedToBeClosed()) {
            this.appendUncommittedEvent(new TableNoMoreFlaggedToBeClosed(this.getId()));
        } else {
            throw new TableAlreadyOpenedException();
        }
    }

    public reset() {
        this.currentState.reset();
        this.appendUncommittedEvent(new TableReset(this.getId()));
    }

    public setReady(player: PlayerID) {
        if (this.playerIsReady(player)) {
            return;
        }

        this.currentState.setReady(player);

        this.appendUncommittedEvent(new PlayerReady(
            this.getId(),
            player,
        ));

        if (this.allPlayersAreReady()) {
            this.appendUncommittedEvent(new TableReadyForPlaying(
                this.getId(),
            ));
        }
    }

    public isFlaggedToBeClosed(): boolean {
        return this.flaggedToBeClosed;
    }

    public isClosed(): boolean {
        return this.currentStateIs(this.stateClosed);
    }

    public isIdle(): boolean {
        return this.currentStateIs(this.stateIdle);
    }

    public isAwaitingForReady(): boolean {
        return this.currentStateIs(this.stateConfirm);
    }

    public isPlaying(): boolean {
        return this.currentStateIs(this.statePlaying);
    }

    public isSitting(): boolean {
        return this.currentStateIs(this.stateSitting);
    }

    public getChairs(): Array<Chair> {
        return this.chairs.slice(0);
    }

    public getChairAt(chairNumber: number): Chair {
        if (chairNumber < 0 || chairNumber >= this.chairs.length) {
            throw new ChairNotAvailableException();
        }

        return this.chairs[chairNumber];
    }
} 