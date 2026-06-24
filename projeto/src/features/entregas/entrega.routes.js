const repository = new EntregaRepository();

const service = new EntregaService(repository);

const controller = new EntregaController(service);