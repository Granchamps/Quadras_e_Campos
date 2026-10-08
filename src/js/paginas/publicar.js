import './publicar.css';
import { adicionarOferta, verificarDuplicidade } from '../servicos/ofertas.js';
import { getUsuarioAtual } from '../sessao/sessao.js';

const modalidades = ['Futebol', 'Basquete', 'Vôlei', 'Poliesportivo'];

function publicar(app) {
  const usuario = getUsuarioAtual();

  app.innerHTML = `
    <section class="app-content page-publicar">
      <div class="page-header">
        <p class="eyebrow">Publicação</p>
        <h1>Disponibilize um horário</h1>
        <p>Informe as condições do espaço para que outras pessoas encontrem a oferta.</p>
      </div>

      ${usuario ? '' : `
        <div class="message message--error">
          <strong>Login necessário.</strong>
          <p>Faça login antes de publicar uma oferta.</p>
          <a class="btn btn--secondary" href="#conta">Acessar conta</a>
        </div>
      `}

      <form class="card form-card" id="form-publicacao" ${usuario ? '' : 'hidden'} novalidate>
        <div class="form-group">
          <label for="estabelecimento">Estabelecimento</label>
          <input id="estabelecimento" name="estabelecimento" type="text" minlength="2" maxlength="80" required placeholder="Ex.: Arena Central">
        </div>
        <div class="form-group">
          <label for="modalidade">Modalidade</label>
          <select id="modalidade" name="modalidade" required>
            <option value="">Selecione um esporte</option>
            ${modalidades.map(modalidade => `<option value="${modalidade}">${modalidade}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input id="bairro" name="bairro" type="text" minlength="2" maxlength="80" required placeholder="Ex.: Jundiapeba">
        </div>
        <div class="form-group form-group--row">
          <div class="form-group">
            <label for="data">Data</label>
            <input id="data" name="data" type="date" required>
          </div>
          <div class="form-group">
            <label for="horaInicio">Horário</label>
            <input id="horaInicio" name="horaInicio" type="time" required>
          </div>
        </div>
        <div class="form-group form-group--row">
          <div class="form-group">
            <label for="duracao">Duração em minutos</label>
            <input id="duracao" name="duracao" type="number" min="15" max="720" step="15" value="60" required>
          </div>
          <div class="form-group">
            <label for="preco">Preço por hora</label>
            <input id="preco" name="preco" type="number" min="1" step="0.01" required placeholder="R$ 120">
          </div>
        </div>
        <button class="btn btn--full" type="submit">Publicar horário</button>
        <div id="resultado-publicacao" aria-live="polite"></div>
      </form>
    </section>
  `;

  const form = document.getElementById('form-publicacao');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    clearValidation(form);

    if (!form.checkValidity()) {
      form.reportValidity();
      mostrarResultado('Preencha todos os campos com valores válidos.', 'error');
      return;
    }

    const formData = new FormData(form);
    const oferta = {
      publicadorId: usuario.id,
      estabelecimento: formData.get('estabelecimento').trim(),
      modalidade: formData.get('modalidade'),
      bairro: formData.get('bairro').trim(),
      data: formData.get('data'),
      horaInicio: formData.get('horaInicio'),
      duracao: Number(formData.get('duracao')),
      preco: Number(formData.get('preco'))
    };

    if (verificarDuplicidade(oferta)) {
      mostrarResultado('Uma oferta com esses dados já existe. Escolha outra data ou horário.', 'error');
      return;
    }

    const resultado = adicionarOferta(oferta);
    if (!resultado.sucesso) {
      mostrarResultado(resultado.erro, 'error');
      return;
    }

    mostrarResultado(`Oferta publicada com sucesso! ID: ${resultado.oferta.id}.`, 'success');
    form.reset();
  });

  function mostrarResultado(mensagem, tipo) {
    const elemento = document.getElementById('resultado-publicacao');
    elemento.className = `message message--${tipo}`;
    elemento.textContent = mensagem;
  }
}

function clearValidation(form) {
  form.querySelectorAll('[aria-invalid="true"]').forEach(campo => campo.removeAttribute('aria-invalid'));
}

export default {
  url: '#publicar',
  label: 'Publicar',
  icon: 'plus',
  pagina: publicar
};
