function Gameboard(playerOne, playerTwo) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let playerTurn = playerOne;
    const endModal = document.querySelector('.end-modal')
    const gameContainer = document.querySelector('.game-container');

    const checkForWin = () => {

        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '' || // checking horizontal
            board[3] === board[4] && board[4] === board[5] && board[3] !== '' ||
            board[6] === board[7] && board[7] === board[8] && board[6] !== '' ||
            board[0] === board[3] && board[3] === board[6] && board[0] !== '' || //checking vertical
            board[1] === board[4] && board[4] === board[7] && board[1] !== '' ||
            board[2] === board[5] && board[5] === board[8] && board[2] !== '' ||
            board[0] === board[4] && board[4] === board[8] && board[0] !== '' || //checking diagonal
            board[2] === board[4] && board[4] === board[6] && board[2] !== '') {

                endModal.showModal()
        }
        return false
    };

    const generateBoard = () => {
        board.forEach((square, i) => {
            let gameSquare = document.createElement('div');
            gameSquare.classList.add('game-square');
            gameSquare.textContent = square;
            gameSquare.addEventListener('click', () => {
                if (board[i] !== '') {
                    return
                }
                if (playerTurn === playerOne) {
                    gameSquare.textContent = 'X'
                    board[i] = 'X'
                } else {
                    gameSquare.textContent = 'O'
                    board[i] = 'O'
                }
                playerTurn === playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
                checkForWin();
            });
            gameContainer.appendChild(gameSquare);
        });
    };

    const restartGame = () => {
        endModal.close()
        board = ['', '', '', '', '', '', '', '', ''];
        gameContainer.textContent = ''
        generateBoard()
        this.playerTurn = playerOne
    }

    return {
        generateBoard,
        restartGame
    };
}

const startModal = document.querySelector('.start-modal')

const game = Gameboard('Betty', 'Duy');


document.querySelector('.start').addEventListener('click', () => {
    startModal.close()
    game.generateBoard();
})
document.querySelector('.restart').addEventListener('click', () => game.restartGame())

startModal.showModal( )