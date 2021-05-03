const Page = require('./page');


class TicTacToePage extends Page {

    open () { return super.open('https://codepen.io/CalendlyQA/full/KKPQLmV'); }

    // selector for number input text box
    get inputNumber () { 
        return $('#number'); 
    }

    // selector for play button
    get btnSubmit () { 
        return $('#start');
     }

     // selector for tic tac toe board
     get gameBoard ()  {
        return $('//*/table');
        //  return $('#table');     
     }

     get boardCells () {
        return $$('td');
     }
     
     // selector for message displayed when someone has won
     get endGameMessage () {
         return $('#endgame');
     }
    
    // returns innerText of complete row of cells in string format, (i.e, X X X)
    rowText (index) {
        var table = $('//*/table')
        var rows = table.$$(".//tr")
        var rowText = rows[index].getText()
        return rowText;
      }

      // returns innerText of complete column of cells in string format, (i.e, X X X)
      columnText (rowLength, column) {
        var str = ""
        var reference = column
        for(var i = 0;  i < rowLength -  1; i++)  {
            if(i==0){
                var str2 = `${$$('td')[column].getText()} `
                str = str.concat (str2)
            }
            str2 = `${$$('td')[reference + rowLength].getText()} `
            str = str.concat (str2)
            reference += rowLength
        }
        return str.replace(/\s+$/, "");
      }

    // intended use is to return the innerText of a combo of cells in a diagonal in string format
    // example: if you wanted to check the values of diagonal cells from top left to the bottom right
    // you would input the cell indices and this function will return them in "X X X" or "O O O" format
    // note: flexible enough to return any combo of cells in any formation (rows, columns or random)
    diagonalText (...args) {
        var table = $('//*/table');
        var cells = table.$$(".//tr/td")
        var str = ""
        var str2 = "X "

        for(var i=0;i<args.length;i++){
            args.forEach(arg => 
                str2 = `${cells[arg].getText()} `,
                str = str.concat (str2))
        }
        return str.replace(/\s+$/, "");
    }

    get iFrame () {
        return $('#result')
    }
    
    // this creates a board, cellCount determines the amount of cells the board contains
    createBoard (cellCount) {
        this.inputNumber.setValue(cellCount);
        this.btnSubmit.click();
    }
    
    // returns a board cell by  index
    boardCell (index)  {
        return $$('td')[index];
    }

    // selects multiple board cells
    // remember: symbols alternate every subsequent index, (i.e, [0,1,2] =  X O X)
    selectBoardCells (args) {
       for(var i=0; i<args.length; i++){
        $$('td')[args[i]].click();
       }      
    }
}

module.exports = new TicTacToePage();  

