/* eslint-disable no-loop-func */
import CellSolutionTemplate from "./CellSolutionTemplate";

class XWingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        // In a row check for cells that have the same values
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        if (this.BoardState.GetCell(cell.X, cell.Y) !== "-") return myGuesses

        let overlap = this.BoardState.GetPotentialGuesses()
        let reducedMyGuesses = myGuesses
        // Check each Y in my column
        for(let firstPairX = 0; firstPairX < this.BoardState.size; firstPairX++) {
            // get the first row to check
            let row = this.BoardState.GetRow(firstPairX)
            let firstRowPotentials:string[][] = []
            // let indexes:number[] = []
            row?.forEach((value, index) => {
                // Get guesses of each cell in row
                firstRowPotentials.push(this.BoardState.GetCellGuesses(firstPairX, index))
                // indexes.push(index)
            })
            for(let firstPairY = 0; firstPairY<this.BoardState.size; firstPairY++) {
                // Don't check the same cell as me
                if (firstPairY === cell.Y) continue
                if (firstRowPotentials[firstPairY].toString() === firstRowPotentials[cell.Y].toString()) {
                    //If we find a pair see if we have a second pair
                    for(let secondPairX = firstPairX + 1; secondPairX < this.BoardState.size; secondPairX++) {
                        // get the first row to check
                        let row = this.BoardState.GetRow(secondPairX)
                        let secondRowPotentials:string[][] = []
                        // let indexes:number[] = []
                        row?.forEach((value, index) => {
                            // Get guesses of each cell in row
                            secondRowPotentials.push(this.BoardState.GetCellGuesses(secondPairX, index))
                            // indexes.push(index)
                        })
                        for(let secondPairY = 0; secondPairY<this.BoardState.size; secondPairY++) {
                            // Don't check the same cell as me
                            // if (secondPairY === cell.Y) continue
                            if (secondPairY !== firstPairY) continue
                            if (this.BoardState.GetCell(firstPairX, cell.Y) !== "-") continue
                            if (this.BoardState.GetCell(firstPairX, firstPairY) !== "-") continue
                            if (this.BoardState.GetCell(secondPairX, cell.Y) !== "-") continue
                            if (this.BoardState.GetCell(secondPairX, secondPairY) !== "-") continue
                            // if (secondPairX === 5) console.log(secondRowPotentials)
                            // if (secondPairX === 5) console.log(secondRowPotentials[cell.Y].toString() + " :" + cell.Y)
                            // if (secondPairX === 5) console.log(secondRowPotentials[secondPairY].toString() + " :" + secondPairY)
                            if (secondRowPotentials[secondPairY].toString() === secondRowPotentials[cell.Y].toString()) {
                                // We should now have two pairs with the columns cell.Y and 
                                // Find the overlap between the 4
                                overlap = overlap.filter((potentialGuesses) => {
                                    return firstRowPotentials[firstPairY].indexOf(potentialGuesses) !== -1
                                })
                                overlap = overlap.filter((potentialGuesses) => {
                                    return secondRowPotentials[secondPairY].indexOf(potentialGuesses) !== -1
                                })
                                // Make sure the overlap of the pair only occurs at each of pairs
                                // We need to be the only two cells with the overlap in the row
                                let onlyPairs = true
                                for(let i = 0; i < firstRowPotentials.length; i++) {
                                    if (i === cell.Y || i === secondPairY) continue
                                    overlap.forEach((overlapValue) => {
                                        if(firstRowPotentials[i].indexOf(overlapValue) !== -1) {
                                            onlyPairs = false
                                        }
                                        if(secondRowPotentials[i].indexOf(overlapValue) !== -1) {
                                            onlyPairs = false
                                        }
                                    })
                                }
                                if(!onlyPairs) continue
                                // If we are one of the pairs, don't reduce
                                if(cell.X === firstPairX && cell.Y === firstPairY) continue
                                if(cell.X === firstPairX) continue
                                if(cell.X === secondPairX && cell.Y === secondPairY) continue
                                if(cell.X === secondPairX) continue
                                reducedMyGuesses = reducedMyGuesses.filter((val) => {
                                    return overlap.indexOf(val) === -1
                                })
                            }
                        }
                    }
                }
            }
        }
        return reducedMyGuesses
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        // In a row check for cells that have the same values
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        if (this.BoardState.GetCell(cell.X, cell.Y) !== "-") return myGuesses

        let overlap = this.BoardState.GetPotentialGuesses()
        let reducedMyGuesses = myGuesses
        // Check each Y in my column
        for(let firstPairY = 0; firstPairY < this.BoardState.size; firstPairY++) {
            // get the first row to check
            let column = this.BoardState.GetColumn(firstPairY)
            let firstColumnPotentials:string[][] = []
            // let indexes:number[] = []
            column?.forEach((value, index) => {
                // Get guesses of each cell in row
                firstColumnPotentials.push(this.BoardState.GetCellGuesses(index, firstPairY))
                // indexes.push(index)
            })
            for(let firstPairX = 0; firstPairX<this.BoardState.size; firstPairX++) {
                // Don't check the same cell as me
                if (firstPairX === cell.X) continue
                if (firstColumnPotentials[firstPairX].toString() === firstColumnPotentials[cell.X].toString()) {
                    //If we find a pair see if we have a second pair
                    for(let secondPairY = firstPairY + 1; secondPairY < this.BoardState.size; secondPairY++) {
                        // get the first row to check
                        let column = this.BoardState.GetColumn(secondPairY)
                        let secondColumnPotentials:string[][] = []
                        // let indexes:number[] = []
                        column?.forEach((value, index) => {
                            // Get guesses of each cell in row
                            secondColumnPotentials.push(this.BoardState.GetCellGuesses(index, secondPairY))
                            // indexes.push(index)
                        })
                        for(let secondPairX = 0; secondPairX<this.BoardState.size; secondPairX++) {
                            // Don't check the same cell as me
                            // if (secondPairY === cell.Y) continue
                            if (secondPairX !== firstPairX) continue
                            if (this.BoardState.GetCell(cell.X, firstPairY) !== "-") continue
                            if (this.BoardState.GetCell(firstPairX, firstPairY) !== "-") continue
                            if (this.BoardState.GetCell(cell.X, secondPairY) !== "-") continue
                            if (this.BoardState.GetCell(secondPairX, secondPairY) !== "-") continue
                            // if (secondPairX === 5) console.log(secondRowPotentials)
                            // if (secondPairX === 5) console.log(secondRowPotentials[cell.Y].toString() + " :" + cell.Y)
                            // if (secondPairX === 5) console.log(secondRowPotentials[secondPairY].toString() + " :" + secondPairY)
                            if (secondColumnPotentials[secondPairX].toString() === secondColumnPotentials[cell.X].toString()) {
                                // We should now have two pairs with the columns cell.Y and 
                                // Find the overlap between the 4
                                overlap = overlap.filter((potentialGuesses) => {
                                    return firstColumnPotentials[firstPairX].indexOf(potentialGuesses) !== -1
                                })
                                overlap = overlap.filter((potentialGuesses) => {
                                    return secondColumnPotentials[secondPairX].indexOf(potentialGuesses) !== -1
                                })
                                // Make sure the overlap of the pair only occurs at each of pairs
                                // We need to be the only two cells with the overlap in the row
                                let onlyPairs = true
                                for(let i = 0; i < firstColumnPotentials.length; i++) {
                                    if (i === cell.X || i === secondPairX) continue
                                    overlap.forEach((overlapValue) => {
                                        if(firstColumnPotentials[i].indexOf(overlapValue) !== -1) {
                                            onlyPairs = false
                                        }
                                        if(secondColumnPotentials[i].indexOf(overlapValue) !== -1) {
                                            onlyPairs = false
                                        }
                                    })
                                }
                                if(!onlyPairs) continue
                                // If we are one of the pairs, don't reduce
                                if(cell.X === firstPairX && cell.Y === firstPairY) continue
                                if(cell.Y === firstPairY) continue
                                if(cell.X === secondPairX && cell.Y === secondPairY) continue
                                if(cell.Y === secondPairY) continue
                                reducedMyGuesses = reducedMyGuesses.filter((val) => {
                                    return overlap.indexOf(val) === -1
                                })
                            }
                        }
                    }
                }
            }
        }
        return reducedMyGuesses
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        // This method has no box check
        return this.BoardState.GetCellGuesses(cell.X, cell.Y)
    }

}

export default XWingMethod