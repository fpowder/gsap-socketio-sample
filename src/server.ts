// import path from 'path';
import { gsap } from 'gsap';
gsap.ticker.fps(20);
import { Server } from 'socket.io';
import http from 'http';
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;

const io = new Server(server, {
	transports: ['websocket', 'polling'],
	cors: {
		origin: `*`,
		methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
	},
});

const position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

io.on('connection', (socket) => {
	console.log(socket);
});

app.get('/gsap-test', (req: Request, res: Response) => {
	const timeline: gsap.core.Tween = gsap.to(position, {
		x: 3,
		y: 3,
		z: 3,
		duration: 3,
		onUpdate: () => {
			console.log(position);

			io.emit('position', {
				x: position.x,
				y: position.y,
				z: position.z,
			});
		},
	});

	res.status(200).send({message: 'position data send start'});
});

server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});