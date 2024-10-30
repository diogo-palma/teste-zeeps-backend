import * as dotenv from "dotenv";
import createApi from "./infrastructure/entrypoint/api";
import MongoClient from "./infrastructure/database/mongo";
import path from "path";

dotenv.config();

class Server {
  private port: number;
  private api: any; 

  constructor() {
    this.port = Number(process.env.PORT) || 9000;
    global.appRoot = path.resolve(__dirname, '..');
    this.api = createApi(); 
  }

  public async start() {
    await MongoClient.connect();
    this.listen();
  }

  private listen() {
    this.api.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}

(async () => {
  const server = new Server();
  await server.start();
})();
