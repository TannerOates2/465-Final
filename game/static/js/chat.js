const roomID = document.getElementById("game_board").getAttribute("room_id");
const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/'
                                + roomID + '/');
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#log').value += (data.message + '\n');
};
chatSocket.onclose = function(e) {
    console.error('Uh oh! Chat has experienced an unexpected error and is closed.');
};
document.querySelector('#submit').onclick = function(e) {
    const messageData = document.querySelector('#msg');
    const message = messageData.value;
    chatSocket.send(JSON.stringify({
        'message' : message
    }));
    message = '';
};
