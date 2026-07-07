class EntregaController {
  constructor(entregaService) {
    this.entregaService = entregaService;
  }

  index = async (request, reply) => {
    const entregas = await this.entregaService.findAll();
    return reply.send(entregas);
  };

  show = async (request, reply) => {
    const { id } = request.params;
    const entrega = await this.entregaService.findById(id);
    return reply.send(entrega);
  };

  store = async (request, reply) => {
    const novaEntrega = await this.entregaService.create(request.body);
    return reply.code(201).send(novaEntrega);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const entregaAtualizada = await this.entregaService.update(id, request.body);
    return reply.send(entregaAtualizada);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.entregaService.delete(id);
    return reply.code(204).send();
  };
}

export default EntregaController;