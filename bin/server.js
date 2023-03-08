"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = require("gsap");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const position = { x: 0, y: 0, z: 0 };
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    transports: ['websocket'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
io.on('connection', (socket) => {
    console.log(socket);
    const timeline = gsap_1.gsap.to(position, {
        x: 3,
        y: 3,
        z: 3,
        duration: 3,
        onUpdate: () => {
            console.log(position);
            socket.emit('position', {
                x: position.x,
                y: position.y,
                z: position.z,
            });
        },
    });
});
httpServer.listen(3000);
