const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),

    },
};


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

//contagem regressiva
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playSound("game_over.mp3")
        alert("Game Over! O seu resultado foi: " + state.values.result);
        
    }
}

// cria um enemy aleatoreamente dentro dos quadrados
function randomSquare() {

    state.view.squares.forEach((square) => square.classList.remove("enemy")); // o forEach itera em cada elemento de squares e .classList.remove("enemy") remove toda classe que possuir enemy.

    let randomNumber = Math.floor(Math.random() * 9); // cria um número aleatório de 1 a 9
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}




function addEventListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else{
                state.values.currentTime = 0;
            }
        })
    });
}

function initialize() {

    addEventListenerHitBox();
}

initialize();