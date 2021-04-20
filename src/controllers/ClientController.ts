import db from "../database/connect.ts";
import type { ClientInterface } from "../models/Client.ts";
import type { Context, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Status } from "https://deno.land/x/oak/mod.ts";

class ClienteController {
  public async index({ response }: Context) {
    try {
      const users = JSON.parse(await db.getData());

      response.body = users;
    } catch (err) {
      console.log(err);
      response.status = Status.InternalServerError;
      response.body = { msg: err };
    }
  }

  public async create({ request, response }: Context) {
    if (!request.hasBody) {
      response.status = Status.BadRequest;
      response.body = { msg: "Invalid data" };
      return;
    }

    const { name }: { name: string } = await request.body().value;

    if (!name) {
      response.status = Status.UnprocessableEntity;
      response.body = { msg: "Name is required." };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(await db.getData());

    ClientList.push({
      id: ClientList.length + 1,
      name,
    });

    await db.updateData(ClientList);
    response.status = Status.Created;
    response.body = { msg: "Client added successfully" };
  }

  public async read({ params, response }: RouterContext) {
    const clientID = Number(params.id);

    if (!clientID) {
      response.status = Status.BadRequest;
      response.body = { msg: "Invalid Client ID" };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(await db.getData());
    const clientFound = ClientList.find(({ id }) => id == clientID);

    if (!clientFound) {
      response.status = Status.NotFound;
      response.body = { msg: `Client ${clientID} does not exist` };
      return;
    }

    response.status = Status.OK;
    response.body = clientFound;
  }

  public async update({ params, request, response }: RouterContext) {
    const clientID = Number(params.id);

    if (!clientID) {
      response.status = Status.BadRequest;
      response.body = { msg: "Invalid Client ID" };
      return;
    }
    
    const { name }: { name: string } = await request.body().value;

    const ClientList: Array<ClientInterface> = JSON.parse(await db.getData());

    const ClientListUpdated = ClientList.filter(client => {
      if (client.id == clientID) {
        client.name = name;
      }

      return client;
    });
    await db.updateData(ClientListUpdated);

    response.status = Status.OK;
    response.body = { msg: `Client ${clientID} updated successfully!` };
  }

  public async delete({ params, response }: RouterContext) {
    const clientID = Number(params.id);

    if (!clientID) {
      response.status = Status.BadRequest;
      response.body = { msg: "Invalid Client ID." };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(await db.getData());
    const ClientListUpdated = ClientList.filter(client => client.id != clientID);

    if (ClientList.length === ClientListUpdated.length) {
      response.status = Status.NotFound;
      response.body = { msg: `Client ${clientID} does not exist.` };
      return;
    }

    await db.updateData(ClientListUpdated);

    response.status = Status.OK;
    response.body = { msg: `Client ${clientID} deleted successfully!` };
  }
}

export default new ClienteController();
