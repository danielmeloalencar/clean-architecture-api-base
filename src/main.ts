import Fastify from 'fastify';
import express from 'express';
import { userRoutes } from './routes/userRoutes';
import { ExpressHttpServer } from './services/httpService/ExpressHttpServer';
import { FastifyHttpServer } from './services/httpService/FastifyHttpServer';
import { IHttpServer } from './services/httpService/IHttpServer';
import dotenv from 'dotenv';

dotenv.config();

const serverType = process.env.SERVER_TYPE || 'fastify';
const server: IHttpServer = serverType === 'fastify' ? new FastifyHttpServer(Fastify()) : new ExpressHttpServer(express());

userRoutes(server);

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

server.listen(port, () => {
  console.log(`${serverType.toUpperCase()} server is running on port ${port}`);
});
