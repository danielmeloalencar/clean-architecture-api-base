import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IHttpServer, IHttpRequest, IHttpResponse } from './IHttpServer';

class FastifyHttpRequest implements IHttpRequest {
  constructor(private request: FastifyRequest) {}
  get body() {
    return this.request.body;
  }
  get headers() {
    return this.request.headers;
  }
}

class FastifyHttpResponse implements IHttpResponse {
  constructor(private reply: FastifyReply) {}
  status(code: number) {
    this.reply.status(code);
    return this;
  }
  send(body: unknown) {
    this.reply.send(body);
  }
}

export class FastifyHttpServer implements IHttpServer {
  constructor(private fastify: FastifyInstance) {}

  post(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
    this.fastify.post(route, (request, reply) => {
      const req = new FastifyHttpRequest(request);
      const res = new FastifyHttpResponse(reply);
      handler(req, res);
    });
  }

  listen(port: number, callback: () => void): void {
    this.fastify.listen({ port }, callback);
  }
}
