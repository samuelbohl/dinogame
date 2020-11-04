// Mutation function to be passed into dino.brain
function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}



class Dino {
  constructor(brain){


    this.x = width/10;
    this.y = height/2;
    this.velocity = 0;
    this.gravity = 0.2;
    this.lift = -5;

    this.w = dinoone.width/4 * 80;
    this.h = dinoone.height/4 * 175;

    this.imagecount = 0;

    //hitbox values
    this.hx = this.x+10;
    this.hy = this.y-this.h;
    this.hw = this.w;
    this.hh = this.h;


    // Is this a copy of another Dino or a new one?
    // The Neural Network is the dino's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(6, 9, 2);
    }


        // Score is how many frames it's been alive
        this.score = 0;
        // Fitness is normalized version of score
        this.fitness = 0;

  }

  // Create a copy of this dino
  copy() {
    return new Dino(this.brain);
  }


  show(){
    //Show jumping animation
    if(this.y < height/2){
      image(dinothree, this.x , this.y - dinoone.height/4, dinoone.width/4, dinoone.height/4);
    } else {

      //Show running animation
      this.imagecount++;
      if (this.imagecount <= 10){
        image(dinoone, this.x , this.y - dinoone.height/4, dinoone.width/4, dinoone.height/4);
      } else if(this.imagecount > 10 && this.imagecount <= 20){
        image(dinotwo, this.x , this.y - dinotwo.height/4, dinotwo.width/4, dinotwo.height/4);
      }
      if (this.imagecount >= 20){
        this.imagecount = 0;
      }

    }
  } // end show
    //Hitbox
    // fill(0);
    // rect(this.x+10, this.y - this.h, this.w , this.h);
    //
    // fill(200);
    // rect(this.x, this.y, 5, 50);


  // This is the key function now that decides
  // if it should jump or not jump!
  think() {

    // First find the closest pipe
    let closest = null;
    let secclosest = null;
    let thirclosest = null;
    let record = Infinity;
    let recordtwo = Infinity;
    let recordthree = Infinity;
    for (let i = 0; i < cacti.length; i++) {
      let diff = cacti[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = cacti[i];
        if(record < recordtwo){
          let temp = record;
          record = recordtwo;
          recordtwo = temp;
          secclosest = cacti[i];
        }
        if(recordtwo < recordthree){
          let temp = record;
          record = recordthree;
          recordthree = temp;
          thirclosest = cacti[i];
        }

      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];
      // x position of three closest cacti
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      inputs[1] = map(secclosest.x, this.x, width, 0, 1);
      inputs[2] = map(thirclosest.x, this.x, width, 0, 1);
      // top of closest cactus
      inputs[3] = map(height/2 - closest.h, 0, height, 0, 1);
      // dino's y position
      inputs[4] = map(this.y, 0, height, 0, 1);
      // dino's y velocity
      inputs[5] = map(this.velocity, -5, 5, 0, 1);

      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not! (Jump is possible every 700ms)
      if (action[1] > action[0]) {
        if(this.y == height/2){
        this.up();
      }
      }
    }
  } // end think

  up(){
    this.velocity += this.lift;
  } // end up


  update(){
    //hitbox update
    this.hx = this.x+10;
    this.hy = this.y-this.h;
    this.hw = this.w;
    this.hh = this.h;

    //position update
    this.velocity += this.gravity;
    this.y += this.velocity;


    if(this.y > height/2){
      this.y = height/2;
      this.velocity = 0;
    }

    this.score++;
  } //end update


}//end Dino
