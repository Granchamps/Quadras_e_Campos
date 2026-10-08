function navbar(itemMenu) {
  const navbar = document.getElementById('navbar');

  navbar.innerHTML = `
    <nav class="navbar" aria-label="Navegação principal">
      <ul class="navbar__list">
        ${itemMenu
          .filter(item => item.url !== '#404')
          .map(item => `
            <li>
              <a href="${item.url}" class="navbar-item" data-route="${item.url}">
                <span>${item.label}</span>
              </a>
            </li>
          `).join('')}
      </ul>
    </nav>
  `;
}

export { navbar };