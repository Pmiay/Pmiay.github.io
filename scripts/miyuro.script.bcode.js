document.addEventListener("DOMContentLoaded", () => {
	let docContent = [];
    const DOMlista = document.querySelector('#lista');
	const $resultados = document.querySelector("#resultado");
    const miLocalStorage = window.localStorage;

	Quagga.init({
		inputStream: {
			constraints: {
				width: 1920,
				height: 1080,
			},
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("En Funcionamiento");
		Quagga.start();
	});

	Quagga.onDetected((data) => {
		var code = data.codeResult.code;
		$resultados.textContent = code; //data.codeResult.code;
				
		savereader (code);
		beep();
		// Imprimimos todo el data para que puedas depurar
		console.log(data);
	});

function beep() {
	var bip = new Audio('./assets/sound/bipOne.mp3');
	bip.play();
}

function savereader(code){  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_json_parse
	var qty = document.getElementById("qty").value;
/* 	let docContent = '{"lecturas":[' +
	'{"bcode":"' + code + '","qty":' + qty + ',"now":"dd-mm-yy 00:00" },' +
	'{"bcode":"' + code + '",qty:' + qty + ',"now":"dd-mm-yy 00:00" }'; */
	docContent.push( code); //'{"bcode":"' + code + '",qty:' + qty + ',"now":"dd-mm-yy 00:00" }');

	const lectdata =  JSON.stringify(docContent);
	document.getElementById("lecturas").innerHTML = lectdata; 
}
function ToStorage () { 
	miLocalStorage.setItem('lecturas', JSON.stringify(docContent));
}

function FromStorage () {
	// ¿Existe un carrito previo guardado en LocalStorage? 
	if (miLocalStorage.getItem('lecturas') !== null) {  // Carga la información
		docContent = JSON.parse(miLocalStorage.getItem('lecturas'));
	}
}
	//starting
	FromStorage()


});
/* let docContent = '{"lecturas":[' +
	'{"bcode":"00000","qty":qty,"now":"dd-mm-yy 00:00" },' */


function add(){
	text. document.getElementById("demo").value
}