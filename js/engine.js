class Engine {

    constructor() {
       this.playerTurn = 'X';
    }
   
   turn(){  
       var currentTurn = this.playerTurn;
       if(this.playerTurn == 'X')
           this.playerTurn = 'O';
       else
           this.playerTurn = 'X';
       return currentTurn;
   }

   getButtons(){
       this.b1 = document.getElementById("1");
       this.b2 = document.getElementById("2");
       this.b3 = document.getElementById("3");
       this.b4 = document.getElementById("4");
       this.b5 = document.getElementById("5");
       this.b6 = document.getElementById("6");
       this.b7 = document.getElementById("7");
       this.b8 = document.getElementById("8");
       this.b9 = document.getElementById("9");
   }

   checkWinX(){
        this.getButtons();
        if(this.b1.innerHTML == 'X' && this.b2.innerHTML == 'X' && this.b3.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b4.innerHTML == 'X' && this.b5.innerHTML == 'X' && this.b6.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b7.innerHTML == 'X' && this.b8.innerHTML == 'X' && this.b9.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b1.innerHTML == 'X' && this.b4.innerHTML == 'X' && this.b7.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b2.innerHTML == 'X' && this.b5.innerHTML == 'X' && this.b8.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b3.innerHTML == 'X' && this.b6.innerHTML == 'X' && this.b9.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b1.innerHTML == 'X' && this.b5.innerHTML == 'X' && this.b9.innerHTML == 'X'){
            alert("X wins");
            return;
        }
        else if(this.b3.innerHTML == 'X' && this.b5.innerHTML == 'X' && this.b7.innerHTML == 'X'){
            alert("X wins");
            return;
        }
   }

   checkWinY(){
        if(this.b1.innerHTML == 'O' && this.b2.innerHTML == 'O' && this.b3.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b4.innerHTML == 'O' && this.b5.innerHTML == 'O' && this.b6.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b7.innerHTML == 'O' && this.b8.innerHTML == 'O' && this.b9.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b1.innerHTML == 'O' && this.b4.innerHTML == 'O' && this.b7.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b2.innerHTML == 'O' && this.b5.innerHTML == 'O' && this.b8.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b3.innerHTML == 'O' && this.b6.innerHTML == 'O' && this.b9.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b1.innerHTML == 'O' && this.b5.innerHTML == 'O' && this.b9.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        else if(this.b3.innerHTML == 'O' && this.b5.innerHTML == 'O' && this.b7.innerHTML == 'O'){
            alert("O wins");
            return;
        }
        this.checkDraw();
   }


   checkDraw(){
        if(this.b1.innerHTML != '' && this.b2.innerHTML != '' && this.b3.innerHTML != '' &&
           this.b4.innerHTML != '' && this.b5.innerHTML != '' && this.b6.innerHTML != '' &&
           this.b7.innerHTML != '' && this.b8.innerHTML != '' && this.b9.innerHTML != ''){
            alert("Draw");
            this.reset();
           }
           
   }

   reset(){
        this.b1.innerHTML = '';
        this.b1.disabled = false;
        this.b2.innerHTML = '';
        this.b2.disabled = false;
        this.b3.innerHTML = '';
        this.b3.disabled = false;
        this.b4.innerHTML = '';
        this.b4.disabled = false;
        this.b5.innerHTML = '';
        this.b5.disabled = false;
        this.b6.innerHTML = '';
        this.b6.disabled = false;
        this.b7.innerHTML = '';
        this.b7.disabled = false;
        this.b8.innerHTML = '';
        this.b8.disabled = false;
        this.b9.innerHTML = '';
        this.b9.disabled = false;
        this.playerTurn = 'X';
   }
}