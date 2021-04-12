const random = [];
let count =0;
const N = 81;
const winCount =71;
const bombCount=10;

function generateBomb(){
    for (let i =0;i<bombCount;i++){
        let temp = Math.floor(Math.random()*N)+1; //(0-1) 76

        while(random.includes(temp)){
            let temp = Math.floor(Math.random()*N)+ 1; 
        }
        random.push(temp);
    }
}
generateBomb();


for(let i =0; i<=N;i++){
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", "cell_"+ i);

    cell.addEventListener("click", cellClicked);
    document.getElementById("grid").appendChild(cell);
}

function cellClicked(cell){
    let safeCell =Number(cell.target.getAttribute("id").slice(5));
    // The getAttribute() method of the Element interface returns the value of a specified attribute on the element. 
    //  If the given attribute does not exist, the value returned will either be null or "" (the empty string);
    // The slice() method returns the selected elements in an array, as a new array object.
    // The slice() method selects the elements starting at the given start argument, and ends at, but does not include,
    //  the given end argument.

    let bombCell= bombClicked();

    if(bombCell){
        lost();
    }
    else{
        count++;
        let score= document.getElementById("gameScore").innerHTML=count;
        cellColorChange(safeCell);
    }
    if(count==winCount){
        win();
    }

}

function bombClicked(num){
    if(random.includes(num)){
        return true;
    }
    return false;
}

function lost(){
    removeEl();
    showBomb();
    document.getElementById("resultDisplay").innerText ="Game Over";
}

function win(){
    removeEl();
    showBomb();
    document.getElementById("resultDisplay").innerText ="Win";
}

function removeEl(){
    for (let i=0; i<N;i++){
        document.getElementById("cell_"+ i).removeEventListener("click", cellClicked);
    }
}

function showBomb(){
    for (let i=0; i<bombCount;i++){
        document.getElementById("cell_" + random[i]).style.backgroundImage= "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
        document.getElementById("cell_"+random[i]).style.backgroundSize ="cover";
        document.getElementById("cell_"+random[i]).style.backgroundColor ="rgb(255,0,0)";
    }
}

function cellColorChange(safeCell) {
    document.getElementById("cell_"+safeCell).style[backgroundColor] ="rgb(66,230,26)";
    document.getElementById("cell_"+ safeCell).removeEventListener("click", cellClicked);
}

function reset(){
    resetCell();
    resetScore();
    addListener();
    document.getElementById("resultDisplay").innerText ="";

}

function resetCell(){
    for(let i =0; i<=N;i++){
        document.getElementById("cell_" + random[i]).style.backgroundImage= "";
        document.getElementById("cell_"+random[i]).removeAttribute("style");
    }
    while(random.length>0){
        random.pop();
    }
    count=0;
    generateBomb();
    console.log(random);
}

function scoreReset(){
    let score = document.getElementById("resultDisplay").innerHTML =0;
}

function addListener(){
    for(let i =0; i<=N;i++){
        let cell = document.getElementById("cell_"+i);
    cell.addEventListener("click", cellClicked);
    }
}