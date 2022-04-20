import styles from './index.module.css';
import { useEffect, useState } from 'react';
import Cell from '../components/cell/cell';
import axios from 'axios';

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

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const genBoard = await axios.get('http://localhost:3333/api/board/20');
    setBoard(genBoard.data.board);
  };

  const tick = async () => {
    const currentBoard = await axios.post('http://localhost:3333/api/tick', {
      id: boardId,
    });
    console.log(currentBoard.data.generation);
    setBoard(currentBoard.data.board);
  };

  useEffect(() => {
    if (board && isBoardEmpty(board)) {
      console.log('board empty');
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
  }, [isAutoplayOn, isEmpty]);

  const setCell = (row: number, col: number) => {
    // game.setCell(row, col);
    if (board[row][col] == 1) {
      board[row][col] = 0;
    } else {
      board[row][col] = 1;
    }
  };

  const startGame = async () => {
    const g = await axios.post('http://localhost:3333/api/board', {
      board: board,
    });
    console.log(g.data);
    setBoard(g.data.board);
    setBoardId(g.data.id);
    setHasStarted(true);
  };

  const startWithDefault = () => {
    setHasStarted(true);
  };

  const restart = () => {
    setHasStarted(false);
  };

  const autotick = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Game of life</h1>
        <div className="board">
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
          <button
            onClick={startGame}
            className={`${styles.button} ${hasStarted && styles.activeButton}`}
          >
            start
          </button>
          <button
            onClick={startWithDefault}
            className={`${styles.button} ${hasStarted && styles.activeButton}`}
          >
            start with default
          </button>
          <button onClick={tick} className={styles.button}>
            tick
          </button>
          <button onClick={autotick} className={styles.button}>
            autoplay
          </button>
          <button onClick={restart} className={styles.button}>
            restart
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Index;
