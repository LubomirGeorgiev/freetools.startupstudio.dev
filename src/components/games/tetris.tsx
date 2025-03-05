"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Tetris piece shapes
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "bg-cyan-500",
  },
  J: {
    shape: [
      [0, 0, 0],
      [2, 2, 2],
      [0, 0, 2],
    ],
    color: "bg-blue-500",
  },
  L: {
    shape: [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0],
    ],
    color: "bg-orange-500",
  },
  O: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: "bg-yellow-500",
  },
  S: {
    shape: [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0],
    ],
    color: "bg-green-500",
  },
  T: {
    shape: [
      [0, 0, 0],
      [6, 6, 6],
      [0, 6, 0],
    ],
    color: "bg-purple-500",
  },
  Z: {
    shape: [
      [0, 0, 0],
      [7, 7, 0],
      [0, 7, 7],
    ],
    color: "bg-red-500",
  },
};

// Define Tetromino type
interface Tetromino {
  shape: number[][];
  color: string;
}

// Constants
const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 25;

// Create empty board
const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

export function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Get random tetromino
  const getRandomTetromino = useCallback(() => {
    const tetrominos = Object.keys(TETROMINOS) as Array<keyof typeof TETROMINOS>;
    const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randomTetromino];
  }, []);

  // Initialize new piece
  const newPiece = useCallback(() => {
    const piece = getRandomTetromino();
    setCurrentPiece(piece);
    setPosition({
      x: Math.floor(COLS / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0,
    });

    // Check if game is over (collision on new piece)
    if (checkCollision(piece.shape, { x: Math.floor(COLS / 2) - Math.floor(piece.shape[0].length / 2), y: 0 })) {
      setGameOver(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRandomTetromino]);

  // Check for collision
  const checkCollision = useCallback(
    (shape: number[][], pos: { x: number; y: number }) => {
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          // Skip empty cells
          if (shape[y][x] === 0) continue;

          // Calculate actual position on board
          const boardX = pos.x + x;
          const boardY = pos.y + y;

          // Check boundaries
          if (
            boardX < 0 ||
            boardX >= COLS ||
            boardY >= ROWS ||
            // Check if cell is already filled
            (boardY >= 0 && board[boardY][boardX] !== 0)
          ) {
            return true;
          }
        }
      }
      return false;
    },
    [board]
  );

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;

    // Create rotated matrix
    const rotated = currentPiece.shape[0].map((_: number, index: number) =>
      currentPiece.shape.map((row: number[]) => row[index]).reverse()
    );

    // Check if rotation is valid
    if (!checkCollision(rotated, position)) {
      setCurrentPiece({ ...currentPiece, shape: rotated });
    }
  }, [currentPiece, position, checkCollision, isPaused, gameOver]);

  // Move piece horizontally
  const movePiece = useCallback(
    (dir: number) => {
      if (!currentPiece || isPaused || gameOver) return;
      const newPos = { ...position, x: position.x + dir };
      if (!checkCollision(currentPiece.shape, newPos)) {
        setPosition(newPos);
      }
    },
    [currentPiece, position, checkCollision, isPaused, gameOver]
  );

  // Drop piece faster
  const dropPiece = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;
    const newPos = { ...position, y: position.y + 1 };
    if (!checkCollision(currentPiece.shape, newPos)) {
      setPosition(newPos);
    } else {
      // Piece has landed
      updateBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPiece, position, checkCollision, isPaused, gameOver]);

  // Update board with current piece
  const updateBoard = useCallback(() => {
    if (!currentPiece) return;

    // Create a new board with the current piece fixed in place
    const newBoard = [...board];
    currentPiece.shape.forEach((row: number[], y: number) => {
      row.forEach((value: number, x: number) => {
        if (value !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = value;
          }
        }
      });
    });

    // Check for completed rows
    let clearedRows = 0;
    const updatedBoard = newBoard.filter((row) => {
      const isRowFull = row.every((cell) => cell !== 0);
      if (isRowFull) clearedRows++;
      return !isRowFull;
    });

    // Add empty rows at the top
    while (updatedBoard.length < ROWS) {
      updatedBoard.unshift(Array(COLS).fill(0));
    }

    // Update score
    if (clearedRows > 0) {
      const points = [0, 40, 100, 300, 1200][clearedRows] * level;
      setScore((prev) => prev + points);

      // Update level every 10 rows cleared
      const newTotalRows = Math.floor(score / 1000) + clearedRows;
      const newLevel = Math.floor(newTotalRows / 10) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
      }
    }

    setBoard(updatedBoard);
    newPiece();
  }, [board, currentPiece, position, newPiece, score, level]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1);
          break;
        case "ArrowRight":
          movePiece(1);
          break;
        case "ArrowDown":
          dropPiece();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
        case " ":
          // Hard drop
          while (!checkCollision(currentPiece?.shape || [], { ...position, y: position.y + 1 })) {
            setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
          }
          updateBoard();
          break;
        case "p":
          setIsPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePiece, dropPiece, rotatePiece, checkCollision, currentPiece, position, updateBoard, gameOver]);

  // Game loop
  useEffect(() => {
    if (!currentPiece && !gameOver) {
      newPiece();
    }

    if (!gameOver && !isPaused) {
      const speed = 1000 - (level - 1) * 100 > 100 ? 1000 - (level - 1) * 100 : 100;
      gameLoopRef.current = setInterval(() => {
        dropPiece();
      }, speed);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [currentPiece, gameOver, newPiece, dropPiece, isPaused, level]);

  // Render the game board with current piece
  const renderBoard = () => {
    // Create a copy of the board
    const boardWithPiece = board.map((row) => [...row]);

    // Add current piece to the board
    if (currentPiece) {
      currentPiece.shape.forEach((row: number[], y: number) => {
        row.forEach((value: number, x: number) => {
          if (value !== 0) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              boardWithPiece[boardY][boardX] = value;
            }
          }
        });
      });
    }

    return boardWithPiece.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] border border-gray-800 ${cell > 0
              ? Object.values(TETROMINOS)[cell - 1]?.color || "bg-gray-500"
              : "bg-gray-900"
              }`}
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          />
        ))}
      </div>
    ));
  };

  // Reset game
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setPosition({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card className="p-4 bg-gray-950 border-gray-800">
          <div className="flex flex-col items-center">
            {renderBoard()}
          </div>

          {/* Touch controls for mobile */}
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
            <div></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => rotatePiece()}
              disabled={gameOver || isPaused}
            >
              ↑
            </Button>
            <div></div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece(-1)}
              disabled={gameOver || isPaused}
            >
              ←
            </Button>
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  // Hard drop
                  while (!checkCollision(currentPiece?.shape || [], { ...position, y: position.y + 1 })) {
                    setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
                  }
                  updateBoard();
                }}
                disabled={gameOver || isPaused}
              >
                ⏬
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece(1)}
              disabled={gameOver || isPaused}
            >
              →
            </Button>

            <div></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dropPiece()}
              disabled={gameOver || isPaused}
            >
              ↓
            </Button>
            <div></div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Game Info</h2>
            <div className="space-y-2">
              <p>Score: {score}</p>
              <p>Level: {level}</p>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Controls</h2>
            <div className="space-y-2 text-sm">
              <p>← → : Move left/right</p>
              <p>↓ : Move down</p>
              <p>↑ : Rotate</p>
              <p>Space : Hard drop</p>
              <p>P : Pause/Resume</p>
            </div>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setIsPaused((prev) => !prev)}
              disabled={gameOver}
              variant={isPaused ? "default" : "outline"}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button onClick={resetGame} variant="destructive">
              {gameOver ? "New Game" : "Reset"}
            </Button>
          </div>
        </div>
      </div>

      {gameOver && (
        <Card className="p-4 bg-red-900/20 border-red-800">
          <h2 className="text-xl font-bold text-center">Game Over!</h2>
          <p className="text-center mt-2">Final Score: {score}</p>
          <Button onClick={resetGame} className="mt-4 w-full">
            Play Again
          </Button>
        </Card>
      )}
    </div>
  );
}