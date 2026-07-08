import pool from "../../database/connection.js";

class EntregaRepository {
  async findAll() {
    const result = await pool.query("SELECT * FROM entregas ORDER BY id");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM entregas WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  async create(entrega) {
  const { pedido_id, endereco, status } = entrega;

  const result = await pool.query(
    `INSERT INTO entregas
    (pedido_id,endereco,status)
    VALUES ($1,$2,$3)
    RETURNING *`,
    [
      pedido_id,
      endereco,
      status || "Pendente"
    ]
  );

  return result.rows[0];
}

  async update(id, entrega) {

  const { pedido_id, endereco, status } = entrega;

  const result = await pool.query(
    `UPDATE entregas
     SET pedido_id=$1,
         endereco=$2,
         status=$3
     WHERE id=$4
     RETURNING *`,
    [
      pedido_id,
      endereco,
      status,
      id
    ]
  );

  return result.rows[0];
}

  async delete(id) {
    await pool.query("DELETE FROM entregas WHERE id = $1", [id]);
  }
}

export default EntregaRepository;