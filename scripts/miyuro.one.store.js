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
            const miNodo = document.createElement('row');
                miNodo.classList.add('column' );
            // Body
            const miSkuBody = document.createElement('div');
             //   miSkuBody.classList.add('d-flex');
                miSkuBody.classList.add( 'item-list__item','item-list__image-and-text','ml-050','mr-010','mobile-2-2' );

                // Imagen  
                const miSkuDivImgLink = document.createElement('a');  
                        miSkuDivImgLink.href=info.imagen;

                const miSkuDivImgHead = document.createElement('div');  
                    miSkuDivImgHead.classList.add( 'item-list__header');
                const miSkuDivImg = document.createElement('div');  
                    miSkuDivImg.classList.add('item-list__img-wrap','offer-image' ); // , 'item-sku-img-wrap', 'offer-image'
                const miSkuImagen = document.createElement('img');
                    miSkuImagen.classList.add('offer-image__content', 'ls-is-cached', 'lazyloaded' );
                   // miSkuImagen.style='width:80%'
            //  miSkuImagen.style.height='75px';
            // miSkuImagen.style.width ='75px';            
                miSkuImagen.setAttribute('src', info.imagen);
                miSkuDivImgLink.appendChild(miSkuImagen);
                miSkuDivImg.appendChild(miSkuDivImgLink);    

                const miSkuDivImgCont = document.createElement('div');  
                const miSkuDivPrecio = document.createElement('div');  
                    miSkuDivPrecio.classList.add( 'marker','marker-arrow'); 
                    const miSkuDivPreciospan = document.createElement('span');  
                        miSkuDivPreciospan.textContent = `${divisa} ${info.precio.toFixed(2)}  `;
                        miSkuDivPrecio.appendChild(miSkuDivPreciospan);// <span>$1.00</span>

                const miSkuspanImgLabel = document.createElement('span');  
                        miSkuspanImgLabel.classList.add('label-mark__tag');
                const miSkuspanImgLabelTxt = document.createElement('span');  
                        miSkuspanImgLabelTxt.classList.add('label-mark__tag-text');
                    miSkuspanImgLabelTxt.textContent = `${info.disponible}`; 
                     miSkuspanImgLabel.appendChild(miSkuspanImgLabelTxt);   
            /*<span class="label-mark__tag">  <span class="label-mark__tag-text">Disponible</span>  </span> 
*/  // Boton
                const miNodoDivBtn = document.createElement('div');
                    miNodoDivBtn.classList.add( 'markerbtn' ); 

                const miNodoBtnAdd = document.createElement('button');
                miNodoBtnAdd.classList.add('btn', 'btn-primary');
                miNodoDivBtn.style="float: right";

                Fuente: https://www.iteramos.com/pregunta/58780/coloca-un-boton-alineado-a-la-derecha";
                miNodoBtnAdd.textContent = 'Agregar';
                
                miNodoBtnAdd.setAttribute('add', info.id);
                miNodoBtnAdd.addEventListener('click', AddSkuLista);
                miNodoDivBtn.appendChild(miNodoBtnAdd); 
                
                miSkuDivImgCont.appendChild(miSkuDivImg);  
                miSkuDivImgCont.appendChild(miSkuDivPrecio); 
                miSkuDivImgCont.appendChild(miNodoDivBtn);
                miSkuDivImgCont.appendChild(miSkuspanImgLabel);  
                miSkuDivImgHead.appendChild(miSkuDivImgCont);  
 

 
    
                // Descripción del Producto
                const midivTitle = document.createElement('div');  
                    midivTitle.classList.add( 'item-list__title','item-list__body','item-list__body-wrap');//'item-sku-text'); 
                    const miNodoTitle = document.createElement('a');
        // miNodoTitle.classList.add('col','col-md-4' );//col-md-4 card-precio
                miNodoTitle.textContent = info.nombre;
                miNodoTitle.href = info.ofertaen;
                midivTitle.appendChild(miNodoTitle);    
            /* // Precio
                const miNodoPrecio = document.createElement('div');
                miNodoPrecio.classList.add('col','col-md-4','card-precio');
                miNodoPrecio.textContent = `Precio: ${divisa} ${info.precio.toFixed(2)}  `; //ofertaen
                //<p class="mb-0">Precio: <a href="${info.ofertaen}"> $divisa${info.precio}${divisa}</a>.</p>
            */  
            // Insertamos
                const miitemsep = document.createElement('hr');
                miitemsep.classList.add('featurette-divider');
                miSkuBody.appendChild(miitemsep);
                miSkuBody.appendChild(miSkuDivImgHead);
                //miSkuBody.appendChild(miSkuDivPrecio);
                miSkuBody.appendChild(midivTitle);
                //miSkuBody.appendChild(miNodoPrecio);
                //miSkuBody.appendChild(miNodoDivBtn);
                miNodo.appendChild(miSkuBody);
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
                        midivimg.classList.add('card-img');//, 'col-sm-7', 'col-md-8', 'col-lg-9', 'p-0'
                        const carimg = document.createElement('img');
                        carimg.style.width='32px';
                        carimg.style.height='32px';
                        //carimg.style.borderRadius='50%';                   
                        carimg.setAttribute('src', `${miItem[0].imagen}`);
                        midivimg.appendChild(carimg);                    
                        miTdProd.appendChild(midivimg);

                       const midivdes = document.createElement('div'); 
                            midivdes.classList.add('col-sm-12');
                        midivdes.classList.add('txt-product-container');
                        const mispandes = document.createElement('span'); 
                            mispandes.textContent= `${miItem[0].nombre} `  ;
                            midivdes.appendChild(mispandes);
                     /*        const mispandespre = document.createElement('span');
                                mispandespre.classList.add('cart-item-description' );
                                mispandespre.textContent= `${divisa} ${miItem[0].precio.toFixed(2)}`  ;
                                midivdes.appendChild(mispandespre);*/
                 miTdProd.appendChild(midivdes);  

                  //  miTdProd.appendChild(midivProd);

                    // Precioconst miNododivPrecio = document.createElement('div'); miNododivPrecio.classList.add('Precio-product-container');
  

            const miTdTotal = document.createElement('td');                
                //miTdTotal.classList.add('d-flex' );
              //  miTdTotal.wid="28%"
            const miDivTotal = document.createElement('div'); 
                miDivTotal.classList.add('cart-item-total');
                const miDivTotalspan = document.createElement('span');
                miDivTotalspan.classList.add('cart-item-total' );
                miDivTotalspan.textContent= `${divisa}${(numeroUnidadesItem * miItem[0].precio).toFixed(2)} `  ;
            miDivTotal.appendChild(miDivTotalspan);
            miTdTotal.appendChild(miDivTotal);


           // miNodo.textContent 

           const miDivBtn = document.createElement('div'); // ex td
                miDivBtn.style.minWidth="95px";
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn','btn-primary','btn-redondeado');
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
            miBotonAdd.classList.add('btn','btn-primary', 'btn-redondeado');
            miBotonAdd.textContent = '+'; //miBotonAdd.style.marginLeft = '1rem';
            miBotonAdd.dataset.item = item; //      window.alert("#itemlista" + item );
            miBotonAdd.setAttribute('add', item);
            miBotonAdd.addEventListener('click', AddSkuLista);
            

            miDivBtn.appendChild(miBoton);
            miDivBtn.appendChild(miInputBox);
            miDivBtn.appendChild(miBotonAdd); 
            miTdTotal.appendChild(miDivBtn);

            // Mezclamos nodos
           // miNodo.appendChild(midivimg);
            miNodo.appendChild(miTdProd);
           // miNodo.appendChild(miTdBtn);
            miNodo.appendChild(miTdTotal);
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
       
        // Borramos todos los productos   window.alert("#BorraSkuLista " + id +  "=> " + lista);
        for (i = lista.length - 1; i >= 0; i--) {if(lista[i]==id){lista.splice(i,1);break;}
        } 
   /*
        lista = lista.filter((listaId) => {
            return listaId !== id;
        });*/
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
            width: 8.8, //target width in the PDF document
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