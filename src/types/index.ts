import {
    FastifyPluginAsync,
    FastifyPluginOptions,
    RawServerBase,
} from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";

export type MyMediaPlugin = FastifyPluginAsync<
    FastifyPluginOptions,
    RawServerBase,
    ZodTypeProvider
>;
