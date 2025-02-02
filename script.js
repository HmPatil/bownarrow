const target = document.getElementById("target");
const arrow = document.getElementById("arrow");
const arrowsLeftDisplay = document.getElementById("arrows-left");
const scoreDisplay = document.getElementById("score");
const gameOverMessage = document.getElementById("game-over-message");

let arrowsLeft = 10;
let score = 0;
let isGameOver = false;

// Function to shoot the arrow
function shootArrow() {
  if (isGameOver) return;

  arrowsLeft--;
  arrowsLeftDisplay.textContent = arrowsLeft;

  // Show the arrow and move it to the right
  arrow.style.display = "block";
  let arrowPosition = 90; // Start from the bow's position
  const moveArrow = setInterval(() => {
    arrowPosition += 10;
    arrow.style.left = arrowPosition + "px";

    // Check if the arrow hits the target
    const targetRect = target.getBoundingClientRect();
    const arrowRect = arrow.getBoundingClientRect();

    if (
      arrowRect.left < targetRect.right &&
      arrowRect.right > targetRect.left &&
      arrowRect.top < targetRect.bottom &&
      arrowRect.bottom > targetRect.top
    ) {
      score++;
      scoreDisplay.textContent = score;
      clearInterval(moveArrow);
      arrow.style.display = "none";
      arrow.style.left = "90px"; // Reset arrow position
    }

    // Stop the arrow if it goes off-screen
    if (arrowPosition > 800) {
      clearInterval(moveArrow);
      arrow.style.display = "none";
      arrow.style.left = "90px"; // Reset arrow position
    }
  }, 20);

  // Check if the game is over
  if (arrowsLeft === 0) {
    isGameOver = true;
    gameOverMessage.textContent = "Thank U, Take Care... Bye Bye My Dumb Boys of M4/1";
    gameOverMessage.style.display = "block";
  }
}

// Event listener for shooting the arrow
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    shootArrow();
  }
});