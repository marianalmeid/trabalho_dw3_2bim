import pool from "../../database/connection.js";

class PedidoRepository {
  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM pedidos WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }
}

export default PedidoRepository;