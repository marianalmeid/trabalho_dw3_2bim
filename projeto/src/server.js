import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import pool from "./database/connection.js";
import clienteRoutes from "./features/clientes/cliente.routes.js";
import errorHandler from "./shared/errorHandler.js";
import produtoRoutes from "./features/produtos/produto.routes.js";

const fastify = Fastify();

// Error Handler
errorHandler(fastify);

// Swagger
await fastify.register(swagger, {
  openapi: {
    info: {
      title: "API Delivery",
      description: "API desenvolvida para o trabalho de Desenvolvimento Web 3",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3333"
      }
    ]
  }
});

// Interface Swagger
await fastify.register(swaggerUi, {
  routePrefix: "/docs"
});

// Rotas
await fastify.register(clienteRoutes);

await fastify.register(produtoRoutes);

// Rota de teste
fastify.get("/teste", async () => {
  const result = await pool.query("SELECT * FROM clientes");
  return result.rows;
});

// Inicialização
fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});