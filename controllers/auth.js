const {response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const login  = async(req, res = response) => {
	const { correo, password } = req.body;

	try {
		// Verificar si el email existe
		const usuario = await Usuario.findOne({correo});

		if(!usuario) {
			res.status(400).json({
				msg: 'Usuario / Password no son correctos - correo'
			});
		}

		// si el usuario esta activo
		if(!usuario.estado) {
			res.status(400).json({
				msg: 'Usuario / Password no son correctos - estado: false'
			});
		}

		// Verificar la contraseña
		const validarPassword = bcryptjs.compareSync(password, usuario.password);

		if(!validarPassword) {
			res.status(400).json({
				msg: 'Usuario / Password no son correctos - password'
			});
		}

		// generar el jwt



		res.json({
			msg: 'Login ok'
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el administrador'
		})
	}

	

}

module.exports = {
	login
}