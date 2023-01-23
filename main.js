const textToggle = document.getElementById('text-toggle');

//button elements
const buttonContainer = document.querySelectorAll('.buttons');
const diceButton = document.getElementById('roll-dice');
const attackButton = document.getElementById('attack');
const moveButton = document.getElementById('move');
const newButton = document.getElementById('new');
//box elements
const boxes = document.querySelectorAll('.boxes div')
const box1 = document.getElementById("box-3");
const box2 = document.getElementById("box-1");
const box3 = document.getElementById("box-2");
const box4 = document.getElementById("box-4");
const box5 = document.getElementById("box-5");
const box6 = document.getElementById("box-7");
const box7 = document.getElementById("box-6");
const box8 = document.getElementById("box-8");
const box9 = document.getElementById("box-9");
const box10 = document.getElementById("box-10");
//player box arrays
let player1Boxes = [box1, box2, box3]; 
let neutralBoxes = [box4, box6, box5, box7];
let player2Boxes = [box8, box9, box10];
//
let player1Turn = false;
let player2Turn = false;
let attack = false;
let move = false;
let attackingScore = 0;
let defendingScore = 0;
let probabilityArray = [];
let currentAS; 
//

const rollDice = () => {
    const p1DiceAmount = Math.floor(Math.random() * 6 + 1);
    const p2DiceAmount = Math.floor(Math.random () * 6 +1);
    if(player1Turn === false && player2Turn === false) {
        whoGoesFirst(p1DiceAmount,p2DiceAmount)
    } else {
        console.log('Test')
    } 
    }

diceButton.addEventListener('click',rollDice)

const attackToggle = () => {
    if(attack === false) {
        
        attack = true;
        attackButton.innerHTML = "End Attack"
        console.log(attack)
    } else if(attack === true) {
    
        attack = false;
        attackButton.innerHTML = "Attack";
        console.log(attack)
    }
}

const moveToggle = () => {
    if(move === false) {
        move = true;
        moveButton.innerHTML = "Cancel";
        console.log(move)
        
    } else if(move === true) {
        move = false;
        moveButton.innerHTML = "Move";
        console.log(move);
    }
    
}






const firstElement = (e) => {
    const clickedElement = e.target;
    currentAS = e.target;
    for(let box of boxes) {
        box.style.border = "1px solid black";
    }
   if(attack === true) {
    battleFunction(clickedElement);
    
   } else if(attack === false) {
    highlightAE(clickedElement);
   }
}


//who goes first function 
const whoGoesFirst = (p1Dice, p2Dice) => {
    if(p1Dice === p2Dice) {
        textToggle.innerHTML = `Player 1 rolled ${p1Dice} and Player 2 rolled ${p2Dice}... Roll Again!`
           } else if(p1Dice > p2Dice) {
        textToggle.innerHTML = `Player 1 rolled ${p1Dice} and player 2 rolled ${p2Dice}... Player 1 goes first!`
        player1Turn = true;
        for(let box of player1Boxes) {
            box.addEventListener('click', firstElement);
        }
        diceButton.removeEventListener('click', rollDice);
            
    } 
    else if(p2Dice > p1Dice) {
        textToggle.innerHTML = `Player 2 rolled ${p2Dice} and Player 1 rolled ${p1Dice}... Player 2 goes first!`
        player2Turn = true;
        for(let box of player2Boxes) {
            box.addEventListener('click', firstElement)
        }
        diceButton.removeEventListener('click', rollDice);
    }
    
}

const isAdjacent = (element1, element2) => {
    if(element1 === box1 && element2 === box2 || element1 === box2 && element2 === box1) {
        return true;
    } else if(element1 === box1 && element2 === box3 || element1 === box3 && element2 === box1 ) {
        return true;
    } else if(element1 === box2 && element2 === box3 || element1 === box3 && element2 === box2 ) {
        return true;
    } else if(element1 === box1 && element2 === box5 || element1 === box5 && element2 === box1 ) {
        return true;
    } else if(element1 === box1 && element2 === box3 || element1 === box3 && element2 === box1 ) {
        return true;
    } else if(element1 === box5 && element2 === box6 || element1 === box6 && element2 === box5 ) {
        return true;
    } else if(element1 === box4 && element2 === box7 || element1 === box7 && element2 === box4 ) {
        return true;
    } else if(element1 === box5 && element2 === box4 || element1 === box4 && element2 === box5 ) {
        return true;
    } else if(element1 === box6 && element2 === box7 || element1 === box7 && element2 === box6 ) {
        return true;
    } else if(element1 === box4 && element2 === box6 || element1 === box6 && element2 === box4 ) {
        return true;
    } else if(element1 === box5 && element2 === box7 || element1 === box7 && element2 === box5 ) {
        return true;
    } else if(element1 === box7 && element2 === box9 ||  element1 === box9 && element2 === box7) {
        return true;
    } else if(element1 === box9 && element2 === box8 ||  element1 === box8 && element2 === box9) {
        return true;
    } else if(element1 === box9 && element2 === box10 ||  element1 === box10 && element2 === box9) {
        return true;
    } else if(element1 === box8 && element2 === box10 ||  element1 === box10 && element2 === box8) {
        return true;
    } else {
        return false;
    }
}

const isEnemy = (element1, element2) => {
    if(player1Boxes.includes(element1) && player2Boxes.includes(element2) || neutralBoxes.includes(element2)) {
        return true;
    } else if(player2Boxes.includes(element1) && player1Boxes.includes(element2) || neutralBoxes.includes(element2)) {
        return true;
    } 
}






const highlightAE = (element) => {
    
    element.style.border = "5px solid orange";
    for(let box of boxes) {
       
        if(isAdjacent(element,box) === true && isEnemy(element,box) === true) {
            box.style.border = "5px solid green";
    } else if(isAdjacent(element, box) === true && isEnemy(element, box) !== true) {
        box.style.border = "5px solid blue";
    }
    }
}

const battleLogic = (e) => {
    attackingScore = parseInt(currentAS.innerHTML);
    defendingScore = parseInt(e.target.innerHTMl)    
    if(parseInt(currentAS.innerHTML) === parseInt(e.target.innerHTML)) {
            probabilityArray.push(0);
            probabilityArray.push(1);
            console.log(probabilityArray);
        } else if(parseInt(currentAS.innerHTML) > parseInt(e.target.innerHTML)) {

        }
    
    
    
}

const battleFunction = (element) => {
    element.style.border = "5px solid yellow";
    for(let box of boxes) {
        if(isAdjacent(element,box) === true && isEnemy(element, box) === true ) {
            box.style.border = "5px solid green";
            box.addEventListener('click', battleLogic);
        } 
    } 
    
}

//new game function 
const newGame = () => {
    textToggle.innerHTML = "ROLL TO SEE WHO GOES FIRST!";
    diceButton.addEventListener('click',rollDice);
    player1Turn = false;
    player2Turn = false;
    player1Boxes = [box1, box2, box3];
    neutralBoxes = [box4, box5, box6, box7];
    player2Boxes = [box8, box9, box10];
    attackingScore = 0;
    defendingScore = 0;
    for(let box of boxes) {
        box.style.border = "1px solid black";
    }
   for(let box of boxes) {
    box.removeEventListener('click', firstElement);
   }
}
newButton.addEventListener('click', newGame);
attackButton.addEventListener('click', attackToggle);
moveButton.addEventListener('click', moveToggle);