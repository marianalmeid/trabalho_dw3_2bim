import AppError from "../../shared/AppError.js";

class ProdutoService {

    constructor(produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    async findAll(){
        return await this.produtoRepository.findAll();
    }

    async findById(id){

        const produto =
            await this.produtoRepository.findById(id);

        if(!produto){
            throw new AppError(
                "Produto não encontrado.",
                404
            );
        }

        return produto;

    }

    async create(produto){

        const existente =
            await this.produtoRepository.findByNome(produto.nome);

        if(existente){

            throw new AppError(
                "Produto já cadastrado.",
                409
            );

        }

        if(produto.preco <= 0){

            throw new AppError(
                "Preço inválido.",
                400
            );

        }

        if(produto.estoque < 0){

            throw new AppError(
                "Estoque inválido.",
                400
            );

        }

        return await this.produtoRepository.create(produto);

    }

    async update(id,produto){

        const existente =
            await this.produtoRepository.findById(id);

        if(!existente){

            throw new AppError(
                "Produto não encontrado.",
                404
            );

        }

        return await this.produtoRepository.update(id,produto);

    }

    async delete(id){

        const existente =
            await this.produtoRepository.findById(id);

        if(!existente){

            throw new AppError(
                "Produto não encontrado.",
                404
            );

        }

        await this.produtoRepository.delete(id);

    }

}

export default ProdutoService;