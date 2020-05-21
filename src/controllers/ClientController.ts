import db from "../database/connect.ts";
import type { ClientInterface } from "../models/Client.ts";
import type {
  Index,
  Create,
  Read,
  Update,
  Delete,
} from "./ClientController.d.ts";

class ClienteController {
  public async index({ response }: Index) {
    try {
      const users = db.getData();

      response.body = users;
    } catch (err) {
      console.log(err);
      response.status = 500;
      response.body = err;
    }
  }

  public async create({ request, response }: Create) {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid data" };
      return;
    }
    const { value: { name } }: { value: { name: string } } = await request
      .body();

    if (!name) {
      response.status = 422;
      response.body = { msg: "Name is required." };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(db.getData());

    ClientList.push({
      id: ClientList.length + 1,
      name,
    });

    db.updateData(ClientList);
    response.status = 201;
    response.body = "Client added successfully";
  }

  public async read({ params, response }: Read) {
    const clientID = params.id;

    if (!clientID) {
      response.status = 400;
      response.body = { msg: "Invalid Client ID" };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(db.getData());
    const clientFound = ClientList.find(({ id }: { id: number }) =>
      id == clientID
    );

    if (!clientFound) {
      response.status = 404;
      response.body = `Client ${params.id} does not exist`;
      return;
    }
    response.status = 200;
    response.body = clientFound;
  }

  public async update({ params, request, response }: Update) {
    const clientID = params.id;

    if (!clientID) {
      response.status = 400;
      response.body = { msg: "Invalid Client ID" };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(db.getData());
    const { value: { name } }: { value: { name: string } } = await request
      .body();
    const ClientListUpdated = ClientList.filter((clients) => {
      if (clients.id == clientID) {
        clients.name = name;
      }
      return clients;
    });
    db.updateData(ClientListUpdated);
    response.status = 201;
    response.body = `Client ${clientID} updated successfully!`;
  }

  public async delete({ params, response }: Delete) {
    const clientID = params.id;

    if (!clientID) {
      response.status = 400;
      response.body = { msg: "Invalid Client ID." };
      return;
    }

    const ClientList: Array<ClientInterface> = JSON.parse(db.getData());
    const ClientListUpdated: Array<ClientInterface> = ClientList.filter((
      { id }: { id: number },
    ) => id != clientID);

    if (ClientList.length === ClientListUpdated.length) {
      response.status = 404;
      response.body = `Client ${params.id} does not exist.`;
      return;
    }

    db.updateData(ClientListUpdated);
    response.status = 204;
    response.body = `Client ${params.id} deleted successfully!`;
  }
}

export default new ClienteController();
