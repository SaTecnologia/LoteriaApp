module.exports = function(app){

	var Loteria = app.models.loteria;
	var Aposta = app.models.aposta;


	var LoteriaController = {
		gerarPrimeira: function(req,res){
			Loteria.findOne({status: true}, function(err, loteria){
				if(err) {
					res.json(err);
				} else {
					if(loteria) {
						res.json({teste: "tem cadastro"});
					} else {
						var numeros = {
							numero1: Math.floor(Math.random() * 60),
							numero2: Math.floor(Math.random() * 60),
							numero3: Math.floor(Math.random() * 60),
							numero4: Math.floor(Math.random() * 60),
							status: true
						};

						new Loteria(numeros).save(function(err, loteria){
							if(err){
								res.json(err);
							} else {
								res.json(loteria);
							}
						})
					}
				}
			});

			

		},
		listar: function(req,res){
			Loteria.find(function(err, loterias){
				if(err) {
					res.json(err);
				} else {
					res.json(loterias)
				}
			});

		},
		
		gerarNumero: function(req,res){
			Loteria.findOne({status: true}, function(err, loteria){
				loteria.status = false;
				loteria.save(function(err, l){
					var numeros = {
						numero1: Math.floor(Math.random() * 60),
						numero2: Math.floor(Math.random() * 60),
						numero3: Math.floor(Math.random() * 60),
						numero4: Math.floor(Math.random() * 60),
						status: true
					};

					new Loteria(numeros).save(function(err, loteria){
						if(err){
							res.json(err);
						} else {
							res.json(loteria);
						}
					})
				})
			})
		},
		apostar: function(req, res){
			var numeros = {
				numero1: req.body.numero1,
				numero2: req.body.numero2,
				numero3: req.body.numero3,
				numero4: req.body.numero4
			};


			Loteria.findOne({status:true}, function(err, loteria){
				if(err){
					res.json(err);
				} else {
					new Aposta(
						{
							numero1: numeros.numero1,
							numero2: numeros.numero2,
							numero3: numeros.numero3,
							numero4: numeros.numero4,
							user: 	req.user._id,
							lotria: loteria._id					
						}
					).save(function(err, aposta){


						if(
							(loteria.numero1 == numeros.numero1) &&
							(loteria.numero2 == numeros.numero2) &&
							(loteria.numero3 == numeros.numero3) &&
							(loteria.numero4 == numeros.numero4)
						) {

							loteria.user = req.user._id;
							loteria.status = false;

							loteria.save(function(err,l){
								if(err){
									res.json(err);
								} else {
									var numeros = {
										numero1: Math.floor(Math.random() * 60),
										numero2: Math.floor(Math.random() * 60),
										numero3: Math.floor(Math.random() * 60),
										numero4: Math.floor(Math.random() * 60),
										status: true
									};

									new Loteria(numeros).save(function(err, loteria){
										if(err){
											res.json(err);
										} else {
											res.json(true);
										}
									})
								}
							})


						} else {
							res.json({teste:"tente outra vez.."})		
						}
					});

				}

			})

		}, 
		apostas: function(req,res){
			Aposta
				.find()
				.populate({
					path: 'user',
					select: 'email admin'
				})
				.populate('loteria')
				.exec(function (err, apostas) {
				  if (err) {
				  	console.log(err);
				  	res.json(err);
				  } else {
				  	res.json(apostas);
				  }
				});
		},
		apostasUser: function(req,res){
			Aposta
				.find()
				.populate({
					path: 'user',
					match: { _id: req.params.id},
					 select: 'email',
				})
				.populate('loteria')
				.exec(function (err, apostas) {
				  if (err) {
				  	console.log(err);
				  	res.json(err);
				  } else {
				  	res.json(apostas);
				  }
				});
		}
	};
	return LoteriaController;
}