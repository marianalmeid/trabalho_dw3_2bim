import PedidoRepository from "./pedido.reposiroty.js";
import PedidoService from "./pedido.service.js";
import PedidoController from "./pedido.controller.js";

const repository = new PedidoRepository();
const service = new PedidoService(repository);
const controller = new PedidoController(service);

async function pedidoRoutes(fastify) {

  fastify.get("/pedidos", {
    schema: {
      tags: ["Pedidos"],
      summary: "Lista todos os pedidos",
      response: {
        200: {
          description: "Lista de pedidos",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              cliente_id: { type: "integer" },
              data_pedido: { type: "string", format: "date-time" },
              valor_total: { type: "number" },
              status: { type: "string" }
            }
          }
        }
      }
    }
  }, controller.findAll.bind(controller));

  fastify.get("/pedidos/:id", {
    schema: {
      tags: ["Pedidos"],
      summary: "Busca um pedido pelo ID",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Pedido encontrado",
          type: "object",
          properties: {
            id: { type: "integer" },
            cliente: { type: "string" },
            data_pedido: { type: "string", format: "date-time" },
            valor_total: { type: "number" },
            status: { type: "string" }
          }
        },
        404: {
          description: "Pedido não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.findById.bind(controller));

  fastify.post("/pedidos", {
    schema: {
      tags: ["Pedidos"],
      summary: "Cadastra um novo pedido",
      body: {
        type: "object",
        required: ["cliente_id", "data_pedido", "valor_total", "status"],
        properties: {
          cliente_id: {
            type: "integer"
          },
          data_pedido: {
            type: "string",
            format: "date-time"
          },
          valor_total: {
            type: "number"
          },
          status: {
            type: "string"
          }
        }
      },
      response: {
        201: {
          description: "Pedido criado",
          type: "object",
          properties: {
            id: { type: "integer" },
            cliente_id: { type: "integer" },
            data_pedido: { type: "string", format: "date-time" },
            valor_total: { type: "number" },
            status: { type: "string" }
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

  fastify.patch("/pedidos/:id", {
    schema: {
      tags: ["Pedidos"],
      summary: "Atualiza um pedido",
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
          cliente_id: {
            type: "integer"
          },
          data_pedido: {
            type: "string",
            format: "date-time"
          },
          valor_total: {
            type: "number"
          },
          status: {
            type: "string"
          }
        }
      },
      response: {
        200: {
          description: "Pedido atualizado",
          type: "object",
          properties: {
            id: { type: "integer" },
            cliente_id: { type: "integer" },
            data_pedido: { type: "string", format: "date-time" },
            valor_total: { type: "number" },
            status: { type: "string" }
          }
        },
        404: {
          description: "Pedido não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.update.bind(controller));

  fastify.delete("/pedidos/:id", {
    schema: {
      tags: ["Pedidos"],
      summary: "Remove um pedido",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Pedido removido",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Pedido não encontrado",
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

export default pedidoRoutes;