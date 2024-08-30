// initial data 
let square = {
    a1:"", a2:"", a3:"",
    b1:"", b2:"", b3:"",
    c1:"", c2:"", c3:""
};
let playing = false;
let player = '';
let warning = '';

reset();

// events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", itemClick);
});


// Functions
function itemClick(event){
    let item = event.target.getAttribute("data-item");
    if(playing && square[item] === ""){
        square[item] = player;
        reanderSquare();
        togglePlayer();
    }
}
function reset() {
    warning = "";

    let random = Math.floor(Math.random() * 2);/*Math.floor vai arredondar o numero // math.ramdom vai gerar um numero aleatorio entre 0 é 1*/
    player = (random === 0) ? 'x' : 'o';

    for (let i in square){
        square[i] = "";
    }
    playing = true;

    reanderSquare();
    reanderInfo();
}

function reanderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}
function reanderInfo(){
    document.querySelector(".vez").innerHTML = player;
    document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer(){
    player = (player === "x") ? "o" : "x";
    reanderInfo();
}

function checkGame(){
    if(checkWinnerFor("x")){
        warning = 'O "x" venceu';
        playing = false; 
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;

    }else if (isFull()){
        warning = "Deu empate";                                     
        playing = false;
    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]
    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(Option => square[Option] === player);
            if(hasWon){
                return true;
            }
    }

    return false;
};


function isFull(){
        for(let i in square){
            if(square[i] === ''){
                return false
            }
        }
    
        return true;
};
