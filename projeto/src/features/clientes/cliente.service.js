import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import pool from "./database/connection.js";
import AppError from "../../shared/AppError.js";
import clienteRoutes from "./features/clientes/cliente.routes.js";
import errorHandler from "./shared/errorHandler.js";

class ClienteService {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async findAll() {
    return await this.clienteRepository.findAll();
  }

  async findById(id) {
    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      throw new AppError("Cliente não encontrado.", 404);
    }

    return cliente;
  }

  async create(cliente) {
    const clienteExistente =
      await this.clienteRepository.findByEmail(cliente.email);

    if (clienteExistente) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    return await this.clienteRepository.create(cliente);
  }

  async update(id, cliente) {
    const clienteExistente =
      await this.clienteRepository.findById(id);

    if (!clienteExistente) {
      throw new AppError("Cliente não encontrado.", 404);
    }

    return await this.clienteRepository.update(id, cliente);
  }

  async delete(id) {
    const clienteExistente =
      await this.clienteRepository.findById(id);

    if (!clienteExistente) {
      throw new AppError("Cliente não encontrado.", 404);
    }

    await this.clienteRepository.delete(id);
  }
}

export default ClienteService;