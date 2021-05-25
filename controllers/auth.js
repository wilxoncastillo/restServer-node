const {response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-Verify');

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
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el administrador'
		});
	}
}

const googleSignIn = async(req, res) => {
	const { id_token } = req.body;

	try {
		const { corre, nombre, img } = await googleVerify( id_token);

		let usuario = await Usuario.findOne({correo});

		if(!usuario) {
			// tengo que crearlo
			const data = {
				nombre,
				correo,
				password: ':p',
				img,
				google: true
			}
		}

		usuario = new Usuario(data);
		await Usuario.save();

		// Si  eciste base deto BD y esta borrado
		if(!usuario.estado) {
			return res.status(401).json({
				msg: 'Hable con el administrador usuario bloqueado'
			}) 
		}

		// generar jwt
		const token = await generarJWT(usuario.id);


		res.json({
			usuario,
			token
		});

	}catch (error){
		res.status(400).json({
			msg: 'token de Google no valido...!'
		})
	}

	
}

module.exports = {
	login,
	googleSignIn
}