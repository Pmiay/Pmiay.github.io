let docContent = [];
document.addEventListener("DOMContentLoaded", () => {
	
    const DOMlista = document.querySelector('#lista');
	const $resultados = document.querySelector("#resultado");
    const miLocalStorage = window.localStorage;

 
	function beep() {
		window.alert("beep");
		var psbeep = (function beep() { //var bip = new Audio('./assets/sound/bipOne.mp3');
		  //var bip = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
			var bip = new Audio("data:audio/wav;base64,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");
;			return function() {     
				bip.play(); 
			}
		})();
		
		psbeep();
	}
		
	function savereader(code){  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_json_parse
		DOMlista.textContent = '';
		var qty = document.getElementById("qty").value;

	//	window.alert("savereader2" + code);
	/* 	let docContent = '{"lecturas":[' +
		'{"bcode":"' + code + '","qty":' + qty + ',"now":"dd-mm-yy 00:00" },' +
		'{"bcode":"' + code + '",qty:' + qty + ',"now":"dd-mm-yy 00:00" }'; */
		docContent.push(code); //'{"bcode":"' + code + '",qty:' + qty + ',"now":"dd-mm-yy 00:00" }');
	
		const lectdata =  JSON.stringify(docContent);
		document.getElementById("lecturas").innerHTML = lectdata; 


		const miNodo = document.createElement('div');
		const midivdes = document.createElement('td'); 
		midivdes.classList.add('row-over', 'txt-product-container');
  		 const mispandes = document.createElement('span'); 
	   mispandes.textContent= `${lectdata} ${qty}`  ;
	   midivdes.appendChild(mispandes);

		miNodo.appendChild(midivdes);
		DOMlista.appendChild(miNodo);
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
	FromStorage();
	
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
			//console.log(data);
	});




});
/* let docContent = '{"lecturas":[' +
	'{"bcode":"00000","qty":qty,"now":"dd-mm-yy 00:00" },' */

   

			
function add(){
	text. document.getElementById("demo").value
}