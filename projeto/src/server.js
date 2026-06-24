import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

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