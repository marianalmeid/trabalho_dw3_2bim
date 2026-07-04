import pool from "../../database/connection.js";

class ClienteRepository {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM clientes"
    );

    return result.rows;
  }
}

export default ClienteRepository;