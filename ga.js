//<script>
// JavaScript for the game logic

// Initialize game state variables
let randomNumber = Math.floor(Math.random() * 10) + 1;
let score = 10;

// Get the HTML elements
const guessInput = document.getElementById('guessInput');
const gameButton = document.getElementById('gameButton');
const resultText = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const container = document.querySelector('.container');

// Function to check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Check if the user's input is a valid number
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        resultText.textContent = "Please enter a valid number between 1 and 10.";
        resultText.style.color = "white";
        return;
    }

    // Check if the guess is correct
    if (userGuess === randomNumber) {
        resultText.textContent = "Correct! Guess again!";
        resultText.style.color = "#90ee90";


        // Change the background color temporarily
        container.style.backgroundColor = "rgba(120, 150, 120, 0.7)";
        setTimeout(() => {
            container.style.backgroundColor = "";
        }, 1000);

        randomNumber = Math.floor(Math.random() * 10) + 1;
    } else {
        resultText.textContent = "Wrong! Try again.";
        resultText.style.color = "red";
        score--;
        scoreDisplay.textContent = "Score: " + score;

        // Check if the score has reached 0
        if (score <= 0) {
            resultText.textContent = "Game Over! No more attempts left.";
            resultText.style.color = "red";
            container.style.backgroundColor = "rgba(248, 215, 218, 0.7)";
            gameButton.textContent = "Reset";
            gameButton.classList.add('reset-mode');
            gameButton.removeEventListener('click', checkGuess);
            gameButton.addEventListener('click', resetGame);
        }
    }

    // Clear the input field
    guessInput.value = '';
    guessInput.focus();
}

// Function to reset the game 
function resetGame() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    score = 10;
    scoreDisplay.textContent = "Score: " + score;
    resultText.textContent = "";
    gameButton.textContent = "Guess";
    gameButton.classList.remove('reset-mode');
    container.style.backgroundColor = "";
    guessInput.value = '';
    guessInput.focus();
    gameButton.removeEventListener('click', resetGame);
    gameButton.addEventListener('click', checkGuess);
}

// Function to handle button click
gameButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});
//  </script>