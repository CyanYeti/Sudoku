import CellSolutionTemplate from "./CellSolutionTemplate";
class GuessingMethod extends CellSolutionTemplate {

    protected CheckRow(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetPotentialGuesses()
        let row = this.BoardState.GetRow(cell.X)
        options = options.filter((val) => {
            // console.log(this.BoardState.GetRow(cell.X))
            return row?.indexOf(val) === -1
        })
        console.log("Row Guesses:")
        console.log(options)
        return options
    }
    protected CheckColumn(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetPotentialGuesses()
        let column = this.BoardState.GetColumn(cell.Y)
        options = options.filter((val) => {
            return column?.indexOf(val) === -1
        })
        console.log("Column Guesses:")
        console.log(options)
        return options
    }
    protected CheckBox(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetPotentialGuesses()
        let box = this.BoardState.GetBox(cell.X, cell.Y)
        options = options.filter((val) => {
            return box?.indexOf(val) === -1
        })
        console.log("Box Guesses:")
        console.log(options)
        return options
    }

}

export default GuessingMethod;