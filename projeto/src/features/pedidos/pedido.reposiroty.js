import pool from "../../database/connection.js";

class PedidoRepository {

  async findAll() {
    const result = await pool.query(
      "SELECT * FROM pedidos ORDER BY id"
    );

    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(

        `SELECT

            pedidos.id,
            pedidos.data_pedido,
            pedidos.status,
            pedidos.valor_total,

            clientes.nome AS cliente

        FROM pedidos

        INNER JOIN clientes

        ON clientes.id = pedidos.cliente_id

        WHERE pedidos.id=$1`,

        [id]

    );

    return result.rows[0];
  }

  async create(pedido) {
    const {
      data_pedido,
      status,
      cliente_id,
      valor_total
    } = pedido;

    const result = await pool.query(
      `INSERT INTO pedidos
      (data_pedido, status, cliente_id, valor_total)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        data_pedido,
        status,
        cliente_id,
        valor_total
      ]
    );

    return result.rows[0];
  }

  async update(id, pedido) {
    const {
      data_pedido,
      status,
      cliente_id,
      valor_total
    } = pedido;

    const result = await pool.query(
      `UPDATE pedidos
      SET data_pedido = $1,
          status = $2,
          cliente_id = $3,
          valor_total = $4
      WHERE id = $5
      RETURNING *`,
      [
        data_pedido,
        status,
        cliente_id,
        valor_total,
        id
      ]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query(
      "DELETE FROM pedidos WHERE id = $1",
      [id]
    );
  }

}

export default PedidoRepository;