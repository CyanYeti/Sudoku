import React, { Component, useState, useEffect } from "react";
import { Observer } from "./Observer";

import './SudokuBoard.css';

//= (props: {boardSize: number})  =>
type Props = {
    boardSize: number,
    file: string,
}
type State = {
    test: number,
    history: any[],
}

class SudokuBoard extends Component<Props, State> implements Observer  {
    constructor (props: Props) {
        super(props);
        this.state = {
            test: 0,
            history: [],
        };
    }
    
    Update(state: any) {
        this.state.history.push(state);
        this.forceUpdate()
    }
    boxes: any;
    size: any;
    CreateBoard() {
        console.log(this.props.file)
        let sizeArray = Array.from(Array(this.props.boardSize).keys())
        let columnSize = Array.from(Array(Math.sqrt(this.props.boardSize)).keys()).map(() => {
            return "2rem "
        })
        // const [test, setTest] = useState('');
        let cells = sizeArray.map((value) => {
            return <input type="text" className="item" contentEditable="true" defaultValue={value}
                onChange={e => {
                    this.setState({test: this.props.boardSize});
                }
            } />
        })
        let rem = columnSize.toString().replaceAll(",","")
        this.boxes = sizeArray.map((value) => {
            return <div 
                className="boxContainer" 
                style={{gridTemplateColumns: rem}}>
                    {cells}
                </div>
        })
        this.size = rem.replaceAll("2", String(2*Math.sqrt(this.props.boardSize)));
    }
    render() {
        this.CreateBoard()
        return (
        <div key={this.props.boardSize} className="SudokuBoard">
            <div>{this.state.test}</div>
            <div>{this.props.boardSize}</div>
            <header className="SudokuBoard-header">
                Sudoku Board<div>
                    {this.props.file}
                </div>
                <div className="boardContainer" style={{gridTemplateColumns: this.size}}>
                    {this.boxes}
                </div>
                
            </header>
        </div>
        );
    }
}

export default SudokuBoard;
