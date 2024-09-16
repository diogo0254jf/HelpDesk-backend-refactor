module.exports = {
    info: {
      version: '1.0.0',
      title: 'Sa Payments Fintech API',
      description: 'Documentação da API da Connect Sa Payments Fintech',
    },
    host: 'localhost:3009',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      JWT: {
        description: 'JWT token',
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
    definitions: {
    },
  };