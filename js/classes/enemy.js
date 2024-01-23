class Enemy{
    constructor(config){
        this.scene = config.scene;
        this.startX = config.startX;
        this.startY = config.startY;
        this.key = config.key;


        this.pBody =  this.scene.physics.add.image(this.startX,this.startY,this.key);
        this.pBody.setOrigin(0.5,0.5);
        this.pBody.setImmovable();
        this.pBody.setVelocity(0,0);
        this.pBody.body.allowGravity = false;
        this.pBody.setCollideWorldBounds(true);

    }
    resetPaddle(){
        this.pBody.setVelocity(0,0);
        this.pBody.x = this.startX;
        this.pBody.y = this.startY;

    }

}