// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

/*explaination of the game
start button
    create a start button that
        hides the start button
        triggers the timer
        posts a question
countdown timer
nav button for high scores
object of questions and answers
start timer
present a question
capture the response
compare resonse to answer
display correct or wrong
when all questions have been asked stop timer
show score
prompt user to enter intials
record intials and score
navigate to high score page
button for return to game page*/

// creation of page layout
var headerDiv = document.createElement ("header");
document.body.appendChild (headerDiv);

var hiScrBtnDiv = document.createElement ("section");
headerDiv.appendChild (hiScrBtnDiv);
hiScrBtnDiv.textContent = "high score button";

var counttDownTimerDiv = document.createElement ("section");
headerDiv.appendChild (counttDownTimerDiv);
counttDownTimerDiv.innerHTML = "<span>Timer: <span id='timer'>30</span></span>";

var mainDiv = document.createElement ("main");
document.body.appendChild (mainDiv);

var questionPane = document.createElement ("section");
mainDiv.appendChild (questionPane);
questionPane.innerHTML = "<H1> questionPane </H1>";

var choicePane = document.createElement ("section");
mainDiv.appendChild (choicePane);
choicePane.innerHTML = "<H4>choicePane</H4>";

var responsePane = document.createElement ("section");
mainDiv.appendChild (responsePane);
responsePane.innerHTML = "<H2></H2>";

var countDownValue;
var timer = document.getElementById ("timer");
console.log (timer);

// global variables
var gameStatus = "on";
var playerChoice;
var questions = [["question1",1,2,3,1], ["question2",1,2,3,2], ["question3",1,2,3,3]];
var currentQuestionNum;
var correctText = "Correct";
var incorrectText = "Incorrect";
var score = 0;
var winMsg = "You Win!"
var gameOVerMsg = "Game Over! Time to Study!"
var startButton = createStartButton();


function createStartButton() {
    var startButton = document.createElement ("button");
    startButton.textContent = "Start Game";
    responsePane.appendChild(startButton);
    return startButton;
}

// countdown timer
var stopValue = setInterval (function () {
    countDownValue --;
    timer.textContent = countDownValue;
    if (countDownValue === 0) {
        clearInterval (stopValue);
    }
}, 1000) ;

startButton.addEventListener("click", function (event) {
    // alert ("working");
    countDownValue = 30;
    currentQuestionNum = 0;
    
    postQuestion();
} );

function postQuestion(currentQuestionNum) {
    // alert ("working");
    // console.log ("this " + this.currentQuestionNum);
    // console.log ("not this " + currentQuestionNum);
    // console.log (questions[this.currentQuestionNum][1]);
    questionPane.textContent = questions[this.currentQuestionNum][0];
    currentQuestionNum++;
    for (let index = 0; index < 3; index++) {
        var element = array[index];
        
    }
}






// var startGame = function () {
//     stopValue();

// }

// answer checking loop
// if (playerChoice = question.currentQuestionNum) {
//     score += 10;
//     displayCorrectInccorrect()
//     postQuestion();
// }



var thing = document.querySelector("h4");
console.log (thing);

