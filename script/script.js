const init = (function(){
    //Constant marks
    const X = 'X';
    const O = 'O';

    //Cache form DOM
    const formDialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    //Show the dialog by default
    formDialog.show();

    //players holder
    const players = {};

    //Listen for start game
    form.addEventListener('submit', () => createPlayers());

    const createPlayers = () => {

        //Set player names from labels
        const player1Name = document.querySelector('input#player1').value;
        const player2Name = document.querySelector('input#player2').value;

        //Create players
        players.player1 = Player(player1Name, X);
        players.player2 = Player(player2Name, O);

        displayController.renderPlaying(players.player1);
        
    }

    return {players}

})();

const Player = (playerName, playerMark) => {

    let isTurn = (playerMark === 'X');

    const getTurn = () => isTurn;
    const getName = () => playerName;
    const getMark = () => playerMark;
    const swapTurn = function() {
        isTurn = !isTurn;
    }
    
    return {
        getName, 
        getMark,
        getTurn,
        swapTurn
    };
};

const gameBoard = (() => {   

    //Cache DOM
    const gameSquareElements = document.querySelectorAll('.game-square'); 
    
    const resetBoard = () => {
        //Reset DOM content from previous games
        gameSquareElements.forEach(gameSquareElement => gameSquareElement.textContent = '');
    }    

    //Square click listening
    gameSquareElements.forEach(square => square.addEventListener('click', (event) => squareController.click(event)));    

    //Gameboard functions
    const squareController = {

        click: function(event) { 

            if (!(this.checkOccupied(event.target.textContent))) {

                displayController.renderPlaying( (this.playerPlaying()===init.players.player1) ? init.players.player2 : init.players.player1);
                displayController.renderPlay(event.target, this.playerPlaying().getMark());
                this.playersSwapTurn();

                if (this.isGameOver.someoneWon()){
                    displayController.gameOver(this.isGameOver.someoneWon());
                    this.resetGame();
                } 

                if (this.isGameOver.gameTied()) {
                    displayController.gameOver();
                    this.resetGame();
                }

            }

        },

        playerPlaying: function() {
            return (init.players.player1.getTurn()) ? init.players.player1 : init.players.player2;
        },

        playersSwapTurn: function(){
            init.players.player1.swapTurn();
            init.players.player2.swapTurn();
        },

        isGameOver: (function() { 
            
            const gameTied = () => {
                return (Array.from(gameSquareElements)).every(gameSquareElement => gameSquareElement.textContent);
            }

            const someoneWon = () => { 
           
                const winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];   
                let winner = null;             

                const getPlayerIndexes = (player) => {

                    const indexes = [];
                    //Store each players plays (indexes) in a seperate array to match against winning sequences
                    Array.from(gameSquareElements).forEach((play, index) => {
                        if (play.textContent === player.getMark()) indexes.push(index);
                    }); 

                    return indexes;
                }                

                player1Plays = getPlayerIndexes(init.players.player1);
                player2Plays = getPlayerIndexes(init.players.player2);

                winningPositions.forEach(winningPosition => { //Check if every element of each winning sequences is present in any of the players plays
                    if (winningPosition.every(element => player1Plays.includes(element))) winner = init.players.player1;
                    if (winningPosition.every(element => player2Plays.includes(element))) winner = init.players.player2;
                });

                return winner;                
            } 

            return {gameTied, someoneWon};

        })(),

        checkOccupied: function(squareHasContent) {
            return (squareHasContent);
        },

        resetGame: function() {
            gameBoard.resetBoard();
        }

    }

    return {resetBoard}

})();

const displayController = (function() {

    const resetGameBtn = document.querySelector('.play-again');
    const gameBoard = document.querySelector('.game-board');
    const gameOverEl = document.querySelector('.game-over');
    const resultEl = document.querySelector('.result');
    const currentPlaying = document.querySelector('.playing');

    resetGameBtn.addEventListener('click', () => resetGame());    

    const renderPlay = function(element, value) {
        element.textContent = value;
    }

    const renderPlaying = function(playerPlaying) {
        currentPlaying.textContent = `Currently ${playerPlaying.getName()}'s turn.`;
    }

    const gameOver = function(winner) {

        gameBoard.classList.toggle('hidden');
        gameOverEl.classList.toggle('hidden');

        resultEl.textContent = (winner) ? `${winner.getName()} wins!` : 'It\'s a draw!';
    }

    const resetGame = function() {
        gameBoard.classList.toggle('hidden');
        gameOverEl.classList.toggle('hidden');
    }

    return {
        renderPlay,
        gameOver,
        renderPlaying
    };
})();

