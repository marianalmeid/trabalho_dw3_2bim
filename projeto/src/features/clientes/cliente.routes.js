import ClienteRepository from "./cliente.repository.js";
import ClienteService from "./cliente.service.js";
import ClienteController from "./cliente.controller.js";

const repository = new ClienteRepository();
const service = new ClienteService(repository);
const controller = new ClienteController(service);

async function clienteRoutes(fastify) {

  fastify.get("/clientes", {
    schema: {
      tags: ["Clientes"],
      summary: "Lista todos os clientes",
      response: {
        200: {
          description: "Lista de clientes",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              email: { type: "string" },
              telefone: {type: "integer"}
            }
          }
        }
      }
    }
  }, controller.findAll.bind(controller));

  fastify.get("/clientes/:id", {
    schema: {
      tags: ["Clientes"],
      summary: "Busca um cliente pelo ID",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Cliente encontrado",
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            email: { type: "string" }
          }
        },
        404: {
          description: "Cliente não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.findById.bind(controller));

  fastify.post("/clientes", {
    schema: {
      tags: ["Clientes"],
      summary: "Cadastra um novo cliente",
      body: {
        type: "object",
        required: ["nome", "email"],
        properties: {
          nome: {
            type: "string"
          },
          email: {
            type: "string"
          }
        }
      },
      response: {
        201: {
          description: "Cliente criado",
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            email: { type: "string" }
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

  fastify.patch("/clientes/:id", {
    schema: {
      tags: ["Clientes"],
      summary: "Atualiza um cliente",
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
          nome: {
            type: "string"
          },
          email: {
            type: "string"
          }
        }
      },
      response: {
        200: {
          description: "Cliente atualizado",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Cliente não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.update.bind(controller));

  fastify.delete("/clientes/:id", {
    schema: {
      tags: ["Clientes"],
      summary: "Remove um cliente",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Cliente removido",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Cliente não encontrado",
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

export default clienteRoutes;