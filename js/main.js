var game;
var model;
var emitter;
var G;
var controller;
window.onload=function()
{
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    if (isMobile == -1){ 
        var config = {
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            parent: 'paddle-challenge',
            scene: [SceneMain],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
            }
        }
        };
    }
    else{
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'paddle-challenge',
            scene: [SceneMain],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
            }
        }
        };
    }
    G = new Constants();
    model = new Model();
    model.isMobile=isMobile;
    game = new Phaser.Game(config);
}