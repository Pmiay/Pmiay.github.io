function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


const elementosBase = miyuro;
document.addEventListener('DOMContentLoaded', () => {

    let lista = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMlista = document.querySelector('#lista');
    const DOMtotal = document.querySelector('#total');
    const DOMtotalp = document.querySelector('#totalp');
    const DOMbotonVaciar = document.querySelector('#btn-clear');
    const miLocalStorage = window.localStorage;

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function ListarSku() {
        elementosBase.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
           // miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('row', 'card-body' );
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('col','col-md-5', 'card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('col','col-xs-12' );
            miNodoImagen.style.height="15%"
            miNodoImagen.style.width ="15%"
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('h3');
            miNodoPrecio.classList.add('col','col-md-5','card-text');
            miNodoPrecio.textContent = `Precio: ${info.precio.toFixed(2)}${divisa}`; //ofertaen
            //<p class="mb-0">Precio: <a href="${info.ofertaen}"> $divisa${info.precio}${divisa}</a>.</p>
            // Boton
            const miNodoDivBtn = document.createElement('h5');
            miNodoDivBtn.classList.add('col' ,'col-md-12'); 

            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', addSku);
            miNodoDivBtn.appendChild(miNodoBoton);
            // Insertamos
            const miitemsep = document.createElement('hr');
            miitemsep.classList.add('featurette-divider');
            miNodoCardBody.appendChild(miitemsep);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoDivBtn);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function addSku(evento) {
        // Anyadimos el Nodo a nuestro lista
        lista.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito
        ListaDeCompra();
        // Actualizamos el LocalStorage
        ListaToLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function ListaDeCompra() {
        DOMlista.textContent = '';
        const listaSinDuplicados = [...new Set(lista)];
        listaSinDuplicados.forEach((item) => {
            const miItem = elementosBase.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = lista.reduce((total, itemId) => {
               return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('span');
            miNodo.classList.add('d-flex');

           // Imagen
           const midivimg = document.createElement('div');
           midivimg.classList.add('product-img-container', 'col-xs-12', 'col-sm-7', 'col-md-8', 'col-lg-9', 'p-0');
           const carimg = document.createElement('img');
          carimg.style.width='35px';
          carimg.style.height='35px'                   
           carimg.setAttribute('src', `${miItem[0].imagen}`);
           midivimg.appendChild(carimg);
            // Descripcion
            const miNododivtxt = document.createElement('div');
            miNododivtxt.classList.add('txt-product-container', 'col-xs-12', 'col-sm-7', 'col-md-8', 'col-lg-9', 'p-0');
                const mispandes = document.createElement('span');
                mispandes.classList.add('cart-item-description' );
                mispandes.textContent= `${miItem[0].nombre} `  ;
                miNododivtxt.appendChild(mispandes);

            // Precio
            const miNododivPrecio = document.createElement('div');
            miNododivPrecio.classList.add('Precio-product-container', 'col-xs-12', 'col-sm-7', 'col-md-8', 'col-lg-9', 'p-0');
                const mispandespre = document.createElement('span');
                mispandespre.classList.add('cart-item-description' );
                mispandespre.textContent= `${numeroUnidadesItem} x ${miItem[0].precio.toFixed(2)} = ${divisa}${(numeroUnidadesItem * miItem[0].precio).toFixed(2)} `  ;
                miNododivPrecio.appendChild(mispandespre);

           // miNodo.textContent 
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'col-sm-2');
            miBoton.textContent = 'Quitar';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', BorraSkuLista);
            // Mezclamos nodos
            miNodo.appendChild(midivimg);
            miNodo.appendChild(miNododivtxt);
            miNodo.appendChild(miNododivPrecio);
            miNodo.appendChild(miBoton);
            DOMlista.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = Total();
        DOMtotalp.textContent =DOMtotal.textContent ;
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function BorraSkuLista(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        lista = lista.filter((listaId) => {
            return listaId !== id;
        });
        // volvemos a renderizar
        ListaDeCompra();
        // Actualizamos el LocalStorage
        ListaToLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function Total() {
        // Recorremos el array del lista
        return lista.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = elementosBase.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function limpiarLista() {
        // Limpiamos los productos guardados
        lista = [];
        // Renderizamos los cambios
        ListaDeCompra();
        // Borra LocalStorage
        localStorage.clear();

    }

    function ListaToLocalStorage () {
        miLocalStorage.setItem('lista', JSON.stringify(lista));
    }

    function localStorageToLista () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('lista') !== null) {
            // Carga la información
            lista = JSON.parse(miLocalStorage.getItem('lista'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', limpiarLista);

    // Inicio
    localStorageToLista();
    ListarSku();
    ListaDeCompra();


});


    function enviarPedido(){//https://stackoverflow.com/questions/17739816/how-to-open-generated-pdf-using-jspdf-in-new-window


        window.jsPDF = window.jspdf.jsPDF;//new jsPDF('l', 'in', [3, 5]);
         var doc = new jsPDF('p', 'cm', [9, 20]); 
         //doc.add()                       
            // Source HTMLElement or a string containing HTML.

        var elementHTML = document.querySelector("#pedido");
//window.alert("#lista2" + elementHTML );
        doc.html(elementHTML, {
            callback: function(doc) {
                // Save the PDF
                doc.save('Pedido_Miyuro_One.pdf');
            },
            x: 0.02,
            y: 0.02,
            width: 12, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
        });   
/*That code let you create a Blob object inside the browser and show it in the new tab.
pdf.addHTML($('#content'), y, x, options, function () {
var blob = pdf.output("blob");
window.open(URL.createObjectURL(blob));
});
Search in jspdf.js this:
if(type == 'datauri') {
document.location.href ='data:application/pdf;base64,' + Base64.encode(buffer);
}
Add :
if(type == 'datauriNew') {   
window.open('data:application/pdf;base64,' + Base64.encode(buffer));
}
call this option 'datauriNew' Saludos ;)
using javascript you can send the generated pdf to a new window using the following code.
var string = doc.output('datauristring');

var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"

var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();
*/
    }