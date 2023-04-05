import Command from "./Command";
import Board from "../Board";

class RedoCommand extends Command {
    constructor(params: any[]){
        super(new Board(null))
    }
    public Execute(): boolean {
        throw new Error("Method not implemented.");
    }
    public Undo(): boolean {
        throw new Error("Method not implemented.");
    }
    public Redo(): boolean {
        throw new Error("Method not implemented.");
    }

}

export default RedoCommand;
