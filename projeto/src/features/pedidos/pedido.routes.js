import ProdutoRepository from "./produto.repository.js";
import ProdutoService from "./produto.service.js";
import ProdutoController from "./produto.controller.js";

const repository = new ProdutoRepository();
const service = new ProdutoService(repository);
const controller = new ProdutoController(service);

async function produtoRoutes(fastify) {

  fastify.get("/produtos", {
    schema: {
      tags: ["Produtos"],
      summary: "Lista todos os produtos",
      response: {
        200: {
          description: "Lista de produtos",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              preco: { type: "number" },
              estoque: { type: "integer" },
              categoria: { type: "string" }
            }
          }
        }
      }
    }
  }, controller.findAll.bind(controller));

  fastify.get("/produtos/:id", {
    schema: {
      tags: ["Produtos"],
      summary: "Busca um produto pelo ID",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Produto encontrado",
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            preco: { type: "number" },
            estoque: { type: "integer" },
            categoria: { type: "string" }
          }
        },
        404: {
          description: "Produto não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.findById.bind(controller));

  fastify.post("/produtos", {
    schema: {
      tags: ["Produtos"],
      summary: "Cadastra um novo produto",
      body: {
        type: "object",
        required: ["nome", "preco", "estoque", "categoria"],
        properties: {
          nome: {
            type: "string",
            example: "Bolo de Chocolate"
          },
          preco: {
            type: "number",
            example: 39.90
          },
          estoque: {
            type: "integer",
            example: 20
          },
          categoria: {
            type: "string",
            example: "Bolos"
          }
        }
      },
      response: {
        201: {
          description: "Produto criado",
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            preco: { type: "number" },
            estoque: { type: "integer" },
            categoria: { type: "string" }
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

  fastify.patch("/produtos/:id", {
    schema: {
      tags: ["Produtos"],
      summary: "Atualiza um produto",
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
            type: "string",
            example: "Bolo Red Velvet"
          },
          preco: {
            type: "number",
            example: 49.90
          },
          estoque: {
            type: "integer",
            example: 15
          },
          categoria: {
            type: "string",
            example: "Bolos"
          }
        }
      },
      response: {
        200: {
          description: "Produto atualizado",
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            preco: { type: "number" },
            estoque: { type: "integer" },
            categoria: { type: "string" }
          }
        },
        404: {
          description: "Produto não encontrado",
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  }, controller.update.bind(controller));

  fastify.delete("/produtos/:id", {
    schema: {
      tags: ["Produtos"],
      summary: "Remove um produto",
      params: {
        type: "object",
        properties: {
          id: { type: "integer" }
        },
        required: ["id"]
      },
      response: {
        204: {
          description: "Produto removido"
        },
        404: {
          description: "Produto não encontrado",
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

export default produtoRoutes;