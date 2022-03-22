import type { ClientInterface } from "../models/Client.ts";

class Database {
  private databaseName: string;

  constructor(fileName: string) {
    this.databaseName = fileName;
  }

  public async getData(): Promise<ClientInterface[]> {
    const data = await Deno.readTextFile(this.databaseName);
    return JSON.parse(data);
  }

  public async updateData(info: ClientInterface[]): Promise<boolean> {
    const data = JSON.stringify(info);
    await Deno.writeTextFile(this.databaseName, data);
    return true;
  }
}

export default new Database("./src/database/db.json");
