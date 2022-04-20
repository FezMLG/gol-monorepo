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
  // const [game, setGame] = useState<any>();
  const [board, setBoard] = useState<number[][]>();
  const [boardId, setBoardId] = useState<string>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    // const lboard = [
    //   [0, 0, 0, 0, 0],
    //   [0, 1, 1, 0, 0],
    //   [0, 1, 0, 0, 0],
    //   [0, 0, 0, 1, 1],
    //   [0, 0, 0, 1, 0],
    // ];
    const genBoard = await axios.get('http://localhost:3333/api/board/5');
    // const g = new GameOfLife(10, 10);
    console.log('genBoard', genBoard.data);
    setBoard(genBoard.data.board);
  };

  const tick = async () => {
    // game.tick();
    // let currentBoard = game.getBoard();
    const currentBoard = await axios.post('http://localhost:3333/api/tick', {
      id: boardId,
    });
    console.log('tick array');
    console.dir(currentBoard.data.board);
    console.log(boardId);
    setBoard(currentBoard.data.board);
  };

  // useEffect(() => {
  //   if (game) {
  //     const currentBoard = game.getBoard();
  //     setBoard(currentBoard);
  //   }
  // }, [game]);

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
    console.dir(board);
  };

  const startGame = async () => {
    const g = await axios.post('http://localhost:3333/api/board', {
      board: board,
    });
    setBoard(g.data.board);
    setBoardId(g.data.id);
    setHasStarted(true);
  };

  const startWithDefault = () => {
    // game.setCell(1, 1);
    // game.setCell(1, 2);
    // game.setCell(2, 2);
    // game.setCell(3, 2);
    // game.setCell(4, 2);
    // game.setCell(4, 3);
    setHasStarted(true);
  };

  const restart = () => {
    setHasStarted(false);
    // const g = new GameOfLife(10, 10);
    // setGame(g);
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
