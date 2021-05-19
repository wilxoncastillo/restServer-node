const { response, request } = require('express');

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

const usuariosPost = (req, res) => {
	
	//const body = req.body;
	const {nombre, edad} = req.body;

	res.json({
		msg: 'Post Api - Controllador',
		nombre,
		edad
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