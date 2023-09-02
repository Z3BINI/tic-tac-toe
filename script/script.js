const gameBoard = (function(){

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

})();
