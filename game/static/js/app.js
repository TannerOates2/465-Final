var roomID = document.getElementById("game_board").getAttribute("room_id");
var char_choice = document.getElementById("game_board").getAttribute("char_choice");

if (window.location.protocol == "https:") {
    var ws_scheme = "wss://";
  } else {
    var ws_scheme = "ws://"
  };

var connectStr = ws_scheme + window.location.host + '/ws/play/' + roomID; //+ '/';
var gameSocket = new WebSocket(connectStr);
var board = [
    -1, -1, -1,
    -1, -1, -1,
    -1, -1, -1,
];
// assuming
// 0 1 2
// 3 4 5
// 6 7 8
winIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let moves = 0; //number of moves made
let turn = true;//if it is your turn

let elements = document.getElementsByClassName('square');
for (var i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", event=>{
        const index = event.path[0].getAttribute('data-index'); //which position was clicked
        if(board[index] == -1){ //if it was previously blank...
            if(!turn){
                alert("Wait for other to place the move")
            }
            else{
                turn = false;
                document.getElementById("alertMove").style.display = 'none'; // Hide          
                make_move(index, char_choice);
            }
        }
    })
}

function make_move(index, player){ //the position and the person making the move
    index = parseInt(index);
    let data = {
        "event": "MOVE",
        "message": {
            "index": index,
            "player": player
        }
    }
    
    if(board[index] == -1){ //if it was previously blank
        moves++;
        if(player == 'X')
            board[index] = 1;
        else if(player == 'O')
            board[index] = 0; //if we want to check for valid character choices, put here, otherwise:
        else{
            alert("Invalid character choice");
            return false;
        }
        gameSocket.send(JSON.stringify(data))
    }

    elements[index].innerHTML = player; //we might need to change this to reflect either player number or character
    const win = checkWinner();
    if(turn){
        if(win){
            data = {
                "event": "END",
                "message": `${player} is a winner. Play again?`
            }
            gameSocket.send(JSON.stringify(data))
        }
        else if(!win && moves == 9){
            data = {
                "event": "END",
                "message": "It's a draw. Play again?"
            }
            gameSocket.send(JSON.stringify(data))
        }
    }
}

function reset(){
    board = [
        -1, -1, -1,
        -1, -1, -1,
        -1, -1, -1,
    ]; 
    moves = 0;
    turn = true;
    document.getElementById("alertMove").style.display = 'inline';        
    for (var i = 0; i < elements.length; i++){
        elements[i].innerHTML = "";
    }
}

const check = (winDex) => { //windex = winning index
    if(board[winDex[0]] !== -1 && board[winDex[0]] === board[winDex[1]] && board[winDex[0]] === board[winDex[2]])
        return true;
    return false;
};

function checkWinner(){
    let win = false;
    if(moves < 5) return win;
    winIndices.forEach((w) => {
        if (check(w)) {
          win = true;
          windex = w;
        }
      });
    return win;
}


function connect() {
    gameSocket.onopen = function open() {
        console.log('WebSockets connection created.');
        gameSocket.send(JSON.stringify({
            "event": "START",
            "message": ""
        }));
    };

    gameSocket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };
    // Sending the info about the room
    gameSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        data = data["payload"];
        let message = data['message'];
        let event = data["event"];
        switch (event) {
            case "START":
                reset();
                break;
            case "END":
                alert(message);
                reset();
                break;
            case "MOVE":
                if(message["player"] != char_choice){
                    make_move(message["index"], message["player"])
                    turn = true;
                    document.getElementById("alertMove").style.display = 'inline';        
                }
                break;
            case "CHAT":
                document.querySelector('#chat_box').value= (message + '\n');
                break;
            default:
                console.log("No event")
        }
    };

    if (gameSocket.readyState == WebSocket.OPEN) {
        gameSocket.onopen();
    }
}
/////////////////////////////////////////////////////



document.querySelector('#msg').focus();
document.querySelector('#msg').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#send').click();
    }
};

document.querySelector('#send').onclick = function(e) {
    const messageInputDom = document.querySelector('#msg');
    const message = messageInputDom.value;
    gameSocket.send(JSON.stringify({
        "event": "CHAT",
        'message': message
    }));
    messageInputDom.value = '';
};
connect();
