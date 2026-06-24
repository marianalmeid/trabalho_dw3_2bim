const repository = new ClienteRepository();

const service = new ClienteService(repository);

const controller = new ClienteController(service);