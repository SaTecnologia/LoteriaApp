module.exports = function(app){
	var   autenticar = require('./../middleware/autenticador')
		, passport = require('passport')
		, users = app.controllers.user;




	//app.get('/users', users.list);	
	//app.get('/user/cadastrar', users.cadastrar);
	
	//app.get('/user/:id/editar', users.editar);

	//app.get('/user/login', users.login);

	
	//app.get('/user/:id', users.user);



	//app.post('/user/find', users.busca);
	
	//app.post('/users', users.add);



	//app.post('/user/login', passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }));



	
	app.get('/api/users', autenticar.loginApi, users.listAPI);
	//app.get('/api/user/:id', autenticar.loginApi, users.listUserAPI);

app.get('/api/user/me', autenticar.loginApi, users.user);

	

	app.post('/api/users', users.addAPI);

	app.post('/api/users/login', passport.authenticate('basic'));


	


}