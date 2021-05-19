const express = require('express')

class Server {
	
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// middlewares
		this.middlewares();

		// routes
		this.routes();

	}

	middlewares() {
		// directorio public
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.get('/api', (req, res) => {
			res.json({
				msg: 'get Api'
		  	});
		});

		this.app.put('/api', (req, res) => {
			res.json({
				msg: 'put Api'
		  	});
		});

		this.app.patch('/api', (req, res) => {
			res.json({
				msg: 'patch Api'
		  	});
		});

		this.app.post('/api', (req, res) => {
			res.json({
				msg: 'post Api'
		  	});
		});

		this.app.delete('/api', (req, res) => {
			res.json({
				msg: 'delete Api'
		  	});
		});
	}

	listen() {
		this.app.listen(this.port, () => {
		  console.log(`Example app listening at http://localhost:${this.port}`)
		})
	}

}

module.exports = Server;