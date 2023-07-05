import React, { useState } from 'react';
import './App.css';


interface CellsRowProps {
  amount: Array<number>;
  board: Array<Array<number>>;
  YRowIndex: number;
}

function CellsRow(props: CellsRowProps) {
  return (
    <div className='cells-row'>
      {props.amount.map(
        el =>  
        <div 
          className='cell' 
          style={ !(props.board[props.YRowIndex][el] === 0) 
                  ? props.board[props.YRowIndex][el] === 1 
                  ? { backgroundColor: 'red' } 
                  : { backgroundColor: 'blue' }
                  : {} }
        />
      )}              
    </div>
  )
}


export default function Playground() {
  const emptyBoard = [[0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0]];

  let [player, setPlayer] = useState(1);
  let [board, setBoard] = useState(emptyBoard);
  let [firstScore, setFirstScore] = useState(0);
  let [secondScore, setSecondScore] = useState(0);
  let [isPlaying, setIsPlaying] = useState(true);

  function handleClick(xIndex: number) {
    for (let i = 7; i >= 0; i--) {
      if (board[i][xIndex] === 0 && isPlaying) {
        let boardCopy = board;
        boardCopy[i][xIndex] = player;

        setBoard(boardCopy);

        checkWin(i, xIndex);

        if (player == 1) {
          setPlayer(-1);
        }
        else {
          setPlayer(1);
        }

        break;
      }
    }
  }

  function checkWin(y:number, x:number) {
    checkHorizontalWin(y);

    if (y <= 4) {
      if (board[y][x] + board[y+1][x] + 
          board[y+2][x] + board[y+3][x] == player * 4) {
        callResult(player);
      }
    }

    checkDiagonalWin(y, x, 'LeftTop->RightBottom');
    checkDiagonalWin(y, x, 'LeftBottom->RightTop');
  }

  function checkHorizontalWin(y: number) {
    let sum = 0;

    for (let i = 0; i < board[y].length; i++) {
      if (board[y][i] === player) {
        sum += player;
      }
      else {
        sum = 0;
      }

      if (sum === player * 4) {
        callResult(player);
        break;
      }
    }
  }

  function checkDiagonalWin(y: number, x: number, variance: string) {
    let sum = 0;

    let xCopy = x;
    let yCopy = y;

    while (xCopy > 0 && ((yCopy < 7 && variance === 'LeftBottom->RightTop') 
       || (yCopy > 0 && variance === 'LeftTop->RightBottom'))) {
      xCopy--;
      
      if (variance === 'LeftBottom->RightTop'){
        yCopy++;
      }
      else {
        yCopy--;
      }
    }

    while (yCopy < 8 && yCopy >= 0 && xCopy < 8){
      if (board[yCopy][xCopy] == player) {
        sum++;
      }
      else {
        sum = 0;
      }

      xCopy++;

      if (variance === 'LeftBottom->RightTop'){
        yCopy--;
      }
      else {
        yCopy++;
      }

      if (sum === 4) {
        callResult(player);
        break;
      }
    }
  }

  function callResult(player: number){
    if (player == 1) {
      setFirstScore((prev) => prev + 1);
      setIsPlaying(false);
    }
    else {
      setSecondScore((prev) => prev + 1);
      setIsPlaying(false);
    }
  }

  function restartGame() {
    setBoard(emptyBoard);
    setIsPlaying(true);
  }

  return (
    <div className='canvas'>
      <div className='cell-container'>
        <CellsRow YRowIndex={0} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={1} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={2} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={3} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={4} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={5} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={6} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
        <CellsRow YRowIndex={7} amount={[0, 1, 2, 3, 4, 5, 6, 7]} board={board} />
      </div>
      <div className='buttons-row'>
        {[0,1,2,3,4,5,6,7].map(
          el => <div className='buttons' key={el} onClick={() => handleClick(el)}>▲</div>
        )}
      </div>
      <div className='players-display'>
        <h1 className='score' style={player === 1 ? {backgroundColor: 'red'} : {color: 'red'}}>{firstScore}</h1>
        <h1 className='score' style={player === -1 ? {backgroundColor: 'blue'} : {color: 'blue'}}>{secondScore}</h1>
      </div>
      <div className='button--restart' onClick={restartGame}>⭮</div>
    </div>
  )
}

