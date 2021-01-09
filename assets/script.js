// page layout
var headerDiv = document.createElement ("header");
document.body.appendChild (headerDiv);

var hiScrBtnDiv = document.createElement ("section");
headerDiv.appendChild (hiScrBtnDiv);
hiScrBtnDiv.textContent = "Score List";
hiScrBtnDiv.addEventListener("click",displayScores);

var counttDownTimerDiv = document.createElement ("section");
headerDiv.appendChild (counttDownTimerDiv);
counttDownTimerDiv.innerHTML = "<span>Timer: <span id='timer'>0</span></span>";

var timer = document.getElementById ("timer");

var mainDiv = document.createElement ("main");
document.body.appendChild (mainDiv);

var questionPane = document.createElement ("section");
mainDiv.appendChild (questionPane);

var choicePane = document.createElement ("section");
mainDiv.appendChild (choicePane);

var responsePane = document.createElement ("section");
mainDiv.appendChild (responsePane);

// global variables
var gameStatus = "on";
var countDownValue = 0;
var playerChoice;
var questions = [["Do you like to watch as seen on tv commercials?","Yes","Never","No, I just watch them beacuse they are on.","Yes"], ["Why don't you ever see baby pigions","Baby pigions can't leave the nest.","They are so cute they would  burn your eyes.","Arn't all pigions babies?","Baby pigions can't leave the nest."], ["How much wood could a woodchuck chuck?","Some wood","Most wood","More wood than me","More wood than me"],["Do you use Facebook", "No","Yes","Maybe","Yes"],["Is cereal soup?","Cereal is soup, but not all soup is cereal","It is if is served hot.","No, but it is soupy.","No, but it is soupy."],["How many chickens would it take to kill and elephant?","100","300","It could never happen.","100"],["How would you are the size of your house?","Postage stamp","Post Office","UPS","UPS"] ];
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
    questionPane.textContent = "Ready for the quiz?"
    return startButton;
}

function clickStartBtn (){
    countDownValue = 30;
    currentQuestionNum = 0;
    stopValue = setInterval (function () {
        countDownValue --;
        timer.textContent = countDownValue;
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
}

startButton.addEventListener("click", clickStartBtn);

function postQuestion() {
    questionPane.textContent = questions[currentQuestionNum][0];
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
    choicePane.innerHTML = ""
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
    localStorage.setItem("quizScores", JSON.stringify(scoresObj));
    displayScores();
}

function displayScores (){
    responsePane.innerHTML = ""
    questionPane.textContent="Scores";
    choicePane.textContent="";
    var storedQuizScores = JSON.parse(localStorage.getItem("quizScores"));
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
    clickStartBtn();
};
