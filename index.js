const gB = document.querySelector(".game-board");

gB.style.width = "100wh";
gB.style.justifyContent = "center";

const cell = document.querySelectorAll(".cell");
for(let i = 0; i < cell.length; i++){    
    cell[i].style.border = "2px solid black";
}
const rB = document.querySelector("#restartButton");
rB.style.marginTop = "20px";
rB.style.padding = "5px";

const undo = document.querySelector("#undoButton");
undo.style.marginTop = "20px";
undo.style.padding = "5px";

function won(celli, curr) {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (celli[i].textContent == curr && celli[i+1].textContent == curr && celli[i+2].textContent == curr) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (celli[i].textContent == curr && celli[i+3].textContent == curr && celli[i+6].textContent == curr) {
            return true;
        }
    }
    // Check diagonals
    if (celli[0].textContent == curr && celli[4].textContent == curr && celli[8].textContent == curr) {
        return true;
    }
    if (celli[2].textContent == curr && celli[4].textContent == curr && celli[6].textContent == curr) {
        return true;
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < cell.length; i++) {
        if (!cell[i].textContent) {
            return false;
        }
    }
    return true;
}

function restart() {
    cell.forEach((celli) => {
        celli.textContent = "";
    });
    draw = false;
    turn_of_o = true;
    moves = [];
}

let moves = [];
let turn_of_o = true;
let draw = false;

cell.forEach((celli) => {
    celli.addEventListener("click", function clicked() {
        const cell_idx = celli.getAttribute("data-cell-index");
        if (celli.textContent || draw) {
            return;
        } else if (turn_of_o) {
            celli.textContent = "X";
            turn_of_o = false;
            if (won(cell, "X")) {
                draw = false;
                alert("Player1 wins!");
            }
            if (!won(cell, "X") && !won(cell, "O") && isBoardFull()) {
                draw = true;
                alert("It's a draw");
            }
            moves.push(cell_idx);
        } else {
            celli.textContent = "O";
            turn_of_o = true;
            if (won(cell, "O")) {
                draw = false;
                alert("Player2 wins!");
            }
            if (!won(cell, "X") && !won(cell, "O") && isBoardFull()) {
                draw = true;
                alert("It's a draw");
            }
            moves.push(cell_idx);
        }
    });
});

const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", function () {
    restart();
});

undo.addEventListener("click", () => {
    let last_move = moves.pop();
    document.querySelector(`[data-cell-index="${last_move}"]`).textContent = "";
    turn_of_o = !turn_of_o;
});
