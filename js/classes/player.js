class Player {

    constructor(config){
            this.scene = config.scene;
            this.key = config.key;
            this.startX = config.x,
            this.startY = config.y;

            this.player = this.scene.physics.add.image(this.startX,this.startY,this.key);
            this.player.setOrigin(0.5,0.5);
            this.player.setImmovable();
            this.player.body.allowGravity = false;
            this.player.setCollideWorldBounds(true);

    }

}