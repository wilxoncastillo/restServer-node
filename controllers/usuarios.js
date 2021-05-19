const { response} = require('express');

const usuariosGet = (req, res) => {
	res.json({
		msg: 'get Api - Controllador'
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
	res.json({
		msg: 'Put Api - Controllador'
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