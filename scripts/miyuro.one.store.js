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
    const DOMund = document.querySelector('#unidades');
    const DOMundT = document.querySelector('#unidadesT');
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
const miSkuDiv = document.createElement('div'); miSkuDiv.classList.add('item-list__item','ml-050','mr-010','mobile-2-2' );
    const miSkuDivImgH = document.createElement('div'); miSkuDivImgH.classList.add('item-list__header' );
            const miSkuDivImg = document.createElement('div'); miSkuDivImg.classList.add('item-list__img-wrap','offer-image' );
                const miSkuAImg = document.createElement('a'); miSkuAImg.classList.add('no-context-menu'); miSkuAImg.href=info.imagen;
                    const miSkuImg = document.createElement('img'); miSkuImg.classList.add('offer-image__content','ls-is-cached','lazyloaded' );
                        miSkuImg.setAttribute('width','100');
                        miSkuImg.setAttribute('src', info.imagen);
                        miSkuAImg.appendChild(miSkuImg);
                miSkuDivImg.appendChild(miSkuAImg);
            miSkuDivImgH.appendChild(miSkuDivImg);  
            const miSkuPrecioDiv = document.createElement('div'); miSkuPrecioDiv.classList.add('marker','marker-arrow' );
                const miSkuPrecioSpan = document.createElement('span'); miSkuPrecioSpan.textContent = `${divisa} ${info.precio.toFixed(2)}  `;
                miSkuPrecioDiv.appendChild(miSkuPrecioSpan);
            miSkuDivImgH.appendChild(miSkuPrecioDiv);
            const miSkuTagSpan = document.createElement('span'); miSkuTagSpan.classList.add('label-mark__tag' );
                const miSkuTag = document.createElement('span');  miSkuTag.classList.add('label-mark__tag-text' );miSkuTag.textContent = `${info.disponible}`;
                    miSkuTagSpan.appendChild(miSkuTag);
            miSkuDivImgH.appendChild(miSkuTagSpan);        
            const miSkuBtnDiv = document.createElement('div');miSkuBtnDiv.classList.add( 'markerbtn' );miSkuBtnDiv.style="float: right";
                const miSkuBtnAdd = document.createElement('button');miSkuBtnAdd.classList.add('btn', 'btn-primary');miSkuBtnAdd.textContent = 'Añadir';                
                        miSkuBtnAdd.setAttribute('add', info.id);miSkuBtnAdd.addEventListener('click', AddSkuLista);
                        miSkuBtnDiv.appendChild(miSkuBtnAdd); 
            miSkuDivImgH.appendChild(miSkuBtnDiv); 
    miSkuDiv.appendChild(miSkuDivImgH); 
    const miSkuFootDiv = document.createElement('div'); miSkuFootDiv.classList.add('item-list__body' );
       /* const miSkuFootBrandDiv = document.createElement('div'); miSkuFootBrandDiv.classList.add('item-list__logo' );
            const miSkuFootBrandImg = document.createElement('img');miSkuFootBrandImg.classList.add('lazyloaded' ); miSkuFootBrandImg.href=info.brand; //data-srcset="https://mi....">
            miSkuFootBrandDiv.appendChild(miSkuFootBrandImg); 
        miSkuFootDiv.appendChild(miSkuFootBrandDiv); */
            const miSkuFootNameDiv = document.createElement('div'); miSkuFootNameDiv.classList.add('item-list__body-wrap' );
             /*   const miSkuNameFirstDiv = document.createElement('div'); miSkuNameFirstDiv.classList.add( 'item-list__title')
                const miSkuTitleA = document.createElement('a'); miSkuTitleA.textContent = '***'; //info.nombre;miSkuTitleA.href = info.ofertaen;
                    miSkuNameFirstDiv.appendChild(miSkuTitleA); 
                miSkuFootNameDiv.appendChild(miSkuNameFirstDiv); */

                const miSkuNameSecondDiv = document.createElement('div'); miSkuNameSecondDiv.classList.add( 'item-list__text')
                const miSkuSecondA = document.createElement('a'); miSkuSecondA.textContent = info.nombre;miSkuSecondA.href = info.ofertaen;
                miSkuNameSecondDiv.appendChild(miSkuSecondA); 
                miSkuFootNameDiv.appendChild(miSkuNameSecondDiv); 

        miSkuFootDiv.appendChild(miSkuFootNameDiv);  
    miSkuDiv.appendChild(miSkuFootDiv);  

        const miitemsep = document.createElement('hr'); miitemsep.classList.add('featurette-divider');
          miSkuDiv.appendChild(miitemsep);
          miNodo.appendChild(miSkuDiv);
          DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function AddSkuLista(evento) {
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
            //miNodo.classList.add('row-over' );
            
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

                       const midivdes = document.createElement('td'); 
                             midivdes.classList.add('row-over', 'txt-product-container');
                        const mispandes = document.createElement('span'); 
                            mispandes.textContent= `${miItem[0].nombre} `  ;
                            midivdes.appendChild(mispandes);
                     /**/        const mispandespre = document.createElement('div');
                                mispandespre.classList.add('cart-item-total' );
  //Para precio variable                              
 //                               let price = prompt("Precio=", `${(miItem[0].precio).toFixed(2)}` ); // `${divisa} ${miItem[0].precio.toFixed(2)}`
 let price =`${(miItem[0].precio).toFixed(2)}`;
                                mispandespre.textContent= `${divisa} ${(1 * price).toFixed(2)}`  ;
                                //midivdes.appendChild(mispandespre);
                                miTdProd.appendChild(mispandespre); /**/
                 //miTdProd.appendChild(midivdes);  
                 miNodo.appendChild(midivdes); 
                  //  miTdProd.appendChild(midivProd);

                    // Precioconst miNododivPrecio = document.createElement('div'); miNododivPrecio.classList.add('Precio-product-container');
  

            const miTdTotal = document.createElement('td');                
               // miTdTotal.classList.add('d-flex' );
              //  miTdTotal.wid="28%"
            const miDivTotal = document.createElement('div'); 
                miDivTotal.classList.add('cart-item-total');
                const miDivTotalspan = document.createElement('span');
                miDivTotalspan.classList.add('cart-item-total' );
                miDivTotalspan.textContent= `${divisa}${(numeroUnidadesItem * price).toFixed(2)}`  ;
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
            //miTdTotal.appendChild(miDivBtn);
            miTdProd.appendChild(miDivBtn);

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
        DOMund.textContent=lista.length;
        DOMundT.textContent='Items ' + lista.length;
        DOMtotalp.textContent =DOMtotal.textContent ;
        document.querySelector('#totalapagar').textContent = DOMtotalp.textContent;
        document.querySelector('#totalapagarT').textContent = DOMtotalp.textContent;
        
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
        //localStorage.clear();
        localStorage.removeItem('lista');
        localStorage.removeItem('custName');
        document.querySelector('#Nombre').value='' ;
    }

    function ListaToLocalStorage () { 
        miLocalStorage.setItem('lista', JSON.stringify(lista)); 
        miLocalStorage.setItem('custName', document.querySelector('#Nombre').value);
 
    }

    function localStorageToLista () {
        // ¿Existe un carrito previo guardado en LocalStorage? 
        if (miLocalStorage.getItem('lista') !== null) {  // Carga la información
            lista = JSON.parse(miLocalStorage.getItem('lista'));
        }// window.alert( document.querySelector('#Nombre').value);
        if (miLocalStorage.getItem('custName') !== null) {  // Carga la información 
            document.querySelector('#Nombre').value =miLocalStorage.getItem('custName');
           
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', limpiarLista);

    // Inicio
    localStorageToLista();
    ListarSku();
    ListaDeCompra();


});

function Getuser(){   //marcador
    localStorage.setItem('custName', document.querySelector('#Nombre').value );
    
   // window.alert(localStorage.getItem('custName') );

}
    function enviarPedido(){//https://stackoverflow.com/questions/17739816/how-to-open-generated-pdf-using-jspdf-in-new-window


        window.jsPDF = window.jspdf.jsPDF;//new jsPDF('l', 'in', [3, 5]);
        var doc = new jsPDF('p', 'cm', [9, 20]);//var doc = new jsPDF('p', 'cm', [9, 20]); 
         //doc.add()                       
            // Source HTMLElement or a string containing HTML.

        var elementHTML = document.querySelector("#pedido"); 
        const custName = document.querySelector('#Nombre');
       // window.alert("#lista2" + custName.value  );
       if(custName.value.length>0){
            doc.html(elementHTML, {
                callback: function(doc) {
                    // Save the PDF
                    doc.save(custName.value +'_Miyuro_One.pdf');
                },
                x: 0.2, //Izquierdo
                y: 0.5, //superior
                width: 8.8, //target width in the PDF document
                windowWidth: screen.width > 400 ? 400 : screen.width //400 //window width in CSS pixels
            });  
        } else{window.alert("Por favor especifique\na nombre de quien va el pedido"  );custName.focus()}

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