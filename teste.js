var numeros = {
	numero1: Math.floor(Math.random() * 60),
	numero2: Math.floor(Math.random() * 60),
	numero3: Math.floor(Math.random() * 60),
	numero4: Math.floor(Math.random() * 60),
	// numero5: Math.floor(Math.random() * 60),
	// numero6: Math.floor(Math.random() * 60)
};



var continuar = true;
var num1;
var num2;
var num3;
var num4;
// var num5;
// var num6;





var i = 0;
while(continuar){
	num1 = Math.floor(Math.random() * 60);
	num2 = Math.floor(Math.random() * 60);
	num3 = Math.floor(Math.random() * 60);
	num4 = Math.floor(Math.random() * 60);
	// num5 = Math.floor(Math.random() * 60);
	// num6 = Math.floor(Math.random() * 60);


	if(
		(numeros.numero1 == num1) &&
		(numeros.numero2 == num2) &&
		(numeros.numero3 == num3) &&
		(numeros.numero4 == num4) 


	) {
		continuar = false;
		console.log("Total de tentativas:", i);

		console.log('Numero1: ' + numeros.numero1 + ' = ' +num1);
		console.log('Numero2: ' + numeros.numero2 + ' = ' +num2);
		console.log('Numero3: ' + numeros.numero3 + ' = ' +num3);
		console.log('Numero4: ' + numeros.numero4 + ' = ' +num4);
		// console.log('Numero5: ' + numeros.numero5 + ' = ' +num5);
		// console.log('Numero6: ' + numeros.numero6 + ' = ' +num6);



		i=0;
	} else {
		i++;
	}
}


