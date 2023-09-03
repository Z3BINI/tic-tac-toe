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
                                    position: gameSquareElement.dataset.pos,
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
                console.log(this.isGameOver.gameTied());
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

            return {gameTied};

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

