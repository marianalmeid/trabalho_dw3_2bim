import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import pool from "./database/connection.js";
import clienteRoutes from "./features/clientes/cliente.routes.js";
import produtoRoutes from "./features/produtos/produto.routes.js";
import entregaRoutes from "./features/entregas/entrega.routes.js";
import pedidoRoutes from "./features/pedidos/pedido.routes.js";
import errorHandler from "./shared/errorHandler.js";
import AppError from "./shared/AppError.js";

const fastify = Fastify();

await fastify.register(cors, {
  origin: true
});

// Swagger
await fastify.register(swagger, {
  openapi: {
    info: {
      title: "API de confeitaria",
      description: "API desenvolvida para o trabalho de Desenvolvimento Web 3",
      version: "1.0.0"
    },
   host: "localhost:3333",
    schemes: ["http"]
  }
});

// Interface Swagger
await fastify.register(swaggerUi, {
  routePrefix: "/docs"
});

// Rotas
await fastify.register(clienteRoutes);

await fastify.register(produtoRoutes);

await fastify.register(pedidoRoutes);

await fastify.register(entregaRoutes);

//error handler
fastify.setErrorHandler((error, request, reply) => {

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message
    });
  }

  console.error(error);

  return reply.status(500).send({
    statusCode: 500,
    message: "Erro interno do servidor"
  });

});

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