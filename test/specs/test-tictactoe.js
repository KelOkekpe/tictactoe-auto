const TicTacToePage = require('../pageobjects/tictactoe.page');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 400000;


describe('Tic Tac Toe Game', function () {
    
    // change browser context to iFrame to allow interaction w/ elements within iFrame
    function switchToFrame(iFrame) {
        browser.switchToFrame(iFrame)
    }
        
    // this creates a board, cellCount determines the amount of cells the board contains
    function createBoard (cellCount) {
        TicTacToePage.inputNumber.setValue(cellCount);
        TicTacToePage.btnSubmit.click()
    }

    // selects multiple board cells
    // remember: symbols alternate every subsequent index, (i.e, [0,1,2] =  X O X)
    function selectBoardCells (args) {
        for(var i=0; i<args.length; i++){
         TicTacToePage.boardCells[args[i]].click()
        } 
    }

    function playerXWins() {return "Congratulations player X! You've won. Refresh to play again!"}

    //generates a string of X's ; the number of X's are equal to the value paassed to this function
    //this function allows flexibility when testing game results for boards w/ differing sizes
    function dynamicRowOfXs(boardSize){
        var str = ""
        for(i=0; i<boardSize; i++ ){
            str2 = "X "
            str = str.concat (str2)}
        return str.replace(/\s+$/, "") }

    // returns the total number of cells containing an X or O 
    function numberOfBoardEntries() {
        var count = 0
        for(i=0; i<TicTacToePage.boardCells.length; i++){
            if(TicTacToePage.boardCells[i].getText() == "O" || TicTacToePage.boardCells[i].getText() == "X"){
                count+=1
            }
        }
        return count
    }
    

    beforeEach(function () {
        require('expect-webdriverio').setOptions({ wait: 5000 })
        TicTacToePage.open(); 
        switchToFrame(TicTacToePage.iFrame);
    });


    // it('creates a 3 by 3 board', function () {
    //     TicTacToePage.createBoard('3');
    //     expect(TicTacToePage.gameBoard).toBeExisting()
    // });

    it('alternates user symbols after every turn', function () {
        var cellsPickedArray =  [0,3]
        createBoard('3');
        selectBoardCells(cellsPickedArray);
        expect(TicTacToePage.boardCell(0)).toHaveText('X')
        expect(TicTacToePage.boardCell(3)).toHaveText('O')      
    });

    it('declares tie game for games with no winner', function (){
        var cellsPickedArray = [0,1,4,8,5,3,2,6,7]
        createBoard('3');
        selectBoardCells(cellsPickedArray);
        
        //checks if boaard is full
        if(numberOfBoardEntries() == TicTacToePage.boardCells.length){
            expect(TicTacToePage.endGameMessage).toBeDisplayed()
        }
    });

    
    it('declares correct game winner by horizontal victory', function () {
        var cellsPickedArray =  [0,3,1,4,2]
        createBoard('3');
        selectBoardCells(cellsPickedArray);

        if(TicTacToePage.rowText(0) == dynamicRowOfXs(3) ){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });
 
    it('declares correct game winner by vertical victory', function () {
        var cellsPickedArray =  [0,1,3,2,6]
        createBoard('3');
        selectBoardCells(cellsPickedArray);

        if(TicTacToePage.columnText(3,0) == dynamicRowOfXs(3) ){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });

    it('declares correct game winner by upper left corner to bottom right corner victory', function () {
        var cellsPickedArray =  [0,1,6,2,12,4,18,9,24]
        createBoard('5');
        selectBoardCells(cellsPickedArray);
        
        if(TicTacToePage.diagonalText(0,6,12,18,24) == dynamicRowOfXs(5)){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())
        }
    });

    it('declares correct game winner by upper right corner to bottom left corner victory', function () {
        var cellsPickedArray =  [2,1,4,3,6]
        createBoard('3');
        selectBoardCells(cellsPickedArray);

        if(TicTacToePage.diagonalText(2,4,6) == dynamicRowOfXs(3)){
            expect(TicTacToePage.endGameMessage).toHaveText(playerXWins())       
        }
    });
    
});

 