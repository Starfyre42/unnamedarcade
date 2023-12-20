// Boot screen which displays flashing text and music for a period of time
export class Boot extends Phaser.Scene {
  constructor() {
    super(`boot`);
  }
  
  preload() {
    // Load background and music
    this.load.image(`bg1`, `/assets/images/bg1.jpg`)
    this.load.audio(`loading`, `/assets/music/loading.mp3`)
  }
  
  create() {
    // Get center coordinates
    // @TODO We need to move center coordinates to a seperate function since
    // It's commonly called. Possibly a Utility class
    let centerX = this.cameras.main.centerX;
    let centerY = this.cameras.main.centerY;
    
    // Add bg image centered
    this.add.image(centerX, centerY, `bg1`);
    
    // Add text
    let text = this.add.text(centerX, centerY, "game loading...", {
      fontSize: '32px', fill: '#fff'
    })
    .setOrigin(0.5);
    
    // Tween text to blink
    this.tweens.add({
      targets: text,
      alpha: 0,
      ease: `Linear`,
      duration: 1 * 1000,
      yoyo: true,
      repeat: -1
    })
    
    // Add music and play it
    let music = this.sound.add(`loading`);
    music.play({
      loop: true
    });
    
    // Delay call to continue
    this.time.delayedCall(10 * 1000, this.afterDelay.bind(this));
  }
  afterDelay() {
    this.scene.start(`play`);
  }
}