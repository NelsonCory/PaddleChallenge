class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
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
        
        this.player = new Player({scene:this,key:"testPaddle",startX:Math.floor(game.config.width/2),startY: this.gameCenterY});

//body.allowGravity = false
        //this.enemy = this.physics.add.image(Math.floor(game.config.width*0.8),Math.floor(game.config.height/2),"badPaddle");
        this.enemy = new Enemy({scene: this, startX: Math.floor(game.config.width*0.8), startY: this.gameCenterY,key: "badPaddle"})
        this.ball = new Ball({scene:this,key:"ball",startX:Math.floor(game.config.width*0.5),startY: this.gameCenterY})


        //set colliders
        this.physics.add.collider(this.ball.pBody,this.player.player,this.ballCollision, null, this);
        this.physics.add.collider(this.ball.pBody,this.enemy.pBody,this.ballCollision, null, this);

        this.input.on("pointerdown",this.handleMove,this);

    }
    update() {

        var enemyDiff = Math.abs(this.enemy.pBody.y - this.ball.pBody.y);

        //reset game
        if(this.ball.x < 50){
            //enemy wins
            this.resetGame();
        }
        else if(this.ball.pBody.x > game.config.width - 50){
            //player wins
            this.resetGame();
            emitter.emit(G.UP_POINTS,1);
        }
        
        if(this.enemy.pBody.y > this.ball.pBody.y && enemyDiff > 100){
            this.enemy.pBody.setVelocityY(-this.gameVelocity);
            console.log("going up");
        }
        else if(this.enemy.pBody.y < this.ball.pBody.y && enemyDiff > 100){
            this.enemy.pBody.setVelocityY(this.gameVelocity);
            console.log("going down");
        }

    }
    handleMove(pointer){
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
        this.physics.moveTo(this.player.player,this.mouseX,this.mouseY,this.gameVelocity);
        
    
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
        this.player.player.x = Math.floor(game.config.width*0.2);
        this.player.player.y = Math.floor(game.config.height*0.2);
        
        this.ball.pBody.x =  game.config.width/2;;
        this.ball.pBody.y = game.config.height/2;

        this.enemy.resetPaddle();

    }
}