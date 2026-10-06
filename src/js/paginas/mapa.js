function mapa(app, produto) {
  if (!produto) { app.innerHTML = "<p>Escolha um produto.</p>"; return }
  app.innerHTML = `
    <h1>${produto.nome}</h1>
    <p>R$ ${produto.preco} · ${produto.distancia} m</p>
    <section class="mapa-provisorio">Mapa dos mercados: aula 17.</section>`

    location.hash = "#mapa"
}
export default { 
  url: '#mapa',
   label: 'mapa',
   icon: "map",
    pagina: mapa 
  };
