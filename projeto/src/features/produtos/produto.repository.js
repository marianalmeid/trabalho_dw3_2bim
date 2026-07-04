import pool from "../../database/connection.js";

class ProdutoRepository {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM produtos"
    );

    return result.rows;
  }
}

export default ProdutoRepository;