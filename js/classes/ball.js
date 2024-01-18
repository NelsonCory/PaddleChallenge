class Ball{
    constructor(config){
        this.scene = config.scene;
        this.key = config.key;
        this.startX = config.x,
        this.startY = config.y;

        this.pBody = this.scene.physics.add.image(this.startX,this.startY,this.key);
        this.pBody.setVelocity(-200,0);
        this.pBody.setOrigin(0.5,0.5);
        this.pBody.body.allowGravity=false;
        this.pBody.setCollideWorldBounds(true);
        this.pBody.body.bounce.set(1,1);

    }
}