const WebSocket = require('ws');
const faker = require('faker');

const wss = new WebSocket.Server({ port: process.env.app_port || 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if ( message == 'getName' ) {
            ws.send(JSON.stringify({
                vres1: faker.name.findName()
            }))
        } else if ( message == 'getPic' ) {
            ws.send(JSON.stringify({
                res3: `<img src="${faker.image.cats()}" />`
            }))
        }
    });

    ws.send(JSON.stringify({
        r1: '<h2 class="has-text-link">Secondary title</h2>',
        r2: `<h3>${new Date()}</h3>`
    }));

    setTimeout(() => sendUpdate(ws), 5000);
});


function sendUpdate(ws) {
    ws.send(JSON.stringify({
        r1: '<h2 class="has-text-danger">This title has been updated dynamically from server</h2>',
    }));
}