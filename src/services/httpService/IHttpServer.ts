export interface IHttpServer {
  post(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
  put(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
  get(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
  delete(route: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
  listen(port: number, callback: () => void): void;
}

export interface IHttpRequest {
  body: unknown;
  headers?: {
    authorization?: string;
  };
  user?: unknown; // Adicionando a propriedade user para armazenar o usuário decodificado
  params?: { [key: string]: string };
}

export interface IHttpResponse {
  status(code: number): this;
  send(body: unknown): void;
}
