var numRestricciones = 0;
var coefFuncObjDec = []; 

function addReestriccion() { 
	if (numRestricciones<5) {
		numRestricciones++;
		$('#div_reestricciones').append(
		'<div id="reestriccion_'+numRestricciones+'" class="input-group mb-3  input-group sm">'+
			'<div class="input-group-prepend">'+
				'<span class="input-group-text">R'+numRestricciones+' = </span>'+
			'</div>'+
			'<input class="form-control" type="number" id="r'+numRestricciones+'a" value="0">'+
			'<div class="input-group-prepend">'+
				'<span class="input-group-text">a</span>'+
			'</div>'+
			'<input class="form-control" type="number" id="r'+numRestricciones+'b" value="0">'+
			'<div class="input-group-prepend">'+
				'<span class="input-group-text">b</span>'+
			'</div>'+
			'<input class="form-control" type="number" id="r'+numRestricciones+'c" value="0">'+
			'<div class="input-group-prepend">'+
				'<span class="input-group-text">c</span>'+
			'</div>'+
			'<input class="form-control" type="number" id="r'+numRestricciones+'d" value="0">'+
			'<div class="input-group-prepend">'+
				'<span class="input-group-text">d</span>'+
			'</div>'+
			'<select class="form-control" id="r'+numRestricciones+'operation">'+
				'<option value="greater"><=</option>'+
				'<option value="lower">>=</option>'+
			'</select>'+
			'<input class="form-control" type="number" id="r'+numRestricciones+'val" value="0">'+
			'<div class="input-group-append">'+
				'<button class="btn btn-success" onclick="deleteRestriccion('+numRestricciones+');">-</button>'+
			'</div>'+
		'</div>');
	}
}

function deleteRestriccion(num) {
	$("#reestriccion_"+num).remove();
	numRestricciones--;
}

function resolverSimplex3() {
	var coefFuncObjDec = []; 
	if (numRestricciones<2) {
		$("#alertStatus").attr('class', 'alert alert-danger');
		$("#alertStatus").html("<strong>Error!</strong> Es necesario agregar al menos dos reestricciones");
		$("#alertStatus").show();
	}else{
		$("#alertStatus").attr('class', 'alert alert-success');
		$("#alertStatus").html("<strong>Success!</strong> Perfecto");
		$("#alertStatus").show();
		var a = document.getElementById("a").value; 
		var b = document.getElementById("b").value;
		var c = document.getElementById("c").value;
		var d = document.getElementById("d").value;
		//Llenamos coeficionestes de funcion Objetivo
		coefFuncObjDec.push(a);
		coefFuncObjDec.push(b);
		coefFuncObjDec.push(c);
		coefFuncObjDec.push(d);
		console.log(coefFuncObjDec);
	}
	setTimeout(function(){ $("#alertStatus").hide(); }, 2000);
}