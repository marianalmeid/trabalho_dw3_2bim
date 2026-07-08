# API - Sistema de Gestão de Confeitaria

## Sobre o projeto

Sistema de gerenciamento de uma confeitaria, permitindo o controle de clientes, produtos, pedidos e entregas.
A API permite cadastrar produtos, controlar pedidos realizados pelos clientes e acompanhar o processo de entrega.

API RESTful desenvolvida em **Node.js**, utilizando **Fastify**, **PostgreSQL** e documentação com **Swagger**.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js (versão 20 ou superior)
* npm (instalado junto com o Node.js)
* PostgreSQL

## 1. Clonar o repositório

```bash
git clone https://github.com/marianalmeid/trabalho_dw3_2bim
```

Entre na pasta do projeto:

```bash
cd projeto

depois

cd src
```

## 2. Instalar as dependências

Execute o comando abaixo para instalar todas as dependências do projeto:

```bash
npm install
```

Caso seja necessário instalar manualmente cada uma delas:

```bash
npm install fastify
npm install pg
npm install dotenv
npm install @fastify/swagger
npm install @fastify/swagger-ui
npm install @fastify/cors
```

Para dependências de desenvolvimento:

```bash
npm install -D nodemon
```

## 3. Configurar o banco de dados
## Banco de dados

O projeto utiliza Supabase(PostgreSQL).
Incluindo os relacionamentos:
- Cliente → Pedidos (1:N)
- Pedido → Entrega (1:1)
- Pedido → Produtos (N:N)

Para conectar o banco de dados, na raiz do projeto, crie um arquivo chamado `.env` contendo:

```
DATABASE_URL=postgresql://postgres.etpznabofmsoqydwxtju:LSv0vgxvKD9traxR@aws-1-us-west-2.pooler.supabase.com:6543/postgres
PORT=3333
```
Ou utilize o script no arquivo "database.sql"


## 4. Criar as tabelas

Execute o script SQL disponibilizado no projeto para criar todas as tabelas do banco de dados.

## 5. Executar o projeto


```bash
node server.js
```

## 6. Acessar a aplicação

Servidor:

```
http://localhost:3333
```

Documentação Swagger:

```
http://localhost:3333/docs
```

## Tecnologias utilizadas

* Node.js
* Fastify
* PostgreSQL
* pg
* dotenv
* Swagger (OpenAPI)


### Descrição das pastas

projeto
│
├── src
│ │
│ ├── database
│ │ └── connection.js
│ │
│ ├── features
│ │ │
│ │ ├── clientes
│ │ │ ├── cliente.controller.js
│ │ │ ├── cliente.repository.js
│ │ │ ├── cliente.routes.js
│ │ │ └── cliente.service.js
│ │ │
│ │ ├── produtos
│ │ │ ├── produto.controller.js
│ │ │ ├── produto.repository.js
│ │ │ ├── produto.routes.js
│ │ │ └── produto.service.js
│ │ │
│ │ ├── pedidos
│ │ │ ├── pedido.controller.js
│ │ │ ├── pedido.repository.js
│ │ │ ├── pedido.routes.js
│ │ │ └── pedido.service.js
│ │ │
│ │ └── entregas
│ │   ├── entrega.controller.js
│ │   ├── entrega.repository.js
│ │   ├── entrega.routes.js
│ │   └── entrega.service.js
│ │
│ ├── shared
│ │ └── AppError.js
│ │
│ └── server.js
│
├── database.sql
├── .env
├── package.json
├── package-lock.json
└── README.md

### `src/features`
Contém os módulos principais da aplicação. Cada funcionalidade possui suas próprias camadas:

- **Routes:** define os endpoints da API e configura a documentação Swagger.
- **Controller:** recebe as requisições HTTP e retorna as respostas.
- **Service:** contém as regras de negócio da aplicação.
- **Repository:** realiza a comunicação com o banco PostgreSQL utilizando `pg` e Pool.

### `src/database`
Responsável pela configuração da conexão com o banco de dados PostgreSQL.

### `src/shared`
Contém recursos compartilhados pela aplicação, como o tratamento de erros personalizados (`AppError`).

### `database.sql`
Arquivo responsável pela criação das tabelas e relacionamentos do banco de dados.

### `.env`
Arquivo com as variáveis de ambiente, como conexão do banco e porta da aplicação.

## Regras de negócio
- Não permite cadastrar clientes com email duplicado.
- Não permite criar pedidos para clientes inexistentes.