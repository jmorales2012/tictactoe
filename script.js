const Player = function(name, symbol) {
  return {
    name,
    symbol
  }
};

const gameBoardModule = (function () {
  let gameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  let isMoveValid = (e) => {
    // check if a move is valid (empty space)
    return !e.target.innerHTML;
  }

  let makeMove = (e, player) => {
    // make the move if it's valid & update gameBoard array
    if (isMoveValid(e)) {
      gameBoard[e.target.id] = player.symbol;
    }
  };

  let isGameOver = (player) => {
    //check winner first
    // winning combos: hor: 012, 345, 678 vert: 036, 147, 258 diag: 048, 246
    let sym = player.symbol;
    if (
      // horizontal wins
      (gameBoard[0] === sym && gameBoard[1] === sym && gameBoard[2] === sym) ||
      (gameBoard[3] === sym && gameBoard[4] === sym && gameBoard[5] === sym) ||
      (gameBoard[7] === sym && gameBoard[8] === sym && gameBoard[9] === sym) ||
      // vertical wins
      (gameBoard[0] === sym && gameBoard[3] === sym && gameBoard[6] === sym) ||
      (gameBoard[1] === sym && gameBoard[4] === sym && gameBoard[7] === sym) ||
      (gameBoard[2] === sym && gameBoard[5] === sym && gameBoard[8] === sym) ||
      // diagonal wins
      (gameBoard[0] === sym && gameBoard[4] === sym && gameBoard[8] === sym) ||
      (gameBoard[2] === sym && gameBoard[4] === sym && gameBoard[6] === sym)
    ) {
      console.log(`${player.name} wins!`);
      return true;
    } else {
      // check for a tie
      for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
          return false;
        }
      }
      console.log('tie game');
      return true;
    }    

  };

  let declareWinner = () => {
    // declare winner if so
  };

  let updateDisplay = (e, player) => {
    // update display on screen
    e.target.innerHTML = `<h2>${player.symbol}</h2>`;
  };

  return {
    isMoveValid,
    makeMove,
    isGameOver,
    declareWinner,
    updateDisplay
  }
})();

const gamePlayModule = (function () {

  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  const container = document.querySelector('.container');

  let startGame = (event) => {
    // assign players, event listeners and start the game
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        if (gameBoardModule.isMoveValid(e)) {
          gameBoardModule.makeMove(e, currentPlayer);
          gameBoardModule.updateDisplay(e, currentPlayer);
        if (gameBoardModule.isGameOver(currentPlayer)) {
          // container.parentElement.removeChild(container);
        }
          currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
      }
    })
      //  end game                
  };

  let endGame = () => {
    console.log('game over');
  }

  return {
    startGame,
    endGame
  }
})();


gamePlayModule.startGame();