const squares = document.querySelectorAll(".grid div");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");
//console.log(startBtn)

//määritetään pelin aloitus muuttujia
let currentShooterIndex = 202;
let score = 0;
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,21,21,22,23,24,
    30,31,33,34,35,36,37,38,39
];
let direction = 1;
let width = 15;
let invadersId; //hyökkääjien intervalli
let aliensRemoved = []; // Taulukko sisältää tuhotut hyökkääjät

//funktio joka piirtää alienit
function drawAliens(){
    removeAliens();
    alienInvaders.forEach((value, index) => {
        if(!aliensRemoved.includes(index)){
            if(squares[value].classList.contains("player")){
                alert("Game Over");
                clearInterval("invadersId");
                return;
            }
            squares[value].classList.add("invader")
        }
        

    });
    
}
function removeAliens(){
    alienInvaders.forEach((index) => {
    squares[index].classList.remove("invader")});
}
//funktio liikuttaa hyökkääjiä
function moveInvaders(){
    //tarkistetaan onko hyökkääjä[0] vasemmassa reunassa
    //palauttaa joko true tai false
    const leftEdge = alienInvaders[0] % width === 0;

    //tarkistetaan oko hyökkääjä[9] oikeassa reunassa
    //palauttaa joko true tai false
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;
    alienInvaders.forEach((index) => {
        squares[index].classList.remove("invader");

    });

    if(rightEdge && direction == 1){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width;
    
        }
        direction = -1;
        

    } else if(leftEdge && direction === -1){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width;
        }
        direction = 1;
    } else {
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += direction;
        }
       
    }


   

    //for(let i = 0; i < alienInvaders.length; i++){
        //alienInvaders[i] = alienInvaders [i] + direction;
    //    alienInvaders[i] += direction;

   // }
    drawAliens();
   
}
//Aloittaa pelin
function startGame(){
    score = 0;
    currentShooterIndex = 202;

    removeAliens();


    scoreDisplay.innerHTML = score;
    squares[currentShooterIndex].classList.add("player");
    drawAliens();
    invadersId = setInterval(moveInvaders, 500);

    function Win(){
        if(scoreDisplay === 30){
            alert("You Win!")
        }
    }
   
   
}
//Liikuttaa pelaajaa
function movePlayer(e){
    
    squares[currentShooterIndex].classList.remove("player")

    switch(e.key){

       case 'ArrowLeft':
        currentShooterIndex--;
        break;

       case 'ArrowRight':
        currentShooterIndex++; 
    }
    if(squares[currentShooterIndex].classList.contains("invader")){
        
        alert("Game Over!")
        return;
    }
    squares[currentShooterIndex].classList.add("player");
}
// ampumis funktio
function shoot(e){
    let laserId; //laser intervalli
    let currentLaserIndex = currentShooterIndex; //ammuksen lähtöpaikka

    // Liikuttaa ammusta
    function moveLaser(){
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        // Osuuko ammus hyökkääjään
        if(squares[currentLaserIndex].classList.contains("invader")){
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(()=> squares[currentLaserIndex].classList.remove("boom"), 1000);
            clearInterval(laserId);

            aliensRemoved.push(alienInvaders.indexOf(currentLaserIndex));
            scoreDisplay.innerHTML = score += 10;
            
        }
        
    }

    if(e.key === 'ArrowUp'){
        laserId = setInterval(moveLaser, 100);
    }
    squares[currentLaserIndex].classList.remove("laser")
}



// kuuntelijan aloitus-painikkeelle
startBtn.addEventListener("click", startGame) //.addEventListener("click", startGame);
// kuuntelija pelaajalle
document.addEventListener("keydown",movePlayer);
// kuuntelija ampumista varten
document.addEventListener("keydown", shoot);