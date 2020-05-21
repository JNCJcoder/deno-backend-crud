import type { Request, Response, Params } from "../models/oak.ts";

interface Index {
  response: Response;
}

interface Create {
  request: Request;
  response: Response;
}

interface Read {
  params: Params;
  response: Response;
}

interface Update {
  params: Params;
  request: Request;
  response: Response;
}

interface Delete {
  params: Params;
  response: Response;
}

export type { Index, Create, Read, Update, Delete };
