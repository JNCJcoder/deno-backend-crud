import app from "./app.ts";

console.log("Server is running on http://localhost:3333");
await app.listen({ port: 3333 });
