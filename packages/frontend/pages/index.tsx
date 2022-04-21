import styles from './index.module.css';
import { useEffect, useState } from 'react';
import Cell from '../components/cell/cell';
import axios, { AxiosResponse } from 'axios';
import {
  IResponseBoard,
  IResponseStart,
  IResponseTick,
} from '@gol-monorepo/interfaces';

const isBoardEmpty = (board: number[][]): boolean => {
  return board
    .map((row) => {
      return row.every((cell) => cell === 0);
    })
    .every((result) => result === true);
};

export function Index() {
  const [board, setBoard] = useState<number[][]>();
  const [boardId, setBoardId] = useState<string>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [size, setSize] = useState<string>('20');
  const [density, setDensity] = useState<string>('2');

  useEffect(() => {
    initialize();
  }, []);

  const api = 'https://gol-backend.herokuapp.com';
  // const api = 'http://localhost:3333';
  const initialize = async () => {
    try {
      const genBoard: AxiosResponse<IResponseBoard> = await axios.get(
        `${api}/api/board/${size}`
      );
      setBoard(genBoard.data.board);
    } catch (error) {
      console.error(error);
    }
  };

  const tick = async () => {
    try {
      const currentBoard: AxiosResponse<IResponseTick> = await axios.post(
        `${api}/api/tick`,
        {
          id: boardId,
        }
      );
      setBoard(currentBoard.data.board);
      // if (isAutoplayOn) {
      //   tick();
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (board && isBoardEmpty(board)) {
      setIsEmpty(true);
    }
  }, [board]);

  useEffect(() => {
    if (isAutoplayOn) {
      const interval = setInterval(async () => {
        await tick();
      }, 100);
      return () => clearInterval(interval);
    }
    // if (isAutoplayOn) {
    //   tick();
    // }
  }, [isAutoplayOn]);

  const setCell = (row: number, col: number) => {
    // game.setCell(row, col);
    if (board[row][col] == 1) {
      board[row][col] = 0;
    } else {
      board[row][col] = 1;
    }
  };

  const startGame = async () => {
    const g: AxiosResponse<IResponseStart> = await axios.post(
      `${api}/api/board`,
      {
        board: board,
      }
    );
    setBoard(g.data.board);
    setBoardId(g.data.id);
    setHasStarted(true);
  };

  const randomize = () => {
    board.map((row, i) => {
      row.map((col, j) => {
        const rand = getRandomInt(1, Number(density));
        if (rand == 1) board[i][j] = 1;
      });
    });
    startGame();
  };

  const restart = () => {
    setHasStarted(false);
  };

  const autoTick = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  const handleSize = (e: any) => {
    setSize(e.target.value);
  };

  const handleDensity = (e: any) => {
    setDensity(e.target.value);
  };

  const requestBoard = async () => {
    const genBoard = await axios.get(`${api}/api/board/${size}`);
    setBoard(genBoard.data.board);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Game of life</h1>
        <div className="board" data-testid="board">
          {board?.map((row: number[], rowIndex) => {
            return (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell: number, colIndex) => {
                  return (
                    <div key={`${rowIndex}-${colIndex}`}>
                      {hasStarted && (
                        <Cell isActive={cell == 1 ? true : false} />
                      )}
                      {!hasStarted && (
                        <Cell
                          isActive={false}
                          setCell={setCell}
                          row={rowIndex}
                          col={colIndex}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <nav>
          <div>
            <button
              onClick={startGame}
              className={`${styles.button} ${
                hasStarted && styles.activeButton
              }`}
            >
              start
            </button>
            <button
              onClick={randomize}
              className={`${styles.button} ${
                hasStarted && styles.activeButton
              }`}
            >
              randomize start
            </button>
            <input
              type={'number'}
              onChange={handleDensity}
              value={density}
              placeholder="Set density (2-5)"
              min={2}
              max={5}
              className={`${styles.button}`}
            />
          </div>
          <div>
            <button onClick={tick} className={styles.button}>
              tick
            </button>
            <button
              onClick={autoTick}
              className={`${styles.button} autoplay-${isAutoplayOn}`}
            >
              autoplay
            </button>
          </div>
          <button onClick={restart} className={styles.button}>
            restart
          </button>
          <div>
            <button onClick={requestBoard} className={`${styles.button}`}>
              Request custom board
            </button>
            <input
              type={'number'}
              onChange={handleSize}
              value={size}
              placeholder="Set size (1-100)"
              className={`${styles.button}`}
              min={3}
              max={100}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Index;
