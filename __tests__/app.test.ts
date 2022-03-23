import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import app from '../src/app.ts';

Deno.test('Server - /clients', async (it) => {
    await it.step("GET    /clients - Show all users", async () => {
        const request = await superoak(app);
        await request
            .get("/clients")
            .expect(Status.OK)
            .expect("Content-Type", /json/);
    });

    await it.step("POST   /clients - Create a User", async () => {
        const request = await superoak(app);
        await request
            .post('/clients')
            .set("Content-Type", "application/json")
            .send('{"name":"Testing..."}')
            .expect(Status.Created);
    });

    await it.step("POST   /clients - Name is Required", async () => {
        const request = await superoak(app);
        await request
            .post('/clients')
            .set("Content-Type", "application/json")
            .send('{}')
            .expect(Status.UnprocessableEntity);
    });

    await it.step("GET    /clients:id - Read user by id", async () => {
        const request = await superoak(app);
        await request
            .get('/clients/2')
            .expect(Status.OK);
    });

    await it.step("GET    /clients:id - Invalid Client ID", async () => {
        const request = await superoak(app);
        await request
            .get('/clients/a0')
            .expect(Status.BadRequest);
    });

    await it.step("GET    /clients:id - Client 0 does not exist.", async () => {
        const request = await superoak(app);
        await request
            .get('/clients/0')
            .expect(Status.NotFound);
    });

    await it.step("PUT    /clients:id - Update Client 2 name", async () => {
        const request = await superoak(app);
        await request
            .put('/clients/2')
            .set("Content-Type", "application/json")
            .send('{"name":"...API."}')
            .expect(Status.OK);
    });

    await it.step("PUT    /clients:id - Invalid Client ID", async () => {
        const request = await superoak(app);
        await request
            .put('/clients/a0')
            .set("Content-Type", "application/json")
            .send('{"name":"...API."}')
            .expect(Status.BadRequest);
    });

    await it.step("PUT    /clients:id - Client 0 does not exist.", async () => {
        const request = await superoak(app);
        await request
            .put('/clients/0')
            .set("Content-Type", "application/json")
            .send('{"name":"...API."}')
            .expect(Status.NotFound);
    });

    await it.step("DELETE /clients:id - Invalid Client ID.", async () => {
        const request = await superoak(app);
        await request
            .delete('/clients/a0')
            .expect(Status.BadRequest);
    });

    await it.step("DELETE /clients:id - Client 0 does not exist.", async () => {
        const request = await superoak(app);
        await request
            .delete('/clients/0')
            .expect(Status.NotFound);
    });

    await it.step("DELETE /clients:id - Delete a user.", async () => {
        const request = await superoak(app);
        await request
            .delete('/clients/2')
            .expect(Status.OK);
    });
});