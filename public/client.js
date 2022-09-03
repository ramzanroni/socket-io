const socket = io();
socket.on('connect', () => {
    let idValue = document.getElementById('idValue');
    idValue.innerHTML = socket.id;
    // console.log("Client ID: " + socket.id);
    
})
let name;
let textarea = document.querySelector('#textarea');
let messageArea=document.querySelector(".message__area")
do {
    name=prompt("Please Enter your name: ")
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let userid = document.getElementById('userid').value;
    let msg = {
        senderid:userid,
        user: name,
        message:message.trim()
    }
    appendMeessage(msg, 'outgoing')
    scrollToBottom();
    textarea.value = '';
    
    // send to server 
    socket.emit('message', msg);
}

function appendMeessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}
 

// receive message 
socket.on('message', (msg) => {
    console.log("Client ID: "+socket.id);
    appendMeessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop=messageArea.scrollHeight
}