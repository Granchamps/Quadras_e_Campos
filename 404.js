function naoEncontrada(app) {
  app.innerHTML = `
    <section class="app-content empty-state card">
      <span class="empty-icon" aria-hidden="true">404</span>
      <h1>Rota não encontrada</h1>
      <p>A página que você procura não existe ou mudou de endereço.</p>
      <a class="btn" href="#inicio">Voltar ao início</a>
    </section>
  `;
}

export default {
  url: '#404',
  label: '404',
  icon: 'alert-circle',
  pagina: naoEncontrada
};
