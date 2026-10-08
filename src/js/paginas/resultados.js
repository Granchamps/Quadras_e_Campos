import { buscarOfertas } from '../servicos/ofertas.js';

function resultados(app) {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const termo = params.get('termo') || '';
  const esporte = params.get('esporte') || '';
  const ordem = params.get('ordem') || 'data';
  const ofertas = buscarOfertas({ termo, esporte, ordem });

  app.innerHTML = `
    <section class="app-content page-resultados">
      <div class="page-header header-with-action">
        <div>
          <p class="eyebrow">Resultados</p>
          <h1>${ofertas.length} horário${ofertas.length === 1 ? '' : 's'} encontrado${ofertas.length === 1 ? '' : 's'}</h1>
          <p>${termo || esporte ? 'Baseado na sua busca.' : 'Disponibilidades disponíveis agora.'}</p>
        </div>
        <a class="btn btn--secondary" href="#inicio">Voltar</a>
      </div>

      <form class="filter-panel card" id="form-filtros">
        <label for="ordem">Ordenar por</label>
        <select id="ordem" name="ordem">
          <option value="data" ${ordem === 'data' ? 'selected' : ''}>Data e horário</option>
          <option value="preco" ${ordem === 'preco' ? 'selected' : ''}>Menor preço</option>
        </select>
        <button class="btn btn--secondary" type="submit">Aplicar</button>
      </form>

      ${ofertas.length === 0 ? `
        <div class="empty-state card">
          <span class="empty-icon" aria-hidden="true">⌕</span>
          <h2>Nenhuma oferta encontrada</h2>
          <p>Tente outro esporte, bairro ou estabelecimento.</p>
          <a class="btn" href="#inicio">Fazer nova busca</a>
        </div>
      ` : `
        <div class="offer-list">
          ${ofertas.map(oferta => cardOferta(oferta)).join('')}
        </div>
      `}
    </section>
  `;

  document.getElementById('form-filtros').addEventListener('submit', event => {
    event.preventDefault();
    const novaOrdem = document.getElementById('ordem').value;
    const paramsAtual = new URLSearchParams(window.location.hash.split('?')[1] || '');
    paramsAtual.set('ordem', novaOrdem);
    window.location.hash = `#resultados?${paramsAtual.toString()}`;
  });

  document.querySelectorAll('[data-oferta-id]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#detalhe?id=${encodeURIComponent(card.dataset.ofertaId)}`;
    });
  });
}

function cardOferta(oferta) {
  return `
    <article class="offer-card card" data-oferta-id="${oferta.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${oferta.estabelecimento}">
      <div class="offer-card__top">
        <div>
          <p class="offer-type">${oferta.modalidade}</p>
          <h2>${oferta.estabelecimento}</h2>
        </div>
        <strong class="offer-price">R$ ${oferta.preco.toFixed(2)}</strong>
      </div>
      <div class="offer-meta">
        <span>${oferta.bairro}</span>
        <span>${oferta.data}</span>
        <span>${oferta.horaInicio} · ${oferta.duracao} min</span>
      </div>
      <span class="text-link">Ver detalhes →</span>
    </article>
  `;
}

export default {
  url: '#resultados',
  label: 'Resultados',
  icon: 'search',
  pagina: resultados
};
