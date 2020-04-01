let grid = [];
let player1 = true
let activeGame = true
let turnNumber = 0
let text = document.getElementById("gameText")

//Winning conditions
const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

// Create Grid
Render()

// Event once box is clicked
document.onclick = function(e) {
    if (hasClass(e.target, 'target')) {
        if (e.target.innerHTML == "" && activeGame == true){
            if (player1 == true){
                e.target.innerHTML = "X"
                text.innerHTML = "Player 2's turn"
                turnNumber += 1
                CheckBoxes()
                player1 = false
            } else {
                e.target.innerHTML = "O"
                text.innerHTML = "Player 1's turn"
                turnNumber += 1
                CheckBoxes()
                player1 = true
            }
        }
    }
}

//Restart Button Clicked
document.getElementById("restartbtn").onclick = function() {
    Reset();
    Render();
}

// Function to Create grid and set text
function Render(){
    text.innerHTML= "Player 1's turn"
    text.style.color = "black"
    let boxId = 0;

    for (let row = 0; row < 3; row++) {
        let div = document.createElement("div");
        div.setAttribute("id", "row" + row);
        div.setAttribute("class", "row");
        document.getElementById("body").appendChild(div)
        for (let col = 0; col < 3; col++) {
            boxId += 1
            let box = document.createElement("div");
            box.setAttribute("class", "target")
            box.setAttribute("id", boxId)
            document.getElementById("row" + row).appendChild(box);
            grid.push(box);
        }
    };
}

// Function to Reset variables and remove grid
function Reset() {
    grid = [];
    player1 = true
    activeGame = true
    turnNumber = 0
    

    for (let i = 0; i < 3; i++) {
        let element = document.getElementById("row" + i)
        document.getElementById("body").removeChild(element)
    }
}

//Function to verify result of the game
function CheckBoxes() {
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = document.getElementById(winCondition[0]).innerHTML
        let b = document.getElementById(winCondition[1]).innerHTML
        let c = document.getElementById(winCondition[2]).innerHTML
        if (a === "" || b === "" || c === "") {
            continue
        }
        if (a === b && b === c) {
            activeGame = false
            if (a == "X"){
                text.innerHTML = "Player 1 Wins"
                text.style.color = "red"
                break
            } else {
                text.innerHTML = "Player 2 Wins"
                text.style.color = "blue"
                break
            }
        } else if (turnNumber >= 9) {
            text.innerHTML = "Draw"
        }
    }
}

function hasClass(elem, className) {
    return elem.classList.contains(className);
}