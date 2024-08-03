import { MyMediaPlugin } from "../types/index.js";
import { signInputSchema } from "../user-shemas.js";
import { z } from "zod";

const userRoutes: MyMediaPlugin = async function userRoutes(app, options) {
  app.post("/users", {
    schema: {
      body: signInputSchema,
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (req, reply) => {
      // const user = await createUser(req, body);
      return {
        message: "User created",
      };
    },
  });
};

export default userRoutes;
