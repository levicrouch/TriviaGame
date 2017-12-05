////////////////////////////////////////////////////////////////
//   trivia game javascript
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//   Configuration
////////////////////////////////////////////////////////////////
var debug = false;

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
            choices: ["Loitering", "Petty Theft", "Disorderly Conduct" , "Duty to Rescue" , "Vandalism"],
            // correctClip: "https://www.youtube.com/watch?v=zPnK0NCn_MQ",
            correctClip: "assets/images/correct-answer-4.gif",
            answer: 3,
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
startButtonVisible = null;
var radioName = "question";
var radioID = "user-choice-radio";
var timerProcessID;
var timerRunning = false;
var correctQuestions = 0;
var inCorrectQuestions = 0;
var unanswered = 0;
var wellLg = ".well-lg";

var timer = {
    //prevents the timer from being sped up unnecessarily
    questionTime: 30,
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
        // scoreQuiz();
    },
    reset: function () {
        timer.questionTime = 30;
        // timer.clipTime = 10;
        timerRunning = false;
        // DONE: Change the "time-remaining" div to "default"
        $(timeRemaining).text(timer.questionTime);
        scoreQuiz();
    }
};
function initializeGame() {
    // set the default timer value
    $(timeRemaining).text(timer.questionTime);
    $(wellLg).hide();
    showStartButton();
    // reset counters
    correctQuestions = 0;
    inCorrectQuestions = 0;
    unanswered = 0;
    startButtonVisible = null;
    // Add the status class data back
    
}

function playQuiz() {
    // DONE: user clicks the start button and a new well appears (that was previously hidden)

    $("#replay-button").hide(2000);
    // show the status window 
    $(wellLg).show();
    
    // capture the current state of the start button "data-visible"
    startButtonVisible = $("#start-button").data("visible");
    if (startButtonVisible) {
        console.log("#startButtonVisible: " + startButtonVisible);
        // hide the start button
    hideStartButton();
    }
    
    
    // DONE: in the new well, enter the questions and choices
    questionPopulator();
    // start timer
    timer.start();
    // TODO: once time is up, the number of correct, incorrect, and unanswered questions is calculated



}
function hideStartButton() {
    $("#start-button").data("hidden");
    // hide the start button
    $("#start-button").hide(2000);
}

function showStartButton() {
    $("#start-button").data("visible");
    // show the start button
    $("#start-button").show(2000);
}

function questionPopulator() {
    // Determine which question to present
    // if the questions logged are less that the quiz questions then proceed to show a question
    for (i = 0; i < quiz.length; i++) {
        // Create a new div for the first question
        var dynamicDiv = "question" + i;
        // $("#question").append().addClass(dynamicDiv);
        $("#question").append("<div class='" + dynamicDiv + "'></div>");
        // dynamicDiv = "." + dynamicDiv;
        if (debug) {
            console.log("created dynamicDiv: " + dynamicDiv);
        }
        // Add the question to the HTML
        $("." + dynamicDiv).append("<h3>" + quiz[i].question + "</h3>");

        // add the choices to the html document
        $(answerClass).show();
        for (c = 0; c < quiz[i].choices.length; c++) {
            var choice = quiz[i].choices[c];
            // var dynamicDiv = "answer" + i;
            // $(dynamicDiv).append().addClass(dynamicAnswerDiv);
            var dynamicRadioName = "choices" + i;
            // var dynamicRadioName = "choices" + c;
            // $("." + dynamicDiv).html("<form action =''>");
            $("." + dynamicDiv).append("<input type='radio' name='" + dynamicRadioName + "' id='" + c + "' value='" + c + "'>" + choice + "<br></div>");
        }
    }
}

function scoreQuiz() {
    // Checked values of Radio Buttons
    // clear out the i variable
    i = 0;
    for (i = 0; i < quiz.length; i++) {
        var userAnswer = $("input:radio[name='choices" + i + "']:checked").val();
        if (debug) {
            console.log("userAnswer: " + userAnswer);
        }
        var userAnswer = parseInt(userAnswer);
        var quizAnswer = parseInt(quiz[i].answer);
        if (userAnswer === quizAnswer) {
            correctQuestions++;
        } else {
            inCorrectQuestions++;
        }
        if (userAnswer === undefined) {
            unanswered++
        }
        if (debug) {
            console.log("correctQuestions: " + correctQuestions);
            console.log("inCorrectQuestions: " + inCorrectQuestions);
        }

    }
    // empty the status class
    $(statusClass).empty();
    $(statusClass).html("<h3>All Done!</h3>");
    $(statusClass).append("<p>Total Correct:", correctQuestions + "</p>");
    $(statusClass).append("<p>Total Incorrect:", inCorrectQuestions + "</p>");
    $(statusClass).append("<p>Total Unanswered:", unanswered + "</p>");
    // $(statusClass).append("<a class='btn btn-primary btn-lg' id='replay-button' role='button'>Play Again?</a>");
    // // user clicks the replay button we replay the game
    // $("#replay-button").click(function () {
    //     // $(statusClass).empty();
    //     $(statusClass).hide();
    //     $(wellLg).hide;
    //     initializeGame();
    //     $(statusClass).html("<div class='status'>\
    //     <h3>Time Remaining: </h3>\
    //     <p>\
    //         <span id='time-remaining'></span> seconds</p>");
    //     playQuiz();
    // });

}


// DONE: load a basic page with a title of the app and a start button

$(document).ready(function () {
    // initialize the page
    initializeGame();
    // populate the timer text
    $("#start-button").click(function () {

        playQuiz();


    });



    // TODO: start a timer that clicks down from 30 seconds 
    // TODO: user has 30 seconds to answer all questions on the page

    // TODO: once the score is calculated, it is displayed to the user for review
    // TODO: user then clicks a new button to reset the game and can play again.
});