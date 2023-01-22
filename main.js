const textToggle = document.getElementById('text-toggle');

//button elements
const buttonContainer = document.querySelectorAll('.buttons');
const diceButton = document.getElementById('roll-dice');
const attackButton = document.getElementById('attack-button');
const moveButton = document.getElementById('move-button');
const endButton = document.getElementById('move-button');
//box elements
const box1 = document.getElementById("box-3");
const box2 = document.getElementById("box-1");
const box3 = document.getElementById("box-2");
const box4 = document.getElementById("box-4");
const box5 = document.getElementById("box-5");
const box6 = document.getElementById("box-7");
const box7 = document.getElementById("box-6");
const box8 = document.getElementById("box-9");
const box9 = document.getElementById("box-8");
const box10 = document.getElementById("box-10");
//player box arrays
const player1Boxes = [box1, box2, box3] 
const neutralBoxes = [box4, box5, box6, box7];
const player2Boxes = [box8, box9, box10];
//

let player1Turn = false;
let player2Turn = false;
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

const whoGoesFirst = (p1Dice, p2Dice) => {
    if(p1Dice === p2Dice) {
        textToggle.innerHTML = `Player 1 rolled ${p1Dice} and Player 2 rolled ${p2Dice}... Roll Again!`
           } else if(p1Dice > p2Dice) {
        textToggle.innerHTML = `Player 1 rolled ${p1Dice} and player 2 rolled ${p2Dice}... Player 1 goes first!`
        player1Turn = true;
        diceButton.removeEventListener('click', rollDice);
            
    } 
    else if(p2Dice > p1Dice) {
        textToggle.innerHTML = `Player 2 rolled ${p2Dice} and Player 1 rolled ${p1Dice}... Player 2 goes first!`
        player2Turn = true;
        diceButton.removeEventListener('click', rollDice);
    }
}