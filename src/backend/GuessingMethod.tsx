import CellSolutionTemplate from "./CellSolutionTemplate";
class GuessingMethod extends CellSolutionTemplate {

    protected CheckRow(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let row = this.BoardState.GetRow(cell.X)
        options = options.filter((val) => {
            // console.log(this.BoardState.GetRow(cell.X))
            return row?.indexOf(val) === -1
        })
        
        if (options.length > 0) {
            return options
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }
    protected CheckColumn(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let column = this.BoardState.GetColumn(cell.Y)
        options = options.filter((val) => {
            return column?.indexOf(val) === -1
        })
        if (options.length > 0) {
            return options
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }
    protected CheckBox(cell: {X:number, Y:number}): string[] {
        let options = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let box = this.BoardState.GetBox(cell.X, cell.Y)
        options = options.filter((val) => {
            return box?.indexOf(val) === -1
        })
        if (options.length > 0) {
            return options
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }

}

export default GuessingMethod;