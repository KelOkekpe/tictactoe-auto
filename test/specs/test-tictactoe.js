const TicTacToePage = require('../pageobjects/tictactoe.page');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 400000;


describe('Tic Tac Toe Game', function () {
    

    beforeEach(function () {
        require('expect-webdriverio').setOptions({ wait: 5000 })
        TicTacToePage.open(); 
        switchToFrame(TicTacToePage.iFrame);
    });

    function switchToFrame(iFrame) {
        browser.switchToFrame(iFrame);
    }

    function playerXWins() {
        return "Congratulations player X! You've won. Refresh to play again!"
    }

    //generates a string of X's ; the number of X's are equal to the value paassed to this function
    //this function allows flexibility when testing game results for boards w/ differing sizes
    function dynamicRowOfXs(boardSize){
        var str = ""
        for(i=0; i<boardSize; i++ ){
            str2 = "X "
            str = str.concat (str2)
        }
        return str.replace(/\s+$/, "");
    }

    // returns the total number of cells containing an X or O 
    function numberOfBoardEntries() {
        var arr = []
        for(i=0;i<$$('td').length;i++){
            if($$('td')[i].getText() == "O" || $$('td')[i].getText() == "X"){
                arr.push($$('td')[i].getText())
            }
        }
        return arr.length;
    }

    // it('creates a 3 by 3 board', function () {
    //     TicTacToePage.createBoard('3');
    //     expect(TicTacToePage.gameBoard).toBeExisting()
    // });

    it('alternates user symbols after every turn', function () {
        var cellsPickedArray =  [0,3]
        TicTacToePage.createBoard('3');
        TicTacToePage.selectBoardCells(cellsPickedArray);
        expect(TicTacToePage.boardCell(0)).toHaveText('X')
        expect(TicTacToePage.boardCell(3)).toHaveText('O')      
    });

    it('declares tie game for games with no winner', function (){
        var cellsPickedArray = [0,1,4,8,5,3,2,6,7]
        TicTacToePage.createBoard('3');
        TicTacToePage.selectBoardCells(cellsPickedArray);
        
        //checks if boaard is full
        if(numberOfBoardEntries() == TicTacToePage.boardCells.length){
            expect(TicTacToePage.endGameMessage).toBeDisplayed()
        }
    });

    
    it('declares correct game winner by horizontal victory', function () {
        var cellsPickedArray =  [0,3,1,4,2]
        TicTacToePage.createBoard('3');
        TicTacToePage.selectBoardCells(cellsPickedArray);

        if(TicTacToePage.rowText(0) == dynamicRowOfXs(3) ){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });
 
    it('declares correct game winner by vertical victory', function () {
        var cellsPickedArray =  [0,1,3,2,6]
        TicTacToePage.createBoard('3');
        TicTacToePage.selectBoardCells(cellsPickedArray);

        if(TicTacToePage.columnText(3,0) == dynamicRowOfXs(3) ){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });

    it('declares correct game winner by upper left corner to bottom right corner victory', function () {
        var cellsPickedArray =  [0,1,6,2,12,4,18,9,24]
        TicTacToePage.createBoard('5');
        TicTacToePage.selectBoardCells(cellsPickedArray);
        
        if(TicTacToePage.diagonalText(0,6,12,18,24) == dynamicRowOfXs(5)){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });

    it('declares correct game winner by upper right corner to bottom left corner victory', function () {
        var cellsPickedArray =  [2,1,4,3,6]
        TicTacToePage.createBoard('3');
        TicTacToePage.selectBoardCells(cellsPickedArray);

        if(TicTacToePage.diagonalText(2,4,6) == dynamicRowOfXs(3)){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())       
        }
    });
    
});

 