import { gql } from "apollo-server-express";
const typeDefs = gql`
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
export default typeDefs;
