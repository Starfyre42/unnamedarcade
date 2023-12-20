import {
  AbstractPlayable
} from "./abstract-playable.js"

// Stage 1
export class Stage1 extends AbstractPlayable {
    
  constructor() {
    super(`stage1`)
    this.rnd=Phaser.Math.Between;
  }

  preload() {
    
    // Calls parent pre-loader which loads the ship
    super.preload()
    
    // Load other assets
    this.load.spritesheet(`astroids`, `/assets/images/astroidss.png`, {
        frameWidth: 512,
        frameHeight: 512,
    });
    
    this.load.image(`stage1Bg`, `/assets/images/scrollbg.png`)

    this.load.image(`ship2`, `/assets/images/ship2.png`)
    this.load.image(`ship3`, `/assets/images/ship3.png`)
  }

  create() {
    
    // Get center x & y coordinates
    let {
      x,
      y
    } = this.center()
    
    // Add bg image and text to center
    this.background= this.add.tileSprite(0,0,800,600, `stage1Bg`).setOrigin(0,0);
    
    this.astroids=[];
    
    for(let i=0; i<5; i++){
        let astroid = this.matter.add.image(this.rnd(0,800), this.rnd(0,600), `astroids`, this.rnd(0,3));
        astroid.setScale(this.rnd(5,15)*0.01);
        astroid.setFrictionAir(0.05);
        astroid.setMass(10);
        astroid.direction={x: this.rnd(-1,1)*0.005, y: this.rnd(-1,1)*0.005}
        this.astroids.push(astroid);
    }
    // Call parent create which does more stuff
    super.create()
  }

  update() {
      this.background.tilePositionY -= 2;
      for(let i=0; i<5; i++){
        let astroid = this.astroids[i];
        astroid.applyForce(astroid.direction);
        if (astroid.x > 800) {
        astroid.x = 0; // If beyond right edge, move to left edge
    } else if (astroid.x < 0) {
        astroid.x = 800; // If beyond left edge, move to right edge
    } 

    if (astroid.y > 600) {
        astroid.y = 0; // If beyond bottom edge, move to top edge
    } else if (astroid.y < 0) {
        astroid.y = 600; // If beyond top edge, move to bottom edge
    }
      }
    // Use parent update functionality
    super.update()
  }
}
