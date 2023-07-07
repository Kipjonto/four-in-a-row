import React, { useState } from 'react';
import './App.css';


const Playground = () => {
  const EMPTY_BOARD = [ [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0]];

  const COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7];
  const ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

  const [player, setPlayer] = useState(1);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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

    // checks bounds to avoid "list index out of range" error
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
    if (player === 1) {
      setFirstScore(prev => prev + 1);
    } 
    else {
      setSecondScore(prev => prev + 1);
    }
    setIsPlaying(false);
  }

  function restartGame() {
    setBoard(EMPTY_BOARD);
    setIsPlaying(true);
  }

  const CellsContainer = () => {
    return (
      <div className='cell-container'>
      { ROWS.map( yIndex =>
          <div className='cells-row'
               key={yIndex}>
            {COLUMNS.map( xIndex => 
              <div 
                className='cell' 
                key={xIndex}
                style={ !(board[yIndex][xIndex] === 0) 
                        ? board[yIndex][xIndex] === 1 
                        ? { backgroundColor: 'red' } 
                        : { backgroundColor: 'blue' }
                        : {} }
              />
            )} </div>
        )} </div>
    );
  }

  const ButtonsArea = () => {
    return (
      <div className='buttons-row'>
      { COLUMNS.map(
          el => <div className='flex-center-center buttons' key={el} 
                     onClick={() => handleClick(el)}>▲</div>
      )} </div>
    );
  }

  const ScoreTable = () => {
    return (
      <div className='players-display'>
        <h1 className='flex-center-center score' style={player === 1 ? {backgroundColor: 'red'} : {color: 'red'}}>
          {firstScore}</h1>
        <h1 className='flex-center-center score' style={player === -1 ? {backgroundColor: 'blue'} : {color: 'blue'}}>
          {secondScore}</h1>
      </div>
    );
  }

  return (
    <div className='flex-center-center canvas'>
      <CellsContainer />
      <ButtonsArea />
      <ScoreTable />
      <div className='flex-center-center button--restart' onClick={restartGame}>⭮</div>
    </div>
  );
}


export default Playground;