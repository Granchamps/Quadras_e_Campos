import './produtos.css'
import listaDeHorarios from '../../dadosMockados/dados.js'
import mapa from '../../paginas/mapa.js'

function resultados(app, esporte = "", ordenacao = "") {

    let lista = esporte
        ? listaDeHorarios.filter(
            horario =>
                horario.esporte.toLowerCase() === esporte.toLowerCase()
        )
        : [...listaDeHorarios]

    if (ordenacao === "preco") {
        lista.sort((a, b) => a.preco - b.preco)
    }

    if (ordenacao === "horario") {
        lista.sort((a, b) =>
            a.horaInicio.localeCompare(b.horaInicio)
        )
    }

    app.innerHTML = `
        <h1>
            ${esporte ? `Quadras de ${esporte}` : "Quadras disponíveis"}
        </h1>

        <div class="ordenacao">
            <label for="ordenar">Ordenar por:</label>

            <select id="ordenar">
                <option value="" ${ordenacao === "" ? "selected" : ""}>
                    Selecione
                </option>

                <option value="preco" ${ordenacao === "preco" ? "selected" : ""}>
                    Menor preço
                </option>

                <option value="horario" ${ordenacao === "horario" ? "selected" : ""}>
                    Horário mais cedo
                </option>
            </select>
        </div>

        <div class="lista-resultados">
            ${
                lista.length === 0
                    ? "<p>Nenhuma quadra encontrada.</p>"
                    : lista.map(cartao).join("")
            }
        </div>
    `

    adicionarEvento(app, esporte)
}

function cartao(horario) {

    return `
        <div class="produto" data-id="${horario.id}">

            <div class="produto-imagem">

                ${
                    horario.img
                        ? `
                            <img
                                src="${horario.img}"
                                alt="Imagem de ${horario.estabelecimento}"
                                class="imagem-produto"
                            >
                        `
                        : ""
                }

                <h3>${horario.estabelecimento}</h3>

                <p>${horario.esporte}</p>

                <p>${horario.bairro}</p>

            </div>

            <div class="preco-distancia">

                <p class="preco-especial">
                    R$ ${horario.preco.toFixed(2)}
                </p>

                <p>
                    ${horario.data}
                </p>

                <p>
                    ${horario.horaInicio}
                </p>

                <p>
                    ${horario.duracao} minutos
                </p>

            </div>

        </div>
    `
}

function adicionarEvento(app, esporte) {

    const selectOrdenacao = document.getElementById("ordenar")

    selectOrdenacao.addEventListener("change", () => {

        const ordenacao = selectOrdenacao.value

        resultados(app, esporte, ordenacao)

    })

    document.querySelectorAll(".produto").forEach(card => {

        card.addEventListener("click", () => {

            const id = Number(card.dataset.id)

            const escolhido = listaDeHorarios.find(
                horario => horario.id === id
            )

            mapa.pagina(app, escolhido)

        })

    })
}

export default {
    url: "#produtos",
    label: "",
    icon: "shopping-basket",
    pagina: resultados
}