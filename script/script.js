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

    let isTurn = false;

    if (playerMark === 'X') isTurn = true;
    
    const swapTurn = function() {
        return (isTurn) ? isTurn = false : isTurn = true;
    }
    
    return {
        playerName, 
        playerMark,
        isTurn,
        swapTurn
    }
};

const gameBoard = function(player1, player2){

    console.log({player1, player2});

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

    
    //Add event listeners
    gameBoardSquares.forEach(square => square.element.addEventListener('click', (event) => squareController.click(event, square)));

    //Gameboard functions
    const squareController = {

        click: function(event, square) {
            console.log(event);
            console.log(square);
        }
        
    }

};
