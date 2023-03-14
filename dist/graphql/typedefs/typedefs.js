"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Category {
    _id: ID!
    name: String!
    slug: String!
    active: Boolean!
    createdAt: String!
    parentId: ID
    children: [Category!]!
  }

  type SingleCategory {
    id: ID!
    name: String!
    slug: String!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
    parentId: ID
  }

  input CreateCategoryInput {
    name: String!
    parentId: ID
  }

  input UpdateCategoryInput {
    active: Boolean
  }

  #Query types
  type Query {
    getAllCategory: [Category]
  }

  #Mutation types
  type Mutation {
    createACategory(createCategoryInput: CreateCategoryInput): SingleCategory
    updateACategory(updateCategoryInput: UpdateCategoryInput): Category
  }
`;
exports.default = typeDefs;
