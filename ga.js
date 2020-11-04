
// This file includes functions for creating a new generation
// of birds.

// Start the game over
function resetGame() {
  console.log("reseted");
  //score reset
  counter = 0;
  //cacti reset
  cacti = [];
}

// Create the next generation
function nextGeneration() {
  resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allDinos);
  // Generate a new set of birds
  activeDinos = generate(allDinos);
  // Copy those birds to another array
  allDinos = activeDinos.slice();
}

// Generate a new population of dinos
function generate(oldDinos) {
  let newDinos = [];
  for (let i = 0; i < oldDinos.length; i++) {
    // Select a dino based on fitness
    let dino = poolSelection(oldDinos);
    newDinos[i] = dino;
  }
  return newDinos;
}

// Normalize the fitness of all dinos
function normalizeFitness(dinos) {
  // Make score exponentially better?
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].score = pow(dinos[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < dinos.length; i++) {
    sum += dinos[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].fitness = dinos[i].score / sum;
  }
}


// An algorithm for picking one dino from an array
// based on fitness
function poolSelection(dinox) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= dinox[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return dinox[index].copy();
}
