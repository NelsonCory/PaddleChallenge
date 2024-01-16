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
        this.gameVelocity = 400;

        //define our objects
        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width/2;
        this.sb.y = 50;
        model.score=0;      

        this.gameCenterX = game.config.width*0.5;
        this.gameCenterY = game.config.height*0.5;
        
        this.player = this.physics.add.image(Math.floor(game.config.width*0.2),Math.floor(game.config.height/2),"testPaddle");
        this.player.setOrigin(0.5,0.5);
        this.player.setImmovable();
        this.player.body.allowGravity = false;
//body.allowGravity = false
        this.enemy = this.physics.add.image(Math.floor(game.config.width*0.8),Math.floor(game.config.height/2),"badPaddle");
        this.enemy.setImmovable();
        this.enemy.setVelocity(0,200);
        this.enemy.setOrigin(0.5,0.5);
        this.enemy.body.allowGravity = false;
        this.enemy.setCollideWorldBounds(true);

        this.ball = this.physics.add.image(Math.floor(game.config.width*0.5),Math.floor(game.config.height*0.5),"ball");
        this.ball.setVelocity(-200,0);
        this.ball.body.allowGravity = false;
        this.ball.setCollideWorldBounds(true);
        this.ball.body.bounce.set(1,1);

        //set colliders
        this.physics.add.collider(this.ball,this.player,this.ballCollision, null, this);
        this.physics.add.collider(this.ball,this.enemy,this.ballCollision, null, this);

        this.input.on("pointerdown",this.handleMove,this);

    }
    update() {

        var enemyDiff = Math.abs(this.enemy.y - this.ball.y);

        //reset game
        if(this.ball.x < 50){
            //enemy wins
            this.resetGame();
        }
        else if(this.ball.x > game.config.width - 50){
            //player wins
            this.resetGame();
            emitter.emit(G.UP_POINTS,1);
        }
        
        if(this.enemy.y > this.ball.y && enemyDiff > 100){
            this.enemy.setVelocityY(-this.gameVelocity);
        }
        else if(this.enemy.y < this.ball.y && enemyDiff > 100){
            this.enemy.setVelocityY(this.gameVelocity);
        }

    }
    handleMove(pointer){
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
        this.physics.moveTo(this.player,this.mouseX,this.mouseY,this.gameVelocity);
        
    
    }
    ballCollision(ball, paddle){
        var difference;

        if(ball.y < paddle.y){
            difference = paddle.y - ball.y;
            ball.body.setVelocityY(-10*difference);
        }
        else if (ball.y > paddle.y){
            difference = ball.y - paddle.y;
            ball.body.setVelocityY(-10*difference);
        }
        else{
            ball.body.velocity.y= 2 + Math.random() * 8;
        }
    }
    resetGame(){
        console.log("game reset");
        this.player.x = Math.floor(game.config.width*0.2);
        this.player.y = Math.floor(game.config.height*0.2);
        

        this.ball.x =  game.config.width/2;;
        this.ball.y = game.config.height/2;
    }
}