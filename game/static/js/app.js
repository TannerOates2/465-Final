var roomID = document.getElementById("game_board").getAttribute("room_id");
var playerNum = document.getElementById("game_board").getAttribute("player_num"); //0 or 1 for who is playing

var connectStr = 'ws://' + window.location.host + '/ws/play/' + roomID + '/';
var gameSocket = new WebSocket(connectStr);
var gameBoard = [
    -1, -1, -1,
    -1, -1, -1,
    -1, -1, -1
];
// assuming
// 0 1 2
// 3 4 5
// 6 7 8
winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let moves = 0; //number of moves made
let turn = true; //if it is your turn

let elemArr = document.getElementsByClassName('square');
for(let i = 0; i < elemArr.length; i++){
    elemArr[i].addEventListener("click", event=>{
        const idx = event.path[0].getAttribute('data-index'); //which position was clicked
        if(gameBoard[idx] == -1){ //if it was previously blank...
            if(!turn){
                alert("Not your turn");
            } else {
                turn = false;
                move(idx, playerNum);
                // document.getElementById("alertMove").style.display = 'none';
            }
        }
    });
}

function move(idx, player){ //the position and the person making the move
    idx = parseInt(idx);
    let data  = {
        "event": "MOVE",
        "msg": {
            "idx": idx,
            "player": player
        }
    }

    if(gameBoard[idx] == -1){ //if it was previously blank
        moves++;
        if(player == 0) gameBoard[idx] = 1; //X
        else if (player == 1) gameBoard[idx] = 0; //O
        //if we want to check for valid character choices, put here, otherwise:
        gameSocket.send(JSON.stringify(data))
    }

    elemArr[idx].innerHTML = player;//we might need to change this to reflect either player number or character
    //elemArr[idx].innerHTML = 'X' ? player == 0 : 'O'; //something like this maybe
    const win = checkWin();
    if(turn){
        if(win){
            data = {
                "event" : "END",
                "msg" : `${player} is the winner!`
            }
            gameSocket.send(JSON.stringify(data))
        } else if (moves == 9){
            data = {
                "event" : "END",
                "msg" : "Draw."
            }
            gameSocket.send(JSON.stringify(data))
        }
    }
}

function reset(){
    gameBoard = [
        -1, -1, -1,
        -1, -1, -1,
        -1, -1, -1
    ];
    moves = 0;
    turn = true;
    document.getElementById("alertMove").style.display = 'inline'; 
    for(let i = 0; i < elemArr.length; i++){
        elemArr[i].innerHTML = "";
    }
}

const check = (winDex) => { //windex = winning index
    if(gameBoard[winDex[0]] !== -1 && gameBoard[winDex[0]] === gameBoard[winDex[1]] && gameBoard[winDex[0]] === gameBoard[winDex[2]])
        return true;
    return false;
};

function checkWin(){
    let win = false;
    if(moves < 5) return win;
    winningPos.forEach(element => {
        if (check(element)) {
            win = true;
            widx = element;
        }
    });
    return win;
}

function connect(){
    gameSocket.onopen = function open() {
        console.log('WebSocket connection establishing');
        gameSocket.send(JSON.stringify({
            "event": "START",
            "msg": ""
        }));
    };

    gameSocket.onclose = function (err){
        console.log('WebSocket closed, trying again shortly', err.reason);
        setTimeout(function(){
            connect();
        }, 500); //in milliseconds
    };

    gameSocket.onmessage = function(err){
        let data = JSON.parse(e.data);
        data = data["payload"];
        let msg = data["msg"];
        let evt = data["event"];
        switch(evt){
            case "START":
                reset();
                break;
            case "END":
                alert(msg);
                reset();
                break;
            case "MOVE":
                if(msg["player"] != playerNum){
                    move(msg["idx"], msg["player"])
                    turn = true;
                    //document.getElementById("alertMove").style.display = 'inline';
                }
                break;
            default:
                console.log("No event found");

        }
    };

    if (gameSocket.readyState == WebSocket.OPEN) {
        gameSocket.onopen();
    }
}

connect();