import AppError from "../../shared/AppError.js";

class ProdutoService {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async findAll() {
    return await this.produtoRepository.findAll();
  }

  async findById(id) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError("Produto não encontrado.", 404);
    }

    return produto;
  }

  async create(produto){

    const produtoExistente = await this.produtoRepository.findByNome(produto.nome);

    if(produtoExistente){
        throw new AppError(
            "Produto já cadastrado.",
            400
        );
    }

    return this.produtoRepository.create(produto);
}

  async update(id, produto) {
    const produtoExistente = await this.produtoRepository.findById(id);

    if (!produtoExistente) {
      throw new AppError("Produto não encontrado.", 404);
    }

    // Opcional: Validar se o novo SKU já pertence a outro produto
    if (produto.sku && produto.sku !== produtoExistente.sku) {
      const skuOcupado = await this.produtoRepository.findBySku(produto.sku);
      if (skuOcupado) {
        throw new AppError("Este SKU já está sendo usado por outro produto.", 409);
      }
    }

    return await this.produtoRepository.update(id, produto);
  }

  async delete(id) {
    const produtoExistente = await this.produtoRepository.findById(id);

    if (!produtoExistente) {
      throw new AppError("Produto não encontrado.", 404);
    }

    await this.produtoRepository.delete(id);
  }
}

export default ProdutoService;