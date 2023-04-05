import React, { Component, useState, useEffect } from "react";
import { Observer } from "./Observer";

import './SudokuBoard.css';
import Board from "./backend/Board";

//= (props: {boardSize: number})  =>
type Props = {
    boardSize: number,
    board: Board,
}
type State = {
    test: number,
    history: any[],
    board: Board,
    size: number,
}

class SudokuBoard extends Component<Props, State> implements Observer  {
    constructor (props: Props) {
        super(props);
        this.state = {
            test: 0,
            history: [],
            board: this.props.board,
            size: this.props.boardSize,
        };
        this.state.board.Subscribe(this)
    }
    
    
    Update(newState: any) {
        this.state.history.push(newState);
        this.setState({size: newState.size})
        this.setState({board: newState})
        // console.log(this.state.history.length)
        // this.forceUpdate()
    }
    boxes: any;
    columnsSize: any;
    CreateBoard() {
        console.log(this.state.board)

        let currentSize = this.state.size;
        let sizeArray = Array.from(Array(currentSize).keys())
        let columnSize = Array.from(Array(Math.sqrt(currentSize)).keys()).map(() => {
            return "1.5rem "
        })
        // const [test, setTest] = useState('');

        // Create the set of cells
        let cellsIndexs: any[] = []
        for(let i = 0; i < currentSize; i++) {
            let temp = sizeArray.map((value, index) => {
                    let rootSize = Math.sqrt(currentSize)
                                    // were am i in the cell            //but nxn                       // column cell              // row cell
                    let sumIndex = (index + (currentSize - rootSize) * Math.trunc(index / rootSize)) + ((i % rootSize)*rootSize) + Math.trunc(i / rootSize)*rootSize*currentSize
                    // console.log("i: " + i + " | index: " + index +" = " +sumIndex + " | cell: " + Math.trunc(i / rootSize)*rootSize*currentSize)
                    return sumIndex
                })
                cellsIndexs.push(temp);
        }
        let cells: any[] = []
        // console.log(this.state.board)
        cellsIndexs.forEach(boxVals => {
            cells.push(boxVals.map((value: number) => {
                // console.log(this.state.board.GetCellEditablity(value))
                return <input type="text" className="item" 
                    disabled={!this.state.board.GetCellEditablity(value)}
                    defaultValue={(this.state.board.GetCell(value) === '-') ? '' : this.state.board.GetCell(value)}
                    onChange={e => {
                        this.setState({test: currentSize});
                    }
                } />
        }))})

        let rem = columnSize.toString().replaceAll(",","")
        this.boxes = sizeArray.map((value, index) => {
            return <div 
                className="boxContainer" 
                style={{gridTemplateColumns: rem}}>
                    {cells[index]}
                </div>
        })
        // this.columnsSize = rem.replaceAll("1.5", String(2*Math.sqrt(currentSize)));
        this.columnsSize = rem.replaceAll("1.5", String(1.5*Math.sqrt(currentSize)));
    }
    render() {
        this.CreateBoard()
        return (
        <div key={this.props.boardSize} className="SudokuBoard">
            <header className="SudokuBoard-header">
                Sudoku Board Solver
                <div>
                    Size: {this.state.board.size}
                </div>
                <div className="boardContainer" style={{gridTemplateColumns: this.columnsSize}}>
                    {this.boxes}
                </div>
                
            </header>
        </div>
        );
    }
}

export default SudokuBoard;
