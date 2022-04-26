import type { Context } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import errorHandler from "./middlewares/error-handler.middleware.ts";

import ClientController from "./controllers/ClientController.ts";

class App {
  public app: Application<Context>;
  private server: Router;

  public constructor() {
    this.app = new Application();
    this.server = new Router();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(oakCors());
    this.app.use(errorHandler);
    this.app.use(this.server.routes());
    this.app.use(this.server.allowedMethods());
  }

  private routes(): void {
    this.server
      .get("/clients", ClientController.index)
      .post("/clients", ClientController.create)
      .get("/clients/:id", ClientController.read)
      .put("/clients/:id", ClientController.update)
      .delete("/clients/:id", ClientController.delete);
  }
}

export default new App().app;
