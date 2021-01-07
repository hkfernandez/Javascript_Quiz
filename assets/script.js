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
choicePane.innerHTML = "<H4> choicePane </H4>";

var responsePane = document.createElement ("section");
mainDiv.appendChild (responsePane);
responsePane.innerHTML = "<H2> responsePane </H2>";

var countDownValue = 30
var timer = document.getElementById ("timer");
console.log (timer);

var stopValue = setInterval (function () {
    countDownValue --;
    timer.textContent = countDownValue;
    if (countDownValue === 0) {
        clearInterval (stopValue);
    }
}, 1000) ;



