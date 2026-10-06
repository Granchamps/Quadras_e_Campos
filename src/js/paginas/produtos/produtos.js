import './produtos.css'
import listaDeProdutos from '../../dadosMockados/dados.js' 
import mapa from '../../paginas/mapa.js'
function produtos(app, categoria) {
  const lista = categoria ? listaDeProdutos.filter(prod => prod.categoria === categoria) : listaDeProdutos
  app.innerHTML = `
    <h1>${categoria ? categoria : "Todos os produtos"}</h1>
    ${ 
        lista.length === 0 ? "<p>Nenhum produto nesta categoria nesta semana.</p>" : lista.map(cartao).join("") 
     }`
        adicionarEvento(app)
        location.hash = "#produtos"
}

function cartao(produto) {
  return `<div class="produto">
            <div class="produto-imagem">
                <img src="${produto.img}" alt="A imagem de um produto" class="imagem-produto">
                <h3>${produto.nome}</h3>
            </div>
            <div class="preco-distancia">
                <p class="preco-especial">R$ ${produto.preco}</p>
                <p> ${produto.distancia} mt</p>
            </div>
        </div>`
}

function adicionarEvento(app){
document.querySelectorAll(".produto").forEach(card =>
  card.addEventListener("click", () => {
    const escolhido = listaDeProdutos
      .find(p => p.nome === card.dataset.nome)
    mapa.pagina(app, escolhido)
  }))
}

export default { 
    url: "#produtos",
    label: "",
    icon: "shopping-basket",
    pagina: produtos
 };