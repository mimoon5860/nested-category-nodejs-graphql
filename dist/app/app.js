"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = __importDefault(require("../graphql/typeDefs/typeDefs"));
const resolvers_1 = __importDefault(require("../graphql/resolvers/resolvers"));
class App {
    constructor() {
        this.origin = constants_1.origin;
        this.apolloServer = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
        this.PORT = 9000;
        this.app = (0, express_1.default)();
        this.initMiddlewares();
    }
    // server start
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apolloServer.start();
            this.apolloServer.applyMiddleware({ app: this.app });
            this.listen();
            this.dbCon();
            this.initRouter();
        });
    }
    // initialize middlewares
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: this.origin, credentials: true }));
    }
    // app listen
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`🚀 Server ready at port: ${this.PORT}`);
        });
    }
    // database connect
    dbCon() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/product_category");
                console.log(`Database connected.`);
            }
            catch (err) {
                console.log(err);
                console.log(`Cannot connect to database!`);
            }
        });
    }
    initRouter() {
        this.app.use("/", (req, res) => {
            res.send(`🚀 Server ready at port: ${this.PORT}`);
        });
    }
}
exports.default = App;
