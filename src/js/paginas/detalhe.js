import './detalhe.css';
import { getOfertaPorId } from '../servicos/ofertas.js';
import usuarios from '../dadosMockados/usuarios.js';

function detalhe(app) {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const oferta = getOfertaPorId(params.get('id'));

  if (!oferta) {
    app.innerHTML = `
      <section class="app-content empty-state card">
        <span class="empty-icon" aria-hidden="true">?</span>
        <h1>Oferta não encontrada</h1>
        <p>Este horário pode ter sido removido ou o link está inválido.</p>
        <a class="btn" href="#resultados">Ver ofertas</a>
      </section>
    `;
    return;
  }

  const publicador = usuarios.find(usuario => usuario.id === oferta.publicadorId);

  app.innerHTML = `
    <section class="app-content page-detalhe">
      <div class="page-header header-with-action">
        <div>
          <p class="eyebrow">Detalhe da oferta</p>
          <h1>${oferta.estabelecimento}</h1>
          <p>${oferta.modalidade} · ${oferta.bairro}</p>
        </div>
        <a class="btn btn--secondary" href="#resultados">Voltar</a>
      </div>

      <div class="detail-grid">
        <article class="card detail-price">
          <span>Valor do horário</span>
          <strong>R$ ${oferta.preco.toFixed(2)}</strong>
          <p>${oferta.duracao} minutos</p>
        </article>

        <div class="card detail-info">
          <h2>Informações</h2>
          <dl>
            <div><dt>Data</dt><dd>${oferta.data}</dd></div>
            <div><dt>Horário</dt><dd>${oferta.horaInicio}</dd></div>
            <div><dt>Bairro</dt><dd>${oferta.bairro}</dd></div>
            <div><dt>Modalidade</dt><dd>${oferta.modalidade}</dd></div>
          </dl>
        </div>

        <article class="card detail-provider">
          <p class="eyebrow">Publicado por</p>
          <h2>${publicador?.nome || 'Publicador'}</h2>
          <p>${publicador?.telefone || 'Contato indisponível'}</p>
          <p>${publicador?.email || ''}</p>
        </article>
      </div>
    </section>
  `;
}

export default {
  url: '#detalhe',
  label: 'Detalhe',
  icon: 'calendar',
  pagina: detalhe
};
