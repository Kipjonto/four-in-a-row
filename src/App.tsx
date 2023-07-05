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

  const [state, setState] = useState({
    player: 1,
    board: EMPTY_BOARD,
    firstScore: 0,
    secondScore: 0,
    isPlaying: true,
    columns: [0, 1, 2, 3, 4, 5, 6, 7],
    rows: [0, 1, 2, 3, 4, 5, 6, 7],
  });

  function handleClick(xIndex: number) {
    for (let i = 7; i >= 0; i--) {
      if (state.board[i][xIndex] === 0 && state.isPlaying) {
        let boardCopy = state.board;
        boardCopy[i][xIndex] = state.player;

        setState({...state, board: boardCopy});

        checkWin(i, xIndex);

        if (state.player == 1) {
          setState({...state, player: -1});
        }
        else {
          setState({...state, player: 1});
        }

        break;
      }
    }
  }

  function checkWin(y:number, x:number) {
    checkHorizontalWin(y);

    // checks bounds to avoid "list index out of range" error
    if (y <= 4) {
      if (state.board[y][x] + state.board[y+1][x] + 
          state.board[y+2][x] + state.board[y+3][x] == state.player * 4) {
        callResult(state.player);
      }
    }

    checkDiagonalWin(y, x, 'LeftTop->RightBottom');
    checkDiagonalWin(y, x, 'LeftBottom->RightTop');
  }

  function checkHorizontalWin(y: number) {
    let sum = 0;

    for (let i = 0; i < state.board[y].length; i++) {
      if (state.board[y][i] === state.player) {
        sum += state.player;
      }
      else {
        sum = 0;
      }

      if (sum === state.player * 4) {
        callResult(state.player);
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
      if (state.board[yCopy][xCopy] == state.player) {
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
        callResult(state.player);
        break;
      }
    }
  }

  function callResult(player: number){
    if (player == 1) {
      setState({...state, firstScore: state.firstScore + 1});
    } 
    else {
      setState({...state, secondScore: state.secondScore + 1});
    }
    setState({...state, isPlaying: false});
  }

  function restartGame() {
    setState({...state, board: EMPTY_BOARD,
                        isPlaying: true});
  }

  const CellsContainer = () => {
    return (
      <div className='cell-container'>
      { state.rows.map( yIndex =>
          <div className='cells-row'
               key={yIndex}>
            {state.columns.map( xIndex => 
              <div 
                className='cell' 
                key={xIndex}
                style={ !(state.board[yIndex][xIndex] === 0) 
                        ? state.board[yIndex][xIndex] === 1 
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
      { state.columns.map(
          el => <div className='buttons' key={el} 
                     onClick={() => handleClick(el)}>▲</div>
      )} </div>
    );
  }

  const ScoreTable = () => {
    return (
      <div className='players-display'>
        <h1 className='score' style={state.player === 1 ? {backgroundColor: 'red'} : {color: 'red'}}>
          {state.firstScore}</h1>
        <h1 className='score' style={state.player === -1 ? {backgroundColor: 'blue'} : {color: 'blue'}}>
          {state.secondScore}</h1>
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
  )
}


export default Playground;