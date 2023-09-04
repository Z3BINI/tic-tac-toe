const init = (function(){

    //Cache form DOM
    const formDialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    //Show the dialog by default
    formDialog.showModal();

    //Listen for start game
    form.addEventListener('submit', () => createPlayers());

    const createPlayers = function() {
        const player1Name = document.querySelector('input#player1').value;
        const player2Name = document.querySelector('input#player2').value;

        const player1 = Player(player1Name, 'X');
        const player2 = Player(player2Name, 'O');
        
        gameBoard(player1, player2); //Start game
    }

   

})();

const Player = function(playerName, playerMark) {

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

const gameBoard = function(player1, player2){

    //Cache DOM
    const gameSquareElements = document.querySelectorAll('.game-square');

    //Add all live-elements & necessary element info
    const gameBoardSquares = Array.from(gameSquareElements)
                             .map(gameSquareElement => {
                                return { 
                                    element: gameSquareElement,
                                    verticalAxis: gameSquareElement.dataset.verticalAxis,
                                    horizontalAxis: gameSquareElement.dataset.horizontalAxis,
                                    currentMark: gameSquareElement.textContent
                                };
                             });

    
    //Square click listening
    gameBoardSquares.forEach(square => square.element.addEventListener('click', () => squareController.click(square)));

    //Gameboard functions
    const squareController = {

        click: function(square) {

            if (!(this.checkOccupied(square.element.textContent))) {
                displayController.render(square.element, this.playerPlaying().getMark());
                square.currentMark = this.playerPlaying().getMark();
                console.log(this.isGameOver.someoneWon());
                console.log({ 'game tied': this.isGameOver.gameTied()});
                this.playersSwapTurn();
            }

        },

        playerPlaying: function() {
            return (player1.getTurn()) ? player1 : player2;
        },

        playersSwapTurn: function(){
            player1.swapTurn();
            player2.swapTurn();
        },

        isGameOver: (function() { 
            
            const gameTied = () => {
                return gameBoardSquares.every(gameBoardSquare => gameBoardSquare.currentMark);
            }

            const someoneWon = () => {
           
                const winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8]];   
                let winner = null;             

                const getPlayerIndexes = (playsArray, player) => {

                    const indexes = [];

                    playsArray.forEach((play, index) => {
                        if (play.currentMark === player.getMark()) indexes.push(index);
                    }); 

                    return indexes;
                }

                const player1Plays = getPlayerIndexes(gameBoardSquares, player1);
                const player2Plays = getPlayerIndexes(gameBoardSquares, player2);


                
                winningPositions.forEach(winningPosition => { 
                    if (winningPosition.every(element => player1Plays.includes(element))) winner = player1;
                    if (winningPosition.every(element => player2Plays.includes(element))) winner = player2;
                });

                
                return (winner);

            }

            return {gameTied, someoneWon};

        })(),

        checkOccupied: function(squareHasContent) {
            return (squareHasContent);
        }

    }

};

const displayController = (function() {

    const render = function(element, value) {
        element.textContent = value;
    }


    return {render};
})();

