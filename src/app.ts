import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import ClientController from "./controllers/ClientController.ts";

class App {
  public app: any;
  private server: any;

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
      .get("/client", ClientController.index)
      .post("/client", ClientController.create)
      .get("/client/:id", ClientController.read)
      .put("/client/:id", ClientController.update)
      .delete("/client/:id", ClientController.delete);
  }
}

export default new App().app;
