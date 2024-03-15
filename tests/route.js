import { route } from '..';

export default route({
    message(ws, msg) {
        ws.send(`${ws.data.id}: ${msg}`);
    }
});
