"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryResolvers_1 = __importDefault(require("./categoryResolvers"));
const resolvers = {
    Query: Object.assign({}, categoryResolvers_1.default.Query),
    Mutation: Object.assign({}, categoryResolvers_1.default.Mutation),
};
exports.default = resolvers;
