import type { ClientInterface } from "../models/Client.ts";

import Database from '../database/connect.ts';

const database = new Database("./src/database/db.json");

export interface IClientRepository {
    index(): Promise<ClientInterface[]>;
    create(name: string): Promise<boolean>;
    read(clientID: number): Promise<ClientInterface | boolean>;
    update(clientID: number, name: string): Promise<boolean>;
    delete(clientID: number): Promise<boolean>;
  }

class ClientRepository implements IClientRepository {
    public index = async () => {
        const users = await database.getData();

        return users;
    }

    public create = async (name: string) => {
        const ClientList: Array<ClientInterface> = await database.getData();

        ClientList.push({
            id: ClientList.length + 1,
            name,
        });

        return await database.updateData(ClientList);
    }

    public read = async (clientID: number) => {
        const ClientList: Array<ClientInterface> = await database.getData();
        
        const clientFound = ClientList.find(({ id }) => id == clientID);
        if (!clientFound) {
            return false;
        }

        return clientFound;
    }

    public update = async (clientID: number, name: string) => {
        const ClientList: Array<ClientInterface> = await database.getData();

        if(!ClientList.find(client => client.id == clientID)) {
            return false;
        }

        const ClientListUpdated = ClientList.filter(client => {
            if (client.id == clientID) {
                client.name = name;
            }
          
            return client;
        });

        return await database.updateData(ClientListUpdated);
    }

    public delete = async (clientID: number) => {
        const ClientList: Array<ClientInterface> = await database.getData();
        const ClientListUpdated = ClientList.filter(client => client.id != clientID);
      
        if (ClientList.length === ClientListUpdated.length) {
            return false;
        }
        
        return await database.updateData(ClientListUpdated);
    }
}

export default new ClientRepository();