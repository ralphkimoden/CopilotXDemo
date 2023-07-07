// Define game board dimensions
const ROWS = 20;
const COLS = 20;

// Define game board array
let board = [];

// Define initial snake position and length
let snake = [{ x: 10, y: 10 }];
let snakeLength = 1;

// Define initial food position
let food = { x: 5, y: 5 };

// Define initial score
let score = 0;

// Define game over flag
let gameOver = false;

// Define game loop interval ID
let intervalId;

// Generate game board function
function generateBoard() {
  // Clear board
  board = [];

  // Generate empty board
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i][j] = 0;
    }
  }

  // Add snake to board
  for (let i = 0; i < snake.length; i++) {
    board[snake[i].y][snake[i].x] = 1;
  }

  // Add food to board
  board[food.y][food.x] = 2;
}

// Draw game board function
function drawBoard() {
  const gameBoard = document.querySelector('.game-board');

  // Clear game board
  gameBoard.innerHTML = '';

  // Draw game board
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (board[i][j] === 1) {
        cell.classList.add('snake');
      } else if (board[i][j] === 2) {
        cell.classList.add('food');
      }

      gameBoard.appendChild(cell);
    }
  }
}

// Move snake function
function moveSnake() {
  // Get current head position
  const head = snake[0];

  // Determine new head position based on direction
  let newHead;
  if (direction === 'up') {
    newHead = { x: head.x, y: head.y - 1 };
  } else if (direction === 'down') {
    newHead = { x: head.x, y: head.y + 1 };
  } else if (direction === 'left') {
    newHead = { x: head.x - 1, y: head.y };
  } else if (direction === 'right') {
    newHead = { x: head.x + 1, y: head.y };
  }

  // Add new head to snake array
  snake.unshift(newHead);

  // Check if snake has collided with wall or itself
  if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
    gameOver = true;
  } else {
    for (let i = 1; i < snake.length; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        gameOver = true;
        break;
      }
    }
  }

  // Remove tail if snake hasn't eaten food
  if (!checkFood()) {
    snake.pop();
  }
}

// Check for food function
function checkFood() {
  // Check if snake has eaten food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // Generate new food position
    food.x = Math.floor(Math.random() * COLS);
    food.y = Math.floor(Math.random() * ROWS);

    // Increase score and snake length
    score++;
    snakeLength++;

    // Update score display
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = score;

    return true;
  }

  return false;
}

// Update game function
function updateGame() {
  moveSnake();
  generateBoard();
  drawBoard();

  if (gameOver) {
    clearInterval(intervalId);
    alert(`Game over! Your score is ${score}.`);
  }
}

// Handle keydown events
let direction = 'right';
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.code === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (event.code === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.code === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

// Handle start button click event
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  // Reset game variables
  snake = [{ x: 10, y: 10 }];
  snakeLength = 1;
  food = { x: 5, y: 5 };
  score = 0;
  gameOver = false;

  // Update score display
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = score;

  // Generate initial game board
  generateBoard();
  drawBoard();

  // Start game loop
  intervalId = setInterval(updateGame, 100);
});