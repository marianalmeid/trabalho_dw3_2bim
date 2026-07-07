import ProdutoRepository from "./produto.repository.js";
import ProdutoService from "./produto.service.js";
import ProdutoController from "./produto.controller.js";

// No Fastify, as rotas são exportadas como funções assíncronas (plugins)
async function produtoRoutes(fastify, options) {
  // Instanciação e Injeção de Dependências
  const produtoRepository = new ProdutoRepository();
  const produtoService = new ProdutoService(produtoRepository);
  const produtoController = new ProdutoController(produtoService);

  // Definição das Rotas do Fastify
  fastify.get("/", produtoController.index);
  fastify.get("/:id", produtoController.show);
  fastify.post("/", produtoController.store);
  fastify.put("/:id", produtoController.update);
  fastify.delete("/:id", produtoController.delete);
}

export default produtoRoutes;