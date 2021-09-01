let cadastro;


function update(index,link){
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);
    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs-1]; //cria uma conexao com o input que é do tipo button



    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show'; //mostra butao de envio

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); 
        const url=link; 
        let data = {id:"",name:"",email:"",address:"",age:"",height:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); 
        http.setRequestHeader('Content-Type','application/json'); 
         
        for(let cont=0;cont<inputs.length;cont++){ 
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }

        data.id = index;
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.height = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO


        http.onload = ()=>{ 

  

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }
 
    });  

}

function remove(index,name,link){ //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({name:name}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend); //envia dados para o servidor na forma de JSON


    http.onload = ()=>{ 
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(data){
    //Adiciona um dado novo
}

function list(){
    let datas;
 
    //Primeira parte: envia mensagem para o servidor pedindo uma listagem dos usuários
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if(http.readyState == 4 && http.status == 200) {
            datas = JSON.parse(http.response)
            const tableKeys = Object.keys(datas[0]) //["name", "email", "address", "age", "heigth", "vote"]

            for(let j=0; j<datas.length; j++){    
                let tableList = document.getElementById("list");
                let tr = document.createElement("tr"); 
                
                //gerar os campos name, email...
                for(let i = 0; i<tableKeys.length; i++){
                    let td = document.createElement("td");
                    let input = document.createElement("input")
                    let span = document.createElement("span");

                    td.setAttribute("data-index-row", j);

                    span.innerHTML =  Object.values(datas[j])[i]
                    span.className="show";

                    input.setAttribute("type", "text");
                    input.setAttribute("name", tableKeys[i])
                    input.setAttribute("value", Object.values(datas[j])[i])
                    input.className="hidden";

                    td.appendChild(span);
                    td.appendChild(input);
                    tr.appendChild(td);  
                }

                //botao confirmar
                let td = document.createElement("td");
                let input = document.createElement("input");

                td.setAttribute("data-index-row", j);
                input.setAttribute("type", "button");
                input.setAttribute('onclick', "window.location.reload()");
                input.setAttribute("value", "atualizar");
                td.className = "hidden"
                input.className = "hidden";

                td.appendChild(input);
                tr.appendChild(td);


                //botao lápis
                let td1 = document.createElement("td");
                let a1 = document.createElement("a");
                let i1 = document.createElement("i");

                td1.setAttribute("data-index-row", j);
                a1.setAttribute("href", "#");
                a1.setAttribute('onclick', `update(${j}, '/cadastro/update/')`)
                a1.className = "show";
                i1.className = "fas fa-pen";

                a1.appendChild(i1)
                td1.appendChild(a1)
                tr.appendChild(td1);

                //botao deletar
                let td2 = document.createElement("td");
                let a2 = document.createElement("a");
                let i2 = document.createElement("i");
                console.log(`remove(${j}, '${datas[j].name}', '/cadastro/remove/')`)
                td2.setAttribute("data-index-row", j);
                a2.setAttribute("href", "#");
                a2.setAttribute('onclick', `remove(${j}, '${datas[j].name}', '/cadastro/remove/'); window.location.reload()`)
                a2.className = "show";
                i2.className = "fas fa-trash-alt";

                a2.appendChild(i2)
                td2.appendChild(a2)
                tr.appendChild(td2);

                tableList.appendChild(tr);
                
            }
        }
    }

    http.open("GET", "/listagem", true);

    http.send();

    // console.log(http.response)
    //Segunda parte: apos recebimento da lista de usuarios, no formato JSON, colocar os usuarios na interface
    

}
   
list()


