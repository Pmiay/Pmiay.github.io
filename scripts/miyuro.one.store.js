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
    
    const divisa = '♥';
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
        
        /*elementosBase.filter(el => {
            return el.grupo === 'Bebé';
        })
        */
       // const miNodo = document.createElement('Div');

        getBase(elementosBase,grupo).forEach((info) => {
            // Estructura
            const miRow = document.createElement('row');
            miRow.classList.add('column' );
const miSkuDiv = document.createElement('div'); miSkuDiv.classList.add('item-list__item','ml-050','mr-010','mobile-2-2' );
    const miSkuDivImgH = document.createElement('div'); miSkuDivImgH.classList.add('item-list__header' );
            const miSkuDivImg = document.createElement('div'); //miSkuDivImg.classList.add('item-list__img-wrap','offer-image' );
                //const miSkuAImg = document.createElement('a'); miSkuAImg.classList.add('no-context-menu'); miSkuAImg.href=info.imagen;
                    const miSkuImg = document.createElement('img'); //miSkuImg.classList.add('offer-image__content','ls-is-cached','lazyloaded' );
                        miSkuImg.setAttribute('width','100'); 
                        miSkuImg.setAttribute('src', info.imagen);//<img src="tws04.jpg" alt="Imagen" id="MyoModal" style="cursor: pointer;">   
                        miSkuImg.setAttribute('alt','Imagen');miSkuImg.setAttribute('id','Myo_Modal'); miSkuImg.setAttribute('style','cursor: pointer;'); 
                        miSkuImg.setAttribute('expand',info.producto); miSkuImg.setAttribute('totImg',2); miSkuImg.addEventListener('click',setModalContent );
                        //miSkuAImg.appendChild(miSkuImg);

////Modal adapt
/* 
const miSkuDivImgM = document.createElement('div'); miSkuDivImgM.classList.add('modal' );miSkuDivImgM.setAttribute('id','my_Modal');  //<div id="myModal" class="modal"></div>
        const miSkuDivImgM_C = document.createElement('div'); miSkuDivImgM_C.classList.add('modal-content' ); //<div class="modal-content"></div>
        miSkuDivImgM.appendChild(miSkuDivImgM_C); 

            const miSkuImgMSpan = document.createElement('Span'); miSkuImgMSpan.classList.add('close'); miSkuImgMSpan.textContent='X';  //<span class="close">×</span>         
            const miSkuDivM_Cl = document.createElement('div'); miSkuDivM_Cl.classList.add('carousel' ); //<div class="carousel"></div>
            miSkuDivImgM_C.appendChild(miSkuImgMSpan);
            miSkuDivImgM_C.appendChild(miSkuDivM_Cl);

           const miSkuDivClI = document.createElement('div'); miSkuDivClI.classList.add('carousel-inner' ); //<div class="carousel-inner"></div>
 
            const miSkuDivM_Cl2 = document.createElement('div'); miSkuDivM_Cl2.classList.add('carousel' ); //<div class="carousel"></div>
            const miSkuDivClI2 = document.createElement('div'); miSkuDivClI2.classList.add('carousel-inner' );miSkuDivClI2.setAttribute('id','carouselInner'); //<div class="carousel-inner" id="carouselInner"></div>

            miSkuDivM_Cl2.appendChild(miSkuDivClI2); 
            const miSkua2ClIp = document.createElement('a'); miSkua2ClIp.classList.add('prev' ); miSkua2ClIp.addEventListener('click',  function() {plusSlides(-1);});miSkua2ClIp.textContent='❮'; miSkua2ClIp.textContent = '&#10094'; //<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            const miSkua2ClIn = document.createElement('a'); miSkua2ClIn.classList.add('next' ); miSkua2ClIn.addEventListener('click',  function() {plusSlides( 1);}); miSkua2ClIn.textContent='❯'; miSkua2ClIn.textContent='&#10095'; //<a class="next" onclick="plusSlides(1)">&#10095;</a>
            miSkuDivM_Cl2.appendChild(miSkua2ClIp); 
            miSkuDivM_Cl2.appendChild(miSkua2ClIn);

            miSkuDivClI.appendChild(miSkuDivM_Cl2); 
  
            const miSkuaClIp = document.createElement('a'); miSkuaClIp.classList.add('prev'); miSkuaClIp.addEventListener('click',  function() {plusSlides(-1);});miSkuaClIp.textContent='❮';  //<a class="prev" onclick="plusSlides(-1)">❮</a>
            const miSkuaClIn = document.createElement('a'); miSkuaClIn.classList.add('next'); miSkuaClIn.addEventListener('click',  function() {plusSlides( 1);}); miSkuaClIn.textContent='❯';  //<a class="next" onclick="plusSlides(1)">❯</a>


            miSkuDivM_Cl.appendChild(miSkuDivClI); 
            miSkuDivM_Cl.appendChild(miSkuaClIp); 
            miSkuDivM_Cl.appendChild(miSkuaClIn);
*/

 ////adapt       
                miSkuDivImg.appendChild(miSkuImg) ; //miSkuAImg);
              //  miSkuDivImg.appendChild(miSkuDivImgM) ;        
                

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
             //           miSkuBtnDiv.style="style=background-image: url(https://miyuro.one/assets/brand/getPedido.png); background-position: 0px -185px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;";
                const miSkuBtnAdd = document.createElement('button');miSkuBtnAdd.classList.add('btn', 'btn-primary');              
                      {  miSkuBtnAdd.textContent = 'Add';  
                         
                         miSkuBtnAdd.setAttribute('add', info.id);
                         miSkuBtnAdd.setAttribute('pedido', info.producto +',' + info.precio.toFixed(2));
                        // alert(info.producto & info.precio.toFixed(2));
                         miSkuBtnAdd.addEventListener('click', AddSkuLista);
                        // miSkuBtnAdd.addEventListener('click', StartMsgPurchase);
                      }
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

                const miSkuNameSecondDiv = document.createElement('div'); miSkuNameSecondDiv.classList.add( 'item-list__text');
                const miSkuSecondA = document.createElement('a'); miSkuSecondA.textContent = info.nombre;miSkuSecondA.href = "https://store.miyuro.one/" + info.producto + "/" + info.nombre.replaceAll(" ","-") + ".html" ; //info.ofertaen;
                miSkuNameSecondDiv.appendChild(miSkuSecondA); 
                miSkuFootNameDiv.appendChild(miSkuNameSecondDiv); 

        miSkuFootDiv.appendChild(miSkuFootNameDiv);
    miSkuDiv.appendChild(miSkuFootDiv);   
//botton pedido
        const miSkuFootDivPedido = document.createElement('div'); miSkuFootDivPedido.classList.add('item-list__body-wrap' );
      //<a class="blantershow" href="https://wa.me/50768666811?text=https://store.miyuro.one/st34/Pedido.html%20%0D%0A*Esta%20disponible%20*" id="wbtn" target="_blank"> 
        const miSkuDivPedidoA = document.createElement('a'); miSkuDivPedidoA.classList.add('blantershow');
                                                             miSkuDivPedidoA.target='_blank';
                                                             miSkuDivPedidoA.href = "https://wa.me/50768666811?text=https://store.miyuro.one/" + info.producto + "/Pedido.html%20%0D%0A*Esta%20disponible*%20%0D%0A" + info.nombre +"%20%0D%0A" + info.precio.toFixed(2);
    /*    const miSkuDivPedidoASVG = document.createElement('svg'); miSkuDivPedidoASVG.width=20; miSkuDivPedidoASVG.viewBox="0 0 24 24";
        const miSkuDivPedidodefs = document.createElement('defs'); 
        const miSkuDivPedidoPath1 = document.createElement('path'); miSkuDivPedidoPath1.fill="#eceff1";miSkuDivPedidoPath1.d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z";
        const miSkuDivPedidoPath2 = document.createElement('path'); miSkuDivPedidoPath2.fill="#4caf50";miSkuDivPedidoPath2.d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z";
        const miSkuDivPedidoPath3 = document.createElement('path'); miSkuDivPedidoPath3.fill="#fafafa";miSkuDivPedidoPath3.d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z";
            

            miSkuDivPedidoASVG.appendChild(miSkuDivPedidodefs);
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath1);            
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath2);
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath3);
    */ 
            const miSkuDivPedidoASVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            miSkuDivPedidoASVG.setAttribute("width", "20");
            miSkuDivPedidoASVG.setAttribute("viewBox", "0 0 24 24");
            
            const miSkuDivPedidoPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            miSkuDivPedidoPath1.setAttribute("fill", "#eceff1");
            miSkuDivPedidoPath1.setAttribute("d", "M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z");
            
            const miSkuDivPedidoPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            miSkuDivPedidoPath2.setAttribute("fill", "#4caf50");
            miSkuDivPedidoPath2.setAttribute("d", "M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z");
            
            const miSkuDivPedidoPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            miSkuDivPedidoPath3.setAttribute("fill", "#fafafa");
            miSkuDivPedidoPath3.setAttribute("d", "M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z");
            
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath1);
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath2);
            miSkuDivPedidoASVG.appendChild(miSkuDivPedidoPath3);
                const miSkuDivPedidoSpan = document.createElement('span');
                miSkuDivPedidoSpan.textContent = "Lo quieres para Hoy!"; 

            miSkuDivPedidoA.appendChild(miSkuDivPedidoASVG);     
            miSkuDivPedidoA.appendChild(miSkuDivPedidoSpan); 
            miSkuFootDivPedido.appendChild(miSkuDivPedidoA); 
// end botton 
        miSkuDiv.appendChild(miSkuFootDivPedido);

        const miitemsep = document.createElement('hr'); miitemsep.classList.add('featurette-divider');
          miSkuDiv.appendChild(miitemsep);
          miRow.appendChild(miSkuDiv);
          DOMitems.appendChild(miRow);

        });
  
        //DOMitems.appendChild(miNodo);

//aqui debe tomarse toda la pagina resultante y crear el html index
//Mediante una llamada al azure


    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function StartMsgPurchase(evento) {
        //alert(evento.target.getAttribute('pedido'));
        pedido.push(evento.target.getAttribute('pedido'))   //marcador
        lista.push(evento.target.getAttribute('add'))   //marcador
        ListaDeCompra();// Actualizamos el carrito
        
        ListaToLocalStorage();// Actualizamos el LocalStorage   
             
    }
    function AddSkuLista(evento) {
        //alert(evento.target.getAttribute('pedido'));
        pedido.push(evento.target.getAttribute('pedido'))   //marcador
        lista.push(evento.target.getAttribute('add'))   //marcador
        ListaDeCompra();// Actualizamos el carrito
        
        ListaToLocalStorage();// Actualizamos el LocalStorage        
    }
     // Obtén el modal
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];

            // Cuando el usuario hace clic en la imagen, abre el modal
            function viewModal() {
            // alert("Hola");
                modal.style.display = "block";
            }

            // Cuando el usuario hace clic en <span> (x), cierra el modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // Cuando el usuario hace clic fuera del modal, cierra el modal
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            
                                    ///////////////////////////////////////////////////////////////////////////
            function setModalContent(evento) {

                viewModal();
        
               // Carrusel
               var slideIndex = 0;
               var loc = evento.target.getAttribute('src'); //document.getElementById("MyoModal").getAttribute('src'); // 
               var expand = evento.target.getAttribute('expand'); //document.getElementById("MyoModal").getAttribute('expand'); //
               var totImg = evento.target.getAttribute('totImg'); //document.getElementById("MyoModal").getAttribute('totImg'); // 
        
                    var locd = loc.split ("/");
                    var images=[loc];
        
                  //  alert(expand );
                    //loc=loc.replace(locd[locd.length-1],expand);
                    loc = "https://store.miyuro.one/" + expand
                //    alert (loc);
                for(let i = 1; i <= totImg; i++)  { //alert("inFE");
                        images.push(loc + "/"+ locd[locd.length-1].replace(".","."+ i + ".")); // Añade más imágenes aquí
        
                    }
                  //  alert(images);
             
               function loadCarousel() {  
                clearModal();
                var carouselInner = document.getElementById("carouselInner");
                    images.forEach((image, index) => {
                        var div = document.createElement("div");
                        div.className = "carousel-item" + (index === 0 ? " active" : "");
                        var img = document.createElement("img");
                        img.setAttribute('src',image);
                        img.setAttribute('alt','Imagen ' + (index + 1));
                        div.appendChild(img);
                        carouselInner.appendChild(div);
                    });
               } //alert(images);
       
               function plusSlides(n) {
                   showSlides(slideIndex += n);
               }
        
               function showSlides(n) {
                   var i;
                   var slides = document.getElementsByClassName("carousel-item");
                   if (n >= slides.length) {slideIndex = 0}
                   if (n < 0) {slideIndex = slides.length - 1}
                   for (i = 0; i < slides.length; i++) {
                       slides[i].style.transform = "translateX(" + (-slideIndex * 100) + "%)";
                   }
               }
        
               // Cambia las imágenes automáticamente cada 3 segundos
               setInterval(function() {
                   plusSlides(1);
               }, 3000);
           function clearModal(){
                var carI = document.getElementById("carouselInner"); 
                while (carI.hasChildNodes()) {
                    carI.removeChild(carI.firstChild);
                }
           }
               // Cargar el carrusel al inicio
               loadCarousel();
        }

             //////////////////////////////////////////////////////////////////////////
    
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
//                window.alert(pedido);
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

    //////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // Inicio
    localStorageToLista();
    ListarSku();
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

//Mod/*/-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*/

//Mod/*/-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*//-*/*/-*/-*/-/-/-*/-/-/-/-/-*/
