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
            obj.Status = "Em Atendimento";
            firebase.database().ref('Senhas/' + obj.Criacao).set(obj);
            console.log(obj);
            return obj;    
        }else{
            alert("Não há objetos na fila.");
        }
    }

    this.FinalizarAtendimento = function(identificador){
        if(this.lista.length > 0){
            var obj;
            for(i = 0; i < this.lista.length; i++){
                if(this.lista[i].Identificador == identificador){
                    obj = this.lista[i];
                    this.lista.splice(i,1);
                }
            }
            
            if(obj != null || obj != undefined){
                obj.Status = "Atendimento Finalizado";
                firebase.database().ref('Senhas/' + obj.Criacao).set(obj);
            } else {
                alert("Digite uma senha Válida");
            }

        }else{
            alert("Não há objetos na fila.");
        }
    }

    this.ContarSenhasNaFrente = function(identificadorConsulta){
        var SenhasNaFrente = 0;
        var idSenha;
        if(this.lista.length > 0){
            for(i = 0; i < this.lista.length; i++){
                if(this.lista[i].Identificador == identificadorConsulta){
                    idSenha = this.lista[i].Criacao;
                    console.log(idSenha);
                }
            }

            for(i = 0; i < this.lista.length; i++){
                if(this.lista[i].Criacao < idSenha){
                    SenhasNaFrente++;
                }
            }

            return SenhasNaFrente;
        } else {
            alert("Não há senhas na fila");
        }
    }

    this.ContarSenhasEmUmStatus = function(statusSenha){
        var senhas = 0;
        if(this.lista.length > 0){
            for(i = 0; i < this.lista.length; i++){
                if(this.lista[i].Status == statusSenha){
                    senhas++;
                }
            }
            return senhas;
        } else {
            alert("Não há senhas na fila");
        }
    }

    this.ContarSenhasDeUmTipo = function(TipoSenha){
        var senhas = 0;
        if(this.lista.length > 0){
            for(i = 0; i < this.lista.length; i++){
                if(this.lista[i].Tipo == statusSenha){
                    senhas++;
                }
            }
            return senhas;
        } else {
            alert("Não há senhas na fila");
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