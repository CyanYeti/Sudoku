import CellSolutionTemplate from './CellSolutionTemplate'

export class BackTrackingMethod extends CellSolutionTemplate {
    protected CheckRow(cell: { X: number; Y: number }): string[] {
        throw new Error('Method not implemented.')
    }
    protected CheckColumn(cell: { X: number; Y: number }): string[] {
        throw new Error('Method not implemented.')
    }
    protected CheckBox(cell: { X: number; Y: number }): string[] {
        throw new Error('Method not implemented.')
    }
    
}

export default BackTrackingMethod