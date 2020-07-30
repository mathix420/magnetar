const WebSocket = require('ws');
const faker = require('faker');

const wss = new WebSocket.Server({ port: process.env.app_port });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if ( message == 'getName' ) {
            ws.send(JSON.stringify({
                vres1: faker.name.findName()
            }))
        }
    });

    ws.send(JSON.stringify({
        r1: '<h2 class="has-text-link">Secondary title</h2>',
        r2: `<h3>Now => ${new Date()}</h3>`
    }));
});