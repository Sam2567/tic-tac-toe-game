import "./TicTacToe.css";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import { useRef, useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const winTitleRef = useRef(null);

  const toggle = (row, col) => {
    if (lock || board[row][col] !== "") {
      return;
    }
    const newBoard = board.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (count % 2 === 0 ? "x" : "o") : cell
      )
    );
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (currentBoard) => {
    const winningLines = [
      // Rows
      [currentBoard[0][0], currentBoard[0][1], currentBoard[0][2]],
      [currentBoard[1][0], currentBoard[1][1], currentBoard[1][2]],
      [currentBoard[2][0], currentBoard[2][1], currentBoard[2][2]],
      // Columns
      [currentBoard[0][0], currentBoard[1][0], currentBoard[2][0]],
      [currentBoard[0][1], currentBoard[1][1], currentBoard[2][1]],
      [currentBoard[0][2], currentBoard[1][2], currentBoard[2][2]],
      // Diagonals
      [currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]],
      [currentBoard[0][2], currentBoard[1][1], currentBoard[2][0]],
    ];

    for (let line of winningLines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        won(line[0]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    winTitleRef.current.innerHTML = `Congrats: <img src=${
      winner === "x" ? cross : circle
    }> Wins`;
  };

  const reset = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCount(0);
    setLock(false);
    winTitleRef.current.innerHTML = "Tic Tac Toe Game with <span>React</span>";
  };

  return (
    <div className="container">
      <h1 className="title" ref={winTitleRef}>
        Tic Tac Toe Game with <span>React</span>
      </h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className="boxes"
                key={colIndex}
                onClick={() => toggle(rowIndex, colIndex)}
                dangerouslySetInnerHTML={{
                  __html: cell
                    ? `<img src='${cell === "x" ? cross : circle}'>`
                    : "",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
