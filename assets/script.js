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
counttDownTimerDiv.innerHTML = "<span>Timer: <span id='timer'>0</span></span>";

var timer = document.getElementById ("timer");

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
// responsePane.innerHTML = "<H2>responsePane</H2>";

// global variables
var gameStatus = "on";
var countDownValue = 0;
var playerChoice;
var questions = [["question1",1,2,3,1], ["question2",4,5,6,5], ["question3",7,8,9,9]];
var currentQuestionNum;
var correctText = "Correct";
var incorrectText = "Incorrect";
var score = 0;
var winMsg = "You Win!"
var gameOVerMsg = "Game Over! Time to Study!"
var startButton = createStartButton();
var stopvalue;

function createStartButton() {
    var startButton = document.createElement ("button");
    startButton.textContent = "Start Game";
    responsePane.appendChild(startButton);
    return startButton;
}

startButton.addEventListener("click", function (event) {
    // alert ("working");
    countDownValue = 30;
    currentQuestionNum = 0;
    stopValue = setInterval (function () {
        countDownValue --;
        timer.textContent = countDownValue;
        // console.log ("question number = " +currentQuestionNum);
        // console.log ("total questions = " +questions.length);
        if (countDownValue === 0 && currentQuestionNum < questions.length - 1) {
            clearInterval (stopValue);
            endGame();
        } else if (countDownValue === 0) {
            clearInterval(stopValue);
        }
    }, 1000);
    for (let index = 0; index < 3; index++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent ="answer"
        choiceBtn.setAttribute ("id", "btn"+index);
        choicePane.appendChild (choiceBtn);
        // console.log ("working");
    }
    postQuestion();
    startButton.remove();
} );

function postQuestion() {
    questionPane.textContent = questions[currentQuestionNum][0];
    // currentQuestionNum++;
    for (let index = 0; index < 3; index++) {
        var choice = questions[currentQuestionNum][index+1];
        document.querySelector("#btn"+index).textContent = choice;
    }
}

choicePane.addEventListener ("click", function(event){
    event.preventDefault();
    if (event.target = "button") {
        playerChoice = event.target.textContent;
        if (playerChoice == questions[currentQuestionNum][4]) {
            displayCorrect();
        } else{
            displayIncorrect();
        }
    }
});

function displayCorrect () {
    responsePane.innerText = "correct";
    currentQuestionNum++;
    score++;
    setTimeout (function (){
        responsePane.textContent = "";
        if (currentQuestionNum < questions.length) {
            postQuestion();
        } else {
            endGame();
        }
    }, 1000);

}

function displayIncorrect () {
    responsePane.innerText = "wrong"
    setTimeout (function (){ responsePane.textContent = ""}, 1000);
}

function endGame(){
    countDownValue = 1;
    questionPane.textContent = "Game Over";
    for (let index = 0; index < 3; index++) {
        document.querySelector("#btn"+index).remove();
    }
    choicePane.textContent = "Your final score was " + score + ". Enter you initals below to save your score.";
    var nameInput = document.createElement ("input");
    nameInput.setAttribute("id","playerInitials");
    nameInput.setAttribute("type","text");
    nameInput.setAttribute("placeholder","Your Initials Here");
    responsePane.appendChild(nameInput);
    var submitBtn = document.createElement ("button");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("id", "submit-btn");
    submitBtn.addEventListener("click", clickSubmit);
    responsePane.appendChild(submitBtn);
}

function clickSubmit () {
    var playerInitials = document.getElementById("playerInitials").value;

    var scoresObj = JSON.parse(localStorage.getItem("quizScores"));
    if (scoresObj == null){
        scoresObj = {};
    }
    scoresObj[playerInitials]=score;
    console.log("initials " +playerInitials);
    console.log("score " +score);
    // var currentInitialsAndScores =[playerInitials,JSON.stringify(score)];
    localStorage.setItem("quizScores", JSON.stringify(scoresObj));
    displayScores();
}


function displayScores (){
    document.querySelector("#playerInitials").remove();
    document.querySelector("#submit-btn").remove();
    questionPane.textContent="List Scores";
    choicePane.textContent="";
    var storedQuizScores = JSON.parse(localStorage.getItem("quizScores"));
    console.log(storedQuizScores);
    for (var key in storedQuizScores) {
        var newDiv = document.createElement("div");
        newDiv.textContent = `${key}: ${storedQuizScores[key]}`;
        choicePane.appendChild(newDiv);
    }
    var playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    choicePane.appendChild(playAgainButton);
    playAgainButton.addEventListener("click", function(){
        clickPlayAgain();
    });
};

function clickPlayAgain(){
    choicePane.innerHTML = "";
};

// old countdown timer to be deleted
// var stopValue = setInterval (function () {
//     countDownValue --;
//     timer.textContent = countDownValue;
//     if (countDownValue === 0) {
//         endGame();
//         clearInterval (stopValue);
//     }
// }, 1000) ;

// function countDown (stopValue) {
//     countDownValue --;
//     timer.textContent = countDownValue;
//     if (countDownValue === 0) {
//         endGame();
//         clearInterval (stopValue);
//     }
// }