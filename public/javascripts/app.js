var app = angular.module('loteria', ['ngRoute']);


app.controller('UserCtrl', ['$scope', '$http', function($scope,$http){

	$scope.users = [];
	$scope.email = 'geriofilho@gmail.comadasdasdas';

	$scope.buscaUser = function(){
		$http.get('http://localhost:3000/api/users').then(function(data){
			console.log(data);
			$scope.users = data.data;
		});
	}

}]);