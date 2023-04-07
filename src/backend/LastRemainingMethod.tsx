import CellSolutionTemplate from "./CellSolutionTemplate";

class LastRemainingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        let myRow = this.BoardState.GetRow(cell.X)
        let myOptions = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let options = this.BoardState.GetPotentialGuesses()
        myRow?.forEach((value, index) => {
            if (value !== "-" || index === cell.Y) return
            let column = this.BoardState.GetColumn(index)
            console.log(column)
            options = options.filter((val) => {
                return column?.indexOf(val) !== -1
            })
        })
        myOptions = myOptions.filter((val) => {
            return options?.indexOf(val) === -1
        })
        console.log(myOptions)
        console.log(options)
        return myOptions
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        let myColumn = this.BoardState.GetColumn(cell.Y)
        let myOptions = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let options = this.BoardState.GetPotentialGuesses()
        myColumn?.forEach((value, index) => {
            if (value !== "-" || index === cell.X) return
            let column = this.BoardState.GetColumn(index)
            options = options.filter((val) => {
                return column?.indexOf(val) !== -1
            })
        })
        myOptions = myOptions.filter((val) => {
            return options?.indexOf(val) === -1
        })
        return myOptions
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        let options = this.BoardState.GetPotentialGuesses()
        let myRow = this.BoardState.GetRow(cell.X)
        let myColumn = this.BoardState.GetColumn(cell.Y)
        let box = this.BoardState.GetBox(cell.X, cell.Y)

        myRow?.forEach((value, index) => {
            let rowBox = this.BoardState.GetBox(cell.X, index)
            console.log(rowBox)
            options = options.filter((val) => {
                return rowBox?.indexOf(val) === -1
            })
        })
        console.log(options)

        myColumn?.forEach((value, index) => {
            let columnBox = this.BoardState.GetBox(index, cell.Y)
            console.log(columnBox)
            options = options.filter((val) => {
                return columnBox?.indexOf(val) === -1
            })
        })
        console.log(options)

        
        console.log(options)

        options = options.filter((val) => {
            return box?.indexOf(val) === -1
        })
        return options
    }
    
}

export default LastRemainingMethod