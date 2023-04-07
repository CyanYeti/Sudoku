import Command from "./Command";
import Board from "../Board";
import { error } from "console";

class LoadCommand extends Command {
    private oldBoard: Board;
    private newBoard!: string[];
    private size!: number;
    private guesses!: string[]
    constructor (params: any[]){
        super(params[0] as Board);
        this.oldBoard = this.BoardState.Clone()
        this.BoardState.ClearBoard()
        // super(new Board(null));
        if (params.length > 1) {
            let file = params[1] as string
            this.newBoard = file.trim().replace(/\n/g, ' ').replace(/\r/g, '').split(' ');
        }
        if (params.length > 2) {            
            this.size = Number(this.newBoard[0])
            this.newBoard.shift();
        }
        if (this.newBoard.length > this.size**2) {
            this.guesses = this.newBoard.splice(0,this.size)
        }
        
    }
    public Execute(): boolean {
        // console.log(this.newBoard)
        this.BoardState.size = this.size
        this.BoardState.ClearBoard()
        this.BoardState.SetPotentialGuesses(this.guesses)
        console.log(this.BoardState)
        this.newBoard.forEach((element, index) => {
            if(element === '-') element = '-'
            let x = Math.floor(index / this.size)
            let y = index % this.size
            this.BoardState.SetCell(element, x, y, undefined, (element !== '-'))
        });

        return true
    }
    public Undo(): boolean {
        console.log("UNDO")
        this.BoardState.SetBoard(this.oldBoard)
        return true
    }
    public Redo(): boolean {
        this.Execute()
        return true
    }

}

export default LoadCommand;
