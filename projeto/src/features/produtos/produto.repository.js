import pool from "../../database/connection.js";

class ProdutoRepository {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM produtos ORDER BY id"
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  async findBySku(sku) {
    // Busca por SKU (código único do produto) para evitar duplicados
    const result = await pool.query(
      "SELECT * FROM produtos WHERE sku = $1",
      [sku]
    );
    return result.rows[0];
  }

  async create(produto) {
    const { nome, descricao, preco, estoque, sku } = produto;

    const result = await pool.query(
      `INSERT INTO produtos
      (nome, descricao, preco, estoque, sku)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nome, descricao, preco, estoque, sku]
    );

    return result.rows[0];
  }

  async update(id, produto) {
    const { nome, descricao, preco, estoque, sku } = produto;

    const result = await pool.query(
      `UPDATE produtos
      SET nome = $1,
          descricao = $2,
          preco = $3,
          estoque = $4,
          sku = $5
      WHERE id = $6
      RETURNING *`,
      [nome, descricao, preco, estoque, sku, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query(
      "DELETE FROM produtos WHERE id = $1",
      [id]
    );
  }
}

export default ProdutoRepository;