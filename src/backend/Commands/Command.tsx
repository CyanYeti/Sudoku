import Board from "../Board";

abstract class Command {
    constructor(currentState: Board) {
        this.BoardState = currentState
    }
    protected BoardState: Board
    public abstract Execute(): boolean
    public abstract Undo(): boolean
    public abstract Redo(): boolean
}

export default Command;