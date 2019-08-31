class FinalizarCompra{
    
    constructor(){
        
    }
    colocarModalTirar(){
            var pizza = document.getElementById("saborPizza").innerHTML.replace("Sabor - ","");
            var ref  = firebase.database().ref('pizzas/' + pizza) ;
            document.getElementById("inputTirar").innerHTML = "";
            
            ref.child("detalhes").on('value',function(snapshot){
                 var ingredientes = snapshot.val().replace(/ e /g,",").replace(/ com /g,",").split(",");               
                function inputTirar(item){
                    var div = document.getElementById("inputTirar");
                    div.innerHTML += ['<div class="col-auto fonTexto  d-inline"> <input name="tirarIngrediente" id="'+item.replace(/ /g,"#")+'"type="checkBox" value="'+item+'"/><label class="ml-2 fontTexto" for="'+item.replace(/ /g,"#")+'" style="">'+ item+'</label></div>']
                }
                ingredientes.forEach(inputTirar);
            });
            
        }
         colocarEspecificacao(){
            var ingredientes = document.querySelectorAll('input[name="tirarIngrediente"]:checked');
           
            if(document.getElementById("textPizzaolo").value.length != 0){
                 var strPizzaolo = document.getElementById("textPizzaolo").value;
            }else{
                 var strPizzaolo = null;
            }
            var divEspecificacao = document.getElementById("semIngrediente");
             var teste = divEspecificacao.innerHTML;
             var str = "";
             var todaStr = divEspecificacao.innerHTML;
            
            for(var x = 0, l = ingredientes.length; x < l;  x++){
           
                str += ingredientes[x].value + ",";
            }
            
            if(todaStr == "Sem - Sem Especificações"){
                
                if (strPizzaolo != null){
                    divEspecificacao.innerHTML = "Sem - " + str  + strPizzaolo ;    
                }else{
                    divEspecificacao.innerHTML = "Sem - " + str.substring(0,str.length - 1)  ;    

                }
            }else{
                if (strPizzaolo != null){
                    divEspecificacao.innerHTML += "," +str.substring(0,str.length - 1) + "," + strPizzaolo;
                }else{
                    divEspecificacao.innerHTML += str.substring(0,str.length - 1)  ;    

                }
            }
            
              
            
            
        }

         bebidas(bebida){
            var valorTotal = document.getElementById("listCompraValorTotal");
              function colocarUltimo(idTotal , valorAdd){
                  var valor = idTotal.innerHTML.replace("R$","");
                  valor = parseFloat(valor) + valorAdd;
                  var lista = document.getElementById("listCompra");
                  lista.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fixed fontTexto bg-light" >Total da compra<span class="badge badge-danger badge-pill" id="listCompraValorTotal">R$'+ valor.toFixed(2) +'</span></li>' ]
                
              }
              var tipoBebida = bebida.substring(0,2);
              var dadosBebida = bebida.replace(tipoBebida,"").substr(1).replace("#"," ").split("%");
              var valor = parseFloat( dadosBebida[1].replace("R$","") );
              var nome = dadosBebida[0];
              var lista = document.getElementById("listCompra");
              var lblBebidas = document.getElementById("lblBebidas");
              lblBebidas.innerHTML += nome + ",";
              
              var array = document.getElementById("lblCount").innerHTML.slice(0, -1).split(",");
              var counter = parseFloat(array[array.length - 1 ]);
            
             
             
              lista.removeChild(lista.lastChild);
              counter = counter + 1;
             
              lista.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fontTexto bg-light" >'+nome+'<span class="badge badge-danger badge-pill" name="valorLista" style="margin-left:auto;">R$'+valor.toFixed(2)+'</span><span class="close"style="margin-bottom:15px;" id="'+ counter+' " onclick="removerLista(this.id)">&times;</span></li>' ]
              document.getElementById("lblCount").innerHTML += counter  + ",";
              
              colocarUltimo(valorTotal, valor);
             
              
        }
        
         
          
         removerLista(id){
           
             var lista = document.getElementById("listCompra");
             var array = document.getElementById("lblCount").innerHTML.slice(0, -1).split(",");

             let y = id - 1;
             var n = parseInt(id);
             
             for(var j = 0 , h = array.length;j<h;j++){
                 let num = parseInt(array[j]);
                 if(num == n){
                     
                     var conteudo = lista.childNodes[j + 1].innerHTML;
                     var valorSub = parseFloat(conteudo.substring(conteudo.indexOf("$") + 1,conteudo.indexOf("$")+ 5));
    
                     lista.removeChild(lista.childNodes[j + 1]);
                     let x = id - contador;
                     var totalValue = parseFloat(document.getElementById("listCompraValorTotal").innerHTML.replace("R$",""));
                     var  m = totalValue - valorSub;
                     contador+=1;
                     array.splice(array.indexOf(id), 1);
                     document.getElementById("lblCount").innerHTML = array.join() + ",";
                     document.getElementById("listCompraValorTotal").innerHTML = "R$" +  m.toFixed(2) ; 
                 }
             }
            
        
             
  
         }
          
          /**function calcularDistancia() {
                  origin = "Rua do Camuengo" ;//Get the source string
                  destination = document.getElementById('txtEnd').value; //Get the destination string
                  var service = new google.maps.DistanceMatrixService(); //initialize the distance service
                  service.getDistanceMatrix(
                    {
                      origins: [origin], //set origin, you can specify multiple sources here
                      destinations: [destination],//set destination, you can specify multiple destinations here
                      travelMode: google.maps.TravelMode.DRIVING, //set the travelmode
                      unitSystem: google.maps.UnitSystem.METRIC,//The unit system to use when displaying distance
                      avoidHighways: false,
                      avoidTolls: false
                    }, calcDistance); // here calcDistance is the call back function
                }
          function calcDistance(response, status) {
              if (status != google.maps.DistanceMatrixStatus.OK) { // check if there is valid result
                alert('Error was: ' + status);
              } else {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
      

                for (var i = 0; i < origins.length; i++) {
                  var results = response.rows[i].elements;

                  for (var j = 0; j < results.length; j++) {
                    var distancia = parseFloat(results[j].distance.text.replace("km",""));
                    var frete = 0;
                    if(distancia > 6){
                        alert("Desculpe, não entregamos na sua região ainda")
                    }else if(distancia >=5){
                        frete = 7;
                    }else if(distancia >=4){
                        frete = 6;
                    }else if(distancia >=3){
                        frete = 5;
                    }else if(distancia >=2){
                        frete = 4;
                    }else if(distancia >=1){
                        frete = 2;
                    }
                    alert(distancia)
                      alert(frete)
                    alert ('Distance from '+origins[i] + ' to ' + destinations[j]
                        + ': ' + results[j].distance.text ); // alert the result
                  }
                }
              }
        }
        **/
          function mandarPedido(nome,quantidade,sem,tamanho,extras,borda,bebidas,endereco,tipoEntrega,opcPagamento){
              const database = firebase.database();
              var strEmail = localStorage.getItem("email");
              var email = strEmail.split("@",1);
              var data = new Date;
              var dataMili = data.getTime();
              firebase.database().ref("usuarios"+ "/" + email + "/pedidos/"+  dataMili).set({
                
                Produto: nome,
                semIngrediente: sem,
                quantidade: quantidade,
                tamanho: tamanho,
                extras: extras,
                borda: borda,
                bebidas: bebidas,
                endereco: endereco,
                tipoEntrega: tipoEntrega,
                opcPagamento: opcPagamento
                
                

                }).then(function(docRef){

                console.log(nome);
                alert("Seu pedido foi feito com sucesso!");

                }).catch(function(error){
                console.error(error);
              });
             //  var endereco = document.getElementById();
             // var tipoEntrega = ;
             // var modoPagamento
          }
         
          
        function colocarDadosCompra(){
            var lblSabor = document.getElementById("saborPizza");
            var lblSem = document.getElementById("semIngrediente");
             var lblCount = document.getElementById("lblCount");
             lblCount.display="none";

            var query = location.search.slice(1);
            var todosDados = atob(query).split('%');
            var sabor = todosDados[0].replace(/1/g," ").split("$");
            lblSabor.innerHTML += sabor; 
       

            var borda = todosDados[todosDados.length- 2];
            document.getElementById("borda").innerHTML += borda.replace(/1/g," ");
            
            var tamanho =  todosDados[1];
            
            let teste =tamanho.substring(0,2) ;
            if( teste.substring(0,1) == "e"){
                document.getElementById("tamanhoIngrediente").innerHTML = "Tipo: Esfiha";
                var preco = tamanho.substr(1);
                
            
            }else if(teste.substring(0,1) == "p"){
                var preco = tamanho.substr(1);
                document.getElementById("tamanhoIngrediente").innerHTML = "Pacote de Esfiha " ;
                  
            }
        else if(teste.substring(0,1) == "b"){
                let tamanhoBatata = teste.substring(1);
                if(tamanhoBatata == "G"){
                    var preco = 23.00;
                    tamanho = "Batata Grande R$" + preco.toFixed(2);
                }else{
                    var preco = 12.00;
                    tamanho = "Batata Pequena R$" + preco.toFixed(2);
                }
                document.getElementById("tamanhoIngrediente").innerHTML += tamanho;

                
                     
            }
            else if(teste.substring(0,1) == "s"){
                let tamanhoBatata = teste.substring(1);
                 var preco = (tamanho.substr(2));
                if(tamanhoBatata == "G"){
                    tamanho = "Porção Grande R$" + preco;
                }else{
                    tamanho = "Porção Pequena R$" + preco;
                }
                document.getElementById("tamanhoIngrediente").innerHTML += tamanho;
                
                
            }
             else if(teste.substring(0,1) == "f"){
                 var preco = (tamanho.substr(1));
                document.getElementById("tamanhoIngrediente").innerHTML = "Tipo: Fogazza";
                
                
            }
            else{
                var preco = tamanho.substr(1);
                var tipo = tamanho.substring(0,1);
                if(tipo.indexOf("G") == -1){
                tamanho = "Pizza Broto R$" + preco;
                
                }else{
                tamanho = "Pizza Grande R$"+ preco;
                }
                document.getElementById("tamanhoIngrediente").innerHTML += tamanho;
            }
            
            
            var quantidade = todosDados[2];
            quantidade = quantidade.split("$");
            var quantidadeTotal = 0;
            for(var j = 0,f = quantidade.length;j<f;j++){
                quantidadeTotal += parseFloat(quantidade[j]);
            }
            var lblQuantidade= document.getElementById("lblQuantidade");
            lblQuantidade.innerHTML+= quantidadeTotal;
            var ingredienteExtra = todosDados[todosDados.length - 1].substr(1);
            var todosIngredienteExtra = document.getElementById("ingredienteExtra");
            if(ingredienteExtra == "em1Extras"){
                ingredienteExtra = "Sem Extras";
                todosIngredienteExtra.innerHTML = ingredienteExtra;
            }else{
                ingredienteExtra = ingredienteExtra.split("$");
                let cont = ingredienteExtra.length - 1   ;
                for(var x =0, l= ingredienteExtra.length; x <l;x++){
                    let cont = ingredienteExtra.length - 1   ;
                    if(x == cont){
                        todosIngredienteExtra.innerHTML +=  ingredienteExtra[x];
                    } else{
                        todosIngredienteExtra.innerHTML +=  ingredienteExtra[x] + ", " ;
                    }
                
            }
            
            
            
            
            }
            var sem = todosDados[3];
            if(sem != "Sem1Especificacoes"){
                sem = sem.replace(/1/g," ").substr(1).split("$");
                for(var i = 0, l = sem.length; i < l; i++){
                    let x = sem.length - 1   ;
                    if(i == x){
                        lblSem.innerHTML += sem[i];
                    }else{
                       lblSem.innerHTML += sem[i] + ", ";
                     } 
                }
            }else{
                sem = "Sem Especificações";
                lblSem.innerHTML += sem;
            }
            
            //listacompras
            var listBorda = " ";
            var countLista =1;
            let k = 3;
            let p = 5;
           
            
            
            
            var listCompra = document.getElementById("listCompra");
            if(teste == "p1"){
                preco = 20.00;
            }else if(teste == "p2"){
                preco = 20.00;
            }
             else if(teste == "p3"){
                preco = 25.00;
            }
            else if(teste == "p4"){
                preco = 40.00;
            }
            else if(teste == "p5"){
                preco = 50.00;
            }else{
                preco = parseFloat(preco) * quantidade;
            }
            

            listCompra.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fontTexto bg-light" >'+ sabor+'<span class="badge badge-danger badge-pill" id="valorListaf" style="margin-left:auto;">R$'+parseFloat(preco).toFixed(2)+'</span><span class="close"style="margin-bottom:15px;" id='+ countLista +' onclick="removerLista(this.id)">&times;</span></li>' ]
             lblCount.innerHTML += countLista + ",";
             countLista +=1;
            
            var precoTotal =  parseFloat(preco);
            if(borda == "cheddar" || borda == "catupiry" ){
               listCompra.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fontTexto bg-light" >Borda de '+ borda+'<span class="badge badge-danger badge-pill" id="valorLista" style="margin-left:auto;">R$'+ k.toFixed(2) +'</span><span class="close"style="margin-bottom:15px;" id="'+ countLista +'" onclick="removerLista(this.id)">&times;</span></li>' ]
                precoTotal  += 3.00;
                lblCount.innerHTML +=  countLista + ",";
                countLista +=1;
                
               
             }
            
         
             if(todosIngredienteExtra.innerHTML != "Sem Extras"){
                function colocarExtras(item){
                
                    if(item == "catupiry" || item == "cheddar" || item == "calabresa" || item == "presunto" || item == "frango"  ){
                     listCompra.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fontTexto bg-light" >'+item+' Extra<span class="badge badge-danger badge-pill" id="valorLista" style="margin-left:auto;">R$'+ p.toFixed(2    ) +'</span><span class="close"style="margin-bottom:15px;" id="'+ countLista +'" onclick="removerLista(this.id)">&times;</span></li>']
                     precoTotal += 5.00;
                     lblCount.innerHTML += countLista+ ",";
                     countLista += 1;
                     
                    }else{
                    
                     listCompra.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fontTexto bg-light" >'+item+' Extra<span class="badge badge-danger badge-pill" id="valorLista" style="margin-left:auto;">R$'+ k.toFixed(2) +'</span><span class="close"style="margin-bottom:15px;" id="'+ countLista +'" onclick="removerLista(this.id)">&times;</span></li>']
                     precoTotal += 3.00;
                     lblCount.innerHTML += countLista+ ",";
                     countLista += 1;
                    
                    }
                }
                ingredienteExtra.forEach(colocarExtras);                
            }
            
            var bebidaMenu = document.getElementById("bebidaMenu");
            let contadorBebidas = 0;



            listCompra.innerHTML += ['<li class="list-group-item d-flex justify-content-between align-items-center fixed fontTexto bg-light" >Total da compra<span class=" badge badge-danger badge-pill" id="listCompraValorTotal">R$'+  precoTotal.toFixed(2) +'</span></li>' ]
        
            //mandar dados para o banco
            
            function botaoFinalizar{
                //calcularDistancia();
                var lblBebidas = document.getElementById("lblBebidas");
                lblBebidas.style.display="none";

                var extras = todosIngredienteExtra.innerHTML;
                if(extras != "Sem Extras"){
                    extras = extras.substring(7);
                   
                }
                var bordaRecheada = borda.replace("Borda :","").replace(/1/g," ");
                alert(sabor)
                var strSabor = sabor;
           
                var btnComprar = document.getElementById("btnComprar");
                if(document.getElementById("txtEnd").value.length != 0){
                    var endereco = document.getElementById("txtEnd").value;
                     if(document.querySelector('input[name = opcPedido ]:checked') != null){
                            var lblPedido = document.querySelector('input[name = opcPedido]:checked').value;
                            if(document.querySelector('input[name = opcPagamento ]:checked') != null){
                                var lblPagamento = document.querySelector('input[name = opcPagamento]:checked').value;
                                var quantidade = document.getElementById("lblQuantidade").innerHTML.replace("quantidade - "," ");
                                mandarPedido(strSabor,quantidade,sem,tamanho,extras,bordaRecheada,lblBebidas.innerHTML,endereco,lblPedido,lblPagamento);
            
                            }else{
                                alert("Selecione o tipo de pagamento por favor!")
                            }
                     }else{
                        alert("Selecione o tipo de pedido, por favor!")
                    }
                }else{
                    alert("insira um endereço por favor!");
                }
               
                





            });
           
        }
}