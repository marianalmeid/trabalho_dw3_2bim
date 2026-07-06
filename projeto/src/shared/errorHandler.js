import AppError from "./AppError.js";

function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {

    if (error instanceof AppError) {
      return reply
        .status(error.statusCode)
        .send({
          message: error.message
        });
    }

    console.error(error);

    return reply.status(500).send({
      message: "Erro interno do servidor"
    });
  });
}

export default errorHandler;