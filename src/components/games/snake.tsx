"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Constants
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 10;
const MAX_SPEED = 50;

// Directions
enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

// Cell types
enum CellType {
    EMPTY = 0,
    SNAKE = 1,
    FOOD = 2,
}

// Position interface
interface Position {
    x: number;
    y: number;
}

export function SnakeGame() {
    const [grid, setGrid] = useState<CellType[][]>([]);
    const [snake, setSnake] = useState<Position[]>([]);
    const [food, setFood] = useState<Position | null>(null);
    const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const lastDirectionRef = useRef<Direction>(Direction.RIGHT);

    // Initialize game
    const initGame = useCallback(() => {
        // Create empty grid
        const newGrid = Array.from({ length: GRID_SIZE }, () =>
            Array(GRID_SIZE).fill(CellType.EMPTY)
        );

        // Create initial snake (3 cells long)
        const initialSnake: Position[] = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 },
        ];

        // Place snake on grid
        initialSnake.forEach((pos) => {
            newGrid[pos.y][pos.x] = CellType.SNAKE;
        });

        // Generate initial food
        const initialFood = generateFood(newGrid);
        if (initialFood) {
            newGrid[initialFood.y][initialFood.x] = CellType.FOOD;
        }

        setGrid(newGrid);
        setSnake(initialSnake);
        setFood(initialFood);
        setDirection(Direction.RIGHT);
        lastDirectionRef.current = Direction.RIGHT;
        setGameOver(false);
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setIsPaused(false);
    }, []);

    // Generate food at random empty position
    const generateFood = (currentGrid: CellType[][]): Position | null => {
        const emptyPositions: Position[] = [];

        // Find all empty cells
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (currentGrid[y][x] === CellType.EMPTY) {
                    emptyPositions.push({ x, y });
                }
            }
        }

        // No empty positions
        if (emptyPositions.length === 0) {
            return null;
        }

        // Return random empty position
        const randomIndex = Math.floor(Math.random() * emptyPositions.length);
        return emptyPositions[randomIndex];
    };

    // Move snake
    const moveSnake = useCallback(() => {
        if (isPaused || gameOver || snake.length === 0) return;

        // Get current head position
        const head = { ...snake[0] };

        // Update direction from ref (to avoid race conditions)
        const currentDirection = lastDirectionRef.current;

        // Calculate new head position
        let newHead: Position;
        switch (currentDirection) {
            case Direction.UP:
                newHead = { x: head.x, y: head.y - 1 };
                break;
            case Direction.DOWN:
                newHead = { x: head.x, y: head.y + 1 };
                break;
            case Direction.LEFT:
                newHead = { x: head.x - 1, y: head.y };
                break;
            case Direction.RIGHT:
                newHead = { x: head.x + 1, y: head.y };
                break;
            default:
                newHead = { ...head };
        }

        // Check for collisions with walls
        if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
        ) {
            setGameOver(true);
            return;
        }

        // Check for collisions with self (except tail which will move)
        const willEatFood = food && newHead.x === food.x && newHead.y === food.y;
        const snakeWithoutTail = willEatFood ? snake : snake.slice(0, -1);
        if (snakeWithoutTail.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
            setGameOver(true);
            return;
        }

        // Create new snake
        const newSnake = [newHead, ...snakeWithoutTail];

        // Update grid
        const newGrid = Array.from({ length: GRID_SIZE }, () =>
            Array(GRID_SIZE).fill(CellType.EMPTY)
        );

        // Place snake on grid
        newSnake.forEach((pos) => {
            newGrid[pos.y][pos.x] = CellType.SNAKE;
        });

        // Handle food
        let newFood = food;
        if (willEatFood) {
            // Increase score
            const newScore = score + 1;
            setScore(newScore);

            // Increase speed every 5 points
            if (newScore % 5 === 0 && speed > MAX_SPEED) {
                setSpeed((prevSpeed) => prevSpeed - SPEED_INCREMENT);
            }

            // Generate new food
            newFood = generateFood(newGrid);
        }

        // Place food on grid
        if (newFood) {
            newGrid[newFood.y][newFood.x] = CellType.FOOD;
        }

        setGrid(newGrid);
        setSnake(newSnake);
        setFood(newFood);
    }, [snake, food, isPaused, gameOver, score, speed]);

    // Handle key presses
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case "ArrowUp":
                    if (lastDirectionRef.current !== Direction.DOWN) {
                        setDirection(Direction.UP);
                        lastDirectionRef.current = Direction.UP;
                    }
                    break;
                case "ArrowDown":
                    if (lastDirectionRef.current !== Direction.UP) {
                        setDirection(Direction.DOWN);
                        lastDirectionRef.current = Direction.DOWN;
                    }
                    break;
                case "ArrowLeft":
                    if (lastDirectionRef.current !== Direction.RIGHT) {
                        setDirection(Direction.LEFT);
                        lastDirectionRef.current = Direction.LEFT;
                    }
                    break;
                case "ArrowRight":
                    if (lastDirectionRef.current !== Direction.LEFT) {
                        setDirection(Direction.RIGHT);
                        lastDirectionRef.current = Direction.RIGHT;
                    }
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
    }, [gameOver]);

    // Game loop
    useEffect(() => {
        if (!gameOver && !isPaused) {
            gameLoopRef.current = setInterval(() => {
                moveSnake();
            }, speed);
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [moveSnake, gameOver, isPaused, speed]);

    // Initialize game on mount
    useEffect(() => {
        initGame();
    }, [initGame]);

    // Render grid
    const renderGrid = () => {
        return grid.map((row, y) => (
            <div key={y} className="flex">
                {row.map((cell, x) => (
                    <div
                        key={`${y}-${x}`}
                        className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] border border-gray-800 ${cell === CellType.SNAKE
                            ? "bg-green-500"
                            : cell === CellType.FOOD
                                ? "bg-red-500"
                                : "bg-gray-900"
                            }`}
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    />
                ))}
            </div>
        ));
    };

    // Handle direction button clicks
    const handleDirectionClick = (newDirection: Direction) => {
        if (gameOver || isPaused) return;

        // Prevent 180-degree turns
        if (
            (newDirection === Direction.UP && lastDirectionRef.current !== Direction.DOWN) ||
            (newDirection === Direction.DOWN && lastDirectionRef.current !== Direction.UP) ||
            (newDirection === Direction.LEFT && lastDirectionRef.current !== Direction.RIGHT) ||
            (newDirection === Direction.RIGHT && lastDirectionRef.current !== Direction.LEFT)
        ) {
            setDirection(newDirection);
            lastDirectionRef.current = newDirection;
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <Card className="p-4 bg-gray-950 border-gray-800">
                    <div className="flex flex-col items-center">
                        {renderGrid()}
                    </div>

                    {/* Touch controls for mobile - moved below the game board */}
                    <div className="mt-4 grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                        <div></div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDirectionClick(Direction.UP)}
                            disabled={gameOver || isPaused}
                        >
                            ↑
                        </Button>
                        <div></div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDirectionClick(Direction.LEFT)}
                            disabled={gameOver || isPaused}
                        >
                            ←
                        </Button>
                        <div></div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDirectionClick(Direction.RIGHT)}
                            disabled={gameOver || isPaused}
                        >
                            →
                        </Button>

                        <div></div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDirectionClick(Direction.DOWN)}
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
                            <p>Speed: {Math.floor(100 * (INITIAL_SPEED - speed) / (INITIAL_SPEED - MAX_SPEED))}%</p>
                            <p>Current Direction: {direction}</p>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h2 className="text-xl font-bold mb-4">Controls</h2>
                        <div className="space-y-2 text-sm">
                            <p>Arrow Keys: Change direction</p>
                            <p>P: Pause/Resume</p>
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
                        <Button onClick={initGame} variant="destructive">
                            {gameOver ? "New Game" : "Reset"}
                        </Button>
                    </div>
                </div>
            </div>

            {gameOver && (
                <Card className="p-4 bg-red-900/20 border-red-800">
                    <h2 className="text-xl font-bold text-center">Game Over!</h2>
                    <p className="text-center mt-2">Final Score: {score}</p>
                    <Button onClick={initGame} className="mt-4 w-full">
                        Play Again
                    </Button>
                </Card>
            )}
        </div>
    );
}