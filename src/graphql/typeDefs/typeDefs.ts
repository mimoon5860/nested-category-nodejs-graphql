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

  type CommonResType {
    success: Boolean!
    message: String!
  }

  input FindSingleCategory {
    id: ID!
  }

  input CreateCategoryInput {
    name: String!
    parentId: String
  }

  input UpdateCategoryInput {
    id: String!
    name: String
    parentId: String
    active: Boolean
  }

  input DeactiveCategoryInput {
    categoryId: String!
  }

  #Query types
  type Query {
    getAllCategory: [Category]
    getSingleCategory(singleCategory: FindSingleCategory): [Category]
  }

  #Mutation types
  type Mutation {
    createACategory(createCategoryInput: CreateCategoryInput): SingleCategory
    updateACategory(updateCategoryInput: UpdateCategoryInput): CommonResType
    deactiveCategory(
      deactiveCategoryInput: DeactiveCategoryInput
    ): CommonResType
  }
`;
export default typeDefs;
