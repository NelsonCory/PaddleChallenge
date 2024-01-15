class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        this.player;
    }
    preload()
    {
        //load images or sounds
        this.load.image("testPaddle","images/friendPaddle.png");
        this.load.image("badPaddle","images/badPaddle.png");
        this.load.image("ball","images/ball.png");

    }
    create() {
        emitter= new Phaser.Events.EventEmitter();
        controller = new Controller();
        this.mouseX;
        this.mouseY;
        this.gameVelocity = 200;

        //define our objects
        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width/2;
        this.sb.y = 50;
        model.score=0;      

        this.gameCenterX = game.config.width*0.5;
        this.gameCenterY = game.config.height*0.5;
        
        this.player = this.physics.add.image(Math.floor(game.config.width*0.2),Math.floor(game.config.height/2),"testPaddle");
        this.player.setImmovable();
        this.player.body.allowGravity = false;
//body.allowGravity = false
        this.enemy = this.physics.add.image(Math.floor(game.config.width*0.8),Math.floor(game.config.height/2),"badPaddle");
        this.enemy.setImmovable();
        this.enemy.setVelocity(0,200);
        this.enemy.body.allowGravity = false;

        this.ball = this.physics.add.image(Math.floor(game.config.width*0.5),Math.floor(game.config.height*0.5),"ball");
        this.ball.setVelocity(-200,0);
        this.ball.body.allowGravity = false;

        //set colliders
        this.physics.add.collider(this.ball,this.player,this.ballCollision, null, this);
        this.physics.add.collider(this.ball,this.enemy,this.ballCollision, null, this);

        this.input.on("pointerdown",this.handleMove,this);

    }
    update() {
       //move player paddle to position

       if(this.player.x < this.mouseX){
            this.player.setVelocityX(this.gameVelocity);
       }else if(this.player.x > this.mouseX){
            this.player.setVelocityX(-this.gameVelocity);
       }
       if(this.player.y < this.mouseY){
            this.player.setVelocityY(this.gameVelocity);
       }else if(this.player.y > this.mouseY){
            this.player.setVelocityY(-this.gameVelocity);
       }
    }
    handleMove(pointer){
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
    }
    ballCollision(ball, paddle){
        this.gameVelocity = 200;
        this.ball.setVelocity(0,-this.gameVelocity); //toggle direction
    }
}