# Desafio 1: O mesmo esqueleto, outro negócio

> **Disciplina:** Eletiva Programação para Dispositivos Moveis (WEB) / Front-end
>
> **Instituição:** FATEC Mogi das Cruzes
>
> **Curso:** Análise e Desenvolvimento de Sistemas

## 📌 Sobre o Projeto

Este projeto consiste na implementação de uma aplicação web de página única (*Single Page Application* - SPA), sem o uso de frameworks JavaScript ou CSS, mantendo o padrão arquitetural e de modularização estruturado durante as aulas (modelo **KiOferta**).

A aplicação utiliza dados mockados, roteamento por *hash* (`window.location.hash`), estilização exclusiva via **Flexbox** (com variáveis CSS em `tokens.css`), e componentes modulares dinâmicos em JavaScript ES6+.

## 👥 Integrantes do Grupo e Divisão de Tarefas

Integrante A - Allan Granchamps Fernandes Vieira
Integrante B - Joao Vitor Gomes Vasconcelos
Integrante C - Thiago do Espirito Santo Corrêa

## Base do Projeto:
Desafio 1 — O mesmo esqueleto, outro negócio* (FATEC Mogi das Cruzes).

## Objetivo:
Construir um aplicativo web de seis telas, com dados mockados, seguindo a mesma arquitetura do **KiOferta**, além de documentar o processo em um relatório técnico de 3 a 5 páginas.

## 1. Definir o que o Aplicativo vai Resolver

### Problema
Descobrir qual quadra ou campo está disponível no sábado exige ligar para vários estabelecimentos. O aplicativo facilita a busca e a comparação de horários disponíveis e seus respectivos preços.

### Pergunta Central
"Onde posso encontrar uma quadra ou campo disponível no horário desejado, por um preço que caiba no meu orçamento?"

### Escopo
Descoberta e comparação de horários anunciados por estabelecimentos esportivos, **sem reserva ou pagamento reais**.

### Perfis de Usuário (Situações de Uso)
1. **Grupo de Amigos:** Quer jogar futebol no sábado à tarde e procura um campo com preço acessível.
2. **Praticante de Esporte:** Procura uma quadra de vôlei ou basquete em determinado bairro e horário.
3. **Responsável por Estabelecimento:** Publica um horário disponível, informa o valor e permite que outras pessoas encontrem a oferta.

### Escopo da Primeira Versão
- Buscar horários por esporte, localidade e texto.
- Listar ofertas de horários disponíveis.
- Ordenar os resultados por preço e outro critério.
- Consultar detalhes de uma oferta.
- Publicar um novo horário disponível.
- Entrar em uma conta simulada e visualizar os próprios registros.

> ⚠️ **Limite Importante:** Não há backend, banco de dados ou autenticação real. Os dados residem em arquivos JavaScript locais e não precisam persistir após o recarregamento da página (F5).

---

## 2. Transformar o Tema em Funcionalidades Concretas

### Exemplos de Oferta
- **Futebol:** Campo society, sábado, 15h-16h, R$ 120/hora, Bairro Jundiapeba.
- **Quadras Esportivas:** Quadra poliesportiva, domingo, 10h-11h, R$ 80/hora, Centro.

## Execução do sistema

Utilização de Node.js e o Capacitor

npm install
npm run dev
