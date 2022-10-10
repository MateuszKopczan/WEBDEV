class Calculator {

    constructor() {
       this.operators = ['/', 'X', '-', ''];
       this.numbers = [0,1,2,3,4,5,6,7,8,9];
       this.result = '=';
       this.firstValue = '';
       this.operator = '';
       this.secondValue = '';
    }



    addNumber(value){
       if(this.firstValue == ''){
          this.firstValue = value;
       }
       else if(this.firstValue != '' && !this.operators.includes(value) && this.operator == ''){
          if(value == '.' && this.firstValue.includes(".")){
             return;
          } 
          this.firstValue += value;
       }
       else if(this.operator == '' && this.operators.includes(value)){
          this.operator = value;
       }
       else if(this.secondValue == '' && this.operator != ''){
          this.secondValue = value;
       }
       else if(this.secondValue != '' && this.operator != ''){
          if(value == '.' && this.secondValue.includes(".")){
             return;
          }
          this.secondValue += value;
       }
    }

    addOperator(operator){
       this.operator = operator;
    }

    calc(){
       if(this.firstValue != null && this.secondValue != null && this.operator != null ){
          const main = document.getElementById("screen");
          var firstNumber = Number(this.firstValue);
          var secondNumber = Number(this.secondValue);
          var log = '';
          switch (this.operator) {
             case '+':
                var result = firstNumber + secondNumber;
                log = this.firstValue + ' + ' + this.secondValue + " = " + result;
                console.log(log);
                main.value = result;
                break;
             case '-':
                var result = firstNumber - secondNumber;
                log = this.firstValue + ' - ' + this.secondValue + " = " + result;
                console.log(log);
                main.value = result;
                break;
             case '/':
                if(secondNumber == 0){
                   alert("Cannot be divided by 0");
                   break;
                }
                var result = firstNumber / secondNumber;
                log = this.firstValue + ' / ' + this.secondValue + " = " + result;
                console.log(log);
                main.value = result;
                break;
             case 'X':
                var result = firstNumber * secondNumber;
                log = this.firstValue + ' * ' + this.secondValue + " = " + result;
                console.log(log);
                main.value = result;
                break;
             default:
                console.log('Incorrect operator');
          }
          const logs = document.getElementById("log");
          const p = document.createElement("p");
          p.innerText = log;
          logs.appendChild(p);
       }
    }

    reset(){
          this.firstValue = '';
          this.secondValue = '';
          this.operator = '';
    }

  }