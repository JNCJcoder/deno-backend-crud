import db from "../database/connect.ts";
import type { ClientInterface } from "../models/Client.ts";
import type { Context } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { helpers, Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";

class ClienteController {
  public async index(context: Context) {
    try {
      const users = await db.getData();

      context.response.body = users;
    } catch (error) {
      context.throw(Status.InternalServerError, error);
    }
  }

  public async create(context: Context) {
    if (!context.request.hasBody) {
      context.throw(Status.BadRequest, "Invalid data.")
    }

    const { name }: { name: string } = await context.request.body().value;

    if (!name) {
      context.throw(Status.UnprocessableEntity, "Name is required.");
    }

    const ClientList: Array<ClientInterface> = await db.getData();

    ClientList.push({
      id: ClientList.length + 1,
      name,
    });

    await db.updateData(ClientList);
    context.response.status = Status.Created;
    context.response.body = { msg: "Client added successfully." };
  }

  public async read(context: Context) {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);
    
    if (!(clientID >= 0)) {
      context.throw(Status.BadRequest, "Invalid Client ID.");
    }

    const ClientList: Array<ClientInterface> = await db.getData();
    const clientFound = ClientList.find(({ id }) => id == clientID);

    if (!clientFound) {
      context.throw(Status.NotFound, `Client ${clientID} does not exist.`);
    }

    context.response.status = Status.OK;
    context.response.body = clientFound;
  }

  public async update(context: Context) {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);

    if (!(clientID >= 0)) {
      context.throw(Status.BadRequest, "Invalid Client ID.");
    }
    
    const { name }: { name: string } = await context.request.body().value;

    const ClientList: Array<ClientInterface> = await db.getData();

    if(!ClientList.find(client => client.id == clientID)) {
      context.throw(Status.NotFound, `Client ${clientID} does not exist.`);
    }

    const ClientListUpdated = ClientList.filter(client => {
      if (client.id == clientID) {
        client.name = name;
      }

      return client;
    });
    await db.updateData(ClientListUpdated);

    context.response.status = Status.OK;
    context.response.body = { msg: `Client ${clientID} updated successfully!` };
  }

  public async delete(context: Context) {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }).id);

    if (!(clientID >= 0)) {
      context.throw(Status.BadRequest, "Invalid Client ID.");
    }

    const ClientList: Array<ClientInterface> = await db.getData();
    const ClientListUpdated = ClientList.filter(client => client.id != clientID);

    if (ClientList.length === ClientListUpdated.length) {
      context.throw(Status.NotFound, `Client ${clientID} does not exist.`);
    }

    await db.updateData(ClientListUpdated);

    context.response.status = Status.OK;
    context.response.body = { msg: `Client ${clientID} deleted successfully!` };
  }
}

export default new ClienteController();