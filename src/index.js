import fastify from 'fastify';
import process from "node:process";
import dotenv from "dotenv";
dotenv.config();
const app = fastify({
    logger: true,
});
const port = 3000;
const host = '0.0.0.0';
const apiKey = process.env.OMDB_API_KEY;
const baseUrl = 'http://www.omdbapi.com/';
const apiUrl = `${baseUrl}?apikey=${apiKey}`;
const searchUrl = `${apiUrl}&type=movie&s=`;
const movieUrl = `${apiUrl}&i=`;
app.get('/media/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const response = await fetch(`${movieUrl}${id}`);
    const data = await response.json();
    return data;
});
app.get('/media', async (req, res) => {
    const { q } = req.query;
    console.log(q);
    const response = await fetch(`${searchUrl}${q}`);
    const data = await response.json();
    return data;
});
try {
    await app.listen({ port, host });
}
catch (error) {
    app.log.error(error);
    process.exit(1);
}
