import React, { useState } from 'react';
import './App.css';


const Playground = () => {
  const EMPTY_BOARD = Array<Array<string>>(8).fill(Array<string>(8).fill(''));
  const COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7];
  const ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

  const [player, setPlayer] = useState('red');
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [points, setPoints] = useState(0);

  function handleClick(xIndex: number) {
    for (let i = 7; i >= 0; i--) {
      if (board[i][xIndex] === '' && isPlaying) {
        let boardCopy = board;
        boardCopy[i][xIndex] = player;
        setBoard(boardCopy);

        countVerticalWin(i, xIndex);
        countHorizontalWin(i);
        countDiagonalWin(i, xIndex, 'LeftTop->RightBottom');
        countDiagonalWin(i, xIndex, 'LeftBottom->RightTop');

        if (player === 'red') {
          setPlayer('blue');
        } else {
          setPlayer('red');
        }

        if (points > 0) {
          callResult();
        }

        break;
      }
    }
  }

  function countVerticalWin(y: number, x: number) {
    if (y <= 4) {
      const isCommonColors = board[y][x] === board[y+1][x] && board[y][x] === board[y+2][x] 
                                                           && board[y][x] === board[y+3][x];
      const isPlayersColor = board[y][x] === player;

      if (isCommonColors && isPlayersColor) {
        setPoints(prev => prev + 1);
      }
    }
  }

  function countHorizontalWin(y: number) {
    let sum = 0;

    for (let i = 0; i < board[y].length; i++) {
      if (sum > 3 && board[y][i] != player) {
        setPoints(prev => prev + sum - 3);
        break;
      }

      if (board[y][i] === player) {
        sum += 1;
      } else {
        sum = 0;
      }
    }
  }

  function countDiagonalWin(y: number, x: number, variance: string) {
    let sum = 0;

    let xCopy = x;
    let yCopy = y;

    while (xCopy > 0 && ((yCopy < 7 && variance === 'LeftBottom->RightTop') 
       || (yCopy > 0 && variance === 'LeftTop->RightBottom'))) {
      xCopy--;
      
      if (variance === 'LeftBottom->RightTop') {
        yCopy++;
      } else {
        yCopy--;
      }
    }

    while (yCopy < 8 && yCopy >= 0 && xCopy < 8) {
      if (sum > 3 && board[yCopy][xCopy] != player) {
        setPoints(prev => prev + sum - 3);
        break;
      }

      if (board[yCopy][xCopy] === player) {
        sum++;
      } else {
        sum = 0;
      }

      xCopy++;

      if (variance === 'LeftBottom->RightTop') {
        yCopy--;
      } else {
        yCopy++;
      }
    }
  }

  function callResult() {
    if (player === 'red') {
      setFirstScore(prev => prev + points);
    } else {
      setSecondScore(prev => prev + points);
    }

    setIsPlaying(false);
    setPoints(0);
  }

  function restartGame() {
    setBoard(EMPTY_BOARD);
    setIsPlaying(true);
  }

  const CellsContainer = () => {
    interface Cell {
      y: number;
      x: number;
    }

    const Cell = (props: Cell) => {
      return (
        <div className='cell' style={{backgroundColor: `${board[props.y][props.x]}`}} />
      );
    }

    return (
      <div className='cell-container'>
        {ROWS
          .map( y => 
            <div className='cells-row' key={y}>
              {COLUMNS
                .map( x => <Cell y={y} x={x} key={x} /> )
              } 
          </div>
        )} 
      </div>
    );
  }

  const ButtonsArea = () => {
    interface Button {
      x: number;
    }

    const Button = (props: Button) => {
      return (
        <div className='buttons' onClick={() => handleClick(props.x)}>▲</div>
      );
    }

    return (
      <div className='buttons-row'>
      { COLUMNS
          .map( x => <Button x={x} key={x} /> )
      } 
      </div>
    );
  }

  const ScoreTable = () => {
    return (
      <div className='players-display'>
        <h1 className='score' style={player === 'red' ? {backgroundColor: 'red'} : {color: 'red'}}>
          {firstScore}</h1>
        <h1 className='score' style={player === 'blue' ? {backgroundColor: 'blue'} : {color: 'blue'}}>
          {secondScore}</h1>
      </div>
    );
  }

  return (
    <div className='canvas'>
      <CellsContainer />
      <ButtonsArea />
      <ScoreTable />
      <div className='button--restart' onClick={restartGame}>⭮</div>
    </div>
  );
}


export default Playground;