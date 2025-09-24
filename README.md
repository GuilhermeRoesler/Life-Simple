# One-Page para Farmácia de Manipulação

Aqui está o conteúdo para o arquivo `README.md`. Ele foi criado para ser bonito, informativo e fácil de usar, tanto para o desenvolvedor quanto para o cliente final.

<div align="center">
  <img src="https://emojicdn.elk.sh/🧪?style=google" alt="Tubo de Ensaio" width="100"/>
  <h1>One-Page: Farmácia de Manipulação</h1>
  <p>
    <strong>Um site moderno, responsivo e focado em conversão para uma farmácia de manipulação.</strong>
  </p>
  <p>
    <a href="#-funcionalidades-principais">Funcionalidades</a> •
    <a href="#-tecnologias-utilizadas">Tecnologias</a> •
    <a href="#-como-executar-o-projeto">Como Executar</a> •
    <a href="#-configuração-e-edição">Configuração</a> •
    <a href="#-estrutura-de-arquivos">Estrutura</a>
  </p>
</div>

> **Objetivo do Projeto:** Criar uma página única 100% funcional e responsiva, seguindo a identidade visual (verde e branco) do estilo OficialFarma. A página é projetada para capturar leads via WhatsApp e Instagram, apresentar um catálogo de produtos dinâmico e estar pronta para integração com um backend e APIs de chatbot.

---

## ✨ Funcionalidades Principais

Este projeto foi construído com foco na experiência do usuário e na facilidade de gerenciamento pelo cliente.

- **🎨 Design Moderno e Responsivo:** Interface limpa, com cores `verde` e `branco`, totalmente adaptada para dispositivos móveis (mobile-first).
- **⬆️ Header Fixo e Navegação Suave:** Menu sempre visível com links âncora que deslizam suavemente pela página.
- **🛍️ Catálogo de Produtos Filtrável:**
  - Duas categorias principais: **Emagrecimento** e **Academia**.
  - Busca por nome de produto implementada.
  - Cards de produto com informações essenciais e CTA para "Ver Detalhes".
- **🛒 Carrinho de Compras Simples:** Adicione produtos ao carrinho com persistência de dados no navegador (`localStorage`).
- **✏️ Gerenciamento de Conteúdo (Front-end):**
  - Um **"Modo Admin"** simples permite editar produtos diretamente na página.
  - As alterações são salvas localmente, prontas para serem integradas a um CMS ou API.
  - Funcionalidade de **Importar/Exportar** o catálogo de produtos em formato JSON.
- **💬 Chatbot Flutuante:** Widget de chat no canto da tela, com respostas mockadas e pronto para ser conectado a uma API real. O histórico da conversa é salvo na sessão do usuário.
- **📱 Integração Direta com Redes Sociais:**
  - Botões de WhatsApp e Instagram de fácil acesso.
  - Mensagens pré-prontas para o WhatsApp ao se interessar por um produto, facilitando o primeiro contato.
- **📝 Formulário de Contato com Validação:** Formulário completo com validação de campos e preparado para enviar dados para um endpoint de API.
- **♿ Acessibilidade:** Componentes desenvolvidos com boas práticas de acessibilidade (atributos `aria-*`, labels, contraste de cores).
- **🚀 Otimização:** Animações suaves, lazy loading de imagens para melhor performance e meta tags básicas para SEO.

---

## 🚀 Tecnologias Utilizadas

Para construir este projeto, escolhemos um stack moderno e robusto que garante performance e escalabilidade.

| Tecnologia            | Descrição                                                                                |
| :-------------------- | :--------------------------------------------------------------------------------------- |
| **React**             | Biblioteca JavaScript para construir interfaces de usuário componentizadas e reativas.   |
| **Tailwind CSS**      | Framework CSS utility-first para criar designs customizados de forma rápida e eficiente. |
| **Vite**              | Ferramenta de build extremamente rápida para desenvolvimento front-end moderno.          |
| **Lucide Icons**      | Biblioteca de ícones SVG minimalistas e de alta qualidade.                               |
| **JavaScript (ES6+)** | Linguagem base para toda a lógica do front-end.                                          |

---

## 🏁 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente de desenvolvimento local.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou `npm`

**Passo a passo:**

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/repo-farmacia.git](https://github.com/seu-usuario/repo-farmacia.git)
    cd repo-farmacia
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

---

## 🔧 Configuração e Edição

Tornamos o processo de edição o mais simples possível. A maioria das configurações importantes está centralizada em um único arquivo.

📍 **Arquivo de Configuração Principal:** `src/config.js`

```javascript
// src/config.js

export const CONFIG = {
  WHATSAPP_NUMBER: "5511912345678", // Apenas números, com código do país
  INSTAGRAM_URL:
    "[https://instagram.com/sua_farmacia](https://instagram.com/sua_farmacia)",
  CHATBOT_API_URL: "COLE_A_URL_DA_API_AQUI", // Placeholder para API do Chatbot
  CHATBOT_API_KEY: "COLE_A_CHAVE_DA_API_AQUI", // Placeholder para chave da API
  CONTACT_API_ENDPOINT: "/api/contact", // Endpoint do formulário de contato
};
```

### 📝 Editando Produtos do Catálogo (Modo Admin)

Para facilitar a vida do cliente, os produtos podem ser editados diretamente pelo navegador, sem precisar mexer no código.

1.  **Ativando o Modo Admin:**

    - Acesse o site e adicione `?admin=true` ao final da URL. Ex: `http://localhost:5173/?admin=true`.
    - Um botão "Editar" aparecerá nos cards de produto.

2.  **Editando um Produto:**

    - Clique em "Editar" no produto desejado.
    - Um painel lateral se abrirá com todos os campos do produto.
    - Altere as informações e clique em "Salvar". As mudanças são salvas no `localStorage` do seu navegador.

3.  **Exportando e Importando o Catálogo:**
    - No Modo Admin, botões para "Importar JSON" e "Exportar JSON" estarão visíveis na seção de produtos.
    - **Exportar:** Faz o download de um arquivo `produtos.json` com todos os itens do catálogo. Guarde este arquivo como backup!
    - **Importar:** Permite que você envie um arquivo `produtos.json` para carregar um novo catálogo de produtos.

> ⚠️ **Importante:** Os dados editados no Modo Admin ficam salvos **localmente**. Para que as mudanças sejam permanentes para todos os usuários, o desenvolvedor deve pegar o JSON exportado e atualizar o arquivo de produtos no código-fonte do projeto (em `src/data/mockProducts.js`).

### 🤖 Conectando o Chatbot

O chatbot já está com a interface pronta. Para conectá-lo a uma API real:

1.  Abra o arquivo `src/components/ChatbotWidget.jsx`.
2.  Localize os comentários `// TODO: Implementar lógica de fetch para a API real`.
3.  Substitua a lógica de _mock_ pela chamada `fetch` ou `axios` para a sua API, usando as variáveis `CHATBOT_API_URL` e `CHATBOT_API_KEY` do arquivo de configuração.

---

## 📂 Estrutura de Arquivos

O projeto é organizado de forma modular para facilitar a manutenção e escalabilidade.

```
/
├── public/
│   ├── favicon.ico
│   └── ... (outros assets públicos)
├── src/
│   ├── assets/
│   │   └── images/ (ilustrações, logos)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ChatbotWidget.jsx
│   │   └── ... (outros componentes)
│   ├── data/
│   │   └── mockProducts.js (dados iniciais dos produtos)
│   ├── hooks/
│   │   └── useLocalStorage.js (hook customizado)
│   ├── styles/
│   │   └── main.css (estilos globais e setup do Tailwind)
│   ├── App.jsx (componente principal que monta a página)
│   ├── config.js (arquivo central de configuração)
│   └── main.jsx (ponto de entrada da aplicação)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔮 Próximos Passos (Roadmap)

Este projeto é um protótipo funcional completo. Os próximos passos envolvem a integração com serviços de backend:

1.  **Backend - Formulário de Contato:**

    - Desenvolver o endpoint `/api/contact` que recebe os dados do formulário e os envia por e-mail ou salva em um banco de dados.

2.  **Backend - Gerenciamento de Produtos:**

    - Substituir o `localStorage` por uma API real para carregar e gerenciar os produtos.
    - O "Modo Admin" pode ser adaptado para fazer requisições `PUT`/`POST`/`DELETE` para esta API.

3.  **Backend - API do Chatbot:**
    - Conectar o widget do chatbot a um serviço de inteligência artificial ou plataforma de atendimento (ex: Dialogflow, Tawk.to, JivoChat).

---

<div align="center">
  <p>Feito com ❤️ e muito código!</p>
</div>
