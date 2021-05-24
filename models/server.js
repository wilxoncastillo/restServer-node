const express = require('express');
var cors = require('cors');

const { dbConection } = require('../database/config');


class Server {
	
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';
		this.authPath = '/api/auth';

		// conectar a la base de datos
		this.conectarDB();
		
		// middlewares
		this.middlewares();

		// routes
		this.routes();

	}

	async conectarDB() {
		await dbConection();
	}

	middlewares() {
		// cors
		this.app.use(cors());

		// lectura y parseo del body
		this.app.use(express.json());
		
		// directorio public
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.authPath, require('../routes/auth'));
		this.app.use(this.usuariosPath, require('../routes/usuarios'));
	}

	listen() {
		this.app.listen(this.port, () => {
		  console.log(`Example app listening at http://localhost:${this.port}`)
		})
	}

}

module.exports = Server;