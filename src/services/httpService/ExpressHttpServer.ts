import { Express, Request, Response, json } from 'express';
import { IHttpServer, IHttpRequest, IHttpResponse } from './IHttpServer';

class ExpressHttpRequest implements IHttpRequest {
  constructor(private request: Request) {}
  get body() {
    return this.request.body;
  }
  get headers() {
    return this.request.headers;
  }
}

class ExpressHttpResponse implements IHttpResponse {
  constructor(private response: Response) {}
  status(code: number) {
    this.response.status(code);
    return this;
  }
  send(body: unknown) {
    this.response.send(body);
  }
}

export class ExpressHttpServer implements IHttpServer {
  constructor(private express: Express) {
    this.express.use(json());
  }
  put(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
    this.express.put(route, (request, response) => {
      const req = new ExpressHttpRequest(request);
      const res = new ExpressHttpResponse(response);
      handler(req, res);
    });
  }

  get(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
    this.express.get(route, (request, response) => {
      const req = new ExpressHttpRequest(request);
      const res = new ExpressHttpResponse(response);
      handler(req, res);
    });
  }

  delete(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
    this.express.delete(route, (request, response) => {
      const req = new ExpressHttpRequest(request);
      const res = new ExpressHttpResponse(response);
      handler(req, res);
    });
  }

  post(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
    this.express.post(route, (request, response) => {
      const req = new ExpressHttpRequest(request);
      const res = new ExpressHttpResponse(response);
      handler(req, res);
    });
  }

  listen(port: number, callback: () => void): void {
    this.express.listen(port, callback);
  }
}
