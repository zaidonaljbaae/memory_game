var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Function to start the game
function startGame() {
    if (!started) {
        started = true;
        nextSequence();
        $("body").removeClass("game-over");
        $("#level-title").text("Level " + level);
    }
}

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = []; // Reset user's clicked pattern
    level++; // Increase the level
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Animate and play sound for each color in the game pattern
    gamePattern.forEach(function(color, index) {
        setTimeout(function() {
            animatePress(color);
            playSound(color);
        }, (index + 1) * 1000); // Adjust delay as needed
    });
}


// Function to handle button click
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    $("body").addClass("game-over");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern = [];
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Event listener to start the game
$(document).keydown(startGame);
