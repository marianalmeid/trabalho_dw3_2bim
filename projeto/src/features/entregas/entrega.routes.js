import EntregaRepository from "./entrega.repository.js";
import EntregaService from "./entrega.service.js";
import EntregaController from "./entrega.controller.js";

const repository = new EntregaRepository();
const service = new EntregaService(repository);
const controller = new EntregaController(service);

async function entregaRoutes(fastify) {

  fastify.get("/entregas", {
    schema: {
      tags: ["Entregas"],
      summary: "Lista todas as entregas",
      response: {
        200: {
          description: "Lista de entregas",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              endereco: { type: "string" },
              status: { type: "string" },
              pedido_id: { type: "integer" }
            }
          }
        }
      }
    }
  }, controller.findAll.bind(controller));

  fastify.get("/entregas/:id", {
    schema: {
      tags: ["Entregas"],
      summary: "Busca uma entrega pelo ID",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Entrega encontrada",
          type: "object",
          properties: {
            id: { type: "integer" },
            endereco: { type: "string" },
            status: { type: "string" },
            pedido_id: { type: "integer" }
          }
        },
        404: {
          description: "Entrega não encontrada",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.findById.bind(controller));

  fastify.post("/entregas", {
    schema: {
      tags: ["Entregas"],
      summary: "Cadastra uma nova entrega",
      body: {
        type: "object",
        required: ["endereco", "status", "pedido_id"],
        properties: {
          endereco: {
            type: "string"
          },
          status: {
            type: "string"
          },
          pedido_id: {
            type: "integer"
          }
        }
      },
      response: {
        201: {
          description: "Entrega criada",
          type: "object",
          properties: {
            id: { type: "integer" },
            endereco: { type: "string" },
            status: { type: "string" },
            pedido_id: { type: "integer" }
          }
        },
        400: {
          description: "Erro de validação",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.create.bind(controller));

  fastify.patch("/entregas/:id", {
    schema: {
      tags: ["Entregas"],
      summary: "Atualiza uma entrega",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      body: {
        type: "object",
        properties: {
          endereco: {
            type: "string"
          },
          status: {
            type: "string"
          },
          pedido_id: {
            type: "integer"
          }
        }
      },
      response: {
        200: {
          description: "Entrega atualizada",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Entrega não encontrada",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.update.bind(controller));

  fastify.delete("/entregas/:id", {
    schema: {
      tags: ["Entregas"],
      summary: "Remove uma entrega",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Entrega removida",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Entrega não encontrada",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.delete.bind(controller));
}

export default entregaRoutes;