import type { Context } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { helpers, Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";

import ClientService from '../services/ClientService.ts';

class ClienteController {
  public index = async (context: Context) => {
    try {
      const users = await ClientService.listAll();

      context.response.body = users;
    } catch (error) {
      context.throw(Status.InternalServerError, error);
    }
  }

  public create = async (context: Context) => {
    const { name }: { name: string } = await context.request.body().value;

    await ClientService.create(name);

    context.response.status = Status.Created;
    context.response.body = { msg: "Client added successfully." };
  }

  public read = async (context: Context) => {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);

    const clientFound = await ClientService.read(clientID);

    context.response.status = Status.OK;
    context.response.body = clientFound;
  }

  public update = async (context: Context) => {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);
    const { name }: { name: string } = await context.request.body().value;

    await ClientService.update(clientID, name);

    context.response.status = Status.OK;
    context.response.body = { msg: `Client ${clientID} updated successfully!` };
  }

  public delete = async (context: Context) => {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);

    await ClientService.delete(clientID);

    context.response.status = Status.OK;
    context.response.body = { msg: `Client ${clientID} deleted successfully!` };
  }
}

export default new ClienteController();