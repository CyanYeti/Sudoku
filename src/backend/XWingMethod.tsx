import CellSolutionTemplate from "./CellSolutionTemplate";

class XWingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        // In a row check for cells that have the same values
        // let myRow = this.BoardState.GetRow(cell.X)
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        // let allPotentialsInRow:string[][] = [[]]
        // let indexes:number[] = []
        // // get cells row
        // myRow?.forEach((value, index) => {
        //     // Don't grab me
        //     if (index === cell.Y) return
        //     // Only take it if the value is empty
        //     if (this.BoardState.GetCell(cell.X, index) !== "-") return
            
        //     // Get guesses of each cell in row
        //     allPotentialsInRow.push(this.BoardState.GetCellGuesses(cell.X, index))
        //     indexes.push(index)
        // })
        let pairIndex = { X: -1, Y: -1 }
        for(let firstPairX = 0; firstPairX < this.BoardState.size; firstPairX++) {
            let firstRow = this.BoardState.GetRow(firstPairX)
            let firstRowPotentials:string[][] = [[]]
            let indexes:number[] = []
            firstRow?.forEach((value, index) => {
                // Don't grab me
                if (index === cell.Y) return
                // Only take it if the value is empty
                if (this.BoardState.GetCell(cell.X, index) !== "-") return
                
                // Get guesses of each cell in row
                firstRowPotentials.push(this.BoardState.GetCellGuesses(cell.X, index))
                indexes.push(index)
            })
            for(let mainY = 0; mainY<this.BoardState.size; mainY++)
            firstRowPotentials.forEach((value, index) => {
                // if we find a matching spot, check other rows
                if(this.BoardState.GetCellGuesses(firstPairX, mainY).toString() === value.toString()) {
                    pairIndex.X = cell.X
                    pairIndex.Y = indexes[index]
                    // Check all other rows for a pair
                    for(let i = 0; i < this.BoardState.size; i++) {
                        let rowPotential: string[][] = [[]]
                        this.BoardState.GetRow(i)?.forEach((rowCell, rowIndex) => {
                            rowPotential.push(this.BoardState.GetCellGuesses(i, rowIndex))
                        })
                        if (rowPotential[cell.Y]?.toString() === rowPotential[pairIndex.Y]?.toString()) {
                            // If at the matching indexs, they are also a pair, check there is overlap between the four
                            let overlap = this.BoardState.GetPotentialGuesses()
                            // Keep only guesses in each of the 4 pairs, but one need to check 2, one from each
                            overlap = overlap.filter((potentialGuesses) => {
                                return rowPotential[cell.Y].indexOf(potentialGuesses) !== -1
                            })
                            overlap = overlap.filter((potentialGuesses) => {
                                return this.BoardState.GetCellGuesses(firstPairX, mainY).indexOf(potentialGuesses) !== -1
                            })
                            if (overlap.length !== 0) console.log(overlap)
                            // This overlap can be removed from the two columns
    
                        }
                    }
    
                }
            })
        }
        // If we didn't have a pairing, return
        if (pairIndex.X === -1 && pairIndex.Y === -1) return myGuesses
        // check other rows that have a pair in the same y with overlapping values
        // overlapping values can be removed from other rows in the two columns 
        return []
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        return []
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        return []
    }

}

export default XWingMethod