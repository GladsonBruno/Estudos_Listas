function Queue(){
    this.lista = new Array();
 
    this.InserirNaLista = function(obj){
        this.lista[this.lista.length] = obj;
    }

    this.Inserir = function(obj){
        this.lista[this.lista.length] = obj;
        var id = this.GerarId();
        obj.Criacao = id;
        firebase.database().ref('/Senhas/' + id).set(obj);
    }


    this.GerarId = function(){
        var data = new Date();
        var ano = data.getFullYear().toString();
        var mes = data.getMonth().toString();
        if(mes.length == 1){
            mes = "0" + mes;
        }
        var dia = data.getDate().toString();
        if(dia.length == 1){
            dia = "0" + dia;
        }
        var horas = data.getHours().toString();
        if(horas.length == 1){
            horas = "0" + horas;
        }
        var minutos = data.getMinutes().toString();
        if(minutos.length == 1){
            minutos = "0" + minutos;
        }
        var segundos = data.getSeconds().toString();
        if(segundos.length == 1){
            segundos = "0" + segundos;
        }

        var novoId = data.getFullYear().toString() + mes + dia + horas + minutos + segundos;
        return novoId;
    }
 
    this.AtenderSenha = function(){
        if(this.lista.length > 0){
            var obj = this.lista[0];
            this.lista.splice(0,1);
            firebase.database().ref('Senhas/' + obj.Criacao).remove();
            obj.Status = "Em Atendimento";
            firebase.database().ref('Atendendo/' + obj.Criacao).set(obj);
            if(this.lista.length == 0){
                firebase.database().ref('Senhas').set(0);    
            }
            return obj;    
        }else{
            alert("Não há objetos na fila.");
            firebase.database().ref('Senhas').set(0);
        }
    }

    this.FinalizarAtendimento = function(){
        if(this.lista.length > 0){
            var obj = this.lista[0];
            this.lista.splice(0,1);
            firebase.database().ref('Atendendo/' + obj.Criacao).remove();
            obj.Status = "Atendimento Finalizado";
            firebase.database().ref('Atendidas/' + obj.Criacao).set(obj);
            if(this.lista.length == 0){
                firebase.database().ref('Atendendo').set(0);    
            }
        }else{
            alert("Não há objetos na fila.");
            firebase.database().ref('Atendendo').set(0);
        }
    }
 
    this.LerPrimeiro = function(){
        if(this.lista.length > 0){
            return this.lista[0];
        }else{
            alert("Não há objetos na fila.")
        }
    }

}