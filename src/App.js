import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const initMatrix = [];

function App() {

const [matrix, setMatrix] = useState(initMatrix);
const [matrixSize, setMatrixSize] = useState(3);
const [player, setPlayer] = useState("O");
const [selectedRow, setSelectedRow] = useState(null);
const [selectedColumn, setSelectedColumn] = useState(null);
const [winner, setWinner] = useState(false);
const [reset, setReset] = useState(false);

useEffect(() => {
  setWinner(false);
setSelectedColumn(null);
setSelectedRow(null);
const row = new Array(matrixSize).fill(null);
const tempMatrix = [];
for (let i=0; i<matrixSize; i++) {
  tempMatrix.push([...row]);
}
setMatrix(tempMatrix);
}, [reset]);

function clickHandler(rowIndex, columnIndex){
if(!matrix[rowIndex][columnIndex] && !winner) {
  setSelectedRow(rowIndex);
  setSelectedColumn(columnIndex);
let nextPlayer = player === "X" ? "O" : "X";
setPlayer(nextPlayer);
const matrixCopy = [...matrix];
matrixCopy[rowIndex][columnIndex] = nextPlayer;
setMatrix(matrixCopy);
}

}

function isWinner(){
// console.log('checking for winner')
let vertical = true;
let horizontal = true;
let diagonal_1 =true;
let diagonal_2 = true;

if(selectedColumn === null || selectedRow === null){
  return
}

for(let i = 0; i<matrixSize; i++){
if(matrix[i][selectedColumn] !== player){
horizontal = false;
}
if(matrix[i][selectedRow] !== player){
  vertical = false;
  }
  if(matrix[i][i] !== player){
    diagonal_1 = false;
    }
    if(matrix[i][matrixSize - i - 1] !== player){
      diagonal_2 = false;
      }

} 
 if(vertical || horizontal || diagonal_1 || diagonal_2) {
  setWinner(true);
}

}

useEffect(() => {
  if(!winner){
    isWinner();
  }
})

function resetGameHandler(){
setReset(!reset);
}

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <div className="box">
      <button onClick={resetGameHandler}>Reset Game</button>
    <div className="column">
      {
        matrix.map((value, columnIndex) => (
          <div>
{value.map((value2, rowIndex) => (
  <div className="row" onClick={()=>{clickHandler(rowIndex, columnIndex)}}>{matrix[rowIndex][columnIndex]}</div>
))}
          </div>
        ))
      }
    </div>
    <h2>{winner ? `The winner is player ${player}` : ''}</h2>
    </div>
    </div>
  );
}

export default App;
