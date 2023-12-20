import {
    AbstractScene
} from "./abstract-scene.js"
import {
    SimpleHealthBar
} from "../pieces/simple-health-bar.js"
import {
    Ship
} from "../pieces/ship.js"
import {
    Astroids
} from "../pieces/astroids.js"
import {
    BgScroll
} from "../pieces/bg-scroll.js"
import {
    Score
} from "../pieces/score.js"
import {
    Bullet
} from "../pieces/bullet.js"

export class Stage1 extends AbstractScene {
    constructor() {
        super("stage1");

        this.setup([{
            name: "bg", value: new BgScroll(this)
        },
        {
            name: "astroids", value: new Astroids(this)
        },
        {
            name: "ship", value: new Ship(this)
        },
        {
            name: "bullet", value: new Bullet(this)
        },
        {
            name: "health", value: new SimpleHealthBar(this)
        },
        {
            name: "score", value: new Score(this)
        },
        ]);
    }

    create() {
        this.input.keyboard.on("keyup-SPACE", this.onSpaceBar.bind(this));
        super.create();
    }

    update() {
        if (this.cursors.up.isDown)
            this.ship.moveUp();
        else if (this.cursors.down.isDown)
            this.ship.moveDown();

        if (this.cursors.left.isDown)
            this.ship.moveLeft();
        else if (this.cursors.right.isDown)
            this.ship.moveRight();

        super.update();
    }

    onSpaceBar() {

        let ship = this.ship.ship;
        this.bullet.spawnBullet(this.ship.ship, 25);
    }
    onAstroidHit(astroid, pair) {
        // Lets get the impacts
        let a = (pair.bodyA.gameObject) ? pair.bodyA.gameObject.piece : null;
        let b = (pair.bodyB.gameObject) ? pair.bodyB.gameObject.piece : null;

        let aIsAstroid = a instanceof Astroids;
        let astroidPair = (aIsAstroid) ? a : b;
        let otherPair = (aIsAstroid) ? b : a;

        let astroidPairObj = (aIsAstroid) ? pair.bodyA.gameObject : pair.bodyB.gameObject;
        let otherPairObj = (aIsAstroid) ? pair.bodyB.gameObject : pair.bodyA.gameObject;

        if (otherPair instanceof Ship) {
            //bulletPairObj.isDestroyed = true;
            //otherPairObj.isDestroyed = true;

            this.postMessage("astroid.hit.ship", {
                ship: otherPairObj, astroid: astroidPairObj
            });
            // this.postMessage("astroid.destroyed", {
            //     astroid: otherPairObj
            // });
            // this.postMessage("bullet.destroyed", {
            //     bullet: bulletPairObj
            // });

            // bulletPairObj.destroy();
            // otherPairObj.destroy();
        }

    }

    onBulletHit(bullet, pair) {

        // Lets get the impacts
        let a = (pair.bodyA.gameObject) ? pair.bodyA.gameObject.piece : null;
        let b = (pair.bodyB.gameObject) ? pair.bodyB.gameObject.piece : null;

        // See if a or b is bullet
        let aIsBullet = a instanceof Bullet;

        // Pick out whichis the bullet and which is the other object
        let bulletPair = (aIsBullet) ? a : b;
        let otherPair = (aIsBullet) ? b : a;

        // Get the associated game objects for them
        let bulletPairObj = (aIsBullet) ? pair.bodyA.gameObject : pair.bodyB.gameObject;
        let otherPairObj = (aIsBullet) ? pair.bodyB.gameObject : pair.bodyA.gameObject;

        // Astroid?
        if (otherPair instanceof Astroids) {
            bulletPairObj.isDestroyed = true;
            otherPairObj.isDestroyed = true;

            this.postMessage("bullet.hit.astroid", {
                astroid: otherPairObj, bullet: bulletPairObj
            });
            this.postMessage("astroid.destroyed", {
                astroid: otherPairObj
            });
            this.postMessage("bullet.destroyed", {
                bullet: bulletPairObj
            });

            bulletPairObj.destroy();
            otherPairObj.destroy();
        }

        if (otherPair instanceof Bullet) {

            bulletPairObj.isDestroyed = true;
            otherPairObj.isDestroyed = true;

            this.postMessage("bullet.hit.bullet", {
                bullet1: bulletPairObj,
                bullet2: otherPairObj,
            });
            this.postMessage("bullet.destroyed", {
                bullet: bulletPairObj
            });
            this.postMessage("bullet.destroyed", {
                bullet: otherPairObj
            });

            bulletPairObj.destroy();
            otherPairObj.destroy();
        }

        if (otherPair instanceof Ship) {
            bulletPairObj.isDestroyed = true;

            this.postMessage("bullet.hit.ship", {
                ship: otherPairObj, bullet: bulletPairObj
            });
            //this.post("ship.destroyed", {astroid: obj});
            this.postMessage("bullet.destroyed", {
                bullet: bulletPairObj
            });

            bulletPairObj.destroy();
        }
    }

    onShipHit() {
        this.health.offsetHealth(-1);
    }
    gameOver() {
        this.scene.start(`game-over`)
    }

    onMessage(sender, subject, contents) {
        if (subject == "bullet.collision")
            this.onBulletHit(contents.bullet, contents.pair);
        else if (subject == "astroid.collision")
            this.onAstroidHit(contents.astroid, contents.pair)
        else if (subject == "bullet.hit.ship")
            this.onShipHit()
        else if (subject == "astroid.hit.ship")
            this.onShipHit()
        else if (subject == "hp.empty")
            this.gameOver()
    }
}
