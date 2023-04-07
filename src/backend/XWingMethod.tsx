import CellSolutionTemplate from "./CellSolutionTemplate";

class XWingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }
    protected CheckColumn(cell: { X: number; Y: number; }): string[] {
        throw new Error("Method not implemented.");
    }
    protected CheckBox(cell: { X: number; Y: number; }): string[] {
        return [] // No box checking for x wing
    }

}

export default XWingMethod