module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = mongoose.Schema.Types.ObjectId;

	
	var loteria = new Schema(
		{

			titulo: 	{ type: String , default: "" },
			descricao: 	{ type: String , default: "" },
			imagem: 	{ type: String , default: "" },
			numero1: 	{ type: String },
			numero2: 	{ type: String },
			numero3: 	{ type: String },
			numero4: 	{ type: String },
			status: 	{ type: Boolean },
			user: 		{ type: ObjectId, ref: 'User', default: null },
			validade: 	{ type: Date, default: Date.now },
			created_at: { type: Date, default: Date.now },		
			updated_at: { type: Date, default: Date.now }
		}
	);

	return mongoose.model('Loteria', loteria);
}