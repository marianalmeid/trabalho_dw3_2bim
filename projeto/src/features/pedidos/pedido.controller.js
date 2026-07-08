class PedidoController {

  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  async findAll(request, reply) {

    const pedidos =
      await this.pedidoService.findAll();

    return reply.send(pedidos);

  }

  async findById(request, reply) {

    const { id } = request.params;

    const pedido =
      await this.pedidoService.findById(id);

    return reply.send(pedido);

  }

  async create(request, reply) {

    const pedido =
      await this.pedidoService.create(request.body);

    return reply.code(201).send(pedido);

  }

  async update(request, reply) {

    const { id } = request.params;

    const pedido =
      await this.pedidoService.update(id, request.body);

    return reply.send(pedido);

  }

  async delete(request, reply) {

    const { id } = request.params;

    await this.pedidoService.delete(id);

    return reply.send({
      message: "Pedido removido com sucesso."
    });

  }

}

export default PedidoController;