function gen(){
    window.calculator = new Calculator();
    var list = [
       { value: 7,    isNumber: true,   isOperator: false, isResult: false },
       { value: 8,    isNumber: true,   isOperator: false, isResult: false },
       { value: 9,    isNumber: true,   isOperator: false, isResult: false },
       { value: '/',  isNumber: false,  isOperator: true,  isResult: false },
       { value: 4,    isNumber: true,   isOperator: false, isResult: false },
       { value: 5,    isNumber: true,   isOperator: false, isResult: false },
       { value: 6,    isNumber: true,   isOperator: false, isResult: false },
       { value: 'X',  isNumber: false,  isOperator: true,  isResult: false },
       { value: 1,    isNumber: true,   isOperator: false, isResult: false },
       { value: 2,    isNumber: true,   isOperator: false, isResult: false },
       { value: 3,    isNumber: true,   isOperator: false, isResult: false },
       { value: '-',  isNumber: false,  isOperator: true,  isResult: false },
       { value: 0,    isNumber: true,   isOperator: false, isResult: false },
       { value: '.',  isNumber: true,  isOperator: false,  isResult: false },
       { value: '+',  isNumber: false,  isOperator: true,  isResult: false },
       { value: '=',  isNumber: false,  isOperator: false, isResult: true },
       { value: 'C',  isNumber: false,  isOperator: false, isResult: false }
    ];
    list.forEach(button => genKey(button.value, button.isResult, button.isOperator, button.isNumber));
 }

 function genKey(value, isResult, isOperator, isNumber){
    const main = document.getElementById("main");
    const key = document.createElement("button");
    key.id = value;
    key.innerText = value;
    if(isResult){
       key.onclick = calc;
    }
    else if (isOperator){
       key.onclick = addOperator;
       key.className = "operator";

    }
    else if(value == 'C'){
       key.onclick = reset;
    }
    else{
       key.onclick = addNumber;
    }
    key.dataset.value = value;
    main.appendChild(key);
 }

 function addNumber(){
    window.calculator.addNumber(this.dataset.value);
    const main = document.getElementById("screen");
    main.value += this.dataset.value;
 }

 function addOperator(){
    window.calculator.addOperator(this.dataset.value);
    const main = document.getElementById("screen");
    main.value += this.dataset.value;
    blockOperators();
 }

 function blockOperators(){
    var operators = document.getElementsByClassName("operator");
    [...operators].forEach(button => button.disabled = true);
 }

 function unblockOperators(){
    var operators = document.getElementsByClassName("operator");
    [...operators].forEach(button => button.disabled = false);
 }

 function calc(){
    window.calculator.calc();
 }

 function reset(){
    window.calculator.reset();
    const main = document.getElementById("screen");
    main.value = '';
    unblockOperators();
 }