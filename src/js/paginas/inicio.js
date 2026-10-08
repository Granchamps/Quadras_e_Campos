import { buscarOfertas } from '../servicos/ofertas.js';

const esportes = ['Futebol', 'Basquete', 'Vôlei', 'Poliesportivo'];

function inicio(app) {
  app.innerHTML = `
    <section class="app-content page-inicio">
      <div class="page-header">
        <p class="eyebrow">Quadras e Campos</p>
        <h1>Encontre o seu próximo jogo.</h1>
        <p>Consulte horários disponíveis de quadras e campos near você.</p>
      </div>

      <form class="search-panel card" id="form-busca">
        <label for="buscar">Buscar por esporte, bairro ou estabelecimento</label>
        <div class="search-field">
          <input id="buscar" name="termo" type="search" placeholder="Ex.: futebol em Jundiapeba" autocomplete="off" required>
          <button class="btn" type="submit" aria-label="Buscar ofertas">Buscar</button>
        </div>
      </form>

      <section class="section-block">
        <h2>Esportes</h2>
        <div class="category-list">
          ${esportes.map(esporte => `
            <button class="category-card" type="button" data-esporte="${esporte}">
              <span>${esporte}</span>
              <span aria-hidden="true">→</span>
            </button>
          `).join('')}
        </div>
      </section>

      <section class="section-block card quick-card">
        <div>
          <p class="eyebrow">Você também pode</p>
          <h2>Publicar um horário</h2>
          <p>Informe uma disponibilidade e ela ficará disponível para consulta.</p>
        </div>
        <a class="btn btn--secondary" href="#publicar">Publicar</a>
      </section>
    </section>
  `;

  const form = document.getElementById('form-busca');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const termo = document.getElementById('buscar').value;
    window.location.hash = `#resultados?termo=${encodeURIComponent(termo)}`;
  });

  document.querySelectorAll('[data-esporte]').forEach(botao => {
    botao.addEventListener('click', () => {
      const esporte = botao.dataset.esporte;
      window.location.hash = `#resultados?esporte=${encodeURIComponent(esporte)}`;
    });
  });
}

export default {
  url: '#inicio',
  label: 'Início',
  icon: 'home',
  pagina: inicio
};
