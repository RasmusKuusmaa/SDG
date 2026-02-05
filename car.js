class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed=0;
    this.accelaration=0.2;
    this.maxSpeed=4;
    this.maxRevSpeed=2;
    this.friction=0.05;

    this.controls = new Controls();
  }

  update(){
    if(this.controls.forward){
        this.speed+=this.accelaration;
    }
    if(this.controls.reverse){
        this.speed-=this.accelaration;
    }
    if(this.controls.left){
        this.x-=2;
    }
    if (this.controls.right){
        this.x+=2;
    }
    if (this.speed >= this.maxSpeed){
        this.speed =this.maxSpeed;
    }

    if (this.speed <= -this.maxRevSpeed){
        this.speed = -this.maxRevSpeed;
    }
    if (this.speed>0){
        this.speed -=this.friction;
    }

    if (this.speed<0){
        this.speed+=this.friction;
    }
    if (Math.abs(this.speed)<this.friction){
        this.speed=0;
    } 
    this.y-=this.speed;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
    );
    ctx.fill();
  }
}
