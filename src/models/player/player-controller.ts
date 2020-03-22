import {Player} from "./player";

export class PlayerController {

    private readonly player: Player;
    private eventData;
    private dragging: boolean;

    constructor(player: Player) {
        this.player = player;
        this.dragging = false;
    }

    subscribeToPointerEvents() {
        this.player.character
            .on('pointerdown', (e) => this.onDragStart(e))
            .on('pointerup', (e) => this.onDragEnd())
            .on('pointerupoutside', () => this.onDragEnd())
            .on('pointermove', e => this.onDragMove());
    }

    private onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.eventData = event.data;
        this.dragging = true;
    }

    private onDragEnd() {
        this.dragging = false;
        // set the interaction data to null
        this.eventData = null;
    }

    private onDragMove() {
        if (this.dragging) {
            const newPosition = this.eventData.getLocalPosition(this.player.character.parent);
            this.player.character.move(newPosition.x, newPosition.y);
        }
    }
}
