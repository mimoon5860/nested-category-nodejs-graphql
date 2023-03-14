import { ApolloServer, gql } from "apollo-server-express";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { origin } from "../utils/constants";
import cors from "cors";
import typeDefs from "../graphql/typeDefs/typeDefs";
import resolvers from "../graphql/resolvers/resolvers";

class App {
  public app: Application;
  private origin: string[] = origin;
  public apolloServer: ApolloServer = new ApolloServer({ typeDefs, resolvers });
  private PORT: number = 9000;
  constructor() {
    this.app = express();
    this.initMiddlewares();
  }

  // server start
  public async startServer() {
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app });
    this.listen();
    this.dbCon();
    this.initRouter();
  }

  // initialize middlewares
  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: this.origin, credentials: true }));
  }

  // app listen
  private listen() {
    this.app.listen(this.PORT, () => {
      console.log(`🚀 Server ready at port: ${this.PORT}`);
    });
  }

  // database connect
  private async dbCon() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/product_category");
      console.log(`Database connected.`);
    } catch (err) {
      console.log(err);
      console.log(`Cannot connect to database!`);
    }
  }

  private initRouter() {
    this.app.use("/", (req: Request, res: Response) => {
      res.send(`🚀 Server ready at port: ${this.PORT}`);
    });
  }
}
export default App;
