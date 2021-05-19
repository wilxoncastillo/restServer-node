const mongoose = require('mongoose');

const dbConection = async() => {

	try {

		await mongoose.connect( process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('Base de datos online');


	} catch (eror){
		console.log(eror);
		throw new Error('Error al iniciar la base de datos');
	}

}

module.exports = {
	dbConection
}