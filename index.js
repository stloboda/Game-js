const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
context.font = '30px Arial';
window.addEventListener("keydown", event => KeyCode = event.keyCode);
let btn = document.getElementById('startBtn');
let KeyCode = 0;
let score = 0;
let ufo = [];
let fire = [];
let timer = 0;
let player = {x : 350, y : 400, sx : 10, sy : 10};
let gameState = '';

let ufoimg = new Image();
ufoimg.src = './img/ufo.jpg';

let fireimg = new Image();
fireimg.src = './img/fire.jpg';

let fonimg = new Image();
fonimg.src = './img/stars.jpg';

let playimg = new Image();
playimg.src = './img/player.jpg';

ufo.push({x : 0, y : 300 , sx : 5, sy: 10});

function game() {
    if (gameState === 'play') {
        update();
    }
    render();
    setTimeout ( () => {
        requestAnimationFrame(game)
    }, 16);
}

function update() {

    document.getElementById('startBtn').style.visibility = 'hidden';
    timer++;
    if (timer % 10 === 0){
        ufo.push({x : Math.random() * 700, y : -50, sx : Math.random() * 2 - 1, sy: Math.random() * 2 + 2, del:0});
    }
    if (timer % 30 === 0)
        fire.push({x : player.x + 20, y : player.y, sx : 0, sy: -10.2});

    if (KeyCode === 37) {
        player.x -= 5
    } else if (KeyCode === 39) {
        player.x += 5
    } else if (KeyCode === 38) {
        player.y -= 5
    } else if (KeyCode === 40) {
        player.y += 5
    }
    KeyCode = 0;

    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].sx;
        fire[i].y = fire[i].y + fire[i].sy;
        if (fire[i].y < -30)
            fire.splice(i, 1);
    }
    for (i in ufo) {
        ufo[i].x = ufo[i].x + ufo[i].sx;
        ufo[i].y = ufo[i].y + ufo[i].sy;
        if (ufo[i].x >= 750 || ufo[i].x < 0)
            ufo[i].sx = -ufo[i].sx;

        if (ufo[i].y >= 550)
            ufo.splice(i, 1);

        for (j in fire){
            if (Math.abs(ufo[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(ufo[i].y - fire[j].y) < 25){
                ufo[i].del = 1;
                fire.splice(j, 1);
                score += 10;
                break;
            }
        }

        if (ufo[i].del === 1)
            ufo.splice(i, 1);


        if (typeof ufo[i] !== 'undefined') {

            if (Math.abs(ufo[i].x + 50 - player.x - 50) < 50 && Math.abs(ufo[i].y - player.y) < 50) {
                gameState = 'game over';
            }
        }
    }

    if (player.x > 750)
        player.x -= 50;
    if (player.x < 0 )
        player.x += 50;

}

function render () {
    if (gameState === 'play') {
        context.drawImage(fonimg, 0, 0, 800, 500);
        context.drawImage(playimg, player.x, player.y, 50, 60);
        for (i in fire)
            context.drawImage(fireimg, fire[i].x, fire[i].y, 10, 30);
        for (i in ufo)
            context.drawImage(ufoimg, ufo[i].x, ufo[i].y, 50, 50);
        context.font = "16px Arial";
        context.fillStyle = "#FFFFFF";
        context.fillText("Score: " + score, 8, 20);
    }
    if (gameState === 'game over') {
        document.getElementById('startBtn').style.visibility = 'visible';
        context.clearRect(0,0,canvas.width,canvas.height);
        context.font = '50px Arial';
        context.fillText('Game Over', canvas.width/3, canvas.height/4);
        context.font = '30px Arial';
        context.fillText('Score:'  + score, canvas.width/2.4, canvas.height/3)

    }
}

function btnClick () {
    if (gameState === ''){
      gameState = 'play';
      game();
    }
    if (gameState === 'game over'){
        score = 0;
        ufo = [];
        fire = [];
        timer = 0;
        player = {x : 350, y : 400, sx : 10, sy : 10};
        btn.style.visibility = 'hidden';
        gameState = 'play';
    }
}
btn.addEventListener ('click', btnClick);

