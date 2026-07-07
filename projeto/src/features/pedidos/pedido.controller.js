class ProdutoController {
  constructor(produtoService) {
    this.produtoService = produtoService;
  }

  async findAll(request, reply) {
    const produtos = await this.produtoService.findAll();

    return reply.status(200).send(produtos);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const produto = await this.produtoService.findById(id);

    return reply.status(200).send(produto);
  }

  async create(request, reply) {
    const produto = request.body;

    const novoProduto = await this.produtoService.create(produto);

    return reply.status(201).send(novoProduto);
  }

  async update(request, reply) {
    const { id } = request.params;

    const produto = request.body;

    const produtoAtualizado =
      await this.produtoService.update(id, produto);

    return reply.status(200).send(produtoAtualizado);
  }

  async delete(request, reply) {
    const { id } = request.params;

    await this.produtoService.delete(id);

    return reply.status(204).send();
  }
}

export default ProdutoController;