// Menu that allows players to click on the level
export class Menu extends Phaser.Scene {
  constructor() {
    super(`play`);
  }

  preload() {
    this.load.image(`menuBg`, `/assets/images/menuBg.jpg`);
  }

  create() {
    // Get center coordinates
    // @TODO lets move this to a Utility function
    let centerX = this.cameras.main.centerX;
    let centerY = this.cameras.main.centerY;

    // Add menu bg
    this.add.image(400, 300, `menuBg`)
    
    // Add text
    this.add.text(centerX - 100, centerY - 200, `select a level`, {
      fontSize: `32px`, fill: `#fff`
    })
    
    // Add play button that's interactive for clicks
    let playbutton = this.add.text(centerX - 50, centerY -50, `stage 1`, {
      fontSize: `32px`, fill: `#fff`
    })
    .setInteractive()
    .on(`pointerdown`, this.startGame.bind(this))
  }
  
  startGame() {
    // Start Stage 1
    this.scene.start(`stage1`)
  }
}
