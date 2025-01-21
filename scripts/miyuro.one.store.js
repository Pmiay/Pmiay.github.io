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
let grupo ="Todos";

document.addEventListener('DOMContentLoaded', () => {

    let lista = [];
    let pedido = [];
    
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
    * Evento para añadir un producto al carrito de la compra
    */
    function AddSkuLista(evento) {
        //alert(evento.target.getAttribute('pedido'));
        pedido.push(evento.target.getAttribute('pedido'))   //marcador
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
        for (i = lista[0].length - 1; i >= 0; i--) {if(lista[i]==id){lista.splice(i,1);pedido.splice(i,1);break;}
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
        pedido = [];
        // Renderizamos los cambios
        ListaDeCompra();
        // Borra LocalStorage
        //localStorage.clear();
        localStorage.removeItem('lista');
        localStorage.removeItem('pedido');
        localStorage.removeItem('custName');
        document.querySelector('#Nombre').value='' ;
        localStorage.removeItem('contacId');
        document.querySelector('#Whatsapp').value='' ;
    }

    function ListaToLocalStorage () { 
        miLocalStorage.setItem('lista', JSON.stringify(lista)); 
        miLocalStorage.setItem('pedido', JSON.stringify(pedido)); 
        miLocalStorage.setItem('custName', document.querySelector('#Nombre').value); 
        miLocalStorage.setItem('contacId', document.querySelector('#Whatsapp').value);
 
    }

    function localStorageToLista () {
        // ¿Existe un carrito previo guardado en LocalStorage? 
        if (miLocalStorage.getItem('lista') !== null) {  // Carga la información
            if (miLocalStorage.getItem('pedido') !== null) {  // Carga la información
                lista = JSON.parse(miLocalStorage.getItem('lista'));
                pedido = JSON.parse(miLocalStorage.getItem('pedido'));
                window.alert(pedido);
            }else{lista = [];}
        }// window.alert( document.querySelector('#Nombre').value);
        if (miLocalStorage.getItem('custName') !== null) {  // Carga la información 
            document.querySelector('#Nombre').value =miLocalStorage.getItem('custName');           
        }
        if (miLocalStorage.getItem('contacId') !== null) {  // Carga la información 
            document.querySelector('#Whatsapp').value =miLocalStorage.getItem('contacId');           
        }
    }
    function getBase(b,g){
        if(g != "Todos"){ //window.alert(g);
            return b.filter(el => {
                 return el.grupo == g;
             });
         } else{
             return b;   
         }
     }
    // Eventos
    DOMbotonVaciar.addEventListener('click', limpiarLista);

    // Inicio
    localStorageToLista();
    //ListarSku();
    ListaDeCompra();


});

function Getuser(){   //marcador
    localStorage.setItem('custName', document.querySelector('#Nombre').value );    
   // window.alert(localStorage.getItem('custName') );

}
function Getcontac(){   //marcador
    localStorage.setItem('contacId', document.querySelector('#Whatsapp').value );    
   // window.alert(localStorage.getItem('custName') );

}
function getGroup(){   //marcador
    //localStorage.setItem('custName', document.querySelector('#Nombre').value );
    grupo = "Café";
   // ListaDeCompra();
    window.alert(localStorage.getItem('custName') );

}
    function enviarPedido(){//https://stackoverflow.com/questions/17739816/how-to-open-generated-pdf-using-jspdf-in-new-window


        window.jsPDF = window.jspdf.jsPDF;//new jsPDF('l', 'in', [3, 5]);
        var doc = new jsPDF('p', 'cm', [9, 21]) // var doc = new jsPDF('p', 'cm', [9, 12]) /*>=3 */ ;//var doc = new jsPDF('p', 'cm', [9, 20]); 
         //doc.add()           //cada item extra +1.5   to 20Max       
            // Source HTMLElement or a string containing HTML.

        var elementHTML = document.querySelector("#pedido"); 

        const custName = document.querySelector('#Nombre');
        const contacId = document.querySelector('#Whatsapp');
       // window.alert("#lista2" + custName.value  );
       if(custName.value.length>0){
        if(contacId.value.length>0){
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
        } else{window.alert("Por favor especifique\na nombre de quien va el pedido"  );contacId.focus()}
        } else{window.alert("Por favor especifique\na nombre de quien va el pedido"  );custName.focus()}



    }