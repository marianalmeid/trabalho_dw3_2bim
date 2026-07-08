class ProdutoController {
  constructor(produtoService) {
    this.produtoService = produtoService;
  }

  async findAll(request, reply) {
    const produtos = await this.produtoService.findAll();
    return reply.send(produtos);
  }

  async findById(request, reply) {
    const { id } = request.params;
    const produto = await this.produtoService.findById(id);
    return reply.send(produto);
  }

  async create(request, reply) {
    const novoProduto = await this.produtoService.create(request.body);
    return reply.code(201).send(novoProduto);
  }

  async update(request, reply) {
    const { id } = request.params;
    const produtoAtualizado = await this.produtoService.update(id, request.body);
    return reply.send(produtoAtualizado);
  }

  async delete(request, reply) {
    const { id } = request.params;
    await this.produtoService.delete(id);
    return reply.code(204).send();
  }
}

export default ProdutoController;