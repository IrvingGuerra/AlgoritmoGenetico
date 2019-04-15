var rangoError = 10;


 function verificaVectorConRestricciones(m,limites,vector,auxiliar) {
 	//Primero obtenemos las variales del vector
 	//Una vez generado el vector, se obtienen las variables y se comrueban
	inicio = 0;
	final = 0;
	for (var j = 0; j < fo_num_variables; j++) {
		if (j==0) {
			final = m[j];
		}
		if (isNaN(final)) { //Significa que ya no hay mas vectores x, o y
			variablesVectoresArray[j] = 0;
		}else{
			variablesVectoresArray[j] = generaVariable(limites[j],vector,auxiliar[j],inicio,final);
			if (isNaN(variablesVectoresArray[j])) {variablesVectoresArray[j]=0}
			inicio+=m[j]; 
			final+=m[j+1];
		}
		//console.log("[OK] Valor Variable "+j+": "+variablesVectoresArray[j]);
	}
	//Ya que genero las n variables, ahora hay que evaluar
	//Recorremos todas las reestricciones
 	var continua = true;
	for (var j = 0; j < numRestricciones; j++) {
		//Recorremos cada variable
		var result = 0;
		for (var k = 0; k < fo_num_variables; k++) {
			result += (reestricciones[j][k]*variablesVectoresArray[k]);
		}
		var operator = $("#r"+j+"operation").val();
		//console.log(result +operator+restricciones_valor_coeficiente[j]);
		//los valores de la restriccion tendran 5% de tolerancia
		//ejemplo
		// a + b >= 100
		//Sacando + y - 5% seria, 95 y 105, entonces
		//a + b >= 95 o a + b >=105

/*
		var rangoMenor = parseFloat(restricciones_valor_coeficiente[j]) - ((parseFloat(restricciones_valor_coeficiente[j]) * rangoError) / (100));
		var rangoMayor= parseFloat(restricciones_valor_coeficiente[j])+ ((parseFloat(restricciones_valor_coeficiente[j]) * rangoError) / (100));
		var evaluacion1 = eval(result+operator+rangoMenor);
		var evaluacion2 = eval(result+operator+rangoMayor);
*/
		
		if (eval(result+operator+restricciones_valor_coeficiente[j])) {
			continua=true;
		}else{
			return "fail";
			break;
		}

		/*
		if (evaluacion1 || evaluacion2) {
			continua=true;
		}else{
			return "fail";
			break;
		}*/


	}
	if (continua == true) {
		return "success";
	}
 }


 function generaVariable(aj,binario,aux,start,end) {
	var binario = binario.substring(start,end);
	var digit = parseInt(binario, 2);
	return (digit*aux)+parseInt(aj);
}