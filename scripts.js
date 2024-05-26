class Gameboard {

    constructor(playerOne, playerTwo) {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        !this.playerOne ? this.playerOne = 'Player 1' : this.playerOne
        !this.playerTwo ? this.playerTwo = 'Player 2' : this.playerTwo
        this.playerTurn = this.playerOne;
        this.endModal = document.querySelector('.end-modal')
        this.gameContainer = document.querySelector('.game-container');
        this.gameMsg = document.querySelector('.game-msg')
    }
    

    checkForWin = () => {
        const { board, endModal, gameMsg } = this
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '' || // checking horizontal
            board[3] === board[4] && board[4] === board[5] && board[3] !== '' ||
            board[6] === board[7] && board[7] === board[8] && board[6] !== '' ||
            board[0] === board[3] && board[3] === board[6] && board[0] !== '' || //checking vertical
            board[1] === board[4] && board[4] === board[7] && board[1] !== '' ||
            board[2] === board[5] && board[5] === board[8] && board[2] !== '' ||
            board[0] === board[4] && board[4] === board[8] && board[0] !== '' || //checking diagonal
            board[2] === board[4] && board[4] === board[6] && board[2] !== '') {

                endModal.showModal()
                gameMsg.textContent = 'Game Over'
        } else if (!board.includes('')) {
            endModal.showModal()
            gameMsg.textContent = 'Game Over'
        }
        return false
    };

    generateBoard = () => {
        let { playerTurn, board, playerOne, playerTwo, gameMsg, gameContainer } = this
        board.forEach((square, i) => {
            let gameSquare = document.createElement('div');
            gameSquare.classList.add('game-square');
            gameSquare.textContent = square;
            gameMsg.textContent = `${playerTurn}'s Turn`
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
                gameMsg.textContent = `${playerTurn}'s Turn`
                this.checkForWin();
            });
            gameContainer.appendChild(gameSquare);
            gameContainer.classList.add('game-start')
        });
    };

    restartGame = () => {
        const { endModal, gameContainer, playerOne }  = this
        endModal.close()
        this.board = ['', '', '', '', '', '', '', '', ''];
        gameContainer.textContent = ''
        this.generateBoard()
        this.playerTurn = playerOne
    }
}

const startModal = document.querySelector('.start-modal')


document.querySelector('.start').addEventListener('click', () => {
    const startPlayerOne = document.querySelector('#player-one').value
    const startPlayerTwo = document.querySelector('#player-two').value

    const game = new Gameboard(startPlayerOne, startPlayerTwo);
    startModal.close()
    game.generateBoard();
    document.querySelector('.change-player').addEventListener('click', () => {
        game.gameContainer.textContent = ''
        startModal.showModal()
        game.endModal.close()
    })

    document.querySelector('.restart').addEventListener('click', () => game.restartGame())
})

