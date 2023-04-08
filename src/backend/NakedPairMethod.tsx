import CellSolutionTemplate from "./CellSolutionTemplate";

class NakedPairMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        let myRow = this.BoardState.GetRow(cell.X)
        let allPotentialsInRow:string[][] = [[]]
        myRow?.forEach((value, index) => {
            // Don't grab me
            if (index === cell.Y) return
            // Only take it if the value is empty
            if (this.BoardState.GetCell(cell.X, index) !== "-") return
            
            // Get guesses of each cell in row
            allPotentialsInRow.push(this.BoardState.GetCellGuesses(cell.X, index))
        })
        // Check if any of them are exactly equal and length 2.
        allPotentialsInRow = allPotentialsInRow.filter((value) => {
            if(value.length === 2) return true
            return false
        }) 
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        // console.log(myGuesses)
        // console.log(allPotentialsInRow)
        allPotentialsInRow.forEach((main, indexMain) => {
            allPotentialsInRow.forEach((value, indexSub) => {
                if (indexMain === indexSub) return
                if(main.toString() === value.toString()) {
                     // Remove those two numbers from me
                    myGuesses = myGuesses.filter((cellValue) => {
                        return value.indexOf(cellValue) === -1
                    })
                }
            })
        })
        // console.log(myGuesses)
        // Return my new options
        if (myGuesses.length > 0) {
            return myGuesses
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        let myColumn = this.BoardState.GetColumn(cell.Y)
        let allPotentialsInRow:string[][] = [[]]
        myColumn?.forEach((value, index) => {
            // Don't grab me
            if (index === cell.X) return
            // Only take it if the value is empty
            if (this.BoardState.GetCell(index, cell.Y) !== "-") return
            
            // Get guesses of each cell in row
            allPotentialsInRow.push(this.BoardState.GetCellGuesses(index, cell.Y))
        })
        // Check if any of them are exactly equal and length 2.
        allPotentialsInRow = allPotentialsInRow.filter((value) => {
            if(value.length === 2) return true
            return false
        }) 
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        allPotentialsInRow.forEach((main, indexMain) => {
            allPotentialsInRow.forEach((value, indexSub) => {
                if (indexMain === indexSub) return
                if(main.toString() === value.toString()) {
                    // Remove those two numbers from me
                    myGuesses = myGuesses.filter((cellValue) => {
                        return value.indexOf(cellValue) === -1
                    })
                }
            })
        })
        // Return my new options
        if (myGuesses.length > 0) {
            return myGuesses
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        let myBox = this.BoardState.GetBox(cell.X, cell.Y)
        let allPotentialsInRow:string[][] = [[]]
        let maxX = cell.X - (cell.X % Math.sqrt(this.BoardState.size)) + Math.sqrt(this.BoardState.size)
        let maxY = cell.Y - (cell.Y % Math.sqrt(this.BoardState.size)) + Math.sqrt(this.BoardState.size)
        for(let x = cell.X - (cell.X % Math.sqrt(this.BoardState.size)); x < maxX; x++) {
            for(let y = cell.Y - (cell.Y % Math.sqrt(this.BoardState.size)); y < maxY; y++) {
                if (this.BoardState.GetCell(x, y) !== "-") continue
                allPotentialsInRow.push(this.BoardState.GetCellGuesses(x, y))
            }
        }
        // Check if any of them are exactly equal and length 2.
        allPotentialsInRow = allPotentialsInRow.filter((value) => {
            if(value.length === 2) return true
            return false
        }) 
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        // console.log(myGuesses)
        // console.log(allPotentialsInRow)
        allPotentialsInRow.forEach((main, indexMain) => {
            allPotentialsInRow.forEach((value, indexSub) => {
                if (indexMain === indexSub) return
                if (myGuesses.toString() === value.toString()) return
                if (myGuesses.toString() === main.toString()) return
                if(main.toString() === value.toString()) {
                     // Remove those two numbers from me
                    myGuesses = myGuesses.filter((cellValue) => {
                        return value.indexOf(cellValue) === -1
                    })
                }
            })
        })
        // console.log(myGuesses)
        // Return my new options
        if (myGuesses.length > 0) {
            return myGuesses
        } else {
            return this.BoardState.GetCellGuesses(cell.X, cell.Y)
        }
    }

}

export default NakedPairMethod