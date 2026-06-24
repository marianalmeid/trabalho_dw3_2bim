const repository = new PedidoRepository();

const service = new PedidoService(repository);

const controller = new PedidoController(service);