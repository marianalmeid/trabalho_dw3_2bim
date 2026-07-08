import AppError from "../../shared/AppError.js";

class PedidoService {

  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async findAll() {
    return await this.pedidoRepository.findAll();
  }

  async findById(id) {

    const pedido = await this.pedidoRepository.findById(id);

    if (!pedido) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    return pedido;
  }

  async create(pedido) {
    return await this.pedidoRepository.create(pedido);
  }

  async update(id, pedido) {

    const pedidoExistente =
      await this.pedidoRepository.findById(id);

    if (!pedidoExistente) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    return await this.pedidoRepository.update(id, pedido);

  }

  async delete(id) {

    const pedidoExistente =
      await this.pedidoRepository.findById(id);

    if (!pedidoExistente) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    await this.pedidoRepository.delete(id);

  }

}

export default PedidoService;