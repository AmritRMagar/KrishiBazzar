import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KrishiBazar API",
      version: "1.0.0",
      description: "API documentation for the KrishiBazar app",
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
      },
    ],
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;