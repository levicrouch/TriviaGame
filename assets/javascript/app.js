////////////////////////////////////////////////////////////////
//   trivia game javascript
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//   question list
////////////////////////////////////////////////////////////////

console.log("We got into app.js");

var objQ = {
    question1: "Besides Jerry Seinfeld, who co-created the Seinfeld sitcom?",
    q1Answers: ["Michael Richards", "Jason Alexander", "Larry David", "Elaine Benes", "Stephen J. Cannell"],
    solution: function (property,index){return this.property[index]},
    question2: "Who performed the theme song for the sitcom Friends?",
    q2Answers: ["The Breeders", "The Flaming Lips", "The Proclaimers", "Deep Blue Something", "The Rembrandts"],
    question3: "What year did 'Seinfeld' first air?",
    q3Answers: ["1989", "1988", "1990", "1987", "1994"],
    question4: "Which of these is *Not* a character from Seinfeld",
    q4Answers: ["Uncle Leo", "David Puddy", "Joey Tribbiani", "J.Peterman", "Babu"],
    question5: "In the final Episode of Seinfeld; what crime are Jerry, Elaine, George, and Kramer convicted of?",
    q5Answers: ["Duty to Rescue", "Loitering", "Petty Theft", "Disorderly Conduct", "Vandalism"],
    questionClass: ".question",
    answerClass: ".answer-container"
    // answerClass: ".answer-" + 
};
$(document).ready(function() {

$("#start-button").click(function (event) {
    // console.log("objQ.questionClass: " + objQ.questionClass);
    // Add the question to the HTML
    $(objQ.questionClass).html("<h3>" + objQ.question1 + "</h3>");
    // Iterate through the objQ object and populate the answers with radio buttons
    for (i = 0; i < objQ.q1Answers.length; i++) {
        // create a variable to store a unique radio id value.
        var radioID = "answer" + i;
        $(objQ.answerClass).append("<input type='radio' name='answer' id='" + radioID + "' value='" + i + "'> " + objQ.q1Answers[i] + "<br>");
    }


});
});