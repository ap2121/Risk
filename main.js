//Text Toggle Elements
const textToggle = document.getElementById('text-toggle');
const title = document.getElementById('title')
//////
//button elements
const buttons = document.querySelectorAll('.buttons');
const diceButton = document.getElementById('roll-dice');
const attackButton = document.getElementById('attack');
const moveButton = document.getElementById('move');
const newButton = document.getElementById('new');
const endTurnButton = document.getElementById('end');
const addButton = document.getElementById('add');
/////
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
/////
//player box arrays
let player1Boxes = [box1, box2, box3]; 
let neutralBoxes = [box4, box5, box6, box7];
let player2Boxes = [box8, box9, box10];
////
//Global Toggle Variables
let player1Turn = false;
let player2Turn = false;
let attack = false;
let add = false;
let attackingScore = 0;
let defendingScore = 0;
let probabilityArray = [];
let currentAS;
let soldierC = 2;
//
//Roll Dice Function
const rollDice = () => {
    const p1DiceAmount = Math.floor(Math.random() * 6 + 1);
    const p2DiceAmount = Math.floor(Math.random () * 6 +1);
    if(player1Turn === false && player2Turn === false) {
        whoGoesFirst(p1DiceAmount,p2DiceAmount)
    } else {
        console.log('Test')
    } 
    }
/////

//Dice button event handler
diceButton.addEventListener('click',rollDice)
///
//Toggles Attack True and False
const attackToggle = () => {
    if(attack === false) {
        attack = true;
        attackButton.innerHTML = "End Attack"
        addButton.innerHTML = "Add Players";
        textToggle.innerHTML = "ATTACK UP THE FIELD!"
        add = false;
        for(let box of boxes) {
            box.style.border = "1px solid black";
        }
        
    } else if(attack === true) {
        attack = false;
        attackButton.innerHTML = "Attack";
       
    }
    console.log(attack)
}
////



const addToggle = () => {
    
    if(add === false) {
        add = true;
        addButton.innerHTML = soldierC;
        if(player1Turn === true & player2Turn === false) {
            
            for(let box of player1Boxes) {
                
                box.addEventListener('click', firstElement);
            }
        } else if(player2Turn === true && player1Turn === false) {
            
            for(let box of player2Boxes) {
                
                box.addEventListener('click', firstElement);  
            }
        }
    } else if(add === true) {
        add = false;
       addButton.innerHTML = 'Add Players';

    }
    
}


//Gets and passes first element into function depending on Global Toggles
const firstElement = (e) => {
    const clickedElement = e.target;
    currentAS = e.target;
    for(let box of boxes) {
        box.style.border = "1px solid black";
    }
   if(attack === true) {
    battleFunction(clickedElement);
    
    
   } else if(attack === false && add === false) {
    highlightAE(clickedElement);
   } else if(add === true) {
    addFunction(clickedElement);
   } 
}
/////


/////
//who goes first function 
const whoGoesFirst = (p1Dice, p2Dice) => {
    if(p1Dice === p2Dice) {
        textToggle.innerHTML = `Player 1 rolled ${p1Dice} and Player 2 rolled ${p2Dice}... Roll Again!`
           } 
           else if(p1Dice > p2Dice) {
        
        player1Turn = true;
        textToggle.innerHTML = 'ADD YOUR PLAYERS!'
        textToggle.style.color = "#002244";
        title.innerHTML = "GO HAWKS!";
        title.style.color = "#002244";
        diceButton.removeEventListener('click', rollDice);
        addButton.addEventListener('click', addToggle );

    } 
    else if(p2Dice > p1Dice) {
        player2Turn = true;
        textToggle.innerHTML = "ADD YOUR PLAYERS!";
        textToggle.style.color = "red";
        title.innerHTML = "GO NINERS!";
        title.style.color = "red";
        diceButton.removeEventListener('click', rollDice);
        addButton.addEventListener('click', addToggle);
    }
    
}
/////
// Checks for adjacent elements for element selected
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
////
//Checks for enemies of selected Element
const isEnemy = (element1, element2) => {
    if(player1Boxes.includes(element1) && player2Boxes.includes(element2) || neutralBoxes.includes(element2)) {
        return true;
    } else if(player2Boxes.includes(element1) && player1Boxes.includes(element2) || neutralBoxes.includes(element2)) {
        return true;
    } 
}
////
//Logic for attacking, runs every time adjacent enemy is clicked.
const battleLogic = (e) => { 
    attackingScore = parseInt(currentAS.innerHTML);
    defendingScore = parseInt(e.target.innerHTML); 
    let attackingArray;
    let defendingArray;
  if(player1Boxes.includes(currentAS)) {
    attackingArray = player1Boxes;
    if(player2Boxes.includes(e.target)) {
        defendingArray = player2Boxes;
    } else if(neutralBoxes.includes(e.target)) {
        defendingArray = neutralBoxes;
    } 
  } else if(player2Boxes.includes(currentAS)) {
    attackingArray = player2Boxes;
    if(player1Boxes.includes(e.target)) {
        defendingArray = player1Boxes;
    } else if(neutralBoxes.includes(e.target)) {
        defendingArray = neutralBoxes;
    }
  }   
    if(attack === true && isEnemy(currentAS, e.target) === true && parseInt(currentAS.innerHTML) > 1){
        
        addButton.removeEventListener('click', addToggle)
        if(parseInt(currentAS.innerHTML) === parseInt(e.target.innerHTML)) {
            probabilityArray.push(0);
            probabilityArray.push(1);
           
            
        } else if(parseInt(currentAS.innerHTML) > parseInt(e.target.innerHTML)) {
            probabilityArray.push(0, 0, 0);
            probabilityArray.push(1);
           
        } else if(parseInt(currentAS.innerHTML) < parseInt(e.target.innerHTML)) {
            probabilityArray.push(0);
            probabilityArray.push(1, 1, 1);
            
        }

        if(probabilityArray[Math.floor(Math.random () * probabilityArray.length)] === 0) {
            console.log(probabilityArray);
            defendingScore--;
            
            if(defendingScore === 0) {
                if(attackingScore > 1) {
                    attackingScore--;
                } 
                defendingScore++;
                e.target.innerHTML = attackingScore;
                currentAS.innerHTML = defendingScore;
                e.target.style.border = "1px solid black";
                attackingArray.push(e.target);
                let targetIndex = defendingArray.indexOf(e.target);
               if(defendingArray.indexOf(e.target) === 0) {
                defendingArray.shift()
               } else if(defendingArray.indexOf(e.target !== 0)) {
                defendingArray.splice(targetIndex,targetIndex);
               }
                for(let box of attackingArray) {
                    box.addEventListener('click', firstElement);
                }
               

            } else {
            e.target.innerHTML = defendingScore;
            }
            
        } else if(probabilityArray[Math.floor(Math.random () * probabilityArray.length)] === 1) {
            console.log(probabilityArray)
            attackingScore--;
            
            currentAS.innerHTML = attackingScore;
        }
        for(let box of player1Boxes) {
            box.style.backgroundColor = "#002244";
            box.style.color = "#69BE28";
        }
        for(let box of player2Boxes) {
            box.style.backgroundColor = "red"
            box.style.color = "gold";
        } 
        
    for(let box of neutralBoxes) {
        box.style.backgroundColor = "rgb(184, 184, 184)";
        
    }
    }
    if(player1Turn === true && player2Turn === false) {
        if(attackingArray.length === 10) {
            title.innerHTML = "TOUCHDOWN SEAHAWKS!"
            textToggle.innerHTML = "A thrilling overtime victory brings the title back to Seattle!"
        }
    } else if(player2Turn === true) {
        if(attackingArray.length === 10) {
            title.innerHTML = "TOUCHDOWN 49ERS"
            textToggle.innerHTML = "San Francisco scores in overtime and brings the trophy back to the Bay!"
        }
    }
    
    probabilityArray = [];
}
const addLogic = (e) => {
    
    let clickNumber = parseInt(e.target.innerHTML);
    if(soldierC > 0){
        clickNumber++
        e.target.innerHTML = clickNumber;
        attackButton.addEventListener('click', attackToggle);
    } 
   if(soldierC > 0) {
    soldierC--;
   addButton.innerHTML = soldierC;
   }
}
 

////
//Sets event handler for battle logic, first element selected passed in

// function ran if add soldiers is true;

const addFunction = (element) => {
   element.style.border = "5px solid pink";
   if(player1Turn === true && player2Turn === false) {
    for(let box of player1Boxes) {
        box.style.border = "5px solid pink"
        box.addEventListener('click', addLogic);
    }
   } else if(player2Turn === true && player1Turn === false) {
        for(let box of player2Boxes) {
            box.style.border = "5px solid pink";
            box.addEventListener('click', addLogic);
        }
   }
   
}
//    

const battleFunction = (element) => {
    element.style.border = "5px solid yellow";
    for(let box of boxes) {
        if(isAdjacent(element,box) === true && isEnemy(element, box) === true ) {
            box.style.border = "5px solid green";
            box.addEventListener('click', battleLogic);
            
             } } }
//highlights adjacent friendlies and adjacent enemies 
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
/////
//end turn function
const endTurn = () => {
   if(player1Turn === true && player2Turn === false) {
        player1Turn = false;
        player2Turn = true;
        title.innerHTML = "GO NINERS!";
        textToggle.innerHTML = "ADD YOUR PLAYERS";
        title.style.color = "red";
        textToggle.style.color = "red";
        
        for(let box of player1Boxes) {
            box.removeEventListener('click', firstElement);
        }
   } else if(player2Turn === true && player1Turn === false) {
        player1Turn = true;
        player2Turn = false;
        title.innerHTML = "GO HAWKS!";
        textToggle.innerHTML = "ADD YOUR PLAYERS";
        title.style.color = "#002244";
        textToggle.style.color = "#002244";
        for(let box of player2Boxes) {
            box.removeEventListener('click', firstElement);
        }
   }
    attack = false;
    add = false;
    attackingScore = 0;
    defendingScore = 0;
    probabilityArray = [];
    currentAS;
    soldierC = 2;
    for(let box of boxes) {
        box.style.border = "1px solid black";
    }
    attackButton.innerHTML = "Attack";
    addButton.addEventListener('click', addToggle);
    addButton.innerHTML = "Add Player";
}
// 
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
endTurnButton.addEventListener('click', endTurn);
