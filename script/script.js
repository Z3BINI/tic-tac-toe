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

    console.log(player1.getTurn(), player2.getTurn());

    player1.swapTurn();
    player2.swapTurn();

    console.log(player1.getTurn(), player2.getTurn());

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

            //return (this.checkOccupied(square.element.textContent)) ? console.log('has content') : console.log('does not have content');
        },

        isGameOver: function() {
            
        },

        checkOccupied: function(squareHasContent) {
            return (squareHasContent);
        }

    }

};
