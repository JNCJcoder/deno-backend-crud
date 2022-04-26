import { assertEquals, assertRejects } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import { ClientService } from '../../src/services/ClientService.ts';
import { IClientRepository } from "../../src/repositories/ClientRepository.ts";
import { ClientInterface } from "../../src/models/Client.ts";

const db = [
    { "id": 2, "name": "Studying Deno" }
];

class MockClientRepository implements IClientRepository {
    private db: Array<ClientInterface>

    constructor() {
        this.db = db;
    }

    public index(): Promise<ClientInterface[]> {
        return new Promise(resolve => {
            resolve(this.db);
        });
    }

    public create(name: string): Promise<boolean> {
        return new Promise(resolve => {
            if(name)
            {
                resolve(true);
            }
            resolve(false);
            
        });
    }

    public read(clientID: number): Promise<ClientInterface | boolean> {
        return new Promise(resolve => {
            if(clientID == 2)
            {
                resolve({ "id": 2, "name": "Studying Deno" });
            }
            resolve(false);
        });
    }

    public update(clientID: number, name: string): Promise<boolean> {
        return new Promise(resolve => {
            if(clientID >= 0 && name)
            {
                resolve(true);
            }
            resolve(false);
            
        });
    }

    public delete(clientID: number): Promise<boolean> {
        return new Promise(resolve => {
            if(clientID >= 0)
            {
                resolve(true);
            }
            resolve(false);
        });
    }
}


Deno.test("ClientService Test", async (t) => {
    const TestClientService = new ClientService(new MockClientRepository());

    await t.step("Index Users - Happy trail", async () => {
        const users = await TestClientService.listAll();

        assertEquals(users, db);
    });

    await t.step("Create User - Happy trail", async () => {
        const clientCreated = await TestClientService.create('teste');

        assertEquals(clientCreated, true);
    });

    await t.step("Create User - Unhappy trail", async () => {
        await assertRejects(async () => await TestClientService.create(''));
    });

    await t.step("Read User - Happy trail", async () => {
        const clientFound = await TestClientService.read(2);

        assertEquals(clientFound, db[0]);
    });

    await t.step("Read User - unhappy trail", async () => {
        await assertRejects(async () => await TestClientService.read(0));
    });

    await t.step("Update User - Happy trail", async () => {
        const clientUpdated = await TestClientService.update(2, 'teste');

        assertEquals(clientUpdated, true);
    });

    await t.step("Update User - unhappy trail", async () => {
        await assertRejects(async () => await TestClientService.update(-1, 'teste'));
        await assertRejects(async () => await TestClientService.update(2, ''));
    });

    await t.step("Delete User - Happy trail", async () => {
        const clientDeleted = await TestClientService.delete(2);

        assertEquals(clientDeleted, true);
    });

    await t.step("Delete User - unhappy trail", async () => {
        await assertRejects(async () => await TestClientService.delete(-1));
    });


});