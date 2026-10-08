import usuarios from '../dadosMockados/usuarios.js';
import { getOfertas } from '../servicos/ofertas.js';

let usuarioAtual = null;

export function login(email) {
  const usuario = usuarios.find(item =>
    item.email.toLocaleLowerCase('pt-BR') === email.trim().toLocaleLowerCase('pt-BR')
  );

  if (!usuario) {
    return { sucesso: false, usuario: null, erro: 'Usuário não encontrado' };
  }

  usuarioAtual = usuario;
  return { sucesso: true, usuario, erro: null };
}

export function logout() {
  usuarioAtual = null;
}

export function getUsuarioAtual() {
  return usuarioAtual;
}

export function getOfertasDoUsuario(idUsuario) {
  if (!idUsuario) return [];
  return getOfertas().filter(oferta => oferta.publicadorId === idUsuario);
}
