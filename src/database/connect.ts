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

  public getData(): string {
    const data = Deno.readFileSync(this.db);
    return this.decoder.decode(data);
  }

  public updateData(data: ClientInterface[]): void {
    const info = this.encoder.encode(JSON.stringify(data));
    Deno.writeFileSync(this.db, info);
  }
}

export default new Database();
