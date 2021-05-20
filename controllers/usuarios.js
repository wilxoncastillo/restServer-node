const { response, request } = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario'); 

const usuariosGet = (req = request, res = response) => {
	const query = req.query
	
	// destruracon de argumentos
	const {q, nombre = 'Sin nombre', apikey, page = 1, limit = 10} = req.query

	res.json({
		msg: 'get Api - Controllador',
		query,
		q,
		nombre,
		apikey
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


	res.json({
		msg: 'Put Api - Controllador',
		usuario
	});
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