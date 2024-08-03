import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import type { ZodTypeProvider } from "fastify-type-provider-zod";
import dotenv from "dotenv";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import omdbRoutes from "./routes/omdb.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = fastify({
  logger: true,
})
  .setSerializerCompiler(serializerCompiler)
  .setValidatorCompiler(validatorCompiler)
  .withTypeProvider<ZodTypeProvider>();

const port = 3000;
const host = "0.0.0.0";
const swaggerDocsPrefix = "/api-docs";

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API My Movies",
      description: "Description of the My Movies' API",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
  // You can also create transform with custom skiplist of endpoints
  // that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
});

app.register(fastifySwaggerUI, {
  routePrefix: swaggerDocsPrefix,
});

const plugins = [
  [omdbRoutes, { prefix: "/omdb" }],
  [usersRoutes, { prefix: "/users" }],
].forEach(([plugin, opts]: [MyMediaPlugin, Record<string, unknown>]) =>
  app.register(plugin, opts)
);

try {
  await app.ready();
  await app.listen({ port, host });

  app.log.info(
    `Documentation running at http://${host}:${port}${swaggerDocsPrefix}`
  );

  process.on("SIGTERM", async () => {
    // kill
    app.log.info("SIGTERM signal received. Shutting down...");
    await app.close();
    process.exit(0);
  });
  process.on("SIGINT", async () => {
    // Ctrl + C
    app.log.info("SIGINT signal received. Shutting down...");
    await app.close();
    process.exit(0);
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
