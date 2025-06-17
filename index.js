let containers = document.querySelectorAll('.container');
let reset = document.querySelector('.reset');
let winner = document.querySelector('.winner');

let turnO = true; //player O turn

let win = [
   [0,1,2],
   [0,3,6],
   [0,4,8],
   [1,4,7],
   [2,5,8],
   [2,4,6],
   [3,4,5],
   [6,7,8],
];

let Active = true;

containers.forEach((container) => {
   container.addEventListener('click', () => {
   if(container.innerText === "" && Active)
   {
     if(turnO)
     {
        container.innerText = "O";
        container.style.color = "red";
        turnO = false;
     }
     else{
        container.innerText = "X";
        container.style.color = "skyblue";
        turnO = true;
     }
     container.classList.add('clicked');
     if(checkwinner()){
        Active = false;
     }
     else{
        checktie();
     }
   }
   });
});

let checkwinner = () =>{
   for(let pattern of win){
    let val1 = containers[pattern[0]].innerText;
    let val2 = containers[pattern[1]].innerText;
    let val3 = containers[pattern[2]].innerText;

    if(val1 !== "" && val1 === val2 && val1 === val3)
    {
        // containers.forEach(container => container.style.display = "none");
        winner.style.display = "block";
        winner.style.color = val1 === "O" ? "red" : "skyblue"; // Set winner color
        winner.innerText = `${val1} is winner!`;
        return false;
    }
   }
   return false;
};

let checktie = () => {
    // If all containers are filled and no winner, it's a tie
    let isTie = Array.from(containers).every(container => container.innerText !== "");
    if (isTie) {
        // containers.forEach(container => container.style.display = "none");
        winner.style.display = "block";
        winner.innerText = "It's a Tie!";
        winner.style.color = "black";
        Active = false;
    }
}

let resetgame = () =>{
    containers.forEach((container)=>{
        container.innerText = "";
        container.style.display = "";
        container.style.color = "";
        container.classList.remove('clicked');
    });
    winner.innerText = "";
    winner.style.display = "none";
    turnO =true;
    Active = true;
}
reset.addEventListener('click',resetgame);

//toggle button for dark mode

document.getElementById('darkModeToggle').addEventListener('change', function() {
       document.body.style.backgroundColor = this.checked ? 'black' : '';
       containers.forEach(c => {
           c.style.backgroundColor = this.checked ? ' rgb(113, 110, 110,0.6)' : '';
       });
});