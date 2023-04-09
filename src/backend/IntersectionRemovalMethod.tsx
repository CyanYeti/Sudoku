/* eslint-disable no-loop-func */
import CellSolutionTemplate from "./CellSolutionTemplate";

class IntersectionRemovalMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        // console.log("")
        // console.log("")
        console.log("===========")
        console.log(cell.X + ", " + cell.Y)
        let myRow = this.BoardState.GetRow(cell.X)
        let myGuesses = this.BoardState.GetCellGuesses(cell.X, cell.Y)
        myRow?.forEach((value, index) => {
            // 
            let boxLength = Math.sqrt(this.BoardState.size)
            let left = cell.Y - (cell.Y % boxLength)
            let boxRowGuessesMerge: string[] = []
            // If it is my box, don't check it
            // console.log(left + " <= " + index + " < " + (left+boxLength) + ": " + (left <= index && index < left+boxLength))
            if (left <= index && index < left+boxLength) return
            // get a merged list of options in my row
            let multipleContains = false
            // console.log(index - (index % boxLength))
            for(let i = index - (index % boxLength); i < index - (index % boxLength) + boxLength; i++) {
                if(this.BoardState.GetCell(cell.X, i) !== "-") continue
                // console.log(i)
                // console.log(this.BoardState.GetCellGuesses(cell.X, i))
                boxRowGuessesMerge = boxRowGuessesMerge.concat(this.BoardState.GetCellGuesses(cell.X, i))
                boxRowGuessesMerge = boxRowGuessesMerge.filter((item, pos) => {
                    // If it was ever a duplicate its contained in multiple
                    if (boxRowGuessesMerge.indexOf(item) !== pos) multipleContains = true
                    return boxRowGuessesMerge.indexOf(item) === pos
                })
            }
            // console.log(multipleContains)
            if (!multipleContains) return
            // console.log(index)
            // console.log(boxRowGuessesMerge)
            let top = cell.X - (cell.X % boxLength)
            let otherBoxGuessesMerged: string[] = []
            // get a merged list of options not in my row
            let boxEdge = index - (index % boxLength);
            // let i = index - (index % boxLength); i < index - (index % boxLength) + boxLength; i++
            for(let x = top; x < top+boxLength; x++) {
                for(let y = boxEdge; y < boxEdge+boxLength; y++) {
                    if (x === cell.X) continue
                    if (this.BoardState.GetCell(x, y) !== "-") continue
                    // console.log((x) + ",: " + (y))
                    // console.log(this.BoardState.GetCellGuesses(x, y))
                    otherBoxGuessesMerged = otherBoxGuessesMerged.concat(this.BoardState.GetCellGuesses(x, y))
                    otherBoxGuessesMerged = otherBoxGuessesMerged.filter((item, pos) => otherBoxGuessesMerged.indexOf(item) === pos)
                }
            }
            // console.log(index)
            // console.log(boxRowGuessesMerge)
            // console.log(otherBoxGuessesMerged)
            // Remove any item that was in the other boxes
            boxRowGuessesMerge = boxRowGuessesMerge.filter((value) => {
                return otherBoxGuessesMerged.indexOf(value) === -1
            })
            // console.log(boxRowGuessesMerge)
            if (boxRowGuessesMerge.length > 0) {
                // console.log("Reducing")
                // console.log(boxRowGuessesMerge)
                // console.log(index)
                // Remove number that had something pointing at it
                myGuesses = myGuesses.filter((value) => {
                    return boxRowGuessesMerge.indexOf(value) === -1
                })
            }
        })
        console.log(myGuesses)
        return myGuesses
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        return this.BoardState.GetCellGuesses(cell.X, cell.Y)
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        return this.BoardState.GetCellGuesses(cell.X, cell.Y)
    }

}

export default IntersectionRemovalMethod