const grid = document.getElementById("grid")
var board;

for(let i=0; i<81; i++) {
    const inputBox = document.createElement("input")
    inputBox.style.height = '50px';
    inputBox.style.width = '50px';
    inputBox.style.fontSize = '50px';
    inputBox.style.textAlign = 'center';
    if(
        ((i%9==0 || i%9 ==1 || i%9==2) && i<21) ||
        ((i%9==6 || i%9 ==7 || i%9==8) && i<27) ||
        ((i%9==3 || i%9 ==4 || i%9==5) && i>27 && i<53) ||
        ((i%9==0 || i%9 ==1 || i%9==2) && i>53) ||
        ((i%9==6 || i%9 ==7 || i%9==8) && i>53)
      ) 
        {
            inputBox.style.backgroundColor = 'darkgrey';
        }
    

    grid.appendChild(inputBox)
}

let submission = []

function solve() {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        if(input.value) {
            submission.push(input.value);
        }
        else submission.push('.');
    })
    // console.log(submission);

    board = stringToMatrix(submission);
    // if(isSolvable(board) == false) alert("Unsolvable sudoku!")
    let sol = solveSudoku(board);
    let ans = null;
    if(sol) {
        ans = board.join().split(',');
    }
    else alert('Invalid Input')
    // console.log(sol);
    // console.log(ans);
    showSol(ans)
}

function showSol(ans) {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, i) => {
        input.value = ans[i]
    })
}

function stringToMatrix(inputStr) {
    const matrix = [];
    let row = [];

    for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr[i];
        
        row.push(char);
          
        if (row.length === 9) {
        matrix.push(row);
        row = [];
        }
      }
    return matrix;
}

function isValid(board, row, col, c) {
    for(let k=0; k<9; k++) {
        if(board[k][col] ==c) {
            return false;
        }

        if(board[row][k] == c) {
            return false;
        }

        if (board[3* Math.floor(row / 3) +  Math.floor(k / 3)][3* Math.floor(col / 3) +  Math.floor(k % 3)] == c){
            return false;
        }
    }
    return true;
}




function solveSudokufun(board) {
    for(var i=0; i<board.length; i++) {
        for(var j=0; j<board[0].length; j++) {
            if (board[i][j] == '.') {
                for( var c='1'; c<='9'; c++ ) {
                    if(isValid(board, i, j, c)) {
                        board[i][j] = `${c}`;

                        if(solveSudokufun(board)){ 
                            return true;
                        }

                        else board[i][j] = '.';
                    }
                }

                return false;
            }
            else if(board[i][j]>='1' && board[i][j]<='9') continue;
            else return false
        }
    }
    return true;
}
 
var solveSudoku = function(board) {
    // var res = board;
    return solveSudokufun(board);
};
