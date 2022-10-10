
function gen(){
    window.engine = new Engine();
    var list = [1,2,3,4,5,6,7,8,9];
    list.forEach(button => genKey(button));
}

function genKey(id){
    const main = document.getElementById("main");
    const key = document.createElement("button");
    key.onclick = playerTurn;
    key.id = id;
    main.appendChild(key);
}

function playerTurn(){
    var playerSign = window.engine.turn();
    console.log("turn: " + playerSign);
    this.innerHTML = playerSign;
    this.disabled = true;
    window.engine.checkWinX();
    window.engine.checkWinY();
}

function reset(){
    window.engine.reset();
}