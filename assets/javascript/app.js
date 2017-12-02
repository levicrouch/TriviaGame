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
            correctClip: "https://www.youtube.com/watch?v=4Jw6mKmozjM",
            answer: 2,
        },
        {
            question: "Who performed the theme song for the sitcom Friends?",
            choices: ["The Breeders", "The Flaming Lips", "The Proclaimers", "Deep Blue Something", "The Rembrandts"],
            correctClip: "https://www.youtube.com/watch?v=Mecjelaza1o",
            answer: 4,
        },
        {
            question: "What year did 'Seinfeld' first air?",
            choices: ["1989", "1988", "1990", "1987", "1994"],
            correctClip: "https://www.youtube.com/watch?v=JpoEo2YW72Q",
            answer: 0,
        },
        {
            question: "Which of these is *not* a character from Seinfeld?",
            choices: ["Uncle Leo", "David Puddy", "Joey Tribbiani", "J.Peterman", "Babu"],
            correctClip: "https://gph.is/2cgkSxX",
            answer: 2,
        },
        {
            question: "In the final Episode of Seinfeld; what crime are Jerry, Elaine, George, and Kramer convicted of?",
            choices: ["Duty to Rescue", "Loitering", "Petty Theft", "Disorderly Conduct", "Vandalism"],
            correctClip: "https://www.youtube.com/watch?v=zPnK0NCn_MQ",
            answer: 0,
        },
    ];

var questionClass = ".question";
var answerClass = ".answer-container";
var errorClip = "/assets/images/wrong-answer.gif";
var questionCount = 0;
var questionLog = [];

////////////////////////////////////////////////////////////////
//   functions
////////////////////////////////////////////////////////////////

function determineQuestion() {
    questionCount++
    questionPopulator(questionCount);
}

function initializeGame() {
    // reset variables
    questionCount = 0;
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
            // create a variable to store a unique radio id value.
            var radioID = "choice" + i;
            $(answerClass).append("<input type='radio' name='choices' id='" + radioID + "' value='" + i + "'> " + choice + "<br>");
        }
        // If we have requested a new question but do not have any more questions to display, then quit
    } else {
        return;
    }
}

$(document).ready(function () {

    $("#start-button").click(function (event) {
        // capture the current state of the start button "data-visible"
        startButtonVisible = $("#start-button").data("visible");
        if (startButtonVisible) {
            console.log("#startButtonVisible: " + startButtonVisible);
        }
        // hide the start button
        $("#start-button").hide(5000);
        // Populate the question:
        questionPopulator(0);



    });
});