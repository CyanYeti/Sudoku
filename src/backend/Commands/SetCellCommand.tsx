import Board from "../Board";
import Command from "./Command";

class SetCellCommand extends Command {
    private value!: string
    private x!: number
    private y!: number
    private newGuesses!: string[]
    private initial!: boolean
    constructor (params: any[]){
        super(params[0] as Board);
        console.log(this.BoardState)
        // this.BoardState.ClearBoard()
        // super(new Board(null));
        if (params.length > 1) {
            this.value =  params[1] as string
        }
        if (params.length > 2) {
            this.x =  params[2] as number
        }
        if (params.length > 3) {
            this.y =  params[3] as number
        }
        if (params.length > 4) {
            this.newGuesses =  params[4] as string[]
        }
        if (params.length > 5) {
            this.initial =  params[5] as boolean
        }
        
    }

    public Execute(): boolean {
        this.BoardState.SetCell(this.value, this.x, this.y, this.newGuesses, this.initial)
        return true
    }
    public Undo(): boolean {
        throw new Error("Method not implemented.");
    }
    public Redo(): boolean {
        throw new Error("Method not implemented.");
    }

}

export default SetCellCommand