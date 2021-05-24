const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
	return new Promise((resolve, reject) =>{
		const payload = { uid };

		jwt.sign(payload, process.env.SECRETTOPRIVATEKEY, {
			expiresIn: '4h'
		}, (err, token) =>{
			if(err) {
				console.log(err);
				reject('No se pudo generar el tokrn');
			} else {
				resolve(token);
			}
		})
	
	})
}


module.exports = {
	generarJWT
}