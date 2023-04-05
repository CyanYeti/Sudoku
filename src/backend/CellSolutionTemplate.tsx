import Board from "./Board"

abstract class CellSolutionTemplate {
    constructor(currentState: Board) {
        this.BoardState = currentState
    }
    protected BoardState: Board
    public Run() {
        for(let x = 0; x<this.BoardState.size; x=x+1) {
            for(let y = 0; y<this.BoardState.size; y=y+1) {
                // this.Guess(x,y)
                console.log(x + ", " + y)
                this.BoardState.SetCellGuesses(x, y, this.Guess(x,y));
            }
        }
    }
    private Guess(x:number, y:number) {
        const cell = {X:x, Y:y}
        let guesses = this.BoardState.GetPotentialGuesses()

        console.log("Checking Rows")
        let rowGuesses = this.CheckRow(cell)
        guesses = guesses.filter((val) => {
            // console.log(this.CheckRow(cell))
            return rowGuesses.indexOf(val) !== -1
        })

        console.log("Checking Columns")
        let columnGuesses = this.CheckColumn(cell)
        guesses = guesses.filter((val) => {
            return columnGuesses.indexOf(val) !== -1
        })

        console.log("Checking Box")
        let boxGuesses = this.CheckBox(cell)
        guesses = guesses.filter((val) => {
            console.log("Checking Boxes")
            return boxGuesses.indexOf(val) !== -1
        })
        // console.log("here")
        // console.log(guesses)
        return guesses
    }
    protected abstract CheckRow(cell: {X:number, Y:number}): string[]
    protected abstract CheckColumn(cell: {X:number, Y:number}): string[]
    protected abstract CheckBox(cell: {X:number, Y:number}): string[]
}

export default CellSolutionTemplate