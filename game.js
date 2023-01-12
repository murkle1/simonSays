let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern =[];
let userClickedPattern = [];
let level = 0;
let started = false;

$('body').on('keydown', function (keyboardEvent) {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
})

$('.btn').on('click', function () {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) { // this is just written weird 
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) { // if lengths are the same, the answer is complete
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text("Game Over, Press Any Key to Restart")

        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200);

        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#level-title").text("Level " + level);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    console.log(gamePattern)
}

function animatePress(currentColor){
    $('#'+ currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+ currentColor).removeClass('pressed')
    }, 100)
}



function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

