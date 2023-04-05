import Command from "./Command";
import CellSolutionTemplate from "../CellSolutionTemplate";
import Board from "../Board";
import GuessingMethod from "../GuessingMethod";

class RunCommand extends Command {
    private method!: string
    constructor (params: any[]){
        super(params[0] as Board);
        console.log(this.BoardState)
        // this.BoardState.ClearBoard()
        // super(new Board(null));
        if (params.length > 1) {
            this.method =  params[1] as string
        }
        
    }
    public Execute(): boolean {
        let solver: CellSolutionTemplate;
        switch(this.method) {
            case "combined":
                solver = new GuessingMethod(this.BoardState)
                break
            case "guessing":
                solver = new GuessingMethod(this.BoardState)
                break
            default:
                return false
        }
        solver.Run()
        return true
    }
    public Undo(): boolean {
        throw new Error("Method not implemented.");
    }
    public Redo(): boolean {
        throw new Error("Method not implemented.");
    }

}

export default RunCommand;