module.exports = function(app){
	var   autenticar = require('./../middleware/autenticador')
		, passport = require('passport')
		, loteria = app.controllers.loteria;



	
	app.get('/api/loteria/gerarprimeira', loteria.gerarPrimeira);
	app.get('/api/loteria/gerarnumero', loteria.gerarNumero);
	app.get('/api/loterias', autenticar.loginApi, loteria.listar);



	app.get('/api/apostas', autenticar.loginApi, loteria.apostas);
	app.get('/api/apostas/:id', autenticar.loginApi, loteria.apostasUser);

	app.post('/api/apostar', autenticar.loginApi, loteria.apostar);


}

