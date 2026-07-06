class ClienteController {
  constructor(clienteService) {
    this.clienteService = clienteService;
  }

  async findAll(request, reply) {
    const clientes = await this.clienteService.findAll();

    return reply.status(200).send(clientes);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const cliente = await this.clienteService.findById(id);

    return reply.status(200).send(cliente);
  }

  async create(request, reply) {
    const cliente = request.body;

    const novoCliente = await this.clienteService.create(cliente);

    return reply.status(201).send(novoCliente);
  }

  async update(request, reply) {
    const { id } = request.params;

    const cliente = request.body;

    const clienteAtualizado =
      await this.clienteService.update(id, cliente);

    return reply.status(200).send(clienteAtualizado);
  }

  async delete(request, reply) {
    const { id } = request.params;

    await this.clienteService.delete(id);

    return reply.status(204).send();
  }
}

export default ClienteController;