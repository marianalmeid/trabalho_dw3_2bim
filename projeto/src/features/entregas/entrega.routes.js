import EntregaRepository from "./entrega.repository.js";
import EntregaService from "./entrega.service.js";
import EntregaController from "./entrega.controller.js";

async function entregaRoutes(fastify, options) {
  // Instanciação com Injeção de Dependência
  const repository = new EntregaRepository();
  const service = new EntregaService(repository);
  const controller = new EntregaController(service);

  // Definição dos Endpoints
  fastify.get("/", controller.index);
  fastify.get("/:id", controller.show);
  fastify.post("/", controller.store);
  fastify.put("/:id", controller.update);
  fastify.delete("/:id", controller.delete);
}

export default entregaRoutes;