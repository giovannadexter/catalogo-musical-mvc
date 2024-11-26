# 🎵 Catálogo Musical da Gigi 🎶

Este é um projeto de gerenciamento de álbuns musicais, desenvolvido utilizando o padrão MVC com **Node.js**, **Express**, **SQLite** e **Sequelize**. Esse projeto é parte da disciplina de Desenvolvimento Web MVC.

## Funcionalidades da Aplicação

A aplicação deve ser capaz de gerenciar os seguintes dados:

- **Discos**:
  - Cada disco terá um título, ano de lançamento, capa (imagem) e uma lista de faixas.

- **Artistas**:
  - Cada artista terá um nome, gênero musical e uma lista de discos em que participou.

- **Gêneros**:
  - Os discos, artistas e faixas devem estar associados a um ou mais gêneros musicais.

---

### Funcionalidades Principais

- O usuário poderá cadastrar novos discos, informando título, ano de lançamento, capa e faixas.
- O usuário poderá cadastrar novos artistas, associando-os a discos já existentes.
- O sistema deverá apresentar uma lista de discos disponíveis, com informações sobre o artista, ano de lançamento e faixas.
- O usuário poderá buscar discos e artistas, aplicando filtros por título, artista ou gênero musical.
- O sistema deverá permitir a **edição** e **remoção** de discos, artistas e gêneros.


---

## 🚀 Tecnologias Utilizadas

- **Back-End**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Sequelize ORM](https://sequelize.org/) 
  - [SQLite](https://www.sqlite.org/index.html)
  - [DB BROWSER](https://sqlitebrowser.org)
 
- **Front-End**:
  - HTML
  - CSS
 
  
## 🛠️ Instalação

Siga as etapas abaixo para configurar e executar o projeto localmente:

1. **Clone este repositório:**
    ```bash
   git clone https://github.com/seu-usuario/catalogo-musical-mvc.git

3. Navegue até o diretório do projeto:
   ```bash
   cd catalogo-musical-mvc

5. Instale as dependências:
    ```bash
    npm install
    
6. Inicie o banco de dados:

 Certifique-se de que o arquivo `catalogo.sqlite` esteja na pasta `db/`.
 Se o banco não existir, crie as tabelas executando:

   ```bash
    npx sequelize-cli db:migrate
   ```
6. Inicie o servidor:
    ```bash
   cd src  
   node app.js







