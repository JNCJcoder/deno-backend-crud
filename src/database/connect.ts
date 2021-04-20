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

  public getData(): Promise<string> {
    return new Promise(resolve => {
      const data = Deno.readFileSync(this.db);
      resolve(this.decoder.decode(data));
    })
  }

  public updateData(data: ClientInterface[]): Promise<boolean> {
    return new Promise(resolve => {
      const info = this.encoder.encode(JSON.stringify(data));
      Deno.writeFileSync(this.db, info);
      resolve(true)
    })
  }
}

export default new Database();
