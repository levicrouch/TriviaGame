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

// console.log("We got into app.js");

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
var answerClass = ".answer-container";
var errorClip = "/assets/images/wrong-answer.gif";
var questionCount = -1;
var questionLog = [];
var radioName = "userSelection";
var radioID = "user-choice-radio";
var timerProcessID;
var timerRunning = false;
var questionCorrect = null;
var correctQuestions = 0;

// timer object
var timer = {
    //prevents the timer from being sped up unnecessarily
    questionTime: 20,
    clipTime: 10,
    currentTime: 0,
    timerRunning: false,
    count: function() {
        // create a timer for questions
        // timer.currentTime = timer.questionTime;
        // create a timer for clips
        // if (timer.currentTime > 0) {
            // DONE: decrement time by 1, remember we cant use "this" here.
            timer.questionTime--;
            // DONE: Use the variable we just created to show the converted time in the "display" div.
            $("#time-remaining").text(timer.questionTime);
        // } else {
        //     timer.stop();
        //     timer.reset();
        // }

    },
    start: function() {
        // type = number;
        if (!timerRunning) {
            timerProcessID = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function() {
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(timerProcessID);
        timerRunning = false;
    },
    reset: function() {
        timer.currentTime = 0;
        // timer.clipTime = 10;
        timerRunning = false;
        // DONE: Change the "display" div to "default"
        $("#time-remaining").text(timer.questionTime);

    }
};

////////////////////////////////////////////////////////////////
//   functions
////////////////////////////////////////////////////////////////

function determineQuestion() {
    questionCount++
    // call the function questionPopulator to populate the question on the page
    questionPopulator(questionCount);
}

function initializeGame() {
    // reset variables
    questionCount = -1;
    questionLog = [];
}

function questionPopulator(number) {
    // Determine which question to present
    // if the questions logged are less that the quiz questions then proceed to show a question
    if (questionLog.length <= quiz.length) {
        // log the index of the question asked, so we will know when we are done
        questionLog.push(number);
        if (debug) {
            console.log("questionLog: " + questionLog);
            console.log("quiz[number]: " + quiz[number]);
        }

        // Add the question to the HTML
        $(questionClass).html("<h3>" + quiz[number].question + "</h3>");
        // add the choices to the html document
        for (i = 0; i < quiz[number].choices.length; i++) {
            var choice = quiz[number].choices[i];
            $(answerClass).append("<input type='radio' name='" + radioName + "' id='" + radioID + "' data-value='" + i + "'>" + choice + "<br>");
        }
        // return;
        // If we have requested a new question but do not have any more questions to display, then quit
    } else {
        return;
    }
}

function determineCorrectAnswer(number, userGuess) {
    // identify what question we are on
    console.log("questionCount: " + number);
    if (quiz[number].answer === userGuess) {
        console.log("That is correct!");
        questionCorrect = true;
        // $(questionClass).empty();
        $(questionClass).html("<h3>That is correct!</h3>");
        $(answerClass).empty();
        $(answerClass).html("<img src=" + quiz[number].correctClip + " />");
        correctQuestions++;
        // stop and clear out timer
        timer.stop();
        timer.start();
    } else {
        console.log("That is incorrect!");
        questionCorrect = false;
    }

}

function resetPage() {
    // $(questionClass)
}

$(document).ready(function () {
    // populate the timer text
    // $("#time-remaining").text(timer.questionTime);
    $("#start-button").click(timer.start)
        // // capture the current state of the start button "data-visible"
        // startButtonVisible = $("#start-button").data("visible");
        // if (startButtonVisible) {
        //     console.log("#startButtonVisible: " + startButtonVisible);
        // }
        // // hide the start button
        // $("#start-button").hide(2000);

        // // for (i = 0; i < quiz.length; i++) {
        //     // determine which question to display
        //     determineQuestion();
            // done: Add timer for 30 seconds
            
            // determine what choice has been selected
            // console.log("radioID: " + radioID);
            // $("input").click(function (event) {
            //     // Capture the user's guess
            //     userAnswer = $("input:checked").data("value");
            //     if (debug) {
            //         console.log("userAnswer: " + userAnswer);
            //     }
            //     determineCorrectAnswer(questionCount, userAnswer);
            // });
        // }
});
