/*

Stuff to handle ;-):
1. Make the fields clickable (player0 uses "X", player1 "0")
2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
4. Check for winning combinations
5. Implement feedback to the players (winning or game is a draw)
6. End the game, avoid further playing
7. Add a "Play again button"
8. Implement "eternal" game statistics (using local storage!)
9. Style the game as fancy and responsive as you can ;-)

*/

// global game variables
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton;

player = 0;

fields = [];
fields = document.getElementsByTagName('td');
console.log(fields);

fieldsPlayed = [];
fieldsPlayer0 = [];
fieldsPlayer1 = [];

msg = document.getElementById('msg');

playButton = document.getElementById('playAgain').addEventListener('click', playAgain);

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', play)
}


function play() {
    // game core mechanics, marking the fields
    //console.log('Are you talking to me?');
    if (fieldsPlayed.includes(this.id)) {
        alert('No can do!')
    }
    if (player === 0 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = '<img src="x.png" alt="Blue X">';
        fieldsPlayer0.push(parseInt(this.id));
        player = 1
    } else if (player === 1 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = '<img src="o.png" alt="Blue O">';
        fieldsPlayer1.push(parseInt(this.id));
        player = 0
    }

    fieldsPlayed.push(this.id);
    console.log(fieldsPlayed);

    win()
}

function win() {
    // analyzing field choices, winning conditions, feedback
    if (
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
        fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
        fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
        fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)
    ) {
        // player 0 won
        msg.innerHTML = 'Player X won!';
        setStats("PlayerX");
        gameOver();
    } else if (
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
        fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
        fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
        fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
    ) {
        // player 1 won
        msg.innerHTML = 'Player O won!'
        setStats("PlayerO");
        gameOver();
    } else if (fieldsPlayed.length == 9) {
        // game is a draw
        msg.innerHTML = 'It\'s a draw!'
        gameOver();
    }

}

function gameOver() {
    // ending the game 
    for (let i = 0; i < fields.length; i++) {
        fields[i].removeEventListener('click', play)
    }
    gameStats();

}

function playAgain() {
    // restart the game
    window.location.reload(true)
}

function gameStats() {
    // game stats using local storage - gets the stats

    let playerXScore = localStorage.getItem("playerX");
    playerXScore = parseInt(playerXScore);
    let playerOScore = localStorage.getItem("playerO");
    playerOScore = parseInt(playerOScore);

    if(!playerXScore){
        playerXScore = 0;
    }
    if(!playerOScore){
        playerOScore = 0;
    }

    document.querySelector("#playerxStat").innerHTML = playerXScore;
    document.querySelector("#playeroStat").innerHTML = playerOScore;
    return {
        PlayerX : playerXScore,
        PlayerO : playerOScore
    };
}

function setStats(winner){
    let playerValues = gameStats();
    if(winner === "PlayerX"){
        const newPlayerXstat = playerValues.PlayerX +1;
        localStorage.setItem("playerX", newPlayerXstat);
    }
    if(winner === "PlayerO"){
        const newPlayerOstat = playerValues.PlayerO +1;
        localStorage.setItem("playerO", newPlayerOstat);
    }
}

gameStats();