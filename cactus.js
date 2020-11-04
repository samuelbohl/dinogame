class Cactus {

  constructor(){
    this.x = width;
    this.h = 30;
    this.w = 20;
    this.speed = 2;

  }

  hits(dino){
    //fill(200);
    //ellipse(this.x,height/2 - this.h, 5, 5);
    //ellipse(dino.hx,dino.hy + dino.hh, 10, 10);
    //ellipse(dino.hx + dino.hw,dino.hy + dino.hh, 10, 10);
    //ellipse(this.x, height/2, 10, 10);
    //ellipse(this.x - this.w, height/2, 5, 5);

    if(this.x > dino.x+30){
      return false;
    }

    if(((this.x - this.w) <= dino.hx + dino.hw) && (this.x >= dino.hx) && this.x <= width/2){
      if((height/2 - this.h) <= dino.hy + dino.hh){
        return true;
      }
    }
    return false;
  }

  show(){
    image(cactusone, this.x - cactusone.width/4, height/2 - cactusone.height/4, cactusone.width/4, cactusone.height/4);
    //fill(0);
    //rect(this.x, height/2, -this.w, -this.h)
  }

  update(){
    this.x -= this.speed;
  }

  offscreen(){
    if(this.x < -this.w){
      return true;
    } else {
      return false;
    }
  }
}
