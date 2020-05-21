interface Request {
  id: number;
  body: any;
  hasBody: boolean;
}

interface Response {
  status: number;
  body: object | string;
}

interface Params {
  id: number;
}

export type { Request, Response, Params };
