class ProdutoController {
  constructor(produtoService) {
    this.produtoService = produtoService;
  }

  index = async (request, reply) => {
    const produtos = await this.produtoService.findAll();
    return reply.send(produtos);
  };

  show = async (request, reply) => {
    const { id } = request.params;
    const produto = await this.produtoService.findById(id);
    return reply.send(produto);
  };

  store = async (request, reply) => {
    const novoProduto = await this.produtoService.create(request.body);
    return reply.code(201).send(novoProduto);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const produtoAtualizado = await this.produtoService.update(id, request.body);
    return reply.send(produtoAtualizado);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.produtoService.delete(id);
    return reply.code(204).send();
  };
}

export default ProdutoController;