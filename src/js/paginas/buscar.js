import produtos from '../paginas/produtos/produtos.js'

function buscar(app) {

    app.innerHTML = `
        <div class="container-buscar">

            <h2>Quadras e Campos</h2>

            <p class="subtitulo-buscar">
                Qual esporte você quer praticar?
            </p>

            <div class="grupo-input">

                <label for="input-busca">
                    <i data-lucide="search" id="icone-busca"></i>
                </label>

                <input
                    type="text"
                    id="input-busca"
                    placeholder="Esporte, local ou bairro"
                    aria-label="campo de busca por esporte"
                >

                <button id="btn-busca">
                    <i data-lucide="arrow-right"></i>
                </button>

            </div>

            <p class="busca-atencao"></p>

            <div class="esportes-busca">

                <p>Esportes</p>

                <ul class="esportes-lista">
                    <li class="lista-esportes">Futebol</li>
                    <li class="lista-esportes">Basquete</li>
                    <li class="lista-esportes">Vôlei</li>
                    <li class="lista-esportes">Tênis</li>
                    <li class="lista-esportes">Handebol</li>
                </ul>

            </div>

        </div>
    `

    adicionarEvento(app)
}

function adicionarEvento(app) {

    const botaoBusca = document.getElementById("btn-busca")
    const inputBusca = document.getElementById("input-busca")
    const listaEsportes = document.querySelectorAll(".lista-esportes")

    // Clique no botão de busca
    botaoBusca.addEventListener("click", () => {

        const termoBusca = inputBusca.value.trim()

        produtos.pagina(app, termoBusca)

    })

    // Clique em uma categoria de esporte
    listaEsportes.forEach(item => {

        item.addEventListener("click", () => {

            const esporte = item.textContent.trim()

            produtos.pagina(app, esporte)

        })

    })

}

export default {
    url: "#buscar",
    label: "buscar",
    icon: "search",
    pagina: buscar
}