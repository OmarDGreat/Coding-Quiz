//Questions array
var userQuestions = [
    {
        question: "Commonly used data types Do not include:",
        answers: {
                   0: "strings",
                   1: "booleans",
                   2: "alerts",
                   3: "numbers"
                 },
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement enclosed with __________.",
        answers: {
                   0: "quotes",
                   1: "curly brackets",
                   2: "parenthesis",
                   3: "square brackets"
                 },
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be be used to store ________.",
        answers: {
                   0: "numbers and strings",
                   1: "other arrays",
                   2: "booleans",
                   3: "all the above"
                 },
        correctAnswer: "all the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: {
                   0: "commas",
                   1: "curly brackets",
                   2: "quotes",
                   3: "paranthesis"
                 },
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        answers: {
                   0: "JavaScript",
                   1: "terminal/bash",
                   2: "for loops",
                   3: "console.log"
                 },
        correctAnswer: "console.log"
    }  
];

var questionIndex = 0;
var userCorrectAnswer = 0 
var timeLeft = 75;
var question;
var answer1,answer2,answer3,answer4;
var previousScores;
var questionAnswerCorrect;
var selectionArray = [];
var buttonArray = [];
// var questionAnswer;
totalQuestions = userQuestions.length;
var timer = document.querySelector("#timer"); //Timer
var scoreLink = document.querySelector("scorelink");//High Score
var principalContent = document.querySelector("#principal-content"); //Main body
var questionSwitch = document.getElementById("question-change");
var quizQuestion = document.querySelector("#quizquestion");
var userSelection = document.querySelector("#userselection");
var userScore = document.querySelector("#userscore");
var userHighScore = document.querySelector("#userhighscores");
var score = document.getElementById("scorelink");
var startButton = document.getElementById("startquiz");

//Buttons for question answers
for(var i = 0; i < 4; i++){
    var buttonDiv = document.createElement("div");
    var selectionButtons = document.createElement("button");
    selectionButtons.setAttribute("data-index", i);
    selectionButtons.setAttribute("class","btnn");
    selectionArray.push(buttonDiv);
    buttonArray.push(selectionButtons);
}
//Div to show if selected answer is correct or wrong
var rightWrong = document.createElement("p");
rightWrong.setAttribute("class", "right-wrong");
userSelection.appendChild(rightWrong);

//Function to start the timer and the Quesitons
function startChallenge(){
    startTimer();
    buildQuestion();
}
//Timer
function startTimer(){
    
    var timeInterval = setInterval(function(){

        timeLeft--;

        timer.textContent = "Time : "+timeLeft;
        
        if(timeLeft <= 0 || (questionIndex > totalQuestions-1)){
            
            userSelection.style.display = "none";
            quizQuestion.style.display = "none";
            showResult();
            clearInterval(timeInterval);
            timer.textContent = "";
        }

    },1000);
}
//function to display question and hide page content.
var buildQuestion = function(){

    questionSwitch.style.display = "none";
    principalContent.style.display= "none";
    quizQuestion.style.display = "none";

    if(questionIndex > totalQuestions -1){
        return;
    }
    else{
        questionAnswerCorrect = userQuestions[questionIndex].correctAnswer;

        questionSwitch.innerHTML = userQuestions[questionIndex].question;
        questionSwitch.setAttribute("class","textleft;");
        questionSwitch.style.display="block";

        //generating options
        for (var a = 0; a < 4; a++){
        var index = buttonArray[a].getAttribute("data-index");
        buttonArray[a].textContent = (+index+1) +". "+userQuestions[questionIndex].answers[index];
        selectionArray[a].appendChild(buttonArray[a]);
        quizQuestion.appendChild(selectionArray[a]);

        }

    }
    quizQuestion.setAttribute("style","text-align:left");
    quizQuestion.style.display = "block";
}
//Event listening for Answers
quizQuestion.addEventListener("click",function(event){

        var segment = event.target;
        var selectedAnswer = segment.textContent;
        var options = selectedAnswer.substring(3, selectedAnswer.length);

        if (options === questionAnswerCorrect){
            userCorrectAnswer++;
            userSelection.style.display = "block";
            rightWrong.textContent = "correct!";

            setTimeout(function(){
                rightWrong.textContent="";

            },500);
        }
        else {
            timeLeft -= 10;
            rightWrong.textContent = "Wrong!";

            setTimeout(function(){
                rightWrong.textContent="";
            },500);
        }
        questionIndex++;
        buildQuestion();

});
//To show end of the quiz
function showResult() {
    questionSwitch.innerHTML = "Challenge Completed!";
    questionSwitch.style.display= "block";

    var show = document.createElement("p");
    show.textContent = "You score is : "+ userCorrectAnswer;
    userScore.appendChild(show);
//form to store score
    var form = document.createElement("form");
    var label = document.createElement("label");
    label.textContent = "Enter you name : ";

//input username
    var textInput = document.createElement("input");
    textInput.setAttribute("id","nameInput");
    textInput.setAttribute("class","textinput");

    var summitScore = document.createElement("button");
    summitScore.setAttribute("class", "btn textinput");
    summitScore.textContent = "Summit";

    form.appendChild(label);
    form.appendChild(textInput);
    form.appendChild(summitScore);

    userScore.appendChild(form);

    summitScore.addEventListener("click",saveScores);
}
//store score
function saveScores(event){

    
    event.preventDefault();

    var userName = document.querySelector("#nameInput").value.trim();
    console.log(userName);

    if (userName === null || userName === ''){
        alert("Please enter your name");
        return;
    }

    var user = {
        name: userName,
        score: userCorrectAnswer
    }

    console.log(user);

    previousScores = JSON.parse(localStorage.getItem("previousScore"));

    if(previousScores){
        previousScores.push(user);
    }
    else {
        previousScores = [user];
    }

    localStorage.setItem("previousScores",JSON.stringify(previousScores));

    showScores();
}
//function to show high score
function showScores(){
debugger;
    questionSwitch.innerHTML = "High " +"Scores";
    questionSwitch.setAttribute("class","userhighscores");
    questionSwitch.style.display = "block";

    quizQuestion.style.display = "none";
    userScore.style.display = "none";


    var scoreTable = document.createElement("table");
    scoreTable.setAttribute("id","table");
    scoreTable.style.textAlign = "center";

    var scoreTableContent = document.createElement("tbody");
    var row = document.createElement("tr");

    var scoreTitle01 = document.createElement("th");
    var scoreTitle01Text01 = document.createTextNode("Name");

    scoreTitle01.setAttribute("class","tableheading");
    scoreTitle01.appendChild(scoreTitle01Text01);
    row.appendChild(scoreTitle01);
    
    var scoreTitle02 = document.createElement("th");
    var scoreTitle02Text02 = document.createTextNode("Score");
    scoreTitle02.appendChild(scoreTitle02Text02);    
    scoreTitle02.setAttribute("class","tableheading");
    row.appendChild(scoreTitle02);

    scoreTableContent.appendChild(row);


    var userNameLenght = 0;
    if(previousScores) {
        userNameLenght = previousScores.length;
    }

    for (var i = 0; i < userNameLenght; i++) {
        var row = document.createElement("tr");

        var userName = previousScores[i].name;
        var userNameScore = previousScores[i].score;

        var tdCell01 = document.createElement("td");
        var tdCell01Text01 = document.createTextNode(userName);
        tdCell01.appendChild(tdCell01Text01);
        row.appendChild(tdCell01);

        var tdCell02 = document.createElement("td");
        var tdCell02Text02 = document.createTextNode(userNameScore);
        tdCell02.appendChild(tdCell02Text02);
        row.appendChild(tdCell02);

        scoreTableContent.appendChild(row);

    }
    
    if(userNameLenght > 0) {
        scoreTable.appendChild(scoreTableContent);
    }
    
    scoreTable.setAttribute("border", "2");
    scoreTable.setAttribute("width", "100%");

    userHighScore.appendChild(scoreTable);

    var buttonDiv = document.createElement("div");
    buttonDiv.style.textAlign = "center";
    userHighScore.appendChild(buttonDiv);

    score.style.display = "none";
//go back button
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class","btn");
    goBackButton.textContent = "Start Over";
    buttonDiv.appendChild(goBackButton);

    goBackButton.addEventListener("click",function(){
        window.location = "index.html";
    });

//clear score button
    var clearScoresButton = document.createElement("button");
    clearScoresButton.setAttribute("class", "btn btnnn");
    clearScoresButton.textContent = "Clear Scores";
    buttonDiv.appendChild(clearScoresButton);

    clearScoresButton.addEventListener("click", function(){
        localStorage.clear();
        var table = document.querySelector("table");
        table.style.display = "none";
    });
}
//high Score Event listening.
    score.addEventListener("click", function(){

        principalContent.style.display = "none";
        score.style.display = "none";

        previousScores = JSON.parse(localStorage.getItem("previousScores"));

        showScores();
    });
//start quiz button
startButton.addEventListener("click",startChallenge);
