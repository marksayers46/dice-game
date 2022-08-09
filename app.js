// Button Click
const btnRoll = document.querySelector("#btn-roll");
const btnNew = document.querySelector("#btn-new");
const btnHold = document.querySelector("#btn-hold");

// PlayerName
const playerNameOne = document.querySelector("#player-0");
const playerNameTwo = document.querySelector("#player-1");

// PlayerScore
const playerOneScore = document.querySelector("#score-0");
const playerTwoScore = document.querySelector("#score-1");

// PlayerCurrentScore
const playerOneCurrentScore = document.querySelector("#current-0");
const playerTwoCurrentScore = document.querySelector("#current-1");

// Dice
const diceImg = document.querySelector("#dice");

// Global Variables
let scores;
let currentScore;
let activePlayer;
let playing; 

// Initial State Setup, same as init()
function initialState() {
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    diceImg.src = "assets/dice6.png";

    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;

    playerNameOne.classList.add("active");
    playerNameTwo.classList.remove("active");

    playerNameOne.classList.remove("winner");
    playerNameTwo.classList.remove("winner");
}
initialState()

// Switch user active class
const switchPlayer = function () {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerNameOne.classList.toggle('active');
    playerNameTwo.classList.toggle('active');
};

// New Game Button reset to Initial State
btnNew.addEventListener('click', initialState);

// Roll Dice onclick Roll Button
function rollDice () {
    if (playing) {
        // Random dice roll
        const dice = Math.floor(Math.random() * 6) + 1;

        diceImg.src = `assets/dice${dice}.png`;

        if (dice !== 1) {
            // Adding roll to current score
            currentScore += dice;
            document.getElementById(
                `current-${activePlayer}`
            ).textContent = currentScore;
        } else {
            // Next player if 1 is rolled
            switchPlayer();
        }
    }
};
btnRoll.addEventListener('click', rollDice)  

// Hold Button 
btnHold.addEventListener('click', function () {
    if (playing) {
        // current score added to active player score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score-${activePlayer}`).textContent =
            scores[activePlayer];

        // Winner End Game
        if (scores[activePlayer] >= 100) {
            playing = false;

            document
                .querySelector(`.player-${activePlayer}`)
                .classList.add('winner');
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.remove('active');
        } else {
            // Switch next player
            switchPlayer();
        }
    }
});


