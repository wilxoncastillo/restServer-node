const express = require('express');
var cors = require('cors');




class Server {
	
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';

		// middlewares
		this.middlewares();

		// routes
		this.routes();

	}

	middlewares() {
		// cors
		this.app.use(cors());
		
		// directorio public
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usuariosPath, require('../routes/usuarios'));
	}

	listen() {
		this.app.listen(this.port, () => {
		  console.log(`Example app listening at http://localhost:${this.port}`)
		})
	}

}

module.exports = Server;