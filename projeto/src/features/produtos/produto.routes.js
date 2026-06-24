const repository = new ProdutoRepository();

const service = new ProdutoService(repository);

const controller = new ProdutoController(service);