import type { ClientInterface } from "../models/Client.ts";

class Database {
  private db: string;

  constructor() {
    this.db = "./src/database/db.json";
  }

  public async getData(): Promise<string> {
    const data = await Deno.readTextFile(this.db);
    return JSON.parse(data);
  }

  public async updateData(info: ClientInterface[]): Promise<boolean> {
    const data = JSON.stringify(info);
    await Deno.writeTextFile(this.db, data);
    return true;
  }
}

export default new Database();
