fastify.setErrorHandler(
 (error, request, reply) => {

  if(error instanceof AppError){
    return reply.status(
      error.statusCode
    ).send({
      message: error.message
    });
  }

  return reply.status(500).send({
    message: "Erro interno"
  });
 });