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



	
	app.get('/api/users', passport.authenticate('basic', { session: false }), users.listAPI);
	//app.get('/api/user/:id', autenticar.loginApi, users.listUserAPI);

	app.get('/api/user/me', passport.authenticate('basic', { session: false }), users.user);

	app.post('/api/users',users.addAPI);
	app.get('/api/loginfail', function(req, res){
		res.status(403).json({login: false});
	});

	app.post('/api/login', passport.authenticate('basic', { session: false }), users.user);
	app.get('/api/logout', function(req,res){
		req.logout();
	    res.json({logout: true});
	});

}

