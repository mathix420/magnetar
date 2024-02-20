const WebSocket = require('ws');
const faker = require('faker');

const wss = new WebSocket.Server({ port: process.env.app_port || 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if (message == 'getName') {
            ws.send(JSON.stringify({
                vres1: {
                    value: faker.name.findName(),
                },
                r2: {
                    value: `<h3>${new Date()}</h3>`
                },
            }))
        } else if (message == 'getPic') {
            ws.send(JSON.stringify({
                res3: {
                    value: `<img src="https://picsum.photos/640/480?t=${new Date().getTime()}" onload="onLoadCallback" />`,
                    tokens: ['onLoadCallback'],
                },
                r2: {
                    value: `<h3>${new Date()}</h3>`
                },
            }))
        }
    });

    ws.send(JSON.stringify({
        r1: {
            value: '<h2 class="has-text-link">Secondary title</h2>',
        },
        r2: {
            value: `<h3>${new Date()}</h3>`
        },
    }));

    setTimeout(() => sendUpdate(ws), 5000);
});


function sendUpdate(ws) {
    ws.send(JSON.stringify({
        r1: {
            value: '<h2 class="has-text-danger">This title has been updated dynamically from server</h2>',
        },
        r2: {
            value: `<h3>${new Date()}</h3>`
        },
    }));
}