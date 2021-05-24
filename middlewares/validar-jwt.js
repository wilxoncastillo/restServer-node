const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); 


const validarJWT = async(req = request, res = response, next) => {
	const token = req.header('x-token');

	if(!token) {
		return res.status(401).json({
			msg: 'No hay token en la peticion'
		});
	}

	try{
		const { uid } = jwt.verify(token, process.env.SECRETTOPRIVATEKEY);

		// leer usuario que corresponde al uid
		const usuario = await Usuario.findById(uid);

		if(!usuario) {
			return res.status(401).json({
				msg: 'Token no valido - usuario no existe'
			});
		}


		// verificar si el uid no esta marcado como borrado
		if(!usuario.estado) {
			return res.status(401).json({
				msg: 'Token no valido - usuario edo:false',
				usuario
			});	
		}

		req.usuario = usuario;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'token no valido...!'
		})
	}
}


module.exports = {
	validarJWT
}