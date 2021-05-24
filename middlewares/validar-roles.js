const { request, response} = require('express');

const esAdminRole = (req = request, res = response, next) => {

	if(!req.usuario) {
		return res.status(500).json({
			msg: 'Se quiere varificar el role sin el token primero'
		});
	}


	const {rol, nombre} = req.usuario;

	if(rol !== 'ADMIN_ROL') {
		return res.status(401).json({
			msg: `${ nombre} no es administrador - No uede hacer esto`
		});
	}

	next();
}

module.exports = {
	esAdminRole
}