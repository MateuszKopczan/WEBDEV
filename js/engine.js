var gameConfig = new GameConfig();
var initialGameConfig = new GameConfig();
var canvas;
var ctx;
var keys = {}
var bricks = {}


function initEngine(){
    window.addEventListener('keydown', function(key){
        keys[key.keyCode] = true;
        key.preventDefault();
    })

    window.addEventListener('keyup', function(key){
        delete keys[key.keyCode];
    })
}

function initBricks(){
    for(columnIndex = 0; columnIndex < gameConfig.blockColumnCount; columnIndex++){
        bricks[columnIndex] = {};
        for(rowIndex = 0; rowIndex < gameConfig.blockRowCount; rowIndex++){
            bricks[columnIndex][rowIndex] = {x: 0, y: 0, status: 1}
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(gameConfig.ballX, gameConfig.ballY, gameConfig.ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = gameConfig.ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(gameConfig.paddleX, gameConfig.paddleY, gameConfig.paddleWidth, gameConfig.paddleHeight);
    ctx.fillStyle = gameConfig.paddleColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(columnIndex = 0; columnIndex < gameConfig.blockColumnCount; columnIndex++){
        for(rowIndex = 0; rowIndex < gameConfig.blockRowCount; rowIndex++){
            if(bricks[columnIndex][rowIndex].status == 1){
                var brickX = (columnIndex * (gameConfig.blockWidth + gameConfig.blockPadding)) + gameConfig.blockLeftOffset;
                var brickY = (rowIndex * (gameConfig.blockHeight + gameConfig.blockPadding)) + gameConfig.blockTopOffset;
                bricks[columnIndex][rowIndex].x = brickX;
                bricks[columnIndex][rowIndex].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, gameConfig.blockWidth, gameConfig.blockHeight);
                ctx.fillStyle = gameConfig.blockColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function collisionDetection(){
    for(columnIndex = 0; columnIndex < gameConfig.blockColumnCount; columnIndex++){
        for(rowIndex = 0; rowIndex < gameConfig.blockRowCount; rowIndex++){
            var brick = bricks[columnIndex][rowIndex];
            if(brick.status == 1){
                if(gameConfig.ballX > brick.x && gameConfig.ballX < brick.x + gameConfig.blockWidth && gameConfig.ballY > brick.y && gameConfig.ballY < brick.y + gameConfig.blockHeight){
                    gameConfig.ballVerticalSpeed = -gameConfig.ballVerticalSpeed;
                    brick.status = 0;
                }
            }
        }

    }
}

function draw(){
    ctx.clearRect(0, 0, gameConfig.canvasWidth, gameConfig.canvasHeight);
    drawBricks();
    drawPaddle();
    drawBall();
    collisionDetection();


    if(gameConfig.ballX + gameConfig.ballHorizontalSpeed > gameConfig.canvasWidth - gameConfig.ballRadius || gameConfig.ballX + gameConfig.ballHorizontalSpeed < gameConfig.ballRadius) {
        gameConfig.ballHorizontalSpeed = -gameConfig.ballHorizontalSpeed;
    }
    if(gameConfig.ballY + gameConfig.ballVerticalSpeed < gameConfig.ballRadius) {
        gameConfig.ballVerticalSpeed = -gameConfig.ballVerticalSpeed;
    }
    else if (gameConfig.ballY + gameConfig.ballVerticalSpeed > gameConfig.paddleY - gameConfig.ballRadius ) {
        if (gameConfig.ballX + gameConfig.ballRadius > gameConfig.paddleX && gameConfig.ballX - gameConfig.ballRadius < gameConfig.paddleX + gameConfig.paddleWidth) {
            if (gameConfig.ballY = gameConfig.ballY - gameConfig.paddleHeight) {
                gameConfig.ballPositionAngle = ((gameConfig.paddleX + gameConfig.paddleWidth / 2) - gameConfig.ballX) * 0.05;
                gameConfig.ballHorizontalSpeed = gameConfig.ballHorizontalSpeed + gameConfig.ballPositionAngle;
                gameConfig.ballVerticalSpeed = -gameConfig.ballVerticalSpeed;
            }
        }
        else {
            alert("Game over. Click OK to try again.");
            reloadGame();
            document.location.reload();
        }
    }
    if (37 in keys) {
        if (gameConfig.paddleX - gameConfig.paddleSpeed > 0) {
            gameConfig.paddleX -= gameConfig.paddleSpeed;
        }
    } 
    else if (39 in keys) {
        if (gameConfig.paddleX + gameConfig.paddleWidth + gameConfig.paddleSpeed < gameConfig.canvasWidth) {
            gameConfig.paddleX += gameConfig.paddleSpeed;
        }
    }
    
    gameConfig.ballX += gameConfig.ballHorizontalSpeed;
    gameConfig.ballY += gameConfig.ballVerticalSpeed;
    checkWin();
}

function checkWin(){
    for(columnIndex = 0; columnIndex < gameConfig.blockColumnCount; columnIndex++){
        for(rowIndex = 0; rowIndex < gameConfig.blockRowCount; rowIndex++){
            if(bricks[columnIndex][rowIndex].status == 1){
                return;
            }
        }
    }
    alert("You win");
    reloadGame();
}

function reloadGame(){
    gameConfig.ballX = initialGameConfig.ballX;
    gameConfig.ballY = initialGameConfig.ballY;
    gameConfig.ballVerticalSpeed = initialGameConfig.ballVerticalSpeed;
    gameConfig.ballHorizontalSpeed = initialGameConfig.ballHorizontalSpeed;
    gameConfig.ballPositionAngle = initialGameConfig.ballPositionAngle;
    gameConfig.paddleX = initialGameConfig.paddleX;
    gameConfig.paddleY = initialGameConfig.paddleY;
    init();
}


function init(){
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    canvas.width = gameConfig.canvasWidth;
    canvas.height = gameConfig.canvasHeight;
    initEngine();
    initBricks();
    startGameEngine();
}

function startGameEngine(){
    draw();
    window.requestAnimationFrame(startGameEngine);
}