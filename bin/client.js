"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)('http://localhost:3000', {
    reconnectionDelay: 1000,
});
socket.on('connect', () => {
    console.log('client conneceted');
});
socket.on('position', (data) => {
    console.log(data);
});
socket.on('data', (data) => {
    console.log(data);
});
