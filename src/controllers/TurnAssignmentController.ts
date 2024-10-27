
interface TurnNode<Turn> {
    next: TurnNode<Turn>;
    previous: TurnNode<Turn>;
    turn: Turn;
}

type InCreationTurnNode<Turn> = { next: InCreationTurnNode<Turn>, previous: InCreationTurnNode<Turn>, turn: Turn } | null;

class TurnAssignmentController<Turn> {
    currentTurn: TurnNode<Turn>;
    constructor(turns: Turn[]) {
        this.currentTurn = this.createTurnList(turns);
    }

    createTurnList(turns: Turn[]): TurnNode<Turn> {
        let head: InCreationTurnNode<Turn> = { next: null, previous: null, turn: turns[0] };
        let current = head;
        for (let i = 1; i < turns.length; i++) {
            let next = { next: null, previous: current, turn: turns[i] };
            current.next = next;
            current = next;
        }
        current.next = head;
        head.previous = current;
        return head as TurnNode<Turn>;
    }

    nextTurn() {
        this.currentTurn = this.currentTurn.next;
    }

    previousTurn() {
        this.currentTurn = this.currentTurn.previous;
    }

    getCurrentTurn() {
        return this.currentTurn.turn;
    }

    insert(turn: Turn) {
        let newNode: TurnNode<Turn> = { next: this.currentTurn.next, previous: this.currentTurn, turn };
        this.currentTurn.next.previous = newNode;
        this.currentTurn.next = newNode;
    }

    removeTurn(turn: Turn) {
        let current = this.currentTurn;
        while (current.turn !== turn) {
            current = current.next;
        }
        current.previous.next = current.next;
        current.next.previous = current.previous;
    }

    removeCurrentTurn() {
        this.currentTurn.previous.next = this.currentTurn.next;
        this.currentTurn.next.previous = this.currentTurn.previous;
        this.currentTurn = this.currentTurn.next;
    }

}

export default TurnAssignmentController