import pool from "../../database/connection.js";

class ClienteRepository {

    async findAll() {
        const result = await pool.query(
            "SELECT * FROM clientes ORDER BY id"
        );

        return result.rows;
    }

    async findById(id) {

        const result = await pool.query(
            "SELECT * FROM clientes WHERE id = $1",
            [id]
        );

        return result.rows[0];
    }

    async findByEmail(email) {

        const result = await pool.query(
            "SELECT * FROM clientes WHERE email = $1",
            [email]
        );

        return result.rows[0];
    }

    async create(cliente) {

        const { nome, email, telefone } = cliente;

        const result = await pool.query(
            `INSERT INTO clientes
            (nome,email,telefone)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [nome, email, telefone]
        );

        return result.rows[0];
    }

    async update(id, cliente) {

        const { nome, email, telefone } = cliente;

        const result = await pool.query(
            `UPDATE clientes
            SET nome=$1,
                email=$2,
                telefone=$3
            WHERE id=$4
            RETURNING *`,
            [nome, email, telefone, id]
        );

        return result.rows[0];
    }

    async delete(id) {

        await pool.query(
            "DELETE FROM clientes WHERE id=$1",
            [id]
        );
    }

}

export default ClienteRepository;