function selectKind() {
	var kindProblem = document.getElementById("kindProblem").value;
	if (kindProblem == "ec") { 						//Es ecuacion
		$("#optEcuacionSection").fadeIn();
		$("#optFuncionObjetivoSection").hide();
		kindProblem = "ec";
	}else{ 											//Funcion objetivo con Reestricciones
		$("#optFuncionObjetivoSection").fadeIn();
		$("#optEcuacionSection").hide();
		kindProblem = "fo"
	}
}

function addVarFO() {
	console.log("[OK] Agregando variable");
	$("#variablesFO").append(
		'<input class="form-control" type="number" id="var'+fo_num_variables+'" value="0">'+
		'<div class="input-group-prepend">'+
			'<span class="input-group-text">'+abecedario[fo_num_variables]+'</span>'+
		'</div>');
	fo_num_variables++;
}

function addReestriccion() { 
	var cadenaVars = "";
	for (var i = 0; i < fo_num_variables; i++) {
		cadenaVars+='<input class="form-control" type="number" id="r'+numRestricciones+'_'+i+'" value="0">'+
		'<div class="input-group-prepend">'+
			'<span class="input-group-text">'+abecedario[i]+'</span>'+
		'</div>'
	}
	$('#div_reestricciones').append(
	'<div id="reestriccion_'+numRestricciones+'" class="input-group mb-3  input-group sm">'+
		'<div class="input-group-prepend">'+
			'<span class="input-group-text">R'+numRestricciones+' = </span>'+
		'</div>'+
		cadenaVars+
		'<select class="form-control" id="r'+numRestricciones+'operation">'+
			'<option value="<="><=</option>'+
			'<option value=">=">>=</option>'+
			'<option value="==">=</option>'+
		'</select>'+
		'<input class="form-control" type="number" id="r'+numRestricciones+'val" value="0">'+
		'<div class="input-group-append">'+
			'<button class="btn btn-success" onclick="deleteRestriccion('+numRestricciones+');">-</button>'+
		'</div>'+
	'</div>');
	numRestricciones++;
}

function deleteRestriccion(num) {
	$("#reestriccion_"+num).remove();
	numRestricciones--;
}



function selectData() {
	var fx = document.getElementById("ecuacion").value;
	if (fx.includes("x") || fx.includes("y")) { 
		$("#dataEcuacionSection").fadeIn();
	}else{
		$("#alertStatus").attr('class', 'alert alert-danger');
		$("#alertStatus").html("<strong>Error!</strong> Ingrese al menos 1 variable en la ecuacion");
		$("#alertStatus").fadeIn();
		setTimeout(function(){ $("#alertStatus").fadeOut(); }, 2000);
	}
}


function ocultarDiv(id) {
	$("#"+id).fadeOut();
	$("#"+id+"Btn").html("Mostrar");
	$("#"+id+"Btn").attr("onclick","mostrarDiv('"+id+"')");
}


function mostrarDiv(id) {
	$("#"+id).fadeIn();
	$("#"+id+"Btn").html("Ocultar");
	$("#"+id+"Btn").attr("onclick","ocultarDiv('"+id+"')");
}














