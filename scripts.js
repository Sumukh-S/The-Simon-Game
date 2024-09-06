buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userPattern = [];
var level = 0;
var started = false;


$(document).on("keypress", function(){
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level = level + 1;
    $("#level-title").text("Level " + level);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}


$(".btn").on("click",function (event) {
    var userChosenColor = event.target.getAttribute("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userPattern.push(userChosenColor);
    checkAnswer(userPattern.length-1);
});


function playSound(chosenColor){
    var audio = new Audio('./sounds/'+chosenColor+".mp3");
    audio.play();
}


function animatePress(chosenColor){
    $("#"+chosenColor).addClass("pressed");
    setTimeout(function(){
            $("#"+chosenColor).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel){
    if(userPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if (userPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        startover();
    }
}

function startover(){
    gamePattern = [];
    userPattern = [];
    level = 0;
    started = false;
}