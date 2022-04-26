import { createHttpError } from 'https://deno.land/x/oak@v10.4.0/httpError.ts';
import { Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";

import type { IClientRepository } from '../repositories/ClientRepository.ts';
import ClientRepository from '../repositories/ClientRepository.ts';

class ClientService {
    private ClientRepository: IClientRepository;

    constructor(repository: IClientRepository) {
        this.ClientRepository = repository;
    }

    public listAll = async () => {
        const users = await this.ClientRepository.index();

        return users;
    }

    public create = async (name: string) => {
        if (!name) {
            throw createHttpError(Status.UnprocessableEntity, "Name is required.");
        }

        const clientCreated = await this.ClientRepository.create(name);

        return clientCreated;
    }

    public read = async (clientID: number) => {
        if (!(clientID >= 0)) {
            throw createHttpError(Status.BadRequest, "Invalid Client ID.");
        }

        const clientFound = await this.ClientRepository.read(clientID);

        if (!clientFound) {
            throw createHttpError(Status.NotFound, `Client ${clientID} does not exist.`);
        }

        return clientFound;
    }

    public update = async (clientID: number, name: string) => {
        if (!(clientID >= 0)) {
            throw createHttpError(Status.BadRequest, "Invalid Client ID.");
        }
      
        const clientUpdated = await this.ClientRepository.update(clientID, name);
      
        if(!clientUpdated) {
            throw createHttpError(Status.NotFound, `Client ${clientID} does not exist.`);
        }

        return clientUpdated;
    }

    public delete = async (clientID: number) => {
        if (!(clientID >= 0)) {
            throw createHttpError(Status.BadRequest, "Invalid Client ID.");
        }
        
        const clientDeleted = await this.ClientRepository.delete(clientID);

        if(!clientDeleted) {
            throw createHttpError(Status.NotFound, `Client ${clientID} does not exist.`);
        }
      
        return clientDeleted;
    }
}

export { ClientService };
export default new ClientService(ClientRepository);
