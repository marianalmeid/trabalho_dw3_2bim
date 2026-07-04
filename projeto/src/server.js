import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import pool from "./database/connection.js";

const fastify = Fastify();

await fastify.register(swagger);

await fastify.register(swaggerUi, {
  routePrefix: "/docs"
});

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});
/*rota de teste de conxão */
fastify.get("/teste", async () => {
  const result = await pool.query("SELECT * FROM clientes");
  return result.rows;
});