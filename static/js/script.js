// Challenge 1 age in days 
// need what year you are born ... 
function ageInDays() {
    if (document.getElementById('daysofage') === true) {
        reset()
    } else {
        var birthyear = prompt('What year were you born.. Good friends..?');
        var daysofage = (2019 - birthyear) * 365;
        var h1 = document.createElement('h1');
        var textAnswer = document.createTextNode('You are ' + daysofage + ' days old');
        h1.setAttribute('id', 'daysofage');
        h1.appendChild(textAnswer);
        document.getElementById('flex-box-result').appendChild(h1);
        console.log(daysofage)
    }
}


function reset() {
    document.getElementById('daysofage').remove();
}

function create_cat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

var items = document.querySelectorAll('.container-1');
console.log(items)

// Challenge 3 Rock, papper, scissors // 

let rpsGame = {
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
}

function rpsgame(choice){
    // console.log(choice.id);
    var humanchoice , botchoice;
    humanchoice = choice.id;
    botchoice = number_to_choice(random_rps_int());
    // random_rps_int()
    console.log('Computer choice',botchoice); 
    results = decidewinner(humanchoice, botchoice)
    console.log(results);
    message = final_message(results);
    
    rpscomputResults(results);

    console.log(message);
    rpsfrontend(humanchoice, botchoice, message);
}
// making the rock paper scissor as globel variable to be used later by different functions.

ROCK = document.getElementById('rock')
PAPER = document.getElementById('paper')
SCISSOR = document.getElementById('scissor')

const chichang = new Audio("static/sounds/Cha_Ching_Register.mp3");

function random_rps_int() {
    return Math.floor(Math.random()*3);
}

function number_to_choice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decidewinner(you, computer) {
    var rps_database = {
        'rock': {'scissor' : 1, 'rock': 0.5, 'paper': 0},
        'paper' : {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0}
    };
    var yourscore = rps_database[you][computer];
    var computerscore = rps_database[computer][you];
    return [yourscore, computerscore];

}

function final_message([yourScore, computerscore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You Tie', 'color':'orange'};    
    } else {
        return {'message': 'You WIN!', 'color':'green'};
    }
}

function rpscomputResults([playerscore, botscore]) {
    if (playerscore === 1){
        rpsGame['wins']++;
        chichang.play();
    } else if (playerscore === 0.5) {
        rpsGame['draws']++;
    } else {
        rpsGame['losses']++;
    }

    console.log('wins', rpsGame['wins'])
    // to show the wins losses and draws on the front end of rps table 
    document.querySelector('#rpswin').textContent = rpsGame['wins'];
    document.querySelector('#rpsloss').textContent = rpsGame['losses'];
    document.querySelector('#rpsdraw').textContent = rpsGame['draws'];

}

function rpsfrontend(humanImageChoice, botImageChoice, finalmessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    // let's remove all the images on the click
    //document.getElementById('rock').remove();
    //document.getElementById('paper').remove();
    //document.getElementById('scissor').remove();
    ROCK.remove();
    PAPER.remove();
    SCISSOR.remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +"' height=150 width=150 style='box-shadow: 0px 0px 30px 6px rgba(42,156,19,1);'>"
    messagediv.innerHTML = "<h1 style ='color: "+ finalmessage['color'] +"; font-size: 50px; padding: 20px; '>" + finalmessage['message'] + "</h1>"
    botdiv.innerHTML = "<img src='" +imagesDatabase[botImageChoice] +"' height=150 width=150 style='box-shadow: 0px 0px 30px 6px rgba(207,15,15,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humandiv)
    document.getElementById('flex-box-rps-div').appendChild(messagediv)
    document.getElementById('flex-box-rps-div').appendChild(botdiv)
}

document.querySelector('#rpsplay').addEventListener('click', rpsplayagain);

function rpsplayagain() {
    
    let elements = document.querySelectorAll('#flex-box-rps-div div');
    for (let i =0; i<elements.length; i++){
        elements[i].remove()
    }
   console.log(ROCK);

    document.querySelector('#flex-box-rps-div').appendChild(ROCK);
    document.querySelector('#flex-box-rps-div').appendChild(PAPER);
    document.querySelector('#flex-box-rps-div').appendChild(SCISSOR);



    //console.dir(elements);
}



// ---> Challenge 4 change the color for all the Buttons <----\\ 

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons =[];

for (let i=0; i< all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);


function changebuttoncolor(selectedvalue) {
    
     if (selectedvalue.value === 'reset') {
        buttoncolorReset();
    } else if (selectedvalue.value === 'random') {
        randomcolor();
    } else {
        change_color(selectedvalue.value);
    }
}

// To change all the button colors to the selected values by user from front-end... 

function change_color(color) {
    let colordatabase = {
        'red':'btn-danger',
        'green': 'btn-success',
        'blue' : 'btn-primary',
        'yellow': 'btn-warning',
        'white' : 'btn-light',
        'black' : 'btn-dark'
    };
    console.log("the class is ",colordatabase[color]);
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(colordatabase[color]);
        console.log("And from the loop the class is ---> ",colordatabase[color])
    }
}


//to reset all the buttons to it's original color....
function buttoncolorReset() {
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

// To give the buttons random colors .... 
function randomcolor(){
    for (let i=0; i<all_buttons.length; i++) {
        number = Math.floor(Math.random()*8);
        new_class = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-dark', 'btn-info','btn-light', 'btn-secondary'][number]
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(new_class);
    }
  }

//----> Challenge 5: Blackjack <----\\

let blackjackGame = {
    'you' : {'scorespan': '#your-blackjack-result', 'div':'#your-box', 'score': 0},
    'dealer' : {'scorespan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score': 0},
    'card' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsmap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10, 'Q':10, 'K':10, 'A':[1, 11]},
    'wins' : 0,
    'losses': 0,
    'draws' : 0,
    'stand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitsound = new Audio('static/sounds/swish.m4a');

const winsound = new Audio('static/sounds/cash.mp3');

const lossSound = new Audio('static/sounds/aww.mp3');

// using query selector to take the button by id then monitoring the the click to run the function blackjackhit()
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackhit() {
    if (blackjackGame['stand'] === false) {
        let card = randomcard();
        console.log(card);
        showcard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

// selecting a random card from the card database in blackjack game dictionary 
// 'card' = ["2","3","4","5","6","7",..."A"],
function randomcard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['card'][randomIndex]; 
}

//showcard takes the card from the ^ randomcard function and turns it to a sorce link to the image file 
// To take that specific image, if the card is 'Q' --> static/images/Q.png 
function showcard(card , activeplayer){
    if (activeplayer['score'] <= 21) {
        let cardimage = document.createElement('img');
        cardimage.src=`static/images/${card}.png`;
        //once we get the image then we can add it to the player's table 
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

// After user and dealer play a game the deal fuction resets the green board for them to play again
// which means deleting the images from the board, reseting the score and the message on top to Let's play
function blackjackDeal() {

    if (blackjackGame['turnsOver'] === true) {
        // deactivating the stand button 
        blackjackGame['stand'] = false;
        //only add this if two people are playing
        //showresult(computWinner());

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }

        for (let i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-results').textContent = "Let's Play";
        document.querySelector('#blackjack-results').style.color = "black";

        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card, activeplayer){
    // 'A' in black jack has 2 values [1,11] 1 when the over all score + A <= 21 
    // and 11 when the over all score + A >= 21
    if (card === 'A'){
        if (activeplayer['score'] + blackjackGame['cardsmap'][card][1] <= 21){
            activeplayer['score'] += blackjackGame['cardsmap'][card][1];
        } else {
            activeplayer['score'] += blackjackGame['cardsmap'][card][0];
        }
    } else {
        activeplayer['score'] += blackjackGame['cardsmap'][card];
    }

}
// speacking to the html and changing the score as the players play
function showScore(activeplayer) {
    //when the player score is > 21 they already lose the game regardless of other player score AKA (BUST!)
    if (activeplayer['score'] > 21){
        document.querySelector(activeplayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    } else {
        // if they don't BUST just show the score on the green board.
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['stand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['stand'] === true) {
        let card = randomcard();
        showcard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computWinner();
    showresult(winner);
    
    
}

// Teach the computer how to determine the WIN!!???
//Then show the result of who won.
// also updates the win, loss, draw table below the board

function computWinner(){
    let winner;
    if (YOU['score']<=21){
        // condition higher score than the dealer or when dealer bust but you are <= 21
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }

    // Condition: when user bust but dealer does not     
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    // condition: When you and the dealer bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log('wins: ',blackjackGame['wins']);
    document.querySelector('#win').textContent = blackjackGame['wins'];
    document.querySelector('#loss').textContent = blackjackGame['losses'];
    document.querySelector('#draw').textContent = blackjackGame['draws'];
    return winner;
}

// It takes the winner and display a message to the player if he won lost, or drew.
// and also play the soundeffect. 

function showresult(winner){
    if (blackjackGame['turnsOver'] === true) {
        let message, messagecolor;

        if (winner === YOU) {
            message = 'You WON!';
            messagecolor = 'green';
            winsound.play()

        } else if (winner === DEALER) {
            message = 'You LOST!';
            messagecolor = 'red';
            lossSound.play();

        } else {
            message = 'You drew!';
            messagecolor = 'orange';
            lossSound.play();
        }

        document.querySelector('#blackjack-results').textContent = message;
        document.querySelector('#blackjack-results').style.color = messagecolor;
        
    }
}
