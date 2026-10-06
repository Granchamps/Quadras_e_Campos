function navbar(item_menu){
const navbar = document.getElementById('navbar');
navbar.innerHTML = `
<nav class="navbar">
        ${
            item_menu.filter(menu=> menu.label !== "")
            .map((item)=>{
                return `<li>
                            <a href="${item.url}" class="navbar-item navbar-item__icon">
                                <i data-lucide="${item.icon}"></i>  
                                ${item.label}
                            </a>
                        </li>`
            }).join('')
        }
</nav>
<button style="position:fixed; top: 50%; right: 30%; border-radius: 50%; width: 50px; z-index: 2;">
    <i data-lucide="message-circle"></i>
</button>
<button style="position:fixed; top: 50%; right: 33%; border-radius: 50%; width: 50px; z-index: 3; background-color: red;">
    <i data-lucide="message-circle"></i>
</button>
`;

}

export { navbar };