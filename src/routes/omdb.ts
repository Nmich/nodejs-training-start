import {
  Media,
  SearchResponse,
  mediaSchema,
  searchResponseSchema,
} from "../schema/movie-schema.js";

import { MyMediaPlugin } from "../types/index.js";
import process from "node:process";
import { z } from "zod";

const apiKey = process.env.OMDB_API_KEY;

const baseUrl = "http://www.omdbapi.com/";
const apiUrl = `${baseUrl}?apikey=${apiKey}`;
const searchUrl = `${apiUrl}&s=`;
const mediaUrl = `${apiUrl}&i=`;

const omdbRoutes: MyMediaPlugin = async function omdbRoutes(app, options) {
  app.get("", {
    schema: {
      response: {
        200: searchResponseSchema,
      },
      querystring: z.object({
        s: z.string(),
        y: z.string(),
      }),
    },
    handler: async (req, res) => {
      const query = req.query;
      const search = query.s;
      const year = query.y;
      const url = `${searchUrl}${search}`;
      const body = (await fetch(url).then((res) =>
        res.json()
      )) as SearchResponse;
      return body;
    },
  });
  app.post("/media/:id", {
    schema: {
      params: z.object({ id: z.string() }),
      response: {
        200: mediaSchema,
      },
    },
    handler: async (req, res) => {
      const id = req.params.id;
      const url = `${mediaUrl}${id}`;
      const body = await fetch(url).then((res) => res.json());
      return body;
    },
  });
  app.get("/media/:id", {
    schema: {
      params: z.object({ id: z.string() }),
      response: {
        200: mediaSchema,
      },
    },
    handler: async (req, res) => {
      const id = req.params.id;
      const url = `${mediaUrl}${id}`;
      const body = (await fetch(url).then((res) => res.json())) as Media;
      return body;
    },
  });
};

export default omdbRoutes;
