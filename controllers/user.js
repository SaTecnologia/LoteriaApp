module.exports = function(app) {

	var User = app.models.user;

	var UserController = {
		user: function(req,res){
			console.log('adasdasdas');
			var _id = req.user._id;
			User.findById(_id,function(err, user){
				if(err) {
					console.log('Error: ', err);
					res.json(err);
				} else {
					res.json(user);
				}

			});
			
		},
		listAPI: function(req,res){
			var query = {};
			User.find(query,function(err, users){
				if(err) {
					console.log('Error: ', err);
					res.json(err);
				} else {

					res.json({users:users, requisicao: req.session, user: req.user._id});
				}

			});
			
		},
		listUserAPI: function(req,res){
			var _id = req.params.id;
			User.findById(_id,function(err, user){
				if(err) {
					console.log('Error: ', err);
					res.json(err);
				} else {
					res.json(user);
				}

			});
		},
		addAPI: function(req,res) {

			req.session.novoUser = true;

			var user = new User;

			user.email 		= req.body.email;
			user.password 	= req.body.password;



			user.save(function(err, user){
				if(err){
					console.log('Error: ', err);
					res.json(err);
				} else {
					res.json(user);
				}
			});
		},
		editarAPI: function(req, res) {
			var _id = req.body.id;
			User.findById(_id,function(err, user){
				if(err) {
					console.log('Error: ', err);
					res.json(err);
				} else {
					res.json(user);
				}

			});
			
		}
		// list: function(req,res){
		// 	var query = {};
		// 	User.find(query,function(err, users){
		// 		if(err) {
		// 			console.log('Error: ', err);
		// 			res.json(err);
		// 		} else {
		// 			res.render('users', {users: users});
		// 		}

		// 	});
			
		// },
		// user: function(req,res){
		// 	var _id = req.params.id;
		// 	User.findById(_id,function(err, user){
		// 		if(err) {
		// 			console.log('Error: ', err);
		// 			res.json(err);
		// 		} else {
		// 			res.json('users', {users: user});
		// 		}

		// 	});
			
		// },
		// login: function(req,res) {
		// 	res.render('user/login');
		// },
		// busca: function(req,res){
		// 	var busca = req.body.email;
		// 	console.log(busca);
		// 	User.find({email: busca}, function(err, users){
		// 		if(err) {
		// 			console.log('Error: ', err);
		// 			res.json(err);
		// 		} else {
		// 			res.render('users', {users: users});
		// 		}
		// 	})	
		// },
		
		

		// cadastrar: function(req, res) {
		// 	res.render('user/cadastrar');

		// },
		// editar: function(req, res) {
		// 	var _id = req.params.id;
		// 	User.findById(_id,function(err, user){
		// 		if(err) {
		// 			console.log('Error: ', err);
		// 			res.json(err);
		// 		} else {
		// 			res.render('user/editar', {users: user});
		// 		}

		// 	});
			
		// },
		// add: function(req,res) {
		// 	var user = new User;
		// 	user.email 		= req.body.email;
		// 	user.password 	= req.body.password;


		// 	user.save(function(err, user){
		// 		if(err){
		// 			console.log('Error: ', err);
		// 			res.json(err);
		// 		} else {
		// 			res.redirect('/users');
		// 		}
		// 	});
		// },
		
		// loginUser: function(req,res){
		// 	req.session.login = "rogerio";
		// 	req.session.senha = "asdasda";

		// 	res.json(req.session)
		// }
	};


	return UserController;

}