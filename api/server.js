// implement your server here
// require your posts router and connect it here
const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use(postsRouter);

server.get('/', (req, res) => {
	res.json({
		message: "server up and running"
	})
});

module.exports = server;