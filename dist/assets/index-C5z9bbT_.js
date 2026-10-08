(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const createSVGElement = ([tag, attrs, children]) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });
  if (children?.length) {
    children.forEach((child) => {
      const childElement = createSVGElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
};
const createElement = (iconNode, customAttrs = {}) => {
  const tag = "svg";
  const attrs = {
    ...defaultAttributes,
    ...customAttrs
  };
  return createSVGElement([tag, attrs, iconNode]);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const toCamelCase = (string) => {
  let out = "";
  let upperNext = false;
  for (const ch of string) {
    if (ch === "-" || ch === "_" || ch <= " ") {
      upperNext = out.length > 0;
      continue;
    }
    if (out.length === 0) {
      out += ch.toLowerCase();
    } else {
      out += upperNext ? ch.toUpperCase() : ch;
    }
    upperNext = false;
  }
  return out;
};
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
  attrs[attr.name] = attr.value;
  return attrs;
}, {});
const getClassNames = (attrs) => {
  if (typeof attrs === "string") return attrs;
  if (!attrs || !attrs.class) return "";
  if (attrs.class && typeof attrs.class === "string") {
    return attrs.class.split(" ");
  }
  if (attrs.class && Array.isArray(attrs.class)) {
    return attrs.class;
  }
  return "";
};
const replaceElement = (element, { nameAttr, icons, attrs }) => {
  const iconName = element.getAttribute(nameAttr);
  if (iconName == null) return;
  const ComponentName = toPascalCase(iconName);
  const iconNode = icons[ComponentName];
  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`
    );
  }
  const elementAttrs = getAttrs(element);
  const ariaProps = hasA11yProp(elementAttrs) ? {} : { "aria-hidden": "true" };
  const iconAttrs = {
    ...defaultAttributes,
    "data-lucide": iconName,
    ...ariaProps,
    ...attrs,
    ...elementAttrs
  };
  const elementClassNames = getClassNames(elementAttrs);
  const className = getClassNames(attrs);
  const classNames = mergeClasses(
    "lucide",
    `lucide-${iconName}`,
    ...elementClassNames,
    ...className
  );
  if (classNames) {
    Object.assign(iconAttrs, {
      class: classNames
    });
  }
  const svgElement = createElement(iconNode, iconAttrs);
  return element.parentNode?.replaceChild(svgElement, element);
};
const createIcons = ({
  icons = {},
  nameAttr = "data-lucide",
  attrs = {},
  root = document,
  inTemplates
} = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
    );
  }
  if (typeof root === "undefined") {
    throw new Error("`createIcons()` only works in a browser environment.");
  }
  const elementsToReplace = Array.from(root.querySelectorAll(`[${nameAttr}]`));
  elementsToReplace.forEach((element) => replaceElement(element, { nameAttr, icons, attrs }));
  if (inTemplates) {
    const templates = Array.from(root.querySelectorAll("template"));
    templates.forEach(
      (template) => createIcons({
        icons,
        nameAttr,
        attrs,
        root: template.content,
        inTemplates
      })
    );
  }
  if (nameAttr === "data-lucide") {
    const deprecatedElements = root.querySelectorAll("[icon-name]");
    if (deprecatedElements.length > 0) {
      console.warn(
        "[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"
      );
      Array.from(deprecatedElements).forEach(
        (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
      );
    }
  }
};
const ofertas$1 = [
  {
    id: "oferta-1",
    publicadorId: "usuario-1",
    estabelecimento: "Arena Central",
    modalidade: "Futebol",
    bairro: "Jundiapeba",
    data: "2026-10-10",
    horaInicio: "15:00",
    duracao: 60,
    preco: 120
  },
  {
    id: "oferta-2",
    publicadorId: "usuario-2",
    estabelecimento: "Quadra do Vale",
    modalidade: "Basquete",
    bairro: "Centro",
    data: "2026-10-11",
    horaInicio: "18:30",
    duracao: 90,
    preco: 85
  },
  {
    id: "oferta-3",
    publicadorId: "usuario-3",
    estabelecimento: "Campo Verde",
    modalidade: "Futebol",
    bairro: "Santo Antônio",
    data: "2026-10-12",
    horaInicio: "10:00",
    duracao: 75,
    preco: 95
  },
  {
    id: "oferta-4",
    publicadorId: "usuario-4",
    estabelecimento: "Poli Arena",
    modalidade: "Poliesportivo",
    bairro: "Pituruna",
    data: "2026-10-13",
    horaInicio: "20:00",
    duracao: 60,
    preco: 150
  },
  {
    id: "oferta-5",
    publicadorId: "usuario-1",
    estabelecimento: "Arena Central",
    modalidade: "Vôlei",
    bairro: "Jundiapeba",
    data: "2026-10-17",
    horaInicio: "16:00",
    duracao: 60,
    preco: 110
  },
  {
    id: "oferta-6",
    publicadorId: "usuario-2",
    estabelecimento: "Quadra do Vale",
    bairro: "Centro",
    modalidade: "Vôlei",
    data: "2026-10-18",
    horaInicio: "09:00",
    duracao: 60,
    preco: 90
  },
  {
    id: "oferta-7",
    publicadorId: "usuario-3",
    estabelecimento: "Campo Verde",
    modalidade: "Basquete",
    bairro: "Santo Antônio",
    data: "2026-10-19",
    horaInicio: "17:00",
    duracao: 90,
    preco: 100
  },
  {
    id: "oferta-8",
    publicadorId: "usuario-4",
    estabelecimento: "Poli Arena",
    modalidade: "Futebol",
    bairro: "Pituruna",
    data: "2026-10-20",
    horaInicio: "11:30",
    duracao: 90,
    preco: 130
  },
  {
    id: "oferta-9",
    publicadorId: "usuario-1",
    estabelecimento: "Arena Central",
    modalidade: "Basquete",
    bairro: "Jundiapeba",
    data: "2026-10-24",
    horaInicio: "19:00",
    duracao: 75,
    preco: 105
  },
  {
    id: "oferta-10",
    publicadorId: "usuario-2",
    estabelecimento: "Quadra do Vale",
    modalidade: "Poliesportivo",
    bairro: "Centro",
    data: "2026-10-25",
    horaInicio: "13:00",
    duracao: 90,
    preco: 115
  },
  {
    id: "oferta-11",
    publicadorId: "usuario-3",
    estabelecimento: "Campo Verde",
    modalidade: "Vôlei",
    bairro: "Santo Antônio",
    data: "2026-10-26",
    horaInicio: "21:00",
    duracao: 60,
    preco: 110
  },
  {
    id: "oferta-12",
    publicadorId: "usuario-4",
    estabelecimento: "Poli Arena",
    modalidade: "Basquete",
    bairro: "Pituruna",
    data: "2026-10-27",
    horaInicio: "08:00",
    duracao: 90,
    preco: 125
  }
];
const ofertas = [...ofertas$1];
let proximoId = 13;
function getOfertaPorId(id) {
  return ofertas.find((oferta) => oferta.id === id);
}
function buscarOfertas({ termo = "", esporte = "", ordem = "data" } = {}) {
  const busca = termo.trim().toLocaleLowerCase("pt-BR");
  const resultados2 = ofertas.filter((oferta) => {
    const correspondeTermo = !busca || [
      oferta.estabelecimento,
      oferta.modalidade,
      oferta.bairro
    ].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(busca));
    const correspondeEsporte = !esporte || oferta.modalidade === esporte;
    return correspondeTermo && correspondeEsporte;
  });
  return [...resultados2].sort((a, b) => {
    if (ordem === "preco") {
      return a.preco - b.preco || a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio);
    }
    return a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio);
  });
}
function verificarDuplicidade(oferta) {
  return ofertas.some(
    (item) => item.estabelecimento === oferta.estabelecimento && item.data === oferta.data && item.horaInicio === oferta.horaInicio
  );
}
function adicionarOferta(oferta) {
  if (verificarDuplicidade(oferta)) {
    return { sucesso: false, oferta: null, erro: "Oferta duplicada" };
  }
  const registrada = {
    ...oferta,
    id: `oferta-${proximoId++}`
  };
  ofertas.push(registrada);
  return { sucesso: true, oferta: registrada, erro: null };
}
const esportes = ["Futebol", "Basquete", "Vôlei", "Poliesportivo"];
function inicio(app2) {
  app2.innerHTML = `
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
          ${esportes.map((esporte) => `
            <button class="category-card" type="button" data-esporte="${esporte}">
              <span>${esporte}</span>
              <span aria-hidden="true">→</span>
            </button>
          `).join("")}
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
  const form = document.getElementById("form-busca");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const termo = document.getElementById("buscar").value;
    window.location.hash = `#resultados?termo=${encodeURIComponent(termo)}`;
  });
  document.querySelectorAll("[data-esporte]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const esporte = botao.dataset.esporte;
      window.location.hash = `#resultados?esporte=${encodeURIComponent(esporte)}`;
    });
  });
}
const inicio$1 = {
  url: "#inicio",
  label: "Início",
  icon: "home",
  pagina: inicio
};
function resultados(app2) {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const termo = params.get("termo") || "";
  const esporte = params.get("esporte") || "";
  const ordem = params.get("ordem") || "data";
  const ofertas2 = buscarOfertas({ termo, esporte, ordem });
  app2.innerHTML = `
    <section class="app-content page-resultados">
      <div class="page-header header-with-action">
        <div>
          <p class="eyebrow">Resultados</p>
          <h1>${ofertas2.length} horário${ofertas2.length === 1 ? "" : "s"} encontrado${ofertas2.length === 1 ? "" : "s"}</h1>
          <p>${termo || esporte ? "Baseado na sua busca." : "Disponibilidades disponíveis agora."}</p>
        </div>
        <a class="btn btn--secondary" href="#inicio">Voltar</a>
      </div>

      <form class="filter-panel card" id="form-filtros">
        <label for="ordem">Ordenar por</label>
        <select id="ordem" name="ordem">
          <option value="data" ${ordem === "data" ? "selected" : ""}>Data e horário</option>
          <option value="preco" ${ordem === "preco" ? "selected" : ""}>Menor preço</option>
        </select>
        <button class="btn btn--secondary" type="submit">Aplicar</button>
      </form>

      ${ofertas2.length === 0 ? `
        <div class="empty-state card">
          <span class="empty-icon" aria-hidden="true">⌕</span>
          <h2>Nenhuma oferta encontrada</h2>
          <p>Tente outro esporte, bairro ou estabelecimento.</p>
          <a class="btn" href="#inicio">Fazer nova busca</a>
        </div>
      ` : `
        <div class="offer-list">
          ${ofertas2.map((oferta) => cardOferta(oferta)).join("")}
        </div>
      `}
    </section>
  `;
  document.getElementById("form-filtros").addEventListener("submit", (event) => {
    event.preventDefault();
    const novaOrdem = document.getElementById("ordem").value;
    const paramsAtual = new URLSearchParams(window.location.hash.split("?")[1] || "");
    paramsAtual.set("ordem", novaOrdem);
    window.location.hash = `#resultados?${paramsAtual.toString()}`;
  });
  document.querySelectorAll("[data-oferta-id]").forEach((card) => {
    card.addEventListener("click", () => {
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
const resultados$1 = {
  url: "#resultados",
  label: "Resultados",
  icon: "search",
  pagina: resultados
};
const usuarios = [
  {
    id: "usuario-1",
    nome: "Arena Central Sports",
    email: "contato@arenacentral.com",
    telefone: "(11) 99999-1001",
    tipo: "estabelecimento"
  },
  {
    id: "usuario-2",
    nome: "Quadra do Vale",
    email: "atendimento@quadra-do-vale.com",
    telefone: "(11) 99999-1002",
    tipo: "estabelecimento"
  },
  {
    id: "usuario-3",
    nome: "Campo Verde Esportes",
    email: "contato@campoverde.com",
    telefone: "(11) 99999-1003",
    tipo: "estabelecimento"
  },
  {
    id: "usuario-4",
    nome: "Poli Arena",
    email: "atendimento@poliarena.com",
    telefone: "(11) 99999-1004",
    tipo: "estabelecimento"
  }
];
function detalhe(app2) {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const oferta = getOfertaPorId(params.get("id"));
  if (!oferta) {
    app2.innerHTML = `
      <section class="app-content empty-state card">
        <span class="empty-icon" aria-hidden="true">?</span>
        <h1>Oferta não encontrada</h1>
        <p>Este horário pode ter sido removido ou o link está inválido.</p>
        <a class="btn" href="#resultados">Ver ofertas</a>
      </section>
    `;
    return;
  }
  const publicador = usuarios.find((usuario) => usuario.id === oferta.publicadorId);
  app2.innerHTML = `
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
          <h2>${publicador?.nome || "Publicador"}</h2>
          <p>${publicador?.telefone || "Contato indisponível"}</p>
          <p>${publicador?.email || ""}</p>
        </article>
      </div>
    </section>
  `;
}
const detalhe$1 = {
  url: "#detalhe",
  label: "Detalhe",
  icon: "calendar",
  pagina: detalhe
};
let usuarioAtual = null;
function getUsuarioAtual() {
  return usuarioAtual;
}
const modalidades = ["Futebol", "Basquete", "Vôlei", "Poliesportivo"];
function publicar(app2) {
  const usuario = getUsuarioAtual();
  app2.innerHTML = `
    <section class="app-content page-publicar">
      <div class="page-header">
        <p class="eyebrow">Publicação</p>
        <h1>Disponibilize um horário</h1>
        <p>Informe as condições do espaço para que outras pessoas encontrem a oferta.</p>
      </div>

      ${`
        <div class="message message--error">
          <strong>Login necessário.</strong>
          <p>Faça login antes de publicar uma oferta.</p>
          <a class="btn btn--secondary" href="#conta">Acessar conta</a>
        </div>
      `}

      <form class="card form-card" id="form-publicacao" ${"hidden"} novalidate>
        <div class="form-group">
          <label for="estabelecimento">Estabelecimento</label>
          <input id="estabelecimento" name="estabelecimento" type="text" minlength="2" maxlength="80" required placeholder="Ex.: Arena Central">
        </div>
        <div class="form-group">
          <label for="modalidade">Modalidade</label>
          <select id="modalidade" name="modalidade" required>
            <option value="">Selecione um esporte</option>
            ${modalidades.map((modalidade) => `<option value="${modalidade}">${modalidade}</option>`).join("")}
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
  const form = document.getElementById("form-publicacao");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearValidation(form);
    if (!form.checkValidity()) {
      form.reportValidity();
      mostrarResultado("Preencha todos os campos com valores válidos.", "error");
      return;
    }
    const formData = new FormData(form);
    const oferta = {
      publicadorId: usuario.id,
      estabelecimento: formData.get("estabelecimento").trim(),
      modalidade: formData.get("modalidade"),
      bairro: formData.get("bairro").trim(),
      data: formData.get("data"),
      horaInicio: formData.get("horaInicio"),
      duracao: Number(formData.get("duracao")),
      preco: Number(formData.get("preco"))
    };
    if (verificarDuplicidade(oferta)) {
      mostrarResultado("Uma oferta com esses dados já existe. Escolha outra data ou horário.", "error");
      return;
    }
    const resultado = adicionarOferta(oferta);
    if (!resultado.sucesso) {
      mostrarResultado(resultado.erro, "error");
      return;
    }
    mostrarResultado(`Oferta publicada com sucesso! ID: ${resultado.oferta.id}.`, "success");
    form.reset();
  });
  function mostrarResultado(mensagem, tipo) {
    const elemento = document.getElementById("resultado-publicacao");
    elemento.className = `message message--${tipo}`;
    elemento.textContent = mensagem;
  }
}
function clearValidation(form) {
  form.querySelectorAll('[aria-invalid="true"]').forEach((campo) => campo.removeAttribute("aria-invalid"));
}
const publicar$1 = {
  url: "#publicar",
  label: "Publicar",
  icon: "plus",
  pagina: publicar
};
async function conta(app2) {
  app2.innerHTML = `
  
  `;
}
const conta$1 = {
  url: "#conta",
  label: "conta",
  icon: "user-round-arrow-left",
  pagina: conta
};
function naoEncontrada(app2) {
  app2.innerHTML = `
    <section class="app-content empty-state card">
      <span class="empty-icon" aria-hidden="true">404</span>
      <h1>Rota não encontrada</h1>
      <p>A página que você procura não existe ou mudou de endereço.</p>
      <a class="btn" href="#inicio">Voltar ao início</a>
    </section>
  `;
}
const naoEncontrada$1 = {
  url: "#404",
  label: "404",
  icon: "alert-circle",
  pagina: naoEncontrada
};
const mapaderotas = [
  inicio$1,
  resultados$1,
  detalhe$1,
  publicar$1,
  conta$1,
  naoEncontrada$1
];
function navbar(itemMenu) {
  const navbar2 = document.getElementById("navbar");
  navbar2.innerHTML = `
    <nav class="navbar" aria-label="Navegação principal">
      <ul class="navbar__list">
        ${itemMenu.filter((item) => item.url !== "#404").map((item) => `
            <li>
              <a href="${item.url}" class="navbar-item" data-route="${item.url}">
                <span>${item.label}</span>
              </a>
            </li>
          `).join("")}
      </ul>
    </nav>
  `;
}
const app = document.getElementById("app");
navbar(mapaderotas);
function renderizarPagina() {
  const hash = window.location.hash || "#inicio";
  const rota = mapaderotas.find((item) => item.url === hash);
  if (rota) {
    rota.pagina(app);
    return;
  }
  mapaderotas.find((item) => item.url === "#404").pagina(app);
}
window.addEventListener("hashchange", renderizarPagina);
renderizarPagina();
createIcons();
