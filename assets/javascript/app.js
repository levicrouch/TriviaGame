////////////////////////////////////////////////////////////////
//   trivia game javascript
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//   Configuration
////////////////////////////////////////////////////////////////
var debug = true;

////////////////////////////////////////////////////////////////
//   question list
////////////////////////////////////////////////////////////////

var quiz =
    [
        {
            question: "Besides Jerry Seinfeld, who co-created the Seinfeld sitcom?",
            choices: ["Michael Richards", "Jason Alexander", "Larry David", "Julia Louis-Dreyfus", "Stephen J. Cannell"],
            // correctClip: "https://www.youtube.com/watch?v=4Jw6mKmozjM",
            correctClip: "assets/images/correct-answer-0.gif",
            answer: 2,
        },
        {
            question: "Who performed the theme song for the sitcom Friends?",
            choices: ["The Breeders", "The Flaming Lips", "The Proclaimers", "Deep Blue Something", "The Rembrandts"],
            // correctClip: "https://www.youtube.com/watch?v=Mecjelaza1o",
            correctClip: "assets/images/correct-answer-1.gif",
            answer: 4,
        },
        {
            question: "What year did 'Seinfeld' first air?",
            choices: ["1989", "1988", "1990", "1987", "1994"],
            // correctClip: "https://www.youtube.com/watch?v=JpoEo2YW72Q",
            correctClip: "assets/images/correct-answer-2.gif",
            answer: 0,
        },
        {
            question: "Which of these is *not* a character from Seinfeld?",
            choices: ["Uncle Leo", "David Puddy", "Joey Tribbiani", "J.Peterman", "Babu"],
            // correctClip: "https://gph.is/2cgkSxX",
            correctClip: "assets/images/correct-answer-3.gif",
            answer: 2,
        },
        {
            question: "In the final Episode of Seinfeld; what crime are Jerry, Elaine, George, and Kramer convicted of?",
            choices: ["Duty to Rescue", "Loitering", "Petty Theft", "Disorderly Conduct", "Vandalism"],
            // correctClip: "https://www.youtube.com/watch?v=zPnK0NCn_MQ",
            correctClip: "assets/images/correct-answer-4.gif",
            answer: 0,
        },
    ];

////////////////////////////////////////////////////////////////
//   variables and objects
////////////////////////////////////////////////////////////////
var questionClass = ".question";
var timeRemaining = "#time-remaining";
var answerClass = ".answer-container";
var statusClass = ".status";
var imageClip = ".image-clip";
var errorClip = "assets/images/wrong-answer.gif";
var questionCount = -1;
var questionLog = [];
var radioName = "question";
var radioID = "user-choice-radio";
var timerProcessID;
var timerRunning = false;
var questionCorrect = null;
var correctQuestions = 0;
var inCorrectQuestions = 0;
var unanswered = 0;

// timer object
var timer = {
    //prevents the timer from being sped up unnecessarily
    questionTime: 20,
    // clipTime: 10,
    timerRunning: false,
    count: function () {

        if (timer.questionTime > 0) {
            // DONE: decrement time by 1, remember we cant use "this" here.
            timer.questionTime--;
            // DONE: Use the variable we just created to show the converted time in the "time-remaining" div.
            $(timeRemaining).text(timer.questionTime);
        } else {
            timer.stop();
            timer.reset();
        }

    },
    start: function () {
        // type = number;
        if (!timerRunning) {
            timerProcessID = setInterval(timer.count, 1000);
            timerRunning = true;

        }
    },
    stop: function () {
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(timerProcessID);
        timerRunning = false;
        // count number of questions correct
        // endOf
    },
    reset: function () {
        timer.questionTime = 20;
        // timer.clipTime = 10;
        timerRunning = false;
        // DONE: Change the "time-remaining" div to "default"
        $(timeRemaining).text(timer.questionTime);

    },
    clipCount: function () {

        if (timer.clipTime > 0) {
            // Clear out the current value and set the clipTime
            $(timeRemaining).empty();
            $(timeRemaining).text(timer.clipTime);
            // DONE: decrement time by 1.
            timer.clipTime--;
            // DONE: Use the variable we just created to show the time in the "time-remaining" div.
            $(timeRemaining).text(timer.clipTime);
        } else {
            timer.stop();
            timer.reset();
        }

    },
    clipStart: function () {
        // type = number;
        if (!timerRunning) {
            timerProcessID = setInterval(timer.clipCount, 1000);
            timerRunning = true;

        }
    },
};

////////////////////////////////////////////////////////////////
//   functions
////////////////////////////////////////////////////////////////

function playQuiz() {

    // Load the question and the choices
    questionPopulator();
// set the timer to the default time to take quiz
// start the timer
    // count how many questions were correct
        // count how many questions were incorrect
        // count how many questions were unanswered
function calculateScore (){

}

    // check for the user's choice
    // $("input").click(function (event) {
        // Capture the user's guess
        // determineCorrectAnswer();
        
    
    });
}
function initializeGame() {
    // set the default timer value
    $(timeRemaining).text(timer.questionTime);
    $(statusClass).hide();
    

}

function removeStartButton() {
    // capture the current state of the start button "data-visible"
    startButtonVisible = $("#start-button").data("visible");
    if (startButtonVisible) {
        console.log("#startButtonVisible: " + startButtonVisible);
    }
    // hide the start button
    $("#start-button").hide(2000);
}
function loadStatusHTML() {
    // Show the time remaining, question, and answer divs into the html doc
    $(statusClass).show();
    // // Set the timer
    // $(timeRemaining).text(timer.questionTime);
}
// function determineQuestion() {

//     if (questionCount < quiz.length) {
//         questionCount++
//         // call the function questionPopulator to populate the question on the page
//         questionPopulator(questionCount);
//     } else {
//         initializeGame();
//     }
// }

function questionPopulator() {
    // Determine which question to present
    // if the questions logged are less that the quiz questions then proceed to show a question
    for (i = 0; i < quiz.length; i++) {
        // Create a new div for the first question
        var dynamicDiv = "question" + i;
        $("#question").append().addClass(dynamicDiv);
        dynamicDiv = "." + dynamicDiv;
        if (debug){
            console.log("created dynamicDiv: " + dynamicDiv);
        }
        // Add the question to the HTML
        $(dynamicDiv).append("<h3>" + quiz[i].question + "</h3>");
        // add the choices to the html document
        $(answerClass).show();
        for (c = 0; c < quiz[i].choices.length; c++) {
            var choice = quiz[i].choices[c];
            var dynamicAnswerDiv = "answer" + i;
            $(dynamicDiv).append().addClass(dynamicAnswerDiv);
            dynamicAnswerDiv = "." + dynamicAnswerDiv;
            var dynamicRadioName = radioName + i;
            $(dynamicAnswerDiv).append("<input type='radio' data-name='" + dynamicRadioName + "' id='" + radioID + "' data-value='" + c + "'>" + choice + "<br>");
        }
    }
    // return;
    // If we have requested a new question but do not have any more questions to display, then quit
}

function determineCorrectAnswer() {
    questionID = $("input").data("name");
    userAnswer = $("input:checked").data("value");
    if (debug) {
        console.log("userAnswer: " + userAnswer);
        console.log("questionID: " + questionID);
    }
    // identify what question we are on
    // console.log("questionCount: " + number);
    if (questionID === "question0"){
        var number = 0;
        console.log("questionID:", questionID);
    } else if (questionID === "question1"){
        var number = 1;
    }else if (questionID === "question2"){
        var number = 2;
    }else if (questionID === "question3"){
        var number = 3;
    }else if (questionID === "question4"){
        var number = 4;
    }

    console.log("number: " + number);
    if (quiz[number].answer === userAnswer) {
        console.log("That is correct!");
        questionCorrect = true;
        // Insert correct heading
        $(questionClass).html("<h3>That is correct!</h3>");
        correctQuestions++;
        // stop and clear out timer
        // timer.stop();
    } else {
        console.log("That is incorrect!");
        questionCorrect = false;
        $(questionClass).html("<h3>That is Incorrect!</h3>");
        inCorrectQuestions++;
        // stop and clear out timer
        // timer.stop();
    }
    // executeAfterClip(number)
    // return
}

function executeAfterClip(number) {
    if (questionCorrect) {
        var afterClip = "<img src='" + quiz[number].correctClip + "' />";
    } else {
        var afterClip = "<img src='" + errorClip + "' />";
    }
    // temporarily hide the answer, question, and time-remaining classes
    $(answerClass).hide(); $(imageClip).show(); setTimeout(function () {
        $(imageClip).hide();
        $(answerClass).empty();
        $(answerClass).show();
    }, 5000);
}

function resetPage() {
    // $(questionClass)
}

$(document).ready(function () {
    // populate the timer text
    initializeGame();
    $("#start-button").click(function () {
        // Load the question and answer well for displaying the questions and answers
        loadStatusHTML();
        // Remove the start button
        removeStartButton();
        // for (i = 0; i < quiz.length; i++) {
        playQuiz();

        // }
    });
});
