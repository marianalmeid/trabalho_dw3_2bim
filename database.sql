-- =========================
-- TABELA CLIENTES
-- =========================

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);


-- =========================
-- TABELA PRODUTOS
-- =========================

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    estoque INTEGER NOT NULL
);


-- =========================
-- TABELA PEDIDOS
-- Cliente 1:N Pedido
-- =========================

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    cliente_id INTEGER NOT NULL,
    valor_total NUMERIC(10,2) NOT NULL,

    CONSTRAINT fk_pedido_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(id)
);


-- =========================
-- TABELA ENTREGAS
-- Pedido 1:1 Entrega
-- =========================

CREATE TABLE entregas (
    id SERIAL PRIMARY KEY,
    endereco VARCHAR(200) NOT NULL,
    status VARCHAR(50) NOT NULL,

    pedido_id INTEGER UNIQUE NOT NULL,

    CONSTRAINT fk_entrega_pedido
    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id)
);


-- =========================
-- TABELA PIVÔ
-- Pedido N:N Produto
-- =========================

CREATE TABLE pedido_produto (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,

    PRIMARY KEY (pedido_id, produto_id),

    CONSTRAINT fk_pedido_produto_pedido
    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id),

    CONSTRAINT fk_pedido_produto_produto
    FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
);