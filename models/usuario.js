const { Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es requerido']
	},

	correo: {
		type: String,
		required: [true, 'El correo es requerido'],
		unique: true
	},

	password: {
		type: String,
		required: [true, 'El password es requerido'],
	},

	img: {
		type: String,
	},

	rol: {
		type: String,
		required: true,
		enum: ['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL']
	},

	estado: {
		type: Boolean,
		default: true
	},

	google: {
		type: Boolean,
		default: false
	}, 

});

module.exports = model('Usuario', UsuarioSchema);