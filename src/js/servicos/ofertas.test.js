import test from 'node:test';
import assert from 'node:assert/strict';

import {
  adicionarOferta,
  buscarOfertas,
  getOfertaPorId,
  verificarDuplicidade
} from './ofertas.js';

test('localiza uma oferta pelo ID', () => {
  assert.equal(getOfertaPorId('oferta-1').estabelecimento, 'Arena Central');
  assert.equal(getOfertaPorId('oferta-inexistente'), undefined);
});

test('filtra por esporte e ordena por preço', () => {
  const resultados = buscarOfertas({ esporte: 'Futebol', ordem: 'preco' });

  assert.equal(resultados.length, 3);
  assert.deepEqual(resultados.map(oferta => oferta.preco), [95, 120, 130]);
});

test('rejeita uma oferta duplicada pelo estabelecimento, data e horário', () => {
  const ofertaDuplicada = {
    publicadorId: 'usuario-1',
    estabelecimento: 'Arena Central',
    modalidade: 'Futebol',
    bairro: 'Jundiapeba',
    data: '2026-10-10',
    horaInicio: '15:00',
    duracao: 60,
    preco: 120
  };

  assert.equal(verificarDuplicidade(ofertaDuplicada), true);
  assert.deepEqual(adicionarOferta(ofertaDuplicada), {
    sucesso: false,
    oferta: null,
    erro: 'Oferta duplicada'
  });
});

test('adiciona uma oferta válida e retorna o registro criado', () => {
  const oferta = {
    publicadorId: 'usuario-1',
    estabelecimento: 'Arena Experimental',
    modalidade: 'Futebol',
    bairro: 'Jundiapeba',
    data: '2026-12-01',
    horaInicio: '16:00',
    duracao: 60,
    preco: 80
  };

  const resultado = adicionarOferta(oferta);

  assert.equal(resultado.sucesso, true);
  assert.match(resultado.oferta.id, /^oferta-\d+$/);
  assert.equal(getOfertaPorId(resultado.oferta.id), resultado.oferta);
});
