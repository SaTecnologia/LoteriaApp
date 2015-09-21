module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	
	var ObjectId = mongoose.Schema.Types.ObjectId;

		
	var aposta = new Schema(
		{
			numero1: 	{ type: String },
			numero2: 	{ type: String },
			numero3: 	{ type: String },
			numero4: 	{ type: String },
			loteria: 	{ type: ObjectId, ref: 'Loteria' },
			user: 		{ type: ObjectId, ref: 'User' },
			created_at: { type: Date, default: Date.now },		
			updated_at: { type: Date, default: Date.now }
		}
	);

	return mongoose.model('Aposta', aposta);
}