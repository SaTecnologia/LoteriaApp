module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = mongoose.Schema.Types.ObjectId;

	
	var loteria = new Schema(
		{
			numero1: 	{ type: String },
			numero2: 	{ type: String },
			numero3: 	{ type: String },
			numero4: 	{ type: String },
			status: 	{ type: Boolean},
			user: 		{ type: ObjectId, ref: 'User', default: null },
			created_at: { type: Date, default: Date.now },		
			updated_at: { type: Date, default: Date.now }
		}
	);

	return mongoose.model('Loteria', loteria);
}