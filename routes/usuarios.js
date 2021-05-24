const { Router } =  require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const { 
	esRoleValido, 
	emailExiste,
	existeUsuarioPorId
} = require('../helpers/db-validators');

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
	//check('correo', 'El email no es valido').isEmail(),
	check('correo').custom(emailExiste),
	check('password', 'El password debe ser mas de 6 caracteres').isLength({min: 6}),
	//check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL']),
	check('rol').custom(esRoleValido),
	validarCampos
],usuariosPost);

router.put('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	check('rol').custom(esRoleValido),
	validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
	validarJWT,
	esAdminRole,
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	validarCampos
], usuariosDelete);


module.exports = router;