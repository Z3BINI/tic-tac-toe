const init = (function(){

    //Cache form DOM
    const formDialog = document.querySelector('dialog');
    const form = document.querySelector('form');

    //Show the dialog by default
    formDialog.showModal();

    //Listen for start game
    form.addEventListener('submit', () => validateInfo());

    const validateInfo = function() {
        let player1Name = document.querySelector('input#player1').value;
        let player1Mark = 'X';
        let player2Name = document.querySelector('input#player2').value;
        let player2Mark = 'O';

        const player1 = Player(player1Name, player1Mark);
        const player2 = Player(player2Name, player2Mark);
        
        gameBoard(player1, player2);
    }

   

})();

const Player = function(playerName, playerMark) {
    return {playerName, playerMark}
}

const gameBoard = function(player1, player2){

    console.log({player1, player2});

    //Cache DOM
    const gameSquareElements = document.querySelectorAll('.game-square');

    //Add all elements & necessary element info in gameBoardSquares Array
    const gameBoardSquares = Array.from(gameSquareElements)
                             .map(gameSquareElement => {
                                return { 
                                    element: gameSquareElement,
                                    position: gameSquareElement.dataset.pos,
                                    currentMark: gameSquareElement.textContent
                                };
                             });

    
    //Add event listeners
    gameBoardSquares.forEach(square => square.element.addEventListener('click', (event) => squareController(event, square)));

    //Gameboard functions
    const squareController = (event, square) => {
        console.log(event.target);
        console.log(square);
    }

};
