import categoryResolvers from "./categoryResolvers";

const resolvers = {
  Query: { ...categoryResolvers.Query },
  Mutation: { ...categoryResolvers.Mutation },
};

export default resolvers;
