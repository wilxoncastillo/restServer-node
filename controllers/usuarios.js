const { response, request } = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario'); 

const usuariosGet = async(req = request, res = response) => {
	
	//const query = req.query
	
	// destruracon de argumentos

	const { limite = 5, desde = 0} = req.query;

	const usuarios = await Usuario.find()
		.skip(Number(desde))
		.limit(Number(limite));

	res.json({
		usuarios
	});
};

const usuariosPost = async(req, res) => {
	
	//const body = req.body;
	const {nombre, correo, password, rol} = req.body;
	const usuario = new Usuario({nombre, correo, password, rol});

	const salt = bcryptjs.genSaltSync(); //default 10 vueltas
	usuario.password = bcryptjs.hashSync(password, salt);
	
	// grabar BD
	await usuario.save();

	res.json({
		msg: 'Post Api - Controllador',
		usuario	
	});
}

const usuariosPut = async(req, res) => {
	const {id} = req.params;
	const {_id, password, google, ...resto} = req.body;

	// Todo validar con la base de datos
	if( password) {
		const salt = bcryptjs.genSaltSync(); //default 10 vueltas
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate( id, resto);


	res.json(usuario);
}

const usuariosPatch = (req, res) => {
	res.json({
		msg: 'Patch Api - Controllador'
	});
}

const usuariosDelete = (req, res) => {
	res.json({
		msg: 'Delete Api - Controllador'
	});
}



module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
}