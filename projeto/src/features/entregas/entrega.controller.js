class EntregaController {
  constructor(entregaService) {
    this.entregaService = entregaService;
  }

  async findAll(request, reply) {
    const entregas = await this.entregaService.findAll();
    return reply.send(entregas);
  }

  async findById(request, reply) {
    const { id } = request.params;
    const entrega = await this.entregaService.findById(id);
    return reply.send(entrega);
  }

  async create(request, reply) {
    const novaEntrega = await this.entregaService.create(request.body);
    return reply.code(201).send(novaEntrega);
  }

  async update(request, reply) {
    const { id } = request.params;
    const entregaAtualizada = await this.entregaService.update(id, request.body);
    return reply.send(entregaAtualizada);
  }

  async delete(request, reply) {
    const { id } = request.params;
    await this.entregaService.delete(id);
    return reply.code(204).send();
  }
}

export default EntregaController;