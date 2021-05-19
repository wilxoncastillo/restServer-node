const { response} = require('express');

const usuariosGet = (req, res) => {
	res.json({
		msg: 'get Api - Controllador'
	});
};

const usuariosPost = (req, res) => {
	res.json({
		msg: 'Post Api - Controllador'
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