import { getUsuarioAtual, login, logout, getOfertasDoUsuario } from '../sessao/sessao.js';

function conta(app) {
  const usuario = getUsuarioAtual();

  app.innerHTML = `
    <section class="app-content page-conta">
      <div class="page-header">
        <p class="eyebrow">Minha conta</p>
        <h1>${usuario ? 'Sua conta' : 'Entrar'}</h1>
        <p>${usuario
          ? 'Veja seus dados e os horários publicados por você.'
          : 'Entre com um usuário cadastrado para acessar suas publicações.'}</p>
      </div>

      ${usuario ? renderConta(usuario) : renderLogin()}
    </section>
  `;

  const formLogin = document.getElementById('form-login');

  if (formLogin) {
    formLogin.addEventListener('submit', event => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const resultado = login(email);
      const mensagem = document.getElementById('resultado-login');

      if (!resultado.sucesso) {
        mensagem.className = 'message message--error';
        mensagem.textContent = resultado.erro;
        return;
      }

      conta(app);
    });
  }

  const botaoSair = document.getElementById('btn-sair');

  if (botaoSair) {
    botaoSair.addEventListener('click', () => {
      logout();
      conta(app);
    });
  }

  document.querySelectorAll('[data-oferta-id]').forEach(card => {
    const abrirDetalhe = () => {
      window.location.hash = `#detalhe?id=${encodeURIComponent(card.dataset.ofertaId)}`;
    };

    card.addEventListener('click', abrirDetalhe);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        abrirDetalhe();
      }
    });
  });
}

function renderLogin() {
  return `
    <form class="card form-card" id="form-login">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autocomplete="email"
          placeholder="Ex.: contato@arenacentral.com"
        >
      </div>

      <button class="btn btn--full" type="submit">Entrar</button>

      <div id="resultado-login" aria-live="polite"></div>

      <p class="login-hint">
        Usuários de teste: contato@arenacentral.com,
        atendimento@quadra-do-vale.com,
        contato@campoverde.com ou atendimento@poliarena.com.
      </p>
    </form>
  `;
}

function renderConta(usuario) {
  const ofertas = getOfertasDoUsuario(usuario.id);

  return `
    <article class="card account-card">
      <div>
        <p class="eyebrow">Usuário ativo</p>
        <h2>${usuario.nome}</h2>
        <span>${usuario.email}</span>
        <span>${usuario.telefone || 'Telefone não informado'}</span>
      </div>
      <button class="btn btn--danger" id="btn-sair" type="button">Sair</button>
    </article>

    <section>
      <div class="section-title">
        <div>
          <p class="eyebrow">Publicações</p>
          <h2>Meus horários</h2>
        </div>
        <a class="text-link" href="#publicar">Publicar novo</a>
      </div>

      ${ofertas.length === 0 ? `
        <div class="empty-state card">
          <span class="empty-icon" aria-hidden="true">+</span>
          <h2>Nenhuma publicação</h2>
          <p>Você ainda não publicou nenhum horário.</p>
          <a class="btn" href="#publicar">Publicar horário</a>
        </div>
      ` : `
        <div class="offer-list">
          ${ofertas.map(cardOferta).join('')}
        </div>
      `}
    </section>
  `;
}

function cardOferta(oferta) {
  return `
    <article
      class="offer-card card"
      data-oferta-id="${oferta.id}"
      tabindex="0"
      role="button"
      aria-label="Ver detalhes de ${oferta.estabelecimento}"
    >
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
  url: '#conta',
  label: 'Conta',
  icon: 'user-round-arrow-left',
  pagina: conta
};
