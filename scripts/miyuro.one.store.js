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
            // Imagen
            const miNodoImagen = document.createElement('img');
           // miNodoImagen.classList.add('col','col-xs-12' );
            miNodoImagen.style.height="15%"
            miNodoImagen.style.width ="15%"            
            miNodoImagen.setAttribute('src', info.imagen);

            // Descripción del Producto
            const miNodoTitle = document.createElement('a');
            miNodoTitle.classList.add('col','col-md-4' );
            miNodoTitle.textContent = info.nombre;
            miNodoTitle.href = info.ofertaen;
            // Precio
            const miNodoPrecio = document.createElement('div');
            miNodoPrecio.classList.add('col','col-md-4','card-precio');
            miNodoPrecio.textContent = `Precio: ${divisa} ${info.precio.toFixed(2)}  `; //ofertaen
            //<p class="mb-0">Precio: <a href="${info.ofertaen}"> $divisa${info.precio}${divisa}</a>.</p>
            // Boton
            const miNodoDivBtn = document.createElement('div');
            miNodoDivBtn.classList.add('col' ,'col-md-12'); 

            const miNodoBtnAdd = document.createElement('button');
            miNodoBtnAdd.classList.add('btn', 'btn-primary','col-md-4');
            miNodoBtnAdd.textContent = '+';
            miNodoBtnAdd.setAttribute('add', info.id);
            miNodoBtnAdd.addEventListener('click', AddSkuLista);

            /*const miNodoBtnDis = document.createElement('button');
            miNodoBtnDis.classList.add('btn', 'btn-primary');
            miNodoBtnDis.textContent = '-';
            miNodoBtnDis.setAttribute('menos', info.id);
            miNodoBtnDis.addEventListener('click', AddSkuLista);

            miNodoDivBtn.appendChild(miNodoBtnDis);*/
            miNodoDivBtn.appendChild(miNodoBtnAdd);
            miNodoPrecio.appendChild(miNodoDivBtn);
            // Insertamos
            const miitemsep = document.createElement('hr');
            miitemsep.classList.add('featurette-divider');
            miNodoCardBody.appendChild(miitemsep);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            //miNodoCardBody.appendChild(miNodoDivBtn);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function AddSkuLista(evento) { //        window.alert("#changeQtySku evento.target" +  '='    );
        lista.push(evento.target.getAttribute('add'))   //marcador
        ListaDeCompra();// Actualizamos el carrito
        
        ListaToLocalStorage();// Actualizamos el LocalStorage        
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
            const numeroUnidadesItem = lista.reduce((qty, itemId) => {
               return itemId === item ? qty += 1 : qty; //changeQty=1
            }, 0);
            const miNodo = document.createElement('tr');
           // miNodo.classList.add('d-flex' );
            
            // Producto Descripcion
            const miTdProd = document.createElement('td');
            miTdProd.classList.add('d-flex' );
                  const midivProd = document.createElement('div'); 

                    // Imagen
                    const midivimg = document.createElement('div');
                        midivimg.classList.add('product-img-container');//, 'col-sm-7', 'col-md-8', 'col-lg-9', 'p-0'
                        const carimg = document.createElement('img');
                        carimg.style.width='35px';
                        carimg.style.height='35px'                   
                        carimg.setAttribute('src', `${miItem[0].imagen}`);
                        midivimg.appendChild(carimg);                    
                        miTdProd.appendChild(midivimg);

                        const midivdes = document.createElement('div'); 
                            midivdes.classList.add('col-sm-12');
                        midivdes.classList.add('txt-product-container');
                        const mispandes = document.createElement('span'); 
                            mispandes.textContent= `${miItem[0].nombre} `  ;
                            midivdes.appendChild(mispandes);
                            const mispandespre = document.createElement('span');
                                mispandespre.classList.add('cart-item-description' );
                                mispandespre.textContent= `${divisa} ${miItem[0].precio.toFixed(2)}`  ;
                                midivdes.appendChild(mispandespre);
                 miTdProd.appendChild(midivdes);  

                  //  miTdProd.appendChild(midivProd);

                    // Precioconst miNododivPrecio = document.createElement('div'); miNododivPrecio.classList.add('Precio-product-container');
  

            const miDivTotal = document.createElement('td');
                const miDivTotalspan = document.createElement('span');
                miDivTotalspan.classList.add('cart-item-description' );
                miDivTotalspan.textContent= `${divisa}${(numeroUnidadesItem * miItem[0].precio).toFixed(2)} `  ;
            miDivTotal.appendChild(miDivTotalspan);


           // miNodo.textContent 

           const miTdBtn = document.createElement('td');
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn','btn-primary');
            miBoton.textContent = '-'; //miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.setAttribute('add', item);
            miBoton.addEventListener('click', BorraSkuLista);
                const miInputBox = document.createElement('input');
                miInputBox.classList.add('cart-item-quantity');  
               // miInputBox.type='number';
                miInputBox.value=numeroUnidadesItem;
             //   miInputBox.pattern('[0-9]*');//<input aria-label="Cantidad" class="quantity-selector__value" pattern="[0-9]*" data-current-value="1" data-line-id="43342411399331" value="1" size="2"></input>
            
                const miBotonAdd = document.createElement('button');
            miBotonAdd.classList.add('btn','btn-primary');
            miBotonAdd.textContent = '+'; //miBotonAdd.style.marginLeft = '1rem';
            miBotonAdd.dataset.item = item; //      window.alert("#itemlista" + item );
            miBotonAdd.setAttribute('add', item);
            miBotonAdd.addEventListener('click', AddSkuLista);
            

            miTdBtn.appendChild(miBoton);
            miTdBtn.appendChild(miInputBox);
            miTdBtn.appendChild(miBotonAdd); 
            

            // Mezclamos nodos
           // miNodo.appendChild(midivimg);
            miNodo.appendChild(miTdProd);
            miNodo.appendChild(miTdBtn);
            miNodo.appendChild(miDivTotal);
            //miNodo.appendChild(miBoton);
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
       const tlista  =  lista.filter((listaId) => {
            return listaId == id;
        });
       // window.alert("#BorraSkuLista " + id +  "=> " + tlista[0]);
    
        lista = lista.filter((listaId) => {
            return listaId !== id;
        });
        
        lista.push(tlista[0]);
        // volvemos a renderizar
        ListaDeCompra();
        // Actualizamos el LocalStorage
        ListaToLocalStorage();

    }
    //function changeQtySku(evento) { 
    function ResQtySkuLista(evento) {    //     window.alert("#ResQtySkuLista evento.target" +  '=' + evento.target.getAttribute('add')   );
        lista.push(evento.target.getAttribute('add'))   //marcador

        //lista.reduce((qty, itemId
        const id = evento.target.dataset.item;     
        // Borramos todos los productos     
           //lista(id).qty=lista(id).qty-1;
           window.alert("#ResQtySkuLista " + id +  "=> " + lista );
           const re = lista.splice(index,1);
         //  lista = lista.filter((itemId) => {
          //  return itemId !== id;
     //   });


        ListaDeCompra();// Actualizamos el carrito
        
        ListaToLocalStorage();// Actualizamos el LocalStorage        
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