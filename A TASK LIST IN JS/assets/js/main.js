const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// funcao exclusiva só para criar li
function criaLi() {
  const li = document.createElement('li');
  return li;
}

// exluciva pra lidar com o enter no campo de input
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

// funcao exlusiva para limpar input e volta o foco para o input
// ELe deve ser usada no ato de criar um item(tarefa) e desta forma depois de dar enter limpar e manter o cursor no campo de input
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaTarefa(textoInput) {
  const li = criaLi(); // li recebe a funcao que cria li
  li.innerText = textoInput; // li recebe o texto do input
  tarefas.appendChild(li); // div tarefas recebe li
  limpaInput(); // limpa e mantém o foco depois de limpar no input
  criaBotaoApagar(li); // cria botao apagar do item li 
  salvarTarefas(); // salva as tarefas 
}

// Cria o botão de apagar a tarefa
function criaBotaoApagar(li) {
  li.innerText += ' '; // limpa o campo li (input ou texto da tarefa )
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  // botaoApagar.classList.add('apagar'); 
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});


// removendo o item / tarefa
document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove(); // remove o próprio li (que é o elemento pai "parentElement")
    salvarTarefas(); // re-salva as tarefas com o item removido
    inputTarefa.focus(); // volta o foco para o campo de input
  }
});

// salvar tarefas
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li'); // dentro da ul class .tarefas recebe todas as li
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // remove o texto "Apagar" e mantém o texto da tarefa removendo os espaços com .trim
    listaDeTarefas.push(tarefaTexto);
  }
// JSON.stringify(item/ objeto) // converte para uma string no formato JSON
  const tarefasJSON = JSON.stringify(listaDeTarefas); // cria-se um json (NAO ARRAY) com a lista de tarefas salvas
  localStorage.setItem('tarefas', tarefasJSON); // armazena a lista JSON de tarefas na memória local do navegador com o nome 'tarefas' o 'tarefasJSON' criado
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas'); // tarefas recebe o lista string salva
  // JSON.parse(item/ objeto) // converte de volta para um objeto
  const listaDeTarefas = JSON.parse(tarefas); // listaDeTarefas recebe o array de tarefas convertido

  for(let tarefa of listaDeTarefas) { // varre todas as tarefas
    criaTarefa(tarefa); // re-cria a lista de tarefas atualizada
  }
}
adicionaTarefasSalvas(); // chama a funcao que adiciona as tarefas


// JSON.stringify(item/ objeto) // converte para uma string no formato JSON
// JSON.parse(item/ objeto) // converte de volta para um objeto
