let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
let x_nr = 0;//number of X's
let o_nr = 0;//number of 0's
let x = true;//used to alternate between X and 0

$(document).ready(function(){
    $(".board__clickable_area").click(function(){
        //??if I omit the line below the code gets executed for .board__unclickable_area as well
        if($(this).attr('class') != 'board__clickable_area')
            return;
        if (x) {
            addX($(this));       
            return;
        }
        x = true;
        addO($(this));
    })
})

function addX (element) {
    disableClick(element);
    x = false;
    ++x_nr;
    board[element.attr("data-row")][element.attr("data-col")] = 'X';
    element.attr('href', "./resources/X.svg");
    checkForWinners('X');
}

function addO (element) {
    disableClick(element);
    x = true;
    ++o_nr;
    board[element.attr("data-row")][element.attr("data-col")] = 'O';
    element.attr('href', "./resources/O.svg");
    checkForWinners('O');
}

function checkForWinners(contender) {
    if (x_nr < 3)
        return;
    if (board[0][0] !== '-' && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
        gameOver(contender, 1);
        return;        
    }
    if (board[1][0] !== '-' && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
        gameOver(contender, 2);
        return;
    }
    if (board[2][0] !== '-' && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
        gameOver(contender, 3);
        return;
    }
    if (board[0][0] !== '-' && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
        gameOver(contender, 4);
        return;
    }
    if (board[0][1] !== '-' && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
        gameOver(contender, 5);
        return;
    }
    if (board[0][2] !== '-' && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
        gameOver(contender, 6);
        return;
    }
    if (board[0][0] !== '-' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        gameOver(contender, 7);
        return;
    }
    if (board[0][2] !== '-' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        gameOver(contender, 8);
        return;
    }
}

function gameOver(winner, line) {
    console.log("Game Over!");
    console.log(winner + " won the game!");
    //disableClick for all
    $('.board__clickable_area').each(function() {
        $(this).removeClass('board__clickable_area');
        $(this).addClass('board__unclickable_area');
    });
    //
    const crossTheWinner = document.createElementNS("http://www.w3.org/2000/svg", "image");
    crossTheWinner.setAttribute("width", "108");
    crossTheWinner.setAttribute("height", "108");
    //for width and heigth .setAttributeNS() does not work
    crossTheWinner.setAttributeNS("http://www.w3.org/1999/xlink", "href", "./resources/winner_line_" + line + ".svg")
    //the xlink namespace must be used for the images href
    document.getElementsByClassName("board")[0].appendChild(crossTheWinner);
    //
    const GOScreen = document.createElement("div"); 
    {//creating the G(ame)O(ver)Screen
        const upperArch = document.createElement("div");
        const mainForm = document.createElement("div");
        {//creating the mainForm

        }
    }

}

function disableClick(element) {
    element.removeClass('board__clickable_area');
    element.addClass('board__unclickable_area');
}