//const miTitulo = document.querySelector('h1');
//miTitulo.textContent = '¡Hola www.miyuro.one!';

document.querySelector('h1').onclick = 
    function() {alert('¡Ouch! ¡Deja de pincharme!');}

/*let img01 = document.querySelector('img');
let html01 = document.querySelector('html');
img01.onclick = function() {alert('¡Ouch! ¡Deja de pincharme!');}
*///html01.onclick = function() {alert('¡Ouch! ¡Deja de pincharme!');}

let miImage = document.querySelector('img');
miImage.onclick = function () {
    let miSrc = miImage.getAttribute('src');
    if (miSrc === 'images/Img01.jpg') {
      miImage.setAttribute('src','images/Img02.jpg');
    } else{ 
    if(miSrc === 'images/Img02.jpg') {
      miImage.setAttribute('src', 'images/Img03.jpg');
    } else {
        miImage.setAttribute('src', 'images/Img01.jpg');
      }
    }
}

let miBoton = document.querySelector('button'); // sin id toma el primero
let miTitulo = document.querySelector( 'h1');
function estableceNombreUsuario() {
    //temp
    miTitulo.innerHTML = 'Deleites Miyuro' 
    /*let miNombre = prompt('Introduzca su nombre.'); 
    if(!miNombre) {
      //estableceNombreUsuario(); //temp
    } else {
      localStorage.setItem('nombre', miNombre);
      miTitulo.innerHTML = 'Deleites Miyuro, ' + miNombre;
    }*/
  }
if (!localStorage.getItem('nombre')) {
    estableceNombreUsuario();
}
else {
    let nombreAlmacenado = localStorage.getItem('nombre');
    miTitulo.textContent = 'Deleites Miyuro, ' + nombreAlmacenado; 
}
miBoton.onclick = function() {
    estableceNombreUsuario();
}

// Aquí Voy
//https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/JavaScript_basics

// el servidor web
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
