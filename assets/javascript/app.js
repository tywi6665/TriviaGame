$(document).ready(function(){

//Make an object array with questions and corresponding answers, as well as correct answer index 
    var questionArr = [{
    question: "What is the name of Harry’s pet owl?",
    multipleChoice:["Hedwig", "Errol", "Crookshanks", "Dobby"]
},{
    question: "What is the name of the actress who plays Hermione Granger?",
    multipleChoice: ["Emma Watson", "Emilia Clark", "Tony Stark", "Emma Stone"]

},{
    question: "Which is not one of the Hogwarts Houses?",
    multipleChoice: ["Griffindor", "Ravenclaw", "Slytherin", "Fluffernutters"]
},{
    question: "In what year was the first Harry Potter movie released?",
    multipleChoice: ["2000", "2001", "1999", "2002"]
},{
    question: "What is the name of the vicious tree that Harry and Ron drove into in 'Harry Potter and the Chamber of Secrets'?",
    multipleChoice: ["Outrageous Oak", "Whomping Willow", "Evil Elm", "Malicious Maple"]
},{
    question: "How much was Dobby paid a month in the Hogwarts kitchen?",
    multipleChoice: ["One Galleon", "One Sickle", "One Knut", "One Pound"]
},{
    question: "Where did Harry live before his parents died?",
    multipleChoice: ["Godric's Hallow", "Hogsmede", "London", "Little Whinging"]
},{
    question: "What did Dumbledore leave in his will for Ron?",
    multipleChoice: ["The Sword of Griffindor", "The Tales of Beadle the Bard", "His Deluminator", "A Golden Snitch"]
},{
    question: "Who was the half-blood prince? ",
    multipleChoice: ["Draco Malfoy", "Harry Potter", "Lord Voldemort", "Severus Snape"]
},{
    question: "What fruit must you tickle to get into the Hogwarts kitchen?",
    multipleChoice: ["Apple", "Pear", "Banana", "Orange"]
}];

var answerArr = ["Hedwig", "Emma Watson", "Fluffernutters", "2001", "Whomping Willow", "One Galleon", "Godric's Hallow", "His Deluminator", "Severus Snape", "Pear"];

//Create a game play realated variables
var currentQuestion = 0;
var answered = true;
var score = 0;
var time;
var seconds;

//Create a start button click event to begin the game
$(".startBtn").on("click", function () {
    $(this).hide ();
    nextQuestion ();
})

//Create a function to set up interval timer
function timer () {
    clearInterval(time);
    seconds = 10;
    $(".time-remaining").text("Time Remaining: " + seconds + " seconds");
    time = setInterval(countDown, 1000);
}

//Create function to make timer count down
function countDown () {
    seconds--;
    $(".time-remaining").text("Time Remaining: " + seconds + " seconds");
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        //Run function to transition to next question page
        nextQuestion ();
    }
} 

//Create function to choose and display question and corresponding answers
function nextQuestion () {
    $(".question-choices").empty();
    $(".question").html('<h2>' + (currentQuestion +1) + '/' + questionArr.length + ': ' + questionArr[currentQuestion].question + '<h2>'  )
    for (var i = 0; i < 4; i++) {
        var a = $("<button>");
        a.text(questionArr[currentQuestion].multipleChoice[i]);
        a.attr({"data-index": i});
        $(".question-choices").append(a)
    }
    currentQuestion++;
    timer();
    $(".question-choices").on("click",function () {
        userGuess = $(this).data("index")
        clearInterval(time);
        console.log(userGuess);
        showAnswer ();
    })
}

//Create a funciton to run once an answer has been chosen
function showAnswer () {
    $(".time-remaining").empty();
    $(".question-choices").empty();
    $(".question").empty();
    var answerIndex = answerArr[currentQuestion - 1];
    
    if ((userGuess == answerIndex) && (answered == true)) {
        score++;
        $(".answerScreen").html("<h2>Thats Correct!! You clearly know your stuff!! On to the next quesion... </h2>");
    } else if ((userGuess != answerIndex) && (answered == true)) {
        $(".answerScreen").html("<h2>Sorry, that's incorrect!! I had so much faith in you. Regardless, on to the next quesion... </h2>");  
        $(".answerScreen").append("The correct answer was: " + answerArr[currentQuestion-1])
    } else 
        $(".answerScreen").html("<h2>Time's Up!! Gotta work a little faster. Now on to the next quesion... </h2>");  
        $(".answerScreen").append("The correct answer was: " + answerArr[currentQuestion-1])
    }

    if (currentQuestion < (answerArr.length)) {
        setTimeout(nextQuestion, 3000);
        
    } else {
        setTimeout(results, 3000);
    };

    //Display results page
    function results () {
        $(".time-remaining").empty();
        $(".question-choices").empty();
        $(".question").empty();
        
        $(".resultScreen").html("<h2>Congratulations you made it to the end!! Here's your results: </h2>");  
        $(".resultScreen").append(score + "/" + questionArr.length);
        $(".resultScreen").append()
    }

    //Create a restart button click event
    $(".restartBtn").on("click", function () {
        $(this).hide ();
        nextQuestion ();
    })

});

