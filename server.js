const express = require('express');
const app = express();
const http = require('http').Server(app);
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
    port: 8080
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'public/index.html');
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data)
    });
}

wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
        data = JSON.parse(msg);
        if(data.message)
            wss.broadcast('<strong>'+data.name + '</strong>' + data.message);
    });
});

let port = (process.env.PORT || 3000);
http.listen(port, () => {
    console.log('3000 running');
})