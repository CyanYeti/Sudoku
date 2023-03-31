import React, { useState } from "react";
import SudokuBoard from "./SudokuBoard";
import ReactSlider from "react-slider";
import {ParseFile} from "./backend/ParseFile"

import './App.css';


const App = () => {
  const [sliderValue, setSliderValue] = useState(.01);
  const [boardSize, setBoardSize] = useState(9);
  const [file, setFile] = useState('');

  // const file = new ParseFile('.\\SamplePuzzles\\Input\\Puzzle-9x9-0001.txt').getFile();

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0)) {
        let temp = new ParseFile().processFileWrapper(e.target.files.item(0)).then(result => {
          console.log(result)
        })
        // setFile(tempfile)
        // console.log(file)
    }
}


  // render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <button>Back</button>
            <button>Play</button>
            <button>Next</button>
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
              {sliderValue} ms
            </div>
          </div>
          <div>
            {/* <button>Import</button> */}
            <div>
              <input type='file' onChange={e => selectFile(e)}/>
            </div>
            <button>Manual</button>
            <button>Export</button>
            <input type="" defaultValue={9} onChange={e => {
              if(Number(e.target.value) !== 0 && Number.isInteger(Math.sqrt(Number(e.target.value)))) {
                setBoardSize(Number(e.target.value));
              }
            }}/>
          </div>
          <div>
            <SudokuBoard boardSize={boardSize} file={file}/>
          </div>
        </header>
      </div>
    );
}

export default App;
