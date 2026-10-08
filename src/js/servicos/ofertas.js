import ofertasIniciais from '../dadosMockados/ofertas.js';

const ofertas = [...ofertasIniciais];
let proximoId = 13;

export function getOfertas() {
  return [...ofertas];
}

export function getOfertaPorId(id) {
    return ofertas.find(oferta => String(oferta.id) === String(id));
}

export function buscarOfertas({ termo = '', esporte = '', ordem = 'data' } = {}) {
  const busca = termo.trim().toLocaleLowerCase('pt-BR');

  const resultados = ofertas.filter(oferta => {
    const correspondeTermo = !busca || [
      oferta.estabelecimento,
      oferta.modalidade,
      oferta.bairro
    ].some(valor => valor.toLocaleLowerCase('pt-BR').includes(busca));

    const correspondeEsporte = !esporte || oferta.modalidade === esporte;
    return correspondeTermo && correspondeEsporte;
  });

  return [...resultados].sort((a, b) => {
    if (ordem === 'preco') {
      return a.preco - b.preco || a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio);
    }

    return a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio);
  });
}

export function verificarDuplicidade(oferta) {
  return ofertas.some(item =>
    item.estabelecimento === oferta.estabelecimento &&
    item.data === oferta.data &&
    item.horaInicio === oferta.horaInicio
  );
}

export function adicionarOferta(oferta) {
  if (verificarDuplicidade(oferta)) {
    return { sucesso: false, oferta: null, erro: 'Oferta duplicada' };
  }

  const registrada = {
    ...oferta,
    id: `oferta-${proximoId++}`
  };

  ofertas.push(registrada);
  return { sucesso: true, oferta: registrada, erro: null };
}
