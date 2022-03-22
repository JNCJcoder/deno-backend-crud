import type { ClientInterface } from "../models/Client.ts";

class Database {
  private decoder: TextDecoder;
  private encoder: TextEncoder;
  private db: string;

  constructor() {
    this.decoder = new TextDecoder("utf-8");
    this.encoder = new TextEncoder();
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
