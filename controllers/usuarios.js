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

	// Verificar si el correo existente
	const existMail = await Usuario.findOne({ correo });

	if(existMail) {
		return res.status(400).json({
			msg: "Email ya existe"
		})
	}

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync(); //default 10 vueltas
	usuario.password = bcryptjs.hashSync(password, salt);
	
	// grabar BD
	await usuario.save();

	res.json({
		msg: 'Post Api - Controllador',
		usuario	
	});
}

const usuariosPut = (req, res) => {
	const {id} = req.params;

	res.json({
		msg: 'Put Api - Controllador',
		id
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