# Plano de Desenvolvimento — Webapp de Quadras e Campos

> **Base do Projeto:** *Desafio 1 — O mesmo esqueleto, outro negócio* (FATEC Mogi das Cruzes).
>
> **Objetivo:** Construir um aplicativo web de seis telas, com dados mockados, seguindo a mesma arquitetura do **KiOferta**, além de documentar o processo em um relatório técnico de 3 a 5 páginas.
>
> **Prazo de referência:** 1 semana.

---

## 🧭 Metodologia Recomendada

Organizar o trabalho como um pequeno projeto de desenvolvimento de software:
1. **Definir** o funcionamento do produto.
2. **Combinar** a arquitetura entre os três integrantes.
3. **Desenvolver** as partes em paralelo.
4. **Integrar, testar e documentar**.

---

## 1. Definir o que o Aplicativo vai Resolver

### Problema
Descobrir qual quadra ou campo está disponível no sábado exige ligar para vários estabelecimentos. O aplicativo facilita a busca e a comparação de horários disponíveis e seus respectivos preços.

### Pergunta Central
> **"Onde posso encontrar uma quadra ou campo disponível no horário desejado, por um preço que caiba no meu orçamento?"**

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

### Mapa de Equivalência (Obrigatório no Relatório)

| Conceito no KiOferta | Equivalente em Quadras e Campos |
| --- | --- |
| **Produto** | Horário esportivo disponível |
| **Oferta** | Horário publicado por um estabelecimento |
| **Mercado** | Estabelecimento, quadra/campo e localização |
| **Preço** | Valor cobrado pelo horário |
| **Distância** | Sugestão: Dia e horário desejados |
| **Contribuinte** | Usuário que publica uma oferta |
| **Visitante** | Pessoa que consulta as ofertas |

> 💡 **Decisão recomendada:** Cada registro deve representar um **horário disponível** (e não um estabelecimento inteiro).

---

## 3. Planejar as Seis Telas Obrigatórias

| Tela | Tipo | Funcionalidades / Requisitos |
| --- | --- | --- |
| **1. Início** | Busca | Campo de busca em destaque e atalhos por esporte (*Futebol, Basquete, Vôlei, Poliesportivo*). O termo digitado é enviado para a tela de resultados. |
| **2. Resultados** | Listagem | Listar horários, modalidade, estabelecimento, dia, horário e preço. Implementar busca com `filter`, exibição com `map` + `join`, dois critérios de ordenação e estado vazio. |
| **3. Detalhe** | Consulta | Informações completas da oferta, estabelecimento e publicador. Registro encontrado via `find` pelo ID vindo da URL. |
| **4. Publicar** | Formulário | Cadastrar oferta (estabelecimento, modalidade, localidade, data, horário, duração e preço). Validação HTML/JS e bloqueio de duplicações. |
| **5. Minha Conta** | Sessão | Login simulado, erro para usuário inexistente, identificação do usuário ativo, listagem das ofertas criadas por ele e botão Sair. |
| **6. Rota Inexistente** | 404 | Mensagem de página não encontrada com link para voltar ao início (acionada quando o roteador devolve `undefined`). |

---

## 4. Definir os Dados Antes de Programar

### Requisitos Mínimos
- **12 registros** (ofertas)
- **4 publicadores**
- **4 usuários**

### Estrutura Conceitual

```javascript
// Ofertas
{
  id: "1",
  publicadorId: "u101",
  estabelecimento: "Arena Central",
  modalidade: "Futebol",
  bairro: "Jundiapeba",
  data: "2026-10-10",
  horaInicio: "15:00",
  duracao: "60 min",
  preco: 120.00
}

// Usuários
{
  id: "u101",
  nome: "Arena Central Sports",
  email: "contato@arenacentral.com"
}
```

### Regras do Grupo
- Cada oferta deve conter um `publicadorId` válido apontando para um usuário existente.
- Variedade de modalidades, bairros, preços e horários nos dados mockados.
- **Critérios de ordenação sugeridos:** Menor preço e horário mais próximo.
- **Regra de duplicidade:** Recusar nova oferta com mesmo *estabelecimento*, *mesma quadra*, *mesma data* e *mesmo horário*.

---

## 5. Organizar a Arquitetura do Projeto

### Estrutura de Pastas Obrigatória

```
src/
├── index.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   └── style.css
├── js/
│   ├── main.js
│   ├── rotas/
│   │   └── rotas.js
│   ├── navbar/
│   │   └── navbar.js
│   ├── sessao/
│   │   └── sessao.js
│   ├── dadosMockados/
│   │   ├── ofertas.js
│   │   └── usuarios.js
│   └── paginas/
│       ├── inicio/
│       ├── resultados/
│       ├── detalhe/
│       ├── publicar/
│       ├── conta/
│       └── naoEncontrada/
```

### Restrições Técnicas
- **JavaScript:** Utilizar ES6 Modules, `find`, `filter`, `map` e `join`.
- **CSS:** Estilização baseada 100% em **Flexbox** (sem CSS Grid, sem Tailwind, sem Bootstrap).
- **Variáveis:** Centralizar cores e espaçamentos em `tokens.css`. Apenas **uma cor de destaque por tela**.
- **Responsividade:** Layout utilizável em telas a partir de **360px**, sem rolagem horizontal (`overflow-x`).
- **Navegação:** Menu gerado dinamicamente via `rotas.js`. Navegação deve resistir à atualização via F5.

---

## 6. Divisão de Tarefas

| Integrante | Responsabilidade | Entregáveis |
| --- | --- | --- |
| **Integrante A** | Dados, Início e Resultados | Base de dados mockados, Tela de Início, Tela de Resultados com busca, ordenação e mensagem de estado vazio. |
| **Integrante B** | Detalhe e Publicação | Tela de Detalhes, Formulário de Publicação, validações HTML/JS e prevenção de registros repetidos. |
| **Integrante C** | Fundação, Conta e Navegação | `tokens.css`, `base.css`, módulo de sessão (`sessao.js`), Tela de Conta e Tela 404 (Rota inexistente). Coordenação de `rotas.js` e `navbar.js`. |

*Nota: Cada integrante desenvolve e estiliza o CSS de suas respectivas telas.*

---

## 7. Cronograma Sugerido (7 Dias)

- **Dia 1 — Planejamento e Contrato Técnico:** Definir pergunta central, modelo de dados, regra de duplicidade, rotas e repositório no GitHub.
- **Dia 2 — Fundação e Dados Mockados:** Criar estilos compartilhados (`tokens.css`), base mockada e testar o roteador por hash.
- **Dias 3 e 4 — Desenvolvimento Paralelo:** Construção das telas por cada integrante e testes isolados.
- **Dia 5 — Integração Completa:** Conectar todas as telas, testar navegação de ponta a ponta e tratar erros.
- **Dia 6 — Testes, Capturas e Relatório:** Testes em viewport 360px, capturas de tela obrigatórias e escrita do relatório (PDF).
- **Dia 7 — Ensaio e Entrega:** Teste de instalação limpa (`npm install` e `npm run dev`), ensaio da apresentação de 8 minutos e submissão.

---

## 8. Relatório Técnico (PDF, 3 a 5 páginas)

### Seções Obrigatórias

1. **R1. O problema e quem usa:** Pergunta central e as 3 situações de uso.
2. **R2. Mapa de equivalência:** Tabela preenchida comparando KiOferta ao tema.
3. **R3. A estrutura:** Árvore de arquivos e descrição curta da função de cada um.
4. **R4. Três decisões e um descartado:** Três escolhas técnicas/design com justificativa e uma opção descartada.
5. **R5. Divisão de tarefas:** Tabela real com os números dos commits de cada integrante.
6. **R6. Duas dificuldades reais:** Erro encontrado, hipótese levantada e causa real identificada.
7. **R7. O que ficou de fora:** Funcionalidades e limitações assumidas justificadas.

### Capturas de Tela Obrigatórias
- As seis telas em exibição de 360px de largura.
- Mensagem de erro no login inválido.
- Estado vazio da busca (sem resultados).

---

## 9. Checklist de Validação Antes da Entrega

- [ ] As 6 telas estão operacionais e acessíveis.
- [ ] Pressionar F5 mantém a navegação ou envia para a tela 404.
- [ ] A busca filtra os resultados e mostra mensagem de estado vazio quando nada for encontrado.
- [ ] Funcionam os 2 critérios de ordenação.
- [ ] A tela de detalhe localiza o item pelo ID correto via `find`.
- [ ] Formulário de publicação valida entradas e recusa duplicatas.
- [ ] A tela de conta exibe o perfil logado e filtra apenas as suas publicações.
- [ ] Erro de login exibe aviso e a função de Logout funciona.
- [ ] Base possui pelo menos 12 ofertas, 4 publicadores e 4 usuários.
- [ ] Sem CSS Grid, sem frameworks e sem largura fixa em elementos flexíveis.
- [ ] Layout perfeitamente adaptado para 360px sem rolagem horizontal.
- [ ] Menu do cabeçalho gerado via JavaScript a partir de `rotas.js`.
- [ ] Histórico do Git possui commits individuais dos 3 integrantes.
- [ ] Projeto roda em ambiente limpo com `npm install` e `npm run dev`.

---

## 10. Roteiro da Apresentação (8 Minutos)

| Tempo | Etapa | Foco da Demonstração |
| --- | --- | --- |
| **1 min** | O problema | Tema e pergunta central explicados em uma frase. |
| **2 min** | O fluxo | Fazer uma busca, abrir detalhe, publicar oferta e acessar a conta (em 360px). |
| **3 min** | O código | Explicar onde estão o `find` e o `filter` no código (cada integrante fala do seu trecho). |
| **1 min** | A decisão | Apresentar uma decisão técnica e o que foi descartado. |
| **1 min** | A pergunta | Responder à arguição do professor sobre Flexbox / DevTools (contêiner pai vs. filho). |