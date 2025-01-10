// Initialize scores and set the maximum combined score to end the game
let userScore = 0;
let compScore = 0;
const maxScore = 20;
let roundNumber = 1;

// Get references to necessary DOM elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#message");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");
const resultsBody = document.querySelector("#results-body");

// Function to generate a random choice for the computer
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle a draw scenario
const drawGame = () => {
  msg.innerText = "Game was a draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to display the winner of a round and update scores
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
  addResultToTable(roundNumber, userChoice, compChoice);
  roundNumber++;
};

// Function to add the results of each round to the table
const addResultToTable = (round, userChoice, compChoice) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${round}</td>
    <td>${userChoice}</td>
    <td>${compChoice}</td>
  `;
  resultsBody.appendChild(row);
};

// Function to check if the game has reached the end condition
const checkGameEnd = () => {
  const totalScore = userScore + compScore;
  if (totalScore >= maxScore) {
    if (userScore > compScore) {
      msg.innerText = `Game over! You win with a score of ${userScore} to ${compScore}.`;
      msg.style.backgroundColor = "green";
    } else if (userScore < compScore) {
      msg.innerText = `Game over! Computer wins with a score of ${compScore} to ${userScore}.`;
      msg.style.backgroundColor = "red";
    } else {
      msg.innerText = `Game over! It's a draw with a score of ${userScore} to ${compScore}.`;
      msg.style.backgroundColor = "#081b31";
    }
    // Remove event listeners to stop the game
    choices.forEach((choice) => choice.removeEventListener("click", handleChoice));
  }
};

// Function to play a round of the game
const playGame = (userChoice) => {
  // Generate computer's choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Handle draw scenario
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "scissors";
    } else if (userChoice === "paper") {
      userWin = compChoice === "rock";
    } else {
      userWin = compChoice === "paper";
    }
    // Show the winner of the round
    showWinner(userWin, userChoice, compChoice);
  }

  // Check if the game should end
  checkGameEnd();
};

// Event handler for user's choice
const handleChoice = (event) => {
  const userChoice = event.currentTarget.getAttribute("id");
  playGame(userChoice);
};

// Add event listeners to each choice element
choices.forEach((choice) => {
  choice.addEventListener("click", handleChoice);
});
