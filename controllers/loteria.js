module.exports = function(app){

	var Loteria = app.models.loteria;
	var Aposta = app.models.aposta;
	var mongoose = require('mongoose');


	var respostas = {
		acertos: [
			'Você acertou!! Veja no menu "Minhas Vitórias" e preencha os dados para receber seu premio'
		],
		erros: [
			'Não foi desta vez.',
			'Continue tentando, sua sorte vai chegar.',
			'UUuuu... Não foi desta vez, mas continue tentando.',
			'Desta vez você errou, mas por sorte, as apostas são ilimitadas, continue tentando.',
			'Quem sabe da proxima vez você acerta, continue tentando.',
			'Putz, não foi dessa vez, quem sabe na próxima.',
			'Você não consegiu desta vez, mas continue apostando!',
			'Errou, mas com apostas ilimitadas, uma hora sua sua sorte chega.',
			'Pissiu, você errou, mas tenho uma dica para você, continue arriscando, as apostas são ilimitadas.'
		]
	};

	var LoteriaController = {
		loteriaAtiva: function(req,res){
			var notlist = {
				numero1: 0,
				numero2: 0,
				numero3: 0,
				numero4: 0
			}
			Loteria.findOne({status: true},notlist, function(err, loteria){
				res.json(loteria);
			});
		},

		gerarPrimeira: function(req,res){
			Loteria.findOne({status: true}, function(err, loteria){
				if(err) {
					res.json(err);
				} else {
					if(loteria) {
						res.json({teste: "tem cadastro"});
					} else {
						var numeros = {
							numero1: Math.floor(Math.random() * 61),
							numero2: Math.floor(Math.random() * 61),
							numero3: Math.floor(Math.random() * 61),
							numero4: Math.floor(Math.random() * 61),
							status: true
						};

						new Loteria(numeros).save(function(err, loteria){
							if(err){
								res.json(err);
							} else {
								res.json(loteria);
							}
						});
					}
				}
			});
		},
		listar: function(req,res){
			if(req.user.admin){
				Loteria.find(function(err, loterias){
					if(err) {
						res.json(err);
					} else {
						res.json(loterias);
					}
				});
			} else {
				res.status(401).end();
			}
			

		},
		gerarNumero: function(req,res){
			Loteria.findOne({status: true}, function(err, loteria){
				loteria.status = false;
				loteria.save(function(err, l){
					var numeros = {
						numero1: Math.floor(Math.random() * 61),
						numero2: Math.floor(Math.random() * 61),
						numero3: Math.floor(Math.random() * 61),
						numero4: Math.floor(Math.random() * 61),
						status: true
					};

					new Loteria(numeros).save(function(err, loteria){
						if(err){
							res.json(err);
						} else {
							res.json(loteria);
						}
					});
				});
			});
		},
		apostar: function(req, res){
			var numeros = {
				numero1: req.body.numero1,
				numero2: req.body.numero2,
				numero3: req.body.numero3,
				numero4: req.body.numero4,
				user: 	req.user._id,
				loteria: req.body.loteria	
			};
			
			var query = {
				_id: mongoose.Types.ObjectId(req.body.loteria),
				numero1: parseInt(req.body.numero1),
				numero2: parseInt(req.body.numero2),
				numero3: parseInt(req.body.numero3),
				numero4: parseInt(req.body.numero4),
				status: true
			};

			
			new Aposta(numeros)
				.save(function(err, aposta){
					if(err) {
						console.log(err);
						res.json(err);
					} else {
						Loteria.findOne({
				_id: mongoose.Types.ObjectId(req.body.loteria),
				numero1: parseInt(req.body.numero1),
				numero2: parseInt(req.body.numero2),
				numero3: parseInt(req.body.numero3),
				numero4: parseInt(req.body.numero4),
				status: true
			}, function(err, loteria){
							if(err){
								console.log(err);
								res.json(err);
							} else {
								if(loteria){
									loteria.status = false;
									loteria.save();

									var numero = Math.floor(Math.random() * respostas.acertos.length);
									
									var result = {
										acerto: true,
										msg: respostas.acertos[numero]
									}
									console.log('if loteria Result: ', result);
									res.json(result);

								} else {
									var numero = Math.floor(Math.random() * respostas.erros.length);
		
									var result = {
										acerto: false,
										msg: respostas.erros[numero]
									}
									console.log('else loteria Result: ', result);
									res.json(result);
								}
							}
						});
					}
			});


			

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