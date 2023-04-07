import Board from "./Board";
// Single function that is static, not really but serves as a static class
export function CheckSolvedBoard(board: Board): boolean {
    let solved = true
    for(let i = 0; i < board.size; i++) {
        let temp = (checkRow(board, i))
        if (!temp) solved = false

        temp = (checkColumn(board, i))
        if (!temp) solved = false

        // temp = (checkBox(board, i))
        // TODO: Fix the checking box
        if (!temp) solved = false
    }

    


    return solved
} 

function checkRow(board: Board, x: number): boolean {
    let options = board.GetPotentialGuesses()
    let row = board.GetRow(x)
    options = options.filter((val) => {
        // console.log(this.BoardState.GetRow(cell.X))
        return row?.indexOf(val) === -1
    })
    if (options.length === 0) {
        return true
    }
    return false
}

function checkColumn(board: Board, y: number): boolean {
    let options = board.GetPotentialGuesses()
    let row = board.GetColumn(y)
    options = options.filter((val) => {
        // console.log(this.BoardState.GetRow(cell.X))
        return row?.indexOf(val) === -1
    })
    if (options.length === 0) {
        return true
    }
    return false
}

function checkBox(board: Board, x: number, y: number): boolean {
    let options = board.GetPotentialGuesses()

    let row = board.GetBox(x, y)
    options = options.filter((val) => {
        // console.log(this.BoardState.GetRow(cell.X))
        return row?.indexOf(val) === -1
    })
    if (options.length === 0) {
        return true
    }
    return false
}

