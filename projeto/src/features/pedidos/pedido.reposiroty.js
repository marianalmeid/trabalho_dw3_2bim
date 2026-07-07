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
            "SELECT * FROM produtos WHERE id=$1",
            [id]
        );

        return result.rows[0];
    }

    async findByNome(nome) {

        const result = await pool.query(
            "SELECT * FROM produtos WHERE nome=$1",
            [nome]
        );

        return result.rows[0];
    }

    async create(produto) {

        const {
            nome,
            preco,
            estoque,
            categoria
        } = produto;

        const result = await pool.query(
            `INSERT INTO produtos
            (nome,preco,estoque,categoria)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [
                nome,
                preco,
                estoque,
                categoria
            ]
        );

        return result.rows[0];
    }

    async update(id, produto) {

        const {
            nome,
            preco,
            estoque,
            categoria
        } = produto;

        const result = await pool.query(
            `UPDATE produtos
             SET nome=$1,
                 preco=$2,
                 estoque=$3,
                 categoria=$4
             WHERE id=$5
             RETURNING *`,
            [
                nome,
                preco,
                estoque,
                categoria,
                id
            ]
        );

        return result.rows[0];
    }

    async delete(id){

        await pool.query(
            "DELETE FROM produtos WHERE id=$1",
            [id]
        );

    }

}

export default ProdutoRepository;