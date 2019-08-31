class carrinho{
    constructor(){
        
    }
    
    adicionarCarrinho(){
        var i;
        var pizza =  JSON.parse(localStorage.getItem("pizzaCarrinho"));
        var pizza2 = "";
        var total = 0;
        
        if(pizza != ""){
            
            pizza += ";" + "Pizza " + document.getElementById('lblPizza').innerHTML.replace("Sabor - ","") + "/";
            pizza += document.getElementById("quantidade").value + "/";
            pizza += document.querySelector('input[name = tamanho]:checked').value.replace(",00", "").replace("G", "").replace("B", "");
            pizza = pizza.replace("[object Undefined]", "");

            pizza2 = pizza.replace(/,/, ";").split(";");
            localStorage.setItem("pizzaCarrinho", JSON.stringify(pizza));
        
            document.getElementById('pizzaCarrinho').innerHTML = "";
            for(i = 0; i < pizza2.length; i++){
                
                var pizzaCarrinho = pizza2[i].split("/");
                
                const card = corpoCarrinho.corpo(pizzaCarrinho, i);
                document.getElementById('pizzaCarrinho').innerHTML += card;
                total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
            }
            document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
            
        }else{
            
            pizza += "Pizza de " + document.getElementById('lblPizza').innerHTML.replace("Sabor - ","") + "/";
            pizza += document.getElementById("quantidade").value + "/";
            pizza += document.querySelector('input[name = tamanho]:checked').value.replace(",00", "").replace("G", "").replace("B", "");
            pizza = pizza.replace("[object Undefined]", "");
            localStorage.setItem("pizzaCarrinho", JSON.stringify(pizza));
            
            var pizzaCarrinho = pizza.split("/");
            i = 0;
            const card = corpoCarrinho.corpo(pizzaCarrinho, i);
            
            total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
            document.getElementById('pizzaCarrinho').innerHTML += card;
            document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
        }
        
    }
    
    adicionarEsfihaCarrinho(){
        
        var i;
        var pizza = JSON.parse(localStorage.getItem("pizzaCarrinho"));
        var pizza2 = "";
        var total = 0;
        
        if(pizza != ""){
            
            pizza += ";" + "Esfiha " + document.getElementById('lblPizza').innerHTML.replace("Sabor - ","") + "/";
            pizza += document.getElementById("quantidade").value + "/";
            
            var x = document.getElementById('lblPizza').innerHTML.replace("Sabor - ","").replace(/ /g,"%");
            var tamanhoEX = document.getElementById(x+'2').innerHTML;
            var tamanho = tamanhoEX.substr(8);
            
            pizza += tamanho.replace(",00", "");
            pizza = pizza.replace("[object Undefined]", "");

            localStorage.setItem("pizzaCarrinho", JSON.stringify(pizza));
            pizza2 = pizza.split(";");
            document.getElementById('pizzaCarrinho').innerHTML = "";
            for(i = 0; i < pizza2.length; i++){
                
                var pizzaCarrinho = pizza2[i].split("/");
                
                const card = corpoCarrinho.corpo(pizzaCarrinho, i);
                document.getElementById('pizzaCarrinho').innerHTML += card;
                total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
            }
            document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
            
        }else{
            
            pizza += "Esfiha " + document.getElementById('lblPizza').innerHTML.replace("Sabor - ","") + "/";
            pizza += document.getElementById("quantidade").value + "/";
            var x = document.getElementById('lblPizza').innerHTML.replace("Sabor - ","").replace(/ /g,"%");
            var tamanhoEX = document.getElementById(x+'2').innerHTML;
            var tamanho = tamanhoEX.substr(8);
            pizza += tamanho.replace(",00", "");
            pizza = pizza.replace("[object Undefined]", "");
            
            localStorage.setItem("pizzaCarrinho", JSON.stringify(pizza));
            
            var pizzaCarrinho = pizza.split("/");
            i = 0;
            const card = corpoCarrinho.corpo(pizzaCarrinho, i);
            total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
            document.getElementById('pizzaCarrinho').innerHTML += card;
            document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
            
        }
        
    }
    
    recuperarCarrinho() {
        
        var i;
        var pizza = JSON.parse(localStorage.getItem("pizzaCarrinho")) + "";
        var total = 0;
        console.log(pizza);
        if(pizza != ""){
            console.log(pizza);
            var pizza2 = pizza.replace(/,/g, ";").split(";");
            console.log(pizza2);
            
            for(i = 0; i < pizza2.length; i++){

                var pizzaCarrinho = pizza2[i].split("/");

                const card = corpoCarrinho.corpo(pizzaCarrinho, i);
                document.getElementById('pizzaCarrinho').innerHTML += card;
                total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
                console.log(total);
            }
            
            document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
            
        }
        
        
    }
    
    removerCarrinho(id){
        var i;
        var pizza = JSON.parse(localStorage.getItem("pizzaCarrinho"));
        var pizza2 = pizza.replace(/,/g, ";").split(";");
        var total = 0;
        
        pizza2.splice(id, 1);
        document.getElementById('pizzaCarrinho').innerHTML = "";
        for(i = 0; i < pizza2.length; i++){
            console.log(pizza2.length);
            var pizzaCarrinho = pizza2[i].split("/");
            const card = corpoCarrinho.corpo(pizzaCarrinho, i);
            document.getElementById('pizzaCarrinho').innerHTML += card;
            total += (parseInt(pizzaCarrinho[1]) * parseInt(pizzaCarrinho[2]));
            
        }
        pizza = pizza2.toString();
        console.log("FODA" + pizza);
        localStorage.setItem("pizzaCarrinho", JSON.stringify(pizza));
        document.getElementById('totalCarrinho').innerHTML = ['R$' + total + ',00'];
    }
    
    
    
}