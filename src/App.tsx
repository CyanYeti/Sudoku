import React, { useState } from "react";
import SudokuBoard from "./SudokuBoard";
import ReactSlider from "react-slider";
import Board from "./backend/Board";
import CommandFactory from "./backend/Commands/CommandFactory";
import {ParseFile} from "./backend/ParseFile"

import './App.css';
import { CheckSolvedBoard } from "./backend/SolvedChecker";

const DEFAULTSIZE = 9

const App = () => {
  const commandFactory = new CommandFactory()
  // const board = new Board(null)
  const [sliderValue, setSliderValue] = useState(.01);
  const [boardSize, setBoardSize] = useState(DEFAULTSIZE);
  // const [file, setFile] = useState('');
  const [board, setBoard] = useState(new Board(DEFAULTSIZE))
  const [solved, setSolved] = useState(false)
  const [method, setMethod] = useState("combined")

  // const file = new ParseFile('.\\SamplePuzzles\\Input\\Puzzle-9x9-0001.txt').getFile();

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0)) {
        let temp = new ParseFile().processFileWrapper(e.target.files.item(0)).then(result => {
          // console.log(result)
          commandFactory.CreateAndDo("load", [board, result, DEFAULTSIZE])
        })
        // setFile(tempfile)
        // console.log(file)
    }
}


  // render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="SideBySide">
          <div>
              <SudokuBoard boardSize={boardSize} board={board}/>
            </div>
            <div className="Menu">
              <div>
                <button onClick={() => {commandFactory.CreateAndDo("undo", [])}}>Back</button>
                <button onClick={() => {commandFactory.CreateAndDo("run", [board, method])}}>Play</button>
                <button onClick={() => {commandFactory.CreateAndDo("redo", [])}}>Next</button>
              </div>
              <div>
                <select id="method-selector" onChange={(e) => {setMethod(e.target.value)}}>
                  <option value="combined">Combined</option>
                  <option value="guessing">Guessing</option>
                  <option value="bt">Backtracking</option>
                  <option value="bt">Backtracking</option>
                  <option value="bt">Backtracking</option>
                  <option value="bt">Backtracking</option>
                </select>
              </div>
              <div>
                <ReactSlider
                  className="speedSlider"
                  trackClassName="speedSlider-track" 
                  thumbClassName="speedSlider-thumb"
                  min={.01}
                  max={5}
                  step={.01}
                  onChange={(value) => {setSliderValue(value)}}
                />
                <div>
                  {sliderValue} s
                </div>
                <div>
                  <input type='file' onChange={e => selectFile(e)}/>
                </div>
                <button>Manual</button>
                <button>Export</button>
                <button onClick={(e) => setSolved(CheckSolvedBoard(board))}>Check Solution: {String(solved)}</button>
                {/* <input type="" defaultValue={9} onChange={e => {
                  if(Number(e.target.value) !== 0 && Number.isInteger(Math.sqrt(Number(e.target.value)))) {
                    setBoardSize(Number(e.target.value));
                  }
                }}/> */}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
}

export default App;
