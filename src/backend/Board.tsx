// import { Observer } from "../Observer"
import Observable from "./Observable"

class Board extends Observable {
    private Board!: string[][]
    private BoardGuesses!: string[][][]
    private potentialGusses: string[] = []
    private Editable!: boolean[][]
    public size!: number
    constructor(size: number | null) {
        super()
        if (size !== null) {
            this.size = size
            // Create empty board
            this.Board = [[]]
            this.Board = Array.from({ length: size }, () => Array<string>(size).fill("-"));

            // Fill editable
            this.Editable = [[]]
            this.Editable = Array.from({ length: size }, () => Array<boolean>(size).fill(true));
            
            // Fill potential guesses
            this.BoardGuesses = [[[]]]
            // this.BoardGuesses = Array.from({ length: size }, () => Array.from({length: size}, () => Array.from({length: size}, (_,i) => {return String(i + 1) })))
            // this.BoardGuesses = Array.from({ length: size }, () => Array.from({length: size}, () => Array<string>(size).fill("-")))
            this.BoardGuesses = Array.from({ length: this.size }, () => Array.from({length: this.size}, () => Array.from({length: this.size}, (_,i) => {return String(i + 1) })))

            let defaultPotentialGusses = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","h","j","k","l","m","n","o","p","q","r","s","r","v","t","r","v","u","v","w","x","y","z"]
            this.potentialGusses = defaultPotentialGusses.splice(0).splice(0,this.size)
        }
    }
    
    public SetCell(newVal:string, x: number, y: number, newGuesses: string[] = [], initial: boolean = false) {
        // console.log(initial + " " + x  + " " + y  + " " + newVal)
        // editable is just to set initial state
        // console.log(this.Editable[x][y])
        // console.log(initial + " " + this.Editable[x][y])
        if (initial) {
            this.Board[x][y] = newVal
            this.Editable[x][y] = false //Initial cells cannot be changed
        } else if (this.Editable[x][y]) {
            this.Board[x][y] = newVal
            // this.BoardGuesses[x][y] = newGuesses
        }
        if (newVal !== "-") this.BoardGuesses[x][y] = [""+newVal]
        this.UpdateBoardGuesses()
        this.Notify(this.Clone())
    }
    public SetBoard(newBoard: Board) {
        this.Board = newBoard.Board;
        this.Editable = newBoard.Editable;
        this.BoardGuesses = newBoard.BoardGuesses;
        this.size = newBoard.size;
        this.Notify(this.Clone())
    }
    public SetPotentialGuesses(guesses: string[]) {
        this.potentialGusses = guesses
    }
    public GetPotentialGuesses() {
        return this.potentialGusses
    }
    public GetCellGuesses(x: number, y: number) {
        return this.BoardGuesses[x][y]
    }
    public SetCellGuesses(x: number, y: number, guesses: string[]){
        this.BoardGuesses[x][y] = guesses
        // this.Notify(this.Clone())
    }
    public CheckForSolvedCells() {
        this.Board.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (this.GetCellGuesses(x,y).length === 1) {
                    this.SetCell(this.GetCellGuesses(x,y)[0], x, y, [])
                }
            })
        })
    }
    private UpdateBoardGuesses() {
        // Update the cells potentials from their rows
        this.Board.forEach((row, x) => {
            row.forEach((cell, y) => {
                let myGuesses = this.GetCellGuesses(x,y)
                if (myGuesses.length <= 1) return
                // If my row contains a set number than remove it from possible pool
                myGuesses = myGuesses.filter((value) => {
                    return row.indexOf(value) === -1
                })
                this.SetCellGuesses(x, y, myGuesses)
            })
        })

        // Update the cells potentials from their columns
        this.Board.forEach((eh, y) => {
            let column = this.GetColumn(y)
            column?.forEach((cell, x) => {
                let myGuesses = this.GetCellGuesses(x,y)
                if (myGuesses.length <= 1) return
                // If my row contains a set number than remove it from possible pool
                myGuesses = myGuesses.filter((value) => {
                    return column?.indexOf(value) === -1
                })
                this.SetCellGuesses(x, y, myGuesses)
            })
        })

        // Update the cells potentials from their boxes
        for(let x = 0; x < this.size; x++) {
            for(let y = 0; y < this.size; y++) {
                let box = this.GetBox(x, y)
                let myGuesses = this.GetCellGuesses(x,y)
                box?.forEach((cell) => {
                    if (myGuesses.length <= 1) return
                    // If my row contains a set number than remove it from possible pool
                    myGuesses = myGuesses.filter((value) => {
                        return box?.indexOf(value) === -1
                    })
                    this.SetCellGuesses(x, y, myGuesses)
                })
            }
        }
    }

    public GetCell(x: number, y?: number) {
        if (y === undefined) {
            let X = Math.trunc(x / this.size)
            let Y = x % this.size
            // console.log("X: " + X + ", Y: "  +Y)
            // console.log(typeof Y)
            // console.log(this.Board)
            return this.Board[X][Y]
        }
        return this.Board[x][y]
    }
    public GetCellEditablity(x: number, y?: number) {
        if (y === undefined) {
            let X = Math.trunc(x / this.size)
            let Y = x % this.size
            if (X >= this.size || Y >= this.size) return false
            // console.log(this.size)
            // console.log(X + ", " + Y)
            // console.log(this.Editable)
            return this.Editable[X][Y]
        }
        return this.Editable[x][y]
    }
    public GetRow(x:number) {
        if (x>this.size) return
        return this.Board[x]
    }

    public GetColumn(y:number) {
        if(y>this.size) return
        let tempColumn: string[] = []
        this.Board.forEach((row) => {
            tempColumn.push(row[y])
        })
        return tempColumn
    }

    public GetBox(x:number, y:number) {
        if (x>this.size || y>this.size) return
        let tempBox: string[] = []
        let topLeft = {X:0, Y:0}
        topLeft.X = x - (x % Math.sqrt(this.size))
        topLeft.Y = y - (y % Math.sqrt(this.size))
        for(let i = 0; i < Math.sqrt(this.size); i++) {
            for(let j = 0; j < Math.sqrt(this.size); j++) {
                tempBox.push(this.Board[topLeft.X + i][topLeft.Y + j])
            }
        }
        // x % this.size
        return tempBox
    }

    public ClearBoard() {
        this.Board = [[]]
        this.Board = Array.from({ length: this.size }, () => Array<string>(this.size).fill('-'));

        // Fill editable
        this.Editable = [[]]
        this.Editable = Array.from({ length: this.size }, () => Array<boolean>(this.size).fill(true));
        
        // Fill potential guesses
        this.BoardGuesses = [[[]]]
        this.BoardGuesses = Array.from({ length: this.size }, () => Array.from({length: this.size}, () => Array.from({length: this.size}, (_,i) => {return String(i + 1) })))
   
        let defaultPotentialGusses = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","h","j","k","l","m","n","o","p","q","r","s","r","v","t","r","v","u","v","w","x","y","z"]
        this.potentialGusses = defaultPotentialGusses.splice(0).splice(0,this.size)
    }

    public Clone() {
        // return Object.assign({Board}, this)
        return Object.assign(Object.create(this), this)
    }
    
    
}

export default Board;