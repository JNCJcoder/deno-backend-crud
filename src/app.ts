import { Application, Router, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import ClientController from "./controllers/ClientController.ts";

class App {
  public app: Application<Record<string, any>>;
  private server: Router<RouteParams, Record<string, any>>;

  public constructor() {
    this.app = new Application();
    this.server = new Router();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(oakCors());
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
