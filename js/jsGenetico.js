var abecedario=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
// Variable auxiliar para detener el algoritmo en posible ERROR de ciclado infinito.
var stopForzadoEn = 1000;
var stop = 0;
// Numero de variables iniales (Se podrá aumentar)  
var fo_num_variables = 2;
// Numero de reestricciones iniales (Se podrá aumentar)
var numRestricciones = 0;
// Tipo de problema: FUNCION OBJETIVO | ECUACION MATEMATICA : fo | ec
var kindProblem = null;
//Variables para la TABLA ITERATIVA.

var fo_valor_variables = [];
var reestricciones = [];
var restricciones_valor_coeficiente = [];

var limitesSuperiores  = [];
var limitesInferiores  = [];
var mj = [];
var aux = [];

var vectoresArray = [];
var variablesVectoresArray = [];


var xArray = [];
var zArray = [];
var zPorcentajeArray = [];
var zPorcentajeAcumArray = []; 
var aleatorioArray= [];
var vectorGanadorArray= [];
var zTotal = 0;
var vectoresArrayNuevos = []; 


function resolverGenetic(tipo) {
	kindProblem = tipo;

	if (kindProblem == "ec") { //Con ecuaciones se piden iteraciones y numero de poblacion
		console.log("Entra aqui")
		var vectores = document.getElementById("vectores").value;
		var iteraciones = document.getElementById("iteraciones").value;
		var aj = document.getElementById("aj").value;
		var bj = document.getElementById("bj").value;

		if ( vectores<=0 || vectores<=0) {
			$("#alertStatus").attr('class', 'alert alert-danger');
			$("#alertStatus").html("<strong>Error!</strong> Ingresa todos los datos");
			$("#alertStatus").fadeIn();
			setTimeout(function(){ $("#alertStatus").fadeOut(); }, 2000);
		}else{
			$("#alertStatus").attr('class', 'alert alert-success');
			$("#alertStatus").html("<strong>Ok!</strong> Resolviendo");
			$("#alertStatus").fadeIn();
			setTimeout(function(){ $("#alertStatus").fadeOut(); }, 2000);
			//Obtenemos la f(x)
			//Calculamos (bj-aj)*10^n
			var bjaj = (bj-aj)*(Math.pow(10,4));
			console.log("bj-aj: "+bjaj);
			//Ahora sacamos mjx.
			var mjx = Math.ceil(Math.log(bjaj)/Math.log(2));
			console.log("mjx: "+mjx);
			var aux = (bj-aj)/(Math.pow(2,mjx)-1);
			console.log("aux: "+aux);

			vectoresArray = new Array(vectores);
			xArray = new Array(vectores);
			zArray = new Array(vectores);
			zPorcentajeArray = new Array(vectores);
			zPorcentajeAcumArray = new Array(vectores);
			aleatorioArray = new Array(vectores);
			vectorGanadorArray = new Array(vectores);
			vectoresArrayNuevos = new Array(vectores);

			//APARTR DE AQUI SE CICLA
			for (var j = 0; j < iteraciones; j++) {
					
				if (j == 0) { //Se generan vectores inciales
					//Generamos vectores
					for (var i = 0; i < vectores; i++) {
						vectoresArray[i] = generaVector(mjx);
						console.log(vectoresArray[i]+", decimal: "+parseInt(vectoresArray[i],2));
						xArray[i] = generaVariable(aj,vectoresArray[i],aux,0,vectoresArray[i].length);
						//function generaVariable(aj,binario,aux,start,end) {
						console.log("x: "+xArray[i]);
					}
				}else{ //Solo mostramos info
					//Generamos vectores
					for (var i = 0; i < vectores; i++) {
						console.log(vectoresArray[i]+", decimal: "+parseInt(vectoresArray[i],2));
						xArray[i] = generaVariable(aj,vectoresArray[i],aux,0,vectoresArray[i].length);
						console.log("x: "+xArray[i]);
					}
				}
			
					

				console.log("\nTabla "+j+" : ");
				console.log("\nV\t\tx\t\tz\t\t%z\t%zAcum\t#aleat[0,1]\tvector");
				for (var i = 0; i < vectores; i++) {
					zArray[i] = resolveEcuationMathematic(xArray[i]); //x, y
					if(zArray[i]<0){
						zArray[i] = zArray[i]*-1;
					}
					zTotal += zArray[i];
				}
				for (var i = 0; i < vectores; i++) {
					zPorcentajeArray[i] = (zArray[i]*100)/zTotal;
				}
				for (var i = 0; i < vectores; i++) {
					if (i==0) {
						zPorcentajeAcumArray[i] = zPorcentajeArray[i];
					}else{
						zPorcentajeAcumArray[i] = zPorcentajeAcumArray[parseInt(i)-1] + zPorcentajeArray[i];
					}
					
				}
				for (var i = 0; i < vectores; i++) {
					aleatorioArray[i] = getAleatorio(0,100);
				}
				//ahora tenemos que ver a donde pertenece el aleatorio generado
				for (var i = 0; i < vectores; i++) {
					vectorGanadorArray[i] = getPalceOfAleatorio(aleatorioArray[i]);
				}

				//Imprimimos la primera tabla
				for (var i = 0; i < vectores; i++) {
					console.log("\nV"+(i)+"\t"+xArray[i].toString().substring(0,10)+"\t"+zArray[i].toString().substring(0,10)+"\t"+zPorcentajeArray[i].toString().substring(0,10)+"\t"+zPorcentajeAcumArray[i].toFixed(2).toString().substring(0,10)+"\t\t"+aleatorioArray[i]+"\t\tV"+vectorGanadorArray[i]);
				}

				//Necesitamos ver que vectores aparecen mas veces y ESCOJEMOS LOS 2 GANADORES
				var masApariciones = mode(vectorGanadorArray);

				var specialCase = false; //donde todos tienen las mismas apariciones
				var mejorZ = 0; //indice

				for (var i = 0; i < masApariciones.length-1; i++) {
					if (masApariciones[i].count != masApariciones[i+1].count) {
						specialCase = false;
						break;
					}else{
						specialCase = true;
					}
				}

				if (specialCase == true) {
					console.log("[ALERT] Caso Especial");
					mejorZ = getBetterZ();
					console.log("El mejor Z fue: "+mejorZ);
					console.log("Ganador: V"+masApariciones[mejorZ].value);
					//Por default el nuevo V1, sera el ganador.
					for (var i = 0; i < vectores; i++) {
						if (i==0) { //el primero sera el ganador
							vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[mejorZ].value)];
						}else{
							//los demas se sacaran por criterio de mutacion
							vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[mejorZ].value)],mjx);
						}
						
					}
				}else{
					if (masApariciones.length == 1) { 
						console.log("Ganador: V"+masApariciones[0].value);
						//Por default el nuevo V1, sera el ganador.
						for (var i = 0; i < vectores; i++) {
							if (i==0) { //el primero sera el ganador
								vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[0].value)];
							}else{
								//los demas se sacaran por criterio de mutacion
								vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[0].value)],mjx);
							}
							
						}
					}else{
						//Primero vemos la cantidad de apariciones
						if (masApariciones[0].count > masApariciones[1].count) {//Gana 0
							console.log("Ganador: V"+masApariciones[0].value);
							for (var i = 0; i < vectores; i++) {
								if (i==0) { //el primero se pone el ganador
									vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[0].value)];
								}else{
									//los demas se sacaran por criterio aleatorio
									var aleat = getAleatorio(0,1);
									if (aleat == 0) { //mutex
										vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[0].value)],mjx);
									}else{
										//se hace por remplazo, entre dos vectores
										vectoresArrayNuevos[i] = remplazo(vectoresArray[parseInt(masApariciones[0].value)],vectoresArray[parseInt(masApariciones[1].value)],mjx);
									}
									
								}
								
							}
						}else if (masApariciones[1].count > masApariciones[0].count) { //Gana 1
							console.log("Ganador: V"+masApariciones[1].value);
							for (var i = 0; i < vectores; i++) {
								if (i==0) { //el primero se pone el ganador
									vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[1].value)];
								}else{
									//los demas se sacaran por criterio aleatorio
									var aleat = getAleatorio(0,1);
									if (aleat == 0) { //mutex
										vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[1].value)],mjx);
									}else{
										//se hace por remplazo, entre dos vectores
										vectoresArrayNuevos[i] = remplazo(vectoresArray[parseInt(masApariciones[1].value)],vectoresArray[parseInt(masApariciones[0].value)],mjx);
									}
									
								}
								
							}
						}else if(masApariciones[1].count == masApariciones[0].count){ 
							//Si hay dos ganadores, se escoje al mas ganador por el criterio de valor en Z (el mejor Z)
							if (zArray[parseInt(masApariciones[0].value)]>zArray[parseInt(masApariciones[1].value)]) {
								//Gano 0
								console.log("Ganador: V"+masApariciones[0].value);
								for (var i = 0; i < vectores; i++) {
									if (i==0) { //el primero se pone el ganador
										vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[0].value)];
									}else{
										//los demas se sacaran por criterio aleatorio
										var aleat = getAleatorio(0,1);
										if (aleat == 0) { //mutex
											vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[0].value)],mjx);
										}else{
											//se hace por remplazo, entre dos vectores
											vectoresArrayNuevos[i] = remplazo(vectoresArray[parseInt(masApariciones[0].value)],vectoresArray[parseInt(masApariciones[1].value)],mjx);
										}
										
									}
									
								}
							}else{
								//Gano 1
								console.log("Ganador: V"+masApariciones[1].value);
								for (var i = 0; i < vectores; i++) {
									if (i==0) { //el primero se pone el ganador
										vectoresArrayNuevos[i] = vectoresArray[parseInt(masApariciones[1].value)];
									}else{
										//los demas se sacaran por criterio aleatorio
										var aleat = getAleatorio(0,1);
										if (aleat == 0) { //mutex
											vectoresArrayNuevos[i] = mutar(vectoresArray[parseInt(masApariciones[1].value)],mjx);
										}else{
											//se hace por remplazo, entre dos vectores
											vectoresArrayNuevos[i] = remplazo(vectoresArray[parseInt(masApariciones[1].value)],vectoresArray[parseInt(masApariciones[0].value)],mjx);
										}
										
									}
									
								}
							}
						}
							
					}
				}

					
				zTotal = 0;
				vectoresArray = changeArrays(vectoresArray,vectoresArrayNuevos);
			}
		}
	}else{ 
		/********************************************Tipo de problema: Funcion Objetivo**************************************/

		if (numRestricciones < fo_num_variables) {
			$("#alertStatus").attr('class', 'alert alert-danger');
			$("#alertStatus").html("<strong>Error!</strong> Ingresa todas las reestricciones");
			$("#alertStatus").fadeIn();
			setTimeout(function(){ $("#alertStatus").fadeOut(); }, 2000);
		}else{
			//Obtenemos los valores de las variables
			fo_valor_variables = new Array(fo_num_variables);
			for (var i = 0; i < fo_num_variables; i++) {
				fo_valor_variables[i] = document.getElementById("var"+i).value;
			}
			//console.log("[OK] - Vars FO");
			//console.log(fo_valor_variables);
			//El numero de coeficiontes de las reestricciones estara definido por el numero de coeficientes de la fo
			reestricciones = new Array(numRestricciones);
			restricciones_valor_coeficiente = new Array(numRestricciones);
			for (var i = 0; i < numRestricciones; i++) {
				reestricciones[i] = new Array(fo_num_variables);
				for (var j = 0; j < fo_num_variables; j++) {
					reestricciones[i][j] = document.getElementById("r"+i+"_"+j).value;
				}
				restricciones_valor_coeficiente[i] = document.getElementById("r"+i+"val").value;
			}
			//console.log("[OK] - Vars Reestricciones");
			//console.log(reestricciones);
			//console.log("[OK] - Coef Reestricciones");
			//console.log(restricciones_valor_coeficiente);
			//Ahora, tenemos que Obtener los limites de cada variable. o bien aj = limite inferior, bj = limite superoopr
			limitesSuperiores = new Array(fo_num_variables);
			limitesInferiores = new Array(fo_num_variables);
			for (var i = 0; i < numRestricciones; i++) {
				var FirstTime = true;
				for (var j = 0; j < numRestricciones; j++) {
					var valor = restricciones_valor_coeficiente[j]/reestricciones[j][i];
					if (isFinite(valor)) {
						if (FirstTime == true) {
							limitesSuperiores[i] = valor;
							limitesInferiores[i] = valor;
							FirstTime = false;
						}else{
							if (valor > limitesSuperiores[i]) {
								limitesSuperiores[i] = valor;
							}
							if (valor < limitesInferiores[i]) {
								limitesInferiores[i] = valor;
							}
						}
					}
				}
			}
			//console.log("[OK] - Limites Superiores de Variables en Reestricciones");
			//console.log(limitesSuperiores);
			$("#resultados").html(''); 
			$("#resultados").append(
				'<h2 class="title">Resultados <button id="resultadosTeoricosBtn" class="btn btn-danger" onclick="ocultarDiv(\'resultadosTeoricos\')">Ocultar</button></h2>'+
				'<div id="resultadosTeoricos">'+
				'</div>'
			);
			$("#resultadosTeoricos").append(
				'<div class="input-group mb-3  input-group sm" id="resultados">'+
					'<div class="input-group-prepend">'+
						'<span class="input-group-text">Limites superiores: </span>'+
					'</div>'+
					'<input class="form-control" type="text" readonly="true" value="'+limitesSuperiores+'">'+
				'</div>'
			);
			//console.log("[OK] - Limites Inferiores de Variables en Reestricciones");
			//console.log(limitesInferiores);
			$("#resultadosTeoricos").append(
				'<div class="input-group mb-3  input-group sm" id="resultados">'+
					'<div class="input-group-prepend">'+
						'<span class="input-group-text">Limites inferiores: </span>'+
					'</div>'+
					'<input class="form-control" type="text" readonly="true" value="'+limitesInferiores+'">'+
				'</div>'
			);
			//Ya tenemos los limites. Esto tambien nos define cuantas variables hay
			mj = new Array(fo_num_variables); 	
			aux = new Array(fo_num_variables);
			var largoTotal = 0;
			var precisionBits = document.getElementById("precisionBitsFO").value;
			for (var i = 0; i < fo_num_variables; i++) {
				mj[i] = Math.ceil(Math.log((limitesSuperiores[i]-limitesInferiores[i])*(Math.pow(10,precisionBits)))/Math.log(2));
				if (!isNaN(mj[i])) {
					largoTotal+=mj[i];
					aux[i] = (limitesSuperiores[i]-limitesInferiores[i])/((Math.pow(2,mj[i]))-(1));
				}
			}
			//console.log("[OK] - mj de todas las variables");
			//console.log(mj);
			$("#resultadosTeoricos").append(
				'<div class="input-group mb-3  input-group sm" id="resultados">'+
					'<div class="input-group-prepend">'+
						'<span class="input-group-text">mj totales: </span>'+
					'</div>'+
					'<input class="form-control" type="text" readonly="true" value="'+mj+'">'+
				'</div>'
			);
			//console.log("[OK] - aux de todas las variables (bj-aj/2^mj-1)");
			//console.log(aux);
			$("#resultadosTeoricos").append(
				'<div class="input-group mb-3  input-group sm" id="resultados">'+
					'<div class="input-group-prepend">'+
						'<span class="input-group-text">aux (bj-aj/2^mj-1)) totales: </span>'+
					'</div>'+
					'<input class="form-control" type="text" readonly="true" value="'+aux+'">'+
				'</div>'
			);
			//console.log("[OK] - Longitud total de vectores a generar: "+largoTotal+"\n\n");
			$("#resultadosTeoricos").append(
				'<div class="input-group mb-3  input-group sm" id="resultados">'+
					'<div class="input-group-prepend">'+
						'<span class="input-group-text">Longitud de vectores a generar: </span>'+
					'</div>'+
					'<input class="form-control" type="text" readonly="true" value="'+largoTotal+'">'+
				'</div>'
			);
			var vectores = document.getElementById("vectoresFO").value;

			/****************************************GENERACION DE VECTORES**********************************************/

			vectoresArray = new Array(vectores);
			variablesVectoresArray = new Array(fo_num_variables); //a,b,c,d... etc
			var inicio = 0;
			var final = 0;

			/****************************GENERACION Y COMPROBACION DE VECTORES**********************************/

			//Obtenemos el tiempo inicial
			var tiempoInicial = new Date();
			var correctos = 0;
			
			$("#resultados").append(
				'<h2 class="title">Vecotres generados <button id="resultadosVectoresInicialesBtn" class="btn btn-danger" onclick="ocultarDiv(\'resultadosVectoresIniciales\')">Ocultar</button></h2>'+
				'<div id="resultadosVectoresIniciales">'+
				'</div>'
			);
			for (var i = 0; i < vectores; i++) {
				vectoresArray[i] = generaVector(largoTotal);
				//console.log("\n[OK] Vector generado: "+vectoresArray[i]+" : Valor decimal: "+parseInt(vectoresArray[i],2));

				var resultadoRes = verificaVectorConRestricciones(mj,limitesInferiores,vectoresArray[i],aux);
				switch(resultadoRes){
					case "success":
						correctos++;
						$("#resultadosVectoresIniciales").append(
							'<div class="input-group mb-3  input-group sm" id="resultados">'+
								'<div class="input-group-prepend">'+
									'<span class="input-group-text">Vector: '+i+' cumple todas las reestricciones </span>'+
								'</div>'+
								'<input class="form-control" type="text" readonly="true" value="'+vectoresArray[i]+'">'+
							'</div>'
						);
						//console.log("[SUCCESS] Vector: "+vectoresArray[i]+" cumple con todas las reestricciones");
					break;
					case "fail":
						//console.log("[FAIL] No cumple reestriccion, vector descartado.");
						vectoresArray[i] = "";
						i--;
					break;
				}
				var tiempoFinal = new Date();
				var difference = (tiempoFinal - tiempoInicial) / 1000;
				if (difference >=300) {
					$("#resultados").append(
						'<h3 class="title" style="color:red">TIEMPO DE 2 MINUTOS COMPLETADO</h3>'
					);
					//console.log("[BREAK] Tiempo de 2 MINUTOS transcurrido");
					break;
				}
				stop++;
				/*
				stop++;
				if (stop == stopForzadoEn) {
					console.log("[FATAL-ERROR] Numero de vectores generados superado: "+stopForzadoEn);
					break;
				}*/
			}
			$("#resultados").append(
				'<h3 class="title" style="color:red">Se generaron: '+stop+' vectores totales en un tiempo de: '+difference+' segundos de los cuales '+correctos+' cumplieron todas las reestricciones</h3>'
			);
			//console.log("\n\nINFO: Se generaron "+stop+" vectores totales");
			//console.log("Tiempo transcurrido: " + difference);
			//console.log("\n\n[OK] Vectores que cumplen todas las reestricciones: ");
			//console.log(vectoresArray);
			$("#resultados").append(
				'<h3 class="title" >Iniciando Iteraciones correspondientes</h3>'
			);
			//console.log("\n\n[OK] Iniciando Iteraciones correspondientes");

			var iteraciones = document.getElementById("iteracionesFO").value;

			for (var i = 0; i < iteraciones; i++) {

				///////////////////////SE RECIBEN VECTORES COMPROBADOS Y CORRECTOS

				//console.log("\n[OK] Tabla "+i+" : ");
				$("#resultados").append(
					'<h2 class="title">Tabla '+i+' <button id="table'+i+'Btn" class="btn btn-danger" onclick="ocultarDiv(\'table'+i+'\')">Ocultar</button></h2>'
				);

				//var msg = "\nV";
				var msg = "<th>V</th>";
				for (var j = 0; j < fo_num_variables; j++) {
					//msg+="\t\t\t"+abecedario[j];
					msg+="<th>"+abecedario[j]+"</th>";
				}
				//msg+="\t\t\tz\t\t%z\t\t\t%zAcum\t\t\t#aleat[0,1]\t\t\tvector";

				$("#resultados").append(
					'<div class="table-responsive">'+
						'<table class="table" id="table'+i+'">'+
							'<thead>'+
								'<tr class="active">'+
									msg+
									'<th>z</th>'+
							        '<th>z%</th>'+
							        '<th>z%Acum</th>'+
							        '<th>aleat[0,1]</th>'+
							        '<th>vector</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody id="tableBody'+i+'">'+
							'</tbody>'+
						'</table>'+
					'</div>'
				);

				//console.log(msg);

				for (var k = 0; k < vectores ; k++) {
					//Se obtienen las variables y se comrueban
					inicio = 0;
					final = 0;
					for (var j = 0; j < fo_num_variables; j++) {
						if (j==0) {
							final = mj[j];
						}
						if (isNaN(final)) { //Significa que ya no hay mas vectores x, o y
							variablesVectoresArray[j] = 0;
						}else{
							variablesVectoresArray[j] = generaVariable(limitesInferiores[j],vectoresArray[k],aux[j],inicio,final);
							if (isNaN(variablesVectoresArray[j])) {variablesVectoresArray[j]=0}
							inicio+=mj[j];
							final+=mj[j+1];
						}
					}
					zArray[k] = resolveEcuation(variablesVectoresArray); 
					zTotal += zArray[k];
				}

				//Saca porcentaje de Z
				for (var j = 0; j < vectores; j++) {
					zPorcentajeArray[j] = (zArray[j]*100)/zTotal;
				}
				//Saca acumulativa de Z
				for (var j = 0; j < vectores; j++) {
					if (j==0) {
						zPorcentajeAcumArray[j] = zPorcentajeArray[j];
					}else{
						zPorcentajeAcumArray[j] = zPorcentajeAcumArray[parseInt(j)-1] + zPorcentajeArray[j];
					}
				}

				for (var j = 0; j < vectores; j++) {
					aleatorioArray[j] = getAleatorio(0,100.00);
				}
				//ahora tenemos que ver a donde pertenece el aleatorio generado
				for (var j = 0; j < vectores; j++) {
					vectorGanadorArray[j] = getPalceOfAleatorio(aleatorioArray[j]);
				}
				msg = "";
				//Imprimimos las FILAS.
				for (var j = 0; j < vectores; j++) {
					//Columna Vector
					//msg = "\nV"+(j);
					msg = "<td>V"+j+"</td>";
					//Columna Variables
					//Se obtienen las variables y se comrueban
					inicio = 0;
					final = 0;
					for (var k = 0; k < fo_num_variables; k++) {
						if (k==0) {
							final = mj[k];
						}
						if (isNaN(final)) { //Significa que ya no hay mas vectores x, o y
							variablesVectoresArray[k] = 0;
						}else{
							variablesVectoresArray[k] = generaVariable(limitesInferiores[k],vectoresArray[j],aux[k],inicio,final);
							if (isNaN(variablesVectoresArray[k])) {variablesVectoresArray[k]=0}
							inicio+=mj[k];
							final+=mj[k+1];
						}
					}
					for (var h = 0; h < variablesVectoresArray.length; h++) {
						//msg+="\t"+variablesVectoresArray[h].toString().substring(0,13);
						msg+="<td>"+variablesVectoresArray[h].toString().substring(0,13)+"</td>";
					}
						
					//Columba Z
					//msg+="\t\t"+zArray[j].toString().substring(0,10);
					msg+="<td>"+zArray[j].toString().substring(0,10)+"</td>";
					//Columba %Z
					//msg+="\t\t"+zPorcentajeArray[j].toString().substring(0,10);
					msg+="<td>"+zPorcentajeArray[j].toString().substring(0,10)+"</td>";
					//Columba ZAcum
					//msg+="\t\t\t"+zPorcentajeAcumArray[j].toFixed(2).toString().substring(0,10);
					msg+="<td>"+zPorcentajeAcumArray[j].toFixed(2).toString().substring(0,10)+"</td>";
					//Columba Aleatorio
					//msg+="\t\t\t"+aleatorioArray[j];
					msg+="<td>"+aleatorioArray[j]+"</td>";
					//Columna Vectores 
					//msg+="\t\t\tV"+vectorGanadorArray[j];
					msg+="<td>V"+vectorGanadorArray[j]+"</td>";
					//console.log(msg);
					$("#tableBody"+i).append(
						'<tr>'+
							msg+
						'</tr>'
					);
				}


				//CASOS POSIBLES
				//Todos ganan
				//Solo el primero gana
				//Ganan todos los que empatan

				//Necesitamos ver que vectores aparecen mas veces y ESCOJEMOS LOS GANADORES
				var masApariciones = mode(vectorGanadorArray);
				console.log("Vectores ganadores: \n");
				//console.log(vectorGanadorArray);
				console.log(masApariciones);

				//Pasamos todos los ganadores a los nuevos vectores

				for (var j = 0; j < masApariciones.length ; j++) {
					vectoresArrayNuevos[j] = vectoresArray[masApariciones[j].value];
				}

				//Los restantes con combinaciones o mutaciones

				for (var j = masApariciones.length; j < vectores; j++) {
					var aleat = getAleatorio(0,1);
					switch(aleat){
						case 0: //Mutar
							var choose = getAleatorio(0,masApariciones.length-1);
							vectoresArrayNuevos[j] = mutar(vectoresArray[parseInt(masApariciones[choose].value)],largoTotal);
						break;
						case 1: //Combinar
							var choose = getAleatorio(0,masApariciones.length-1);
							var choose2 = getAleatorio(0,masApariciones.length-1);
							vectoresArrayNuevos[j] = remplazo(vectoresArray[parseInt(masApariciones[choose].value)],vectoresArray[parseInt(masApariciones[choose2].value)],largoTotal);
						break;
					}
					//Verficamos que cumplan.
					var resultadoRes = verificaVectorConRestricciones(mj,limitesInferiores,vectoresArrayNuevos[j],aux);
					switch(resultadoRes){
						case "success":
							/*
							$("#resultados").append(
								'<div class="input-group mb-3  input-group sm" id="resultados">'+
									'<div class="input-group-prepend">'+
										'<span class="input-group-text">Vector: '+j+' cumple todas las reestricciones </span>'+
									'</div>'+
									'<input class="form-control" type="text" readonly="true" value="'+vectoresArrayNuevos[j]+'">'+
								'</div>'
							);*/
							//console.log("[SUCCESS] Vector: "+vectoresArrayNuevos[j]+" cumple con todas las reestricciones");
						break;
						case "fail":
							//console.log("[FAIL] No cumple reestriccion, vector descartado.");
							vectoresArrayNuevos[j] = "";
							j--;
						break;
					}

				}

				console.log("Vectores nuevos, para nueva iteracion: \n");
				console.log(vectoresArrayNuevos);
				
				zTotal = 0;
				vectoresArray = changeArrays(vectoresArray,vectoresArrayNuevos);

				if (i+1 == iteraciones) {
					let betherPotition = getBetterZ();
					$("#resultados").append(
						'<div class="input-group mb-3  input-group sm" id="resultados">'+
							'<div class="input-group-prepend">'+
								'<span class="input-group-text">Vector Ganador (MEJOR Z): </span>'+
							'</div>'+
							'<input class="form-control" type="text" readonly="true" value="V'+betherPotition+'">'+
						'</div>'
					);
				}
			}
		}

	}


		
}

function getAleatorio(minimo,maximo){
	return Math.round(Math.random() * (maximo - minimo) + minimo);
}

function generaVector(cantidadDatos) {
	vector = new Array(0);
	for (var i = 0; i < cantidadDatos ; i++) {
		vector.push(getAleatorio(0,1));
	}
	return vector.toString().replace(/,/g, '');
}

function generaVariable(aj,binario,aux,start,end) {
	var binario = binario.substring(start,end);
	var digit = parseInt(binario, 2);
	return (digit*aux)+parseInt(aj);
}

function resolveEcuation(array) {	
	var resultado = 0;
	for (var i = 0; i < array.length; i++) {
		resultado+=array[i]*fo_valor_variables[i];
	}
	return resultado;
}

function resolveEcuationMathematic(x) {
	return (eval("(0.010+0*Math.sin(2*Math.PI*1000*x))*(Math.sin(2*Math.PI*1000000*x))"));
}
//return Math.pow(Math.exp(1),(Math.pow(x,2))*(-1/2))/Math.sqrt(2*Math.PI)


function getPalceOfAleatorio(numero) {
	if (numero==100) {
		return (parseInt(zPorcentajeAcumArray.length-1));
	}else{
		for (var i = 0; i < zPorcentajeAcumArray.length; i++) {
			if (numero<=zPorcentajeAcumArray[i]) {
				return (parseInt(i));
			}
		}
	}
}


//Nos da los valores con mas aparicion
function mode(array) {
  var hash = {};
  return array
    // Contamos ocurrencias
    .reduce(function(result, value) {
      if (hash[value] === undefined) {
        hash[value] = result.length;
        result.push({
          value: value,
          count: 0
        });
      }
      result[hash[value]].count++;
      return result;
    }, [])
    // Ordenamos el hash
    .sort(function(a, b) {
      return b.count - a.count;
    });
}

function mutar(StringBinario,numeroBits) {
	//console.log("[OK] Binario a mutar: "+StringBinario);
	var position = getAleatorio(0,numeroBits-1);
	//console.log("[OK] Mutacion en la posicion: "+position);
	var bit = StringBinario.substring(position,position+1);
	if (bit == "0") {
		var newBinario = StringBinario.substring(0,position)+"1"+StringBinario.substring(position+1,numeroBits);
	}else{
		var newBinario = StringBinario.substring(0,position)+"0"+StringBinario.substring(position+1,numeroBits);
	}
	//console.log("[OK] Binario final: "+newBinario);
	return newBinario;
}


function remplazo(StringBinario,StringBinario2,numeroBits) {
	//console.log("[OK] Binarios a combinar: "+StringBinario+" y "+StringBinario2);
	var position = getAleatorio(0,numeroBits-1);
	//console.log("[OK] Combinacion a partir de la posicion: "+position);
	var newBinario = StringBinario.substring(0,position) +StringBinario2.substring(position,numeroBits);
	//console.log("[OK] Binario final: "+newBinario);
	return newBinario;
}

function changeArrays(vector1,vector2) {
	for (var i = 0; i < vector1.length; i++) {
		vector1[i] = vector2[i]
	}
	return vector1;
}

function getBetterZ() {
	var zOrdenados = mergeSortMethod(zArray);
	for (var i = 0; i < zArray.length; i++) {
		if (zArray[i] == zOrdenados[zOrdenados.length-1]) {
			return i;
		}
	}
}

function mergeSortMethod(array) {
	if (array.length < 2) {
    	return array;
  	}
  	const middle = parseInt(array.length / 2) | 0;
  	const left = array.slice(0, middle);
  	const right = array.slice(middle);

  	const merge = (left, right) => {
	    const result = [];
	    let il = ir = 0;

	    while (il < left.length && ir < right.length) {
	      result.push( (left[il] < right[ir]) ? left[il++] : right[ir++] );
	    }

	    return [...result, ...left.slice(il), ...right.slice(ir)];
	}
	return merge(mergeSortMethod(left), mergeSortMethod(right));
}































function openGraph() {

		var reestricciones = new Array(numRestricciones);
		var restricciones_valor_coeficiente = new Array(numRestricciones);

		for (var i = 0; i < numRestricciones; i++) {
			reestricciones[i] = new Array(fo_num_variables);
			for (var j = 0; j < fo_num_variables; j++) {
				reestricciones[i][j] = document.getElementById("r"+i+"_"+j).value;
			}
			restricciones_valor_coeficiente[i] = document.getElementById("r"+i+"val").value;
		}

		console.log(reestricciones);
		console.log(restricciones_valor_coeficiente);

		var puntosX = [];
		var puntosY = [];

		var canvas = document.getElementById("canvas");
		if (null==canvas || !canvas.getContext) return;
		var ctx = canvas.getContext("2d");
		//Dibujamos ejes.
		var ancho = canvas.width;
		var alto = canvas.height;
		ctx.beginPath();
		ctx.strokeStyle = "gray";
		ctx.moveTo(ancho/2, 0);
		ctx.lineTo(ancho/2, alto);
		ctx.moveTo(0, alto/2);
		ctx.lineTo(ancho, alto/2);
		ctx.stroke();

		for (var i = 0; i < numRestricciones; i++) {
			ctx.beginPath();
			var color = getRandomColor();
			for (var j = 0; j < fo_num_variables; j++) {
				var valor = restricciones_valor_coeficiente[i]/reestricciones[i][j];
				if (isFinite(valor)) {
					if (valor<50) {
						valor+=50;
					}
					if(valor>300){
						valor-=300;
					}
					if (j == 0) {
						console.log("X en: "+valor);
						ctx.strokeStyle = color;
						ctx.moveTo(ancho/2 + valor, alto/2);
						ctx.arc(ancho/2 + valor, alto/2, 3, 0, 2 * Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
					}else{
						console.log("Y en: "+valor);
						ctx.lineTo(ancho/2, (alto/2)-valor);
						ctx.arc(ancho/2, (alto/2)-valor, 3, 0, 2 * Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
					}
				}
				
			}
			ctx.stroke();
		}

		$(".wallBlack").fadeIn();

}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}








