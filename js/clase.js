function resolver() {
	vectores = document.getElementById("vectores").value;

	ajX = document.getElementById("ajX").value;
	bjX = document.getElementById("bjX").value;

	ajY = document.getElementById("ajY").value;
	bjY = document.getElementById("bjY").value;

	ajZ = document.getElementById("ajZ").value;
	bjZ = document.getElementById("bjZ").value;
 
	ajW = document.getElementById("ajW").value;
	bjW = document.getElementById("bjW").value;

	//X
	var bjajX = (bjX-ajX)*(Math.pow(10,2));
	console.log("X bj-aj: "+bjajX);
	var mjX = Math.ceil(Math.log(bjajX)/Math.log(2));
	console.log("mjx: "+mjX);
	var auxX = (bjX-ajX)/(Math.pow(2,mjX)-1);
	console.log("auxX: "+auxX);
	//Y
	var bjajY = (bjY-ajY)*(Math.pow(10,2));
	console.log("Y bj-aj: "+bjajY);
	var mjY = Math.ceil(Math.log(bjajY)/Math.log(2));
	console.log("mjY: "+mjY);
	var auxY = (bjY-ajY)/(Math.pow(2,mjY)-1);
	console.log("auxY: "+auxY);

	//W
	var bjajW = (bjW-ajW)*(Math.pow(10,2));
	console.log("W bj-aj: "+bjajW);
	var mjW = Math.ceil(Math.log(bjajW)/Math.log(2));
	console.log("mjW: "+mjW);
	var auxW = (bjW-ajW)/(Math.pow(2,mjW)-1);
	console.log("auxW: "+auxW);

	//Z
	var bjajZ = (bjZ-ajZ)*(Math.pow(10,2));
	console.log("Z bj-aj: "+bjajZ);
	var mjZ = Math.ceil(Math.log(bjajZ)/Math.log(2));
	console.log("mjZ: "+mjZ);
	var auxZ = (bjZ-ajZ)/(Math.pow(2,mjZ)-1);
	console.log("auxZ: "+auxZ);


	console.log("\n\n");
	vectoresArray = new Array(vectores);
	xArray = new Array(vectores);
	yArray = new Array(vectores);
	zArray = new Array(vectores);
	wArray = new Array(vectores);

	for (var i = 0; i < vectores; i++) {
		vectoresArray[i] = generaVector(mjX,mjY,mjW,mjZ);
		console.log(vectoresArray[i]+", decimal: "+parseInt(vectoresArray[i],2));
		xArray[i] = generaVarable(ajX,vectoresArray[i],auxX,0,mjX);
		console.log("x: "+xArray[i]);
		yArray[i] = generaVarable(ajY,vectoresArray[i],auxY,mjX,mjX+mjY);
		console.log("y: "+yArray[i]);
		wArray[i] = generaVarable(ajW,vectoresArray[i],auxW,mjX+mjY,mjX+mjY+mjW);
		console.log("W: "+wArray[i]);
		zArray[i] = generaVarable(ajZ,vectoresArray[i],auxZ,mjX+mjY,mjX+mjY+mjW,mjX+mjY+mjW+mjZ-1);
		console.log("Z: "+zArray[i]);

		console.log("\nEvaluando... ");
		//Evaluando en R1
		var r1 = (1*xArray[i]) + (1*wArray[i]) ;
		console.log( r1 +">="+80)
		//Evaluando en R2
		r1 = (1*xArray[i]) + (1*yArray[i])   (1*zArray[i]) ;
		console.log( r1 +">="+125)
		//Evaluando en R3
		r1 = (2*yArray[i]) - (1*wArray[i]) + (1*zArray[i]) ;
		console.log( r1 +"<="+250)
		//Evaluando en R4
		r1 = (1*xArray[i]) ;
		console.log( r1 +">="+20)
		console.log("\n\n");

	}

}


function generaVector(largo1,largo2,largo3,largo4) {
		vector = new Array(0);
		for (var i = 0; i < largo1 ; i++) {
			vector.push(getAleatorio(0,1));
		}
		for (var i = 0; i < largo2 ; i++) {
			vector.push(getAleatorio(0,1));
		}
		for (var i = 0; i < largo3 ; i++) {
			vector.push(getAleatorio(0,1));
		}
		for (var i = 0; i < largo4 ; i++) {
			vector.push(getAleatorio(0,1));
		}
		return vector.toString().replace(/,/g, '');
	
}

function getAleatorio(minimo,maximo){
	return Math.round(Math.random() * (maximo - minimo) + minimo);
}

function generaVarable(aj,binario,aux,start,end) {
	var binario = binario.substring(start,end);
	var digit = parseInt(binario, 2);
	return (digit*aux)+parseInt(aj);
}

