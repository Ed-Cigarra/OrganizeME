function menu() {

    document.getElementById('navv').style.width = "250px";
    document.getElementById('mainn').style.marginLeft = "250px";
    document.getElementById('cabecario').style.marginLeft = "213px";

}
function closemenu() {

    document.getElementById('navv').style.width = "0px";
    document.getElementById('mainn').style.marginLeft = "0px";
    document.getElementById('cabecario').style.marginLeft = "0px";
}


// principal

const input = document.querySelector('.inputp');
const button = document.querySelector('.buttonp');
const listacompleta = document.querySelector('.listap');



 let listadeitens = [];


function adicionartarefa() {
 
  console.log(listadeitens)
listadeitens.push({
  item: input.value,
  concluida: false,
  importante: false
});

input.value = ""; // limpou depois

  mostrartarefas();
}

function mostrartarefas() {
  let novalista = "";

  listadeitens.forEach(function(tarefa, posicao) {
    novalista += `
      <li class="lista ${tarefa.concluida && "done"} ${tarefa.importante && "important"}">
        <img src="img/check.webp" alt="check na tarefas" onclick="marcarComoConcluida(${posicao})" class="img3">
        <img src="img/estrela.png" alt="marcar como importante" onclick="marcarimportante(${posicao})" class="img3">
        <p>${tarefa.item}</p>
        <img src="img/trash.png" alt="lixeira para deletar tarefa" onclick="deletar(${posicao})" class="img3">
      </li>
    `;
  });
  listacompleta.innerHTML = novalista;

  localStorage.setItem('mlist', JSON.stringify(listadeitens));


 

  // Substitua '.lista-tarefas' pelo seletor do elemento <ul> / <div> que recebe a lista

  document.querySelector('.listap').innerHTML = novalista;
}
function deletar(posicao) {
    listadeitens.splice(posicao, 1);
    mostrartarefas();

   

}
 function carregar() {
    listadeitens = JSON.parse(localStorage.getItem('mlist'));
  const dados = localStorage.getItem('mlist');

  if (dados) {
    listadeitens = JSON.parse(dados);
  } else {
    listadeitens = [];  // <-- impede que vire null
  }

  mostrartarefas();
  

}


function marcarComoConcluida(posicao) {
    listadeitens[posicao].concluida = !listadeitens[posicao].concluida
    mostrartarefas();
  

}
function mostrarImportantes() {
    let novalista = "";

    listadeitens.forEach(function(tarefa, posicao) {
        if (tarefa.importante) {
            novalista += `
              <li class="lista ${tarefa.concluida ? "done" : ""} important">
                <img src="img/check.webp" onclick="marcarComoConcluida(${posicao})" class="img3">
                <img src="img/estrela.png" onclick="marcarimportante(${posicao})" class="img3">
                <p>${tarefa.item}</p>
                <img src="img/trash.png" onclick="deletar(${posicao})" class="img3">
              </li>
            `;
        }
    });

    listacompleta.innerHTML = novalista;
}

function marcarimportante(posicao) {
  // listadeitens.unshift(listadeitens.splice(posicao, 1)[0]);
  // mostrartarefas();
  listadeitens[posicao].importante = !listadeitens[posicao].importante
  mostrartarefas();
}
carregar();

button.addEventListener('click', adicionartarefa);


