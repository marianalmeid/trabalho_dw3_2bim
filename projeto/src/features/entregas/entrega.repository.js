import pool from "../../database/connection.js";

class EntregaRepository {
  async findAll() {
    const result = await pool.query("SELECT * FROM entregas");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM entregas WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

export default EntregaRepository;