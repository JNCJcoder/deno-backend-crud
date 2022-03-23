<h1 align="center">
  <br>
  Deno Backend with Restful CRUD API
  <br>
</h1>

<h3 align="center">Deno Backend</h4>

<h4 align="center">CRUD Restful API created with Deno using OAK</h4>
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

## 💻 Info:

Backend with CRUD Restful made using Deno, TypeScript, JSON and OAK.

- Created with Deno 1.0.0
- The database is a ".json file".
- [OAK](https://github.com/oakserver/oak) is a lib similar to [NodeJS's Koa](https://github.com/koajs/koa).

| Routes       | HTTP   | Description         |
| ------------ | ------ | ------------------- |
| /clients     | GET    | Read All Clients    |
| /clients     | POST   | Create Client       |
| /clients/:id | GET    | Read by Client ID   |
| /clients/:id | PUT    | Update By Client ID |
| /clients/:id | DELETE | Delete By Client ID |

## 👨‍🏫 Testing

Download and install [Deno](https://deno.land/).

Test the project using:

```
deno test --allow-net --allow-write --allow-read __tests__/app.test.ts
```

OR

Run the project using:

```
deno run --allow-net --allow-write --allow-read src/index.ts
```

Import the Insomnia.json file using the [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.postman.com/).

## 📝License

This project is under [MIT License](LICENSE).
