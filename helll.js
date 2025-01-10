// Selecting DOM elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#message");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#Computer-score");
const scoreTable = document.querySelector(".option-choice");

// Initializing user and computer scores
let userScore = 0;
let compScore = 0;
let roundsPlayed = 0; // Counter for rounds played

// Function to generate computer's choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle draw games
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to display the winner and update scores
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "yellow";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Function to play the game
const playGame = (userChoice) => {
  // Generate computer's choice
  const compChoice = genCompChoice();

  // Create a new row for each game played in the score table
  const newRow = scoreTable.insertRow();
  const userCell = newRow.insertCell(0);
  const compCell = newRow.insertCell(1);
  userCell.textContent = userChoice;
  compCell.textContent = compChoice;

  // Check for draw or winner
  if (userChoice === compChoice) {
    // Draw game
    drawGame();
  } else {
    // Determine the winner
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    // Display the winner
    showWinner(userWin, userChoice, compChoice);
  }

  // Increment roundsPlayed
  roundsPlayed++;

  // Check if game has ended
  if (roundsPlayed === 15) {
    // Display final result
    if (userScore > compScore) {
      msg.innerText = "Congratulations! You won the game!";
      msg.style.backgroundColor = "green";
    } else if (userScore < compScore) {
      msg.innerText = "Sorry! You lost the game.";
      msg.style.backgroundColor = "red";
    } else {
      msg.innerText = "It's a draw! Well played.";
      msg.style.backgroundColor = "#081b31";
    }

    // Disable further user choices
    choices.forEach((choice) => {
      choice.removeEventListener("click", handleClick);
    });
  }
};

// Event listener for user choices
const handleClick = (event) => {
  const userChoice = event.target.getAttribute("id");
  playGame(userChoice);
};

choices.forEach((choice) => {
  choice.addEventListener("click", handleClick);
});


