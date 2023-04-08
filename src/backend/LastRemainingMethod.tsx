import CellSolutionTemplate from "./CellSolutionTemplate";

class LastRemainingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        let myRow = this.BoardState.GetRow(cell.X)
        let myOptions = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let options = this.BoardState.GetPotentialGuesses()
        myRow?.forEach((value, index) => {
            if (value !== "-" || index === cell.Y) return
            let column = this.BoardState.GetColumn(index)
            options = options.filter((val) => {
                // if the cells column or box has it, add it
                return column?.indexOf(val) !== -1 || this.BoardState.GetBox(cell.X, index)?.indexOf(val) !== -1
            })
        })
        options = options.filter((val) => {
            return myOptions?.indexOf(val) !== -1
        })

        if (options.length > 0) {
            return options
        } else {
            return myOptions
        }
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        let myColumn = this.BoardState.GetColumn(cell.Y)
        let myOptions = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        let options = this.BoardState.GetPotentialGuesses()
        myColumn?.forEach((value, index) => {
            if (value !== "-" || index === cell.Y) return
            let row = this.BoardState.GetRow(index)
            options = options.filter((val) => {
                // if the cells column or box has it, add it
                return row?.indexOf(val) !== -1 || this.BoardState.GetBox(index, cell.Y)?.indexOf(val) !== -1
            })
        })
        options = options.filter((val) => {
            return myOptions?.indexOf(val) !== -1
        })

        if (options.length > 0) {
            return options
        } else {
            return myOptions
        }
    }
    // TODO: This needs to check for pinning the box
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        // let myBox = this.BoardState.GetBox(cell.X, cell.Y)
        let myOptions = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        // let potentialOptions = this.BoardState.GetPotentialGuesses()
        let options = this.BoardState.GetPotentialGuesses()
        // let options: string[] = []
        let myBox: string[] = []
        let maxX = cell.X - (cell.X % Math.sqrt(this.BoardState.size)) + Math.sqrt(this.BoardState.size)
        let maxY = cell.Y - (cell.Y % Math.sqrt(this.BoardState.size)) + Math.sqrt(this.BoardState.size)
        for(let x = cell.X - (cell.X % Math.sqrt(this.BoardState.size)); x < maxX; x++) {
            for(let y = cell.Y - (cell.Y % Math.sqrt(this.BoardState.size)); y < maxY; y++) {
                let cellValue = this.BoardState.GetCell(x, y)
                let cellOptions:string[] = []
                myBox.push(cellValue)
                if (cellValue !== "-") continue
                if (cell.X === x && cell.Y === y) continue
                let myRow = this.BoardState.GetRow(x)
                let myColumn = this.BoardState.GetColumn(y)
                if (myRow === undefined || myColumn === undefined) continue
                for(let i = 0; i < myRow?.length; i++){
                    if (myRow[i] !== "-" && cellOptions.indexOf(myRow[i]) === -1) {
                        cellOptions.push(myRow[i])
                    }
                    if (myColumn[i] !== "-" && cellOptions.indexOf(myColumn[i]) === -1) {
                        cellOptions.push(myColumn[i])
                    }
                }
                options = options.filter((value) => {
                    return cellOptions.indexOf(value) !== -1
                })
            }
        }
        options = options.filter((value) => {
            return myBox?.indexOf(value) === -1
        })

        options = options.filter((val) => {
            return myOptions?.indexOf(val) !== -1
        })
        if (options.length > 0) {
            return options
        } else {
            return myOptions
        }
    }
    
}

export default LastRemainingMethod