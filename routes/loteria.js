module.exports = function(app){
	var   autenticar = require('./../middleware/autenticador')
		, passport = require('passport')
		, loteria = app.controllers.loteria;



	
	app.get('/api/loteria', loteria.loteriaAtiva);

	app.get('/api/loteria/gerarprimeira', loteria.gerarPrimeira);
	app.get('/api/loteria/gerarnumero', loteria.gerarNumero);
	app.get('/api/loterias', passport.authenticate('basic', { session: false }), loteria.listar);


	app.get('/api/apostas',  passport.authenticate('basic', { session: false }), loteria.apostas);
	app.get('/api/apostas/:id',  passport.authenticate('basic', { session: false }), loteria.apostasUser);

	app.post('/api/apostar',  passport.authenticate('basic', { session: false }), loteria.apostar);


}

