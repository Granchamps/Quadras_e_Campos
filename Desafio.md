# Desafio 1: O mesmo esqueleto, outro negócio

> **Disciplina:** Desenvolvimento Web / Front-end
>
> **Instituição:** FATEC Mogi das Cruzes
>
> **Curso:** Análise e Desenvolvimento de Sistemas

## 📌 Sobre o Projeto

Este projeto consiste na implementação de uma aplicação web de página única (*Single Page Application* - SPA), sem o uso de frameworks JavaScript ou CSS, mantendo o padrão arquitetural e de modularização estruturado durante as aulas (modelo **KiOferta**).

A aplicação utiliza dados mockados, roteamento por *hash* (`window.location.hash`), estilização exclusiva via **Flexbox** (com variáveis CSS em `tokens.css`), e componentes modulares dinâmicos em JavaScript ES6+.

## 👥 Integrantes do Grupo e Divisão de Tarefas

| Integrante | Responsabilidade Principal | Entregáveis / Módulos | 
| ----- | ----- | ----- | 
| **Integrante A** | Dados e Descoberta | Estruturação de `dadosMockados/`, Tela de Início (`/`) e Tela de Resultados (`/resultados`), com busca e ordenação. | 
| **Integrante B** | Detalhe e Publicação | Tela de Detalhe (`/detalhe`), Formulário de Publicar (`/publicar`), validações de formulário e tratamento de duplicações. | 
| **Integrante C** | Conta e Fundação | Configuração de `tokens.css` e `base.css`, módulo de sessão (`sessao.js`), Tela de Minha Conta (`/conta`) e Tela 404 (`/404`). | 

## 🎯 Tema Sorteado e Pergunta Central

* **Tema Sorteado:** *\[ Preencher com o tema sorteado, ex: Carona Universitária / Troca de Livros / Vagas de Estágio \]*

* **Pergunta Principal:** *\[ Escreva aqui a frase única que responde à necessidade do usuário. Ex: "Consigo uma carona segura e barata para a Fatec no horário da manhã?" \]*

## 🗺️ Mapa de Equivalência (KiOferta vs. Nosso Negócio)

| Conceito no KiOferta | Conceito no Nosso Tema | Exemplo Prático | 
| ----- | ----- | ----- | 
| **Produto** | *\[ O que a pessoa procura \]* | *Ex: Trecho Mogi das Cruzes -> Fatec* | 
| **Oferta** | *\[ O registro publicado \]* | *Ex: Carona amanhã às 07:00h* | 
| **Mercado** | *\[ Quem oferece / Onde ocorre \]* | *Ex: Motorista e Ponto de Saída* | 
| **Preço** | *\[ Critério principal de decisão \]* | *Ex: Valor do combustível/vaga (\$)* | 
| **Distância** | *\[ Segundo critério de decisão \]* | *Ex: Horário de saída* | 
| **Contribuinte** | *\[ Quem publica / cadastra \]* | *Ex: Motorista cadastrado* | 
| **Visitante** | *\[ Quem apenas consulta \]* | *Ex: Aluno procurando carona* | 

## 📂 Estrutura de Pastas e Arquivos

```
src/
├── index.html              # Página única contendo o <header> (menu) e <main id="app">
├── css/
│   ├── tokens.css          # Variáveis CSS (cores, espaçamentos, tipografia)
│   ├── base.css            # Reset CSS e estilos globais
│   └── style.css           # Arquivo principal que importa os demais CSS
├── js/
│   ├── main.js             # Ponto de entrada da aplicação
│   ├── rotas/
│   │   └── rotas.js        # Roteador por Hash e lista de rotas
│   ├── navbar/
│   │   └── navbar.js       # Geração dinâmica do menu a partir das rotas
│   ├── sessao/
│   │   └── sessao.js       # Gestão de estado (entrar, sair, usuarioAtual)
│   ├── dadosMockados/      # Base de dados em JS (mínimo 12 registros, 4 usuarios, 4 publicadores)
│   └── paginas/            # Módulos de cada tela (cada um com seu JS e CSS exclusivo)
│       ├── inicio/
│       ├── resultados/
│       ├── detalhe/
│       ├── publicar/
│       ├── conta/
│       └── 404/
└── docs/
    └── Relatorio_Desafio1.pdf  # Relatório completo do projeto

```

## 🖥️ Mapeamento das Seis Telas

1. **Início (`/`)**: Campo de busca proeminente e atalhos por categorias.

2. **Resultados (`/resultados`)**: Lista interativa com suporte a filtros/ordenação (`filter`, `map`, `join`) e tratamento de estado vazio (`length === 0`).

3. **Detalhes (`/detalhe?id=X`)**: Visualização completa de um item individual localizado via `find` pelo ID.

4. **Publicar (`/publicar`)**: Formulário de inserção validado em HTML/JS, evitando duplicados.

5. **Minha Conta (`/conta`)**: Módulo de login simples, exibição de perfil e gerenciamento dos registros criados pelo usuário logado.

6. **Rota Inexistente (`/404`)**: Tratamento para URLs inválidas ou não encontradas.

## 🚀 Como Executar o Projeto

### Pré-requisitos

* **Node.js** instalado na máquina.

### Passo a Passo

1. **Clonar o repositório:**

   ```
   git clone https://github.com/seu-usuario/seu-repositorio.git
   
   ```

2. **Navegar até o diretório do projeto:**

   ```
   cd seu-repositorio
   
   ```

3. **Instalar as dependências:**

   ```
   npm install
   
   ```

4. **Executar o servidor de desenvolvimento:**

   ```
   npm run dev
   
   ```

5. **Acessar a aplicação:**
   Abra o navegador no endereço indicado pelo console (geralmente `http://localhost:5173` ou similar).

## 📋 Regras de Design e Desenvolvimento Aplicadas

* 🎨 **Layout 100% Flexbox:** Sem uso de CSS Grid ou frameworks externos (Bootstrap, Tailwind, etc.).

* 📱 **Mobile-First & Responsividade:** Projetado e testado para funcionamento impecável a partir de **360px** de largura sem rolagem horizontal.

* 🎨 **Tokens de Design:** Todas as cores e espaçamentos derivam estritamente de `tokens.css`.

* ⚡ **Sem Dependência de Backend:** Dados mantidos e manipulados em memória local via JavaScript puro.

* 📄 **Documentação:** Relatório em PDF disponível na pasta `docs/`.