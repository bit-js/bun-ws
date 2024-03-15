# `bun-ws`
A simple WebSocket router for Bun.

## Usage
Route file:
```ts
import { route } from '@bit-js/bun-ws';

export default route<{ id: string }>({
    message(ws) {
        ws.send(ws.data.id);
    }
});
```

Use with a fetch handler.
```ts
import route from './route';

export default function fetch(req: Request) {
    route.upgrade(req, {
        data: { id: performance.now().toString() }
    });
}
```

Entry point:
```ts
import fetch from './fetch';
import { serve } from '@bit-js/bun-ws';

// Create a server and bind all registered routes to that server
const server = serve({
    // Bun server options
    server: { fetch },

    // WebSocket base handler options (without handlers)
    ws: { publishToSelf: true }
});
```

Use `bind` if you already have a server instance not created using `serve`:
```ts
import { bind } from '@bit-js/bun-ws';

// Bind all registered routes to a server
bind(server);
```
