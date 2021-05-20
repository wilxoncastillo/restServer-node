const { Router } =  require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const {Role} = require('../models/role');

const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
	check('nombre', 'El nombes es obligatorio').not().isEmpty(),
	check('correo', 'El email no es valido').isEmail(),
	check('password', 'El password debe ser mas de 6 caracteres').isLength({min: 6}),
	//check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL']),
	//*
	check('rol').custom(async(rol = '') => {
		const existeRol = await Role.findOne({ rol });
		if( !existeRol) {
			throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
		}
	}),
	//*/
	validarCampos
],usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;