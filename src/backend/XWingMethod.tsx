/* eslint-disable no-loop-func */
import CellSolutionTemplate from "./CellSolutionTemplate";

class XWingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        console.log(cell.X + ", " + cell.Y)

        // In a row check for cells that have the same values
        // let myRow = this.BoardState.GetRow(cell.X)
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        // let allPotentialsInRow:string[][] = [[]]
        // let indexes:number[] = []
        // // get cells row
        // 
        let overlap = this.BoardState.GetPotentialGuesses()
        let reducedMyGuesses = myGuesses
        let columnOne = -1
        let columnTwo = -1
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
            // eslint-disable-next-line no-loop-func
            firstRowPotentials.forEach((value, index) => {
                // if we find a matching spot, check other rows
                if(this.BoardState.GetCellGuesses(firstPairX, mainY).toString() === value.toString()) {
                    pairIndex.X = firstPairX
                    pairIndex.Y = indexes[index]
                    // Check all other rows for a pair
                    for(let i = 0; i < this.BoardState.size; i++) {
                        let rowPotential: string[][] = [[]]
                        this.BoardState.GetRow(i)?.forEach((rowCell, rowIndex) => {
                            rowPotential.push(this.BoardState.GetCellGuesses(i, rowIndex))
                        })
                        if (rowPotential[mainY]?.toString() === rowPotential[pairIndex.Y]?.toString()) {
                            // If at the matching indexs, they are also a pair, check there is overlap between the four
                            // Keep only guesses in each of the 4 pairs, but one need to check 2, one from each
                            overlap = overlap.filter((potentialGuesses) => {
                                return rowPotential[mainY].indexOf(potentialGuesses) !== -1
                            })
                            overlap = overlap.filter((potentialGuesses) => {
                                return this.BoardState.GetCellGuesses(firstPairX, mainY).indexOf(potentialGuesses) !== -1
                            })
                            // if (overlap.length !== 0) console.log(overlap)
                            // I have four pairs to check. firstPairX + mainY, firstPairX + pairIndex.Y, i +mainY, i+pairIndex.Y
                            // if (cell.X !== firstPairX && cell.Y !== mainY) return
                            // if (cell.X === firstPairX && cell.Y === pairIndex.Y) return
                            // if (cell.X === i && cell.Y === mainY) return
                            // if (cell.X === i && cell.Y === pairIndex.Y) return
                            console.log("x:" + i)
                            console.log(mainY + " " + pairIndex.Y)
                            console.log(rowPotential[mainY]?.toString())
                            console.log(rowPotential[pairIndex.Y]?.toString())
                            if (cell.Y === mainY || cell.Y === pairIndex.Y) return
                            console.log("Reduceing")
                            reducedMyGuesses = reducedMyGuesses.filter((value) => {
                                return overlap.indexOf(value) === -1
                            })
                            // console.log(reducedMyGuesses)
                            // This overlap can be removed from the two columns
                        }
                    }
                }
            })
        }

        // If we didn't have a pairing, return
        console.log(overlap)
        console.log(myGuesses)
        console.log(reducedMyGuesses)
        if (pairIndex.X === -1 && pairIndex.Y === -1) return myGuesses
        if (overlap.length === 0 ) return myGuesses
        // myGuesses =  myGuesses.filter((value) => {
        //     return overlap.indexOf(value) !== -1
        // })
        return reducedMyGuesses
        // If i am not one of ther pairs 
        // if (cell.Y, )

        // check other rows that have a pair in the same y with overlapping values
        // overlapping values can be removed from other rows in the two columns 
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        return this.BoardState.GetCellGuesses(cell.X, cell.Y)
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        return this.BoardState.GetCellGuesses(cell.X, cell.Y)
    }

}

export default XWingMethod