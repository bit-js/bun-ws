import { serve } from '..';
import route from './route';

import { test, expect } from 'bun:test';

// Start the server
serve({
    server: {
        fetch(req) {
            route.upgrade(req, {
                data: { id: performance.now().toString() }
            });

            return new Response();
        }
    }
});

// Testing WS client
const ws = new WebSocket('http://localhost:3000');

ws.addEventListener('open', () => {
    ws.send('Hi');
});

test('Send', (done) => {
    ws.addEventListener('message', (msg) => {
        expect(msg.data).toEndWith('Hi');
        done();
    });
})
