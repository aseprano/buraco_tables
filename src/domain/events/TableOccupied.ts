import { DomainEvent } from './DomainEvent';
import { PlayerID } from '../value_objects/PlayerID';
import { GamePolicySpecification } from '../value_objects/GamePolicySpecification';
import { TableID } from '../value_objects/TableID';

const EventName = 'com.herrdoktor.buraco.events.TableOccupied';

export class TableOccupied extends DomainEvent {
    public static readonly EventName = EventName;

    constructor(
        id: TableID,
        byPlayer: PlayerID,
        numberOfChairs: number,
        gamePolicy: GamePolicySpecification,
    ) {
        super();

        this.setPayload({
            id: id.asNumber(),
            player: byPlayer.asString(),
            chairs: numberOfChairs,
            policy: gamePolicy.asObject(),
        });
    }

    public getName(): string {
        return EventName;
    }
}