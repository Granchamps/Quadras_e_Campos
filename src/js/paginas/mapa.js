import listaDeUsuarios from '../dadosMockados/usuarios.js'

function mapa(app, horario) {

    if (!horario) {
        app.innerHTML = `
            <h1>Detalhes da quadra</h1>
            <p>Nenhuma oferta selecionada.</p>
        `
        return
    }

    const publicador = listaDeUsuarios.find(
        usuario => usuario.id === horario.publicadorId
    )

    app.innerHTML = `
        <div class="detalhe-oferta">

            <h1>${horario.estabelecimento}</h1>

            ${
                horario.img
                    ? `
                        <img 
                            src="${horario.img}" 
                            alt="Imagem de ${horario.estabelecimento}"
                            class="imagem-detalhe"
                        >
                    `
                    : ""
            }

            <section class="informacoes-oferta">

                <h2>Informações da quadra</h2>

                <p>
                    <strong>Esporte:</strong>
                    ${horario.esporte}
                </p>

                <p>
                    <strong>Bairro:</strong>
                    ${horario.bairro}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${horario.data}
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${horario.horaInicio}
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${horario.duracao} minutos
                </p>

                <p>
                    <strong>Preço:</strong>
                    R$ ${horario.preco.toFixed(2)}
                </p>

            </section>

            <section class="informacoes-publicador">

                <h2>Publicado por</h2>

                ${
                    publicador
                        ? `
                            <p>
                                <strong>Nome:</strong>
                                ${publicador.nome}
                            </p>

                            <p>
                                <strong>Contato:</strong>
                                ${publicador.telefone}
                            </p>
                        `
                        : "<p>Publicador não encontrado.</p>"
                }

            </section>

        </div>
    `

    location.hash = "#mapa"
}

export default {
    url: "#mapa",
    label: "detalhe",
    icon: "map",
    pagina: mapa
}