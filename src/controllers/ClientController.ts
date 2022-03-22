import db from "../database/connect.ts";
import type { ClientInterface } from "../models/Client.ts";
import type { Context } from "https://deno.land/x/oak/mod.ts";
import { helpers, Status } from "https://deno.land/x/oak/mod.ts";

class ClienteController {
  public async index(context: Context) {
    try {
      const users = await db.getData();

      context.response.body = users;
    } catch (err) {
      console.log(err);
      context.response.status = Status.InternalServerError;
      context.response.body = { msg: err };
    }
  }

  public async create(context: Context) {
    if (!context.request.hasBody) {
      context.response.status = Status.BadRequest;
      context.response.body = { msg: "Invalid data" };
      return;
    }

    const { name }: { name: string } = await context.request.body().value;

    if (!name) {
      context.response.status = Status.UnprocessableEntity;
      context.response.body = { msg: "Name is required." };
      return;
    }

    const ClientList: Array<ClientInterface> = await db.getData();

    ClientList.push({
      id: ClientList.length + 1,
      name,
    });

    await db.updateData(ClientList);
    context.response.status = Status.Created;
    context.response.body = { msg: "Client added successfully" };
  }

  public async read(context: Context) {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }));
    

    if (!clientID) {
      context.response.status = Status.BadRequest;
      context.response.body = { msg: "Invalid Client ID" };
      return;
    }

    const ClientList: Array<ClientInterface> = await db.getData();
    const clientFound = ClientList.find(({ id }) => id == clientID);

    if (!clientFound) {
      context.response.status = Status.NotFound;
      context.response.body = { msg: `Client ${clientID} does not exist` };
      return;
    }

    context.response.status = Status.OK;
    context.response.body = clientFound;
  }

  public async update(context: Context) {
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }));

    if (!clientID) {
      context.response.status = Status.BadRequest;
      context.response.body = { msg: "Invalid Client ID" };
      return;
    }
    
    const { name }: { name: string } = await context.request.body().value;

    const ClientList: Array<ClientInterface> = await db.getData();

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
    const clientID = Number(helpers.getQuery(context, { mergeParams: true }));

    if (!clientID) {
      context.response.status = Status.BadRequest;
      context.response.body = { msg: "Invalid Client ID." };
      return;
    }

    const ClientList: Array<ClientInterface> = await db.getData();
    const ClientListUpdated = ClientList.filter(client => client.id != clientID);

    if (ClientList.length === ClientListUpdated.length) {
      context.response.status = Status.NotFound;
      context.response.body = { msg: `Client ${clientID} does not exist.` };
      return;
    }

    await db.updateData(ClientListUpdated);

    context.response.status = Status.OK;
    context.response.body = { msg: `Client ${clientID} deleted successfully!` };
  }
}

export default new ClienteController();