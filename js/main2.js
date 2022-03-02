//Selecionando o input da tarefa, o botão de adicionar tarefa e ul que contém todas lis
const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

//função que cria LI e simplesmente retorna a li
function criaLi(){
  const li = document.createElement('li')
  return li
}

//complementando o meio de adicionar tarefas por meio da tecla enter, e impossibilitando que uma tarefa vazia seja adicionada
inputTarefa.addEventListener('keypress', function(e){
  if(e.keyCode === 13 ){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value);
  }
})

//função que limpa o input, vai ser usada logo depois de adicionar uma tarefa, também coloca o focus no input
function limpaInput(){
  inputTarefa.value = '';
  inputTarefa.focus()
}

function tarefaCompleta(li){
  const btnCompletar = document.createElement("button");
  
  btnCompletar.innerText += "Feito"
  btnCompletar.setAttribute("class", "completo")
  li.appendChild(btnCompletar)
}

//cria o botão responsável por apagar a li
function criaBotaoApagar(li){
  li.innerText += " "
  const botaoApagar = document.createElement("button")
  botaoApagar.innerText = 'Apagar'
  botaoApagar.setAttribute("class", "apagar")
  li.appendChild(botaoApagar)
}



//funcao que vai adicionar o texto de input na li e adiciona na tela, também integra quase todas funções, limpaInput cria o botão de apagar e salva tarefas automáticamente
function criaTarefa(textoInput){
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li)
  salvarTarefas()
  tarefaCompleta(li)
}

//adiciona EventListener de click e conecta a função de criar tarefa no botão 
btnTarefa.addEventListener("click", function(){
  if(!inputTarefa.value) return
  criaTarefa(inputTarefa.value);
});

//função que seleciona o pai do botão de apagar (que é a li em si) e remove esse pai, já remove do local storage
document.addEventListener("click", function(e){
  const el = e.target;

  if(el.classList.contains("apagar")){
    el.parentElement.remove()
    salvarTarefas()
  }

})

document.addEventListener("click", function(e){
  const el = e.target;
  if(el.classList.contains("completo")){
    el.parentElement.classList.toggle("feito")
    salvarTarefas()
  }
})

//vai selecionar a ul e a partir dela, selecionar todas lis, depois cria um array vazio chamado listaDeTarefas 
function salvarTarefas(){
  const liTarefas = tarefas.querySelectorAll("li")
  const listaDeTarefas = [];
  
  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim()
    listaDeTarefas.push(tarefaTexto);
    
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

//depois de converter a listaDeTarefas, que é um array em um JSON, a função adiciona esse JSON no
function adicionaTarefasSalvas(){
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas );

  for(let tarefa of listaDeTarefas){
    criaTarefa(tarefa)
  }
}
adicionaTarefasSalvas();
