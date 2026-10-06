import buscar from '../paginas/buscar.js'
import enviar from '../paginas/enviar.js'
import mapa from '../paginas/mapa.js'
import favorito from '../paginas/favorito.js'
import conta from '../paginas/conta.js'
import sorteio from '../paginas/sorteios/sorteio.js'

const mapaderotas = [
    buscar,
    mapa,
    enviar,
    favorito,
    conta,
    sorteio
]

export { mapaderotas }