const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if( !existeRol) {
		throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
	}
}


const emailExiste = async( correo = '') => {
	const existMail = await Usuario.findOne({ correo });

	if(existMail) {
		throw new Error(`El email ${ correo },ya esta registrado en la base de datos`);
	}

}

module.exports ={ 
	esRoleValido,
	emailExiste
};