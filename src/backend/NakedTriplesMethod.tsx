import CellSolutionTemplate from "./CellSolutionTemplate";

class NakedTripleMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        // Check row for cells that combine to be no more than three. Remove those numbers from me
        throw new Error("Method not implemented.");
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }

}

export default NakedTripleMethod