import CellSolutionTemplate from "./CellSolutionTemplate";

class NakedPairMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        let myRow = this.BoardState.GetRow(cell.X)
        let newGuesses = this.BoardState.GetPotentialGuesses()
        myRow?.forEach((value, index) => {
            // Get my guesses, NOT THIS
            // Get guesses of each cell in row
            // Check if any of them are exactly equal and length 2. 
            // Remove those two numbers from me
            // Return my new options
        })
        return newGuesses
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }

}

export default NakedPairMethod