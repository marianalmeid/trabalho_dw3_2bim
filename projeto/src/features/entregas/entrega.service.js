import AppError from "../../shared/AppError.js";

class EntregaService {
  constructor(entregaRepository) {
    this.entregaRepository = entregaRepository;
  }

  async findAll() {
    return await this.entregaRepository.findAll();
  }

  async findById(id) {
    const entrega = await this.entregaRepository.findById(id);

    if (!entrega) {
      throw new AppError("Entrega não encontrada.", 404);
    }

    return entrega;
  }

  async create(entrega) {
    // Aqui você pode adicionar validações adicionais se necessário
    return await this.entregaRepository.create(entrega);
  }

  async update(id, entrega) {
    const entregaExistente = await this.entregaRepository.findById(id);

    if (!entregaExistente) {
      throw new AppError("Entrega não encontrada.", 404);
    }

    return await this.entregaRepository.update(id, entrega);
  }

  async delete(id) {
    const entregaExistente = await this.entregaRepository.findById(id);

    if (!entregaExistente) {
      throw new AppError("Entrega não encontrada.", 404);
    }

    await this.entregaRepository.delete(id);
  }
}

export default EntregaService;