import { createIcons } from 'lucide';
import { mapaderotas } from './rotas/rotas.js';
import { navbar } from './navbar/navbar.js';

const app = document.getElementById('app');
navbar(mapaderotas);

function renderizarPagina() {
  const hash = window.location.hash || '#inicio';
  const rota = mapaderotas.find(item => item.url === hash);

  if (rota) {
    rota.pagina(app);
    return;
  }

  mapaderotas.find(item => item.url === '#404').pagina(app);
}

window.addEventListener('hashchange', renderizarPagina);
renderizarPagina();
createIcons();
