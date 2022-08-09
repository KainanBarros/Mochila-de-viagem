const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []  

// Um laço de repetição para buscar no LocalStorage os itens existentes.
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )

// Evento que cria o elemento assim que clicar no botão adicionar.
form.addEventListener("submit", (evento) => {  
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

// Criando o item desejado na mochila.
    const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
    };

// Verificando se o item já existe na lista de itens.
    const existe = itens.find(elemento => elemento.nome === nome.value);

// Se caso o item existir ele só faz a atualização da quantidade do item.
    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        existe[existe.id] = itemAtual;
    }else{
// Caso o item não exista ele cria um novo item.
        itemAtual.id = itens.length;
        criaElemento(itemAtual);

        itens.push(itemAtual);
    };

// Adicionando um novo item no localStorage.
    localStorage.setItem("itens", JSON.stringify(itens));

// Limpando os inputs.
    nome.value = "";
    quantidade.value = "";
});

// Função de criar um novo item.
function criaElemento(item) {  
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
};

// Função de atualizar o item caso ele já exista. Ela só é chamada caso o item já exista.
function atualizaElemento(item){
    document.querySelector("[data-id='"+ item.id+"']").innerHTML = item.quantidade;
};


function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function(){
        deletaElemento(this.parentNode, id);
    })
    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splace(itens.findIndex(elemento => elemento.id === id),1);

    localStorage.setItem("itens", JSON.stringify(itens));
}